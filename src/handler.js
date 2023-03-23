const { nanoid } = require("nanoid");
const books = require("./books");

//data disimpan dalam bentuk json melalui request.payload
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // random generate id sebanyak 16 digit
  const id = nanoid(16);
  // date to string
  const insertedAt = new Date().toISOString();
  // waktu melakukan edit
  const updatedAt = insertedAt;

  // finished jika readpage identik dengan pagecount
  const finished = readPage === pageCount;
  // outputnya berupa boolean

  if (name == null) {
    // jika name bernilai null
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  // readpage lebih besar dari page count atau sebaliknya
  if (readPage > pageCount || pageCount < readPage) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished,
  };

  books.push(newBook); // push to books array

  const isSuccess = books.filter((b) => b.id === id).length > 0; // cek if newBook pushed

  if (isSuccess) {
    // Bila buku berhasil dimasukkan
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  // const { name, reading, finished } = request.query;

  var selectedValue = books;

  // if (name !== undefined) {
  //   filterValue = filterValue.filter((book) =>
  //     book.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }

  // if (reading !== undefined) {
  //   filterValue = filterValue.filter(
  //     (book) => book.reading === !!Number(reading)
  //   );
  // }

  // if (finished !== undefined) {
  //   filterValue = filterValue.filter(
  //     (book) => book.finished === !!Number(finished)
  //   );
  // }

  const response = h.response({
    status: "success",
    data: {
      books: selectedValue.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};
const editBookByIdHandler = (request, h) => {
  // buku diubah sesuai dengan id yang terdapat pada route parameter
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (name == null) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// const deleteNoteByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const index = notes.findIndex((note) => note.id === id);

//   if (index !== -1) {
//     notes.splice(index, 1);
//     const response = h.response({
//       status: "success",
//       message: "Catatan berhasil dihapus",
//     });
//     response.code(200);
//     return response;
//   }
//   const response = h.response({
//     status: "fail",
//     message: "Catatan gagal dihapus. Id tidak ditemukan",
//   });
//   response.code(404);
//   return response;
// };

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  // deleteBookByIdHandler,
};
