const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  // editNoteByIdHandler,
  // deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  // {
  //   method: "PUT",
  //   path: "/notes/{id}",
  //   handler: editNoteByIdHandler,
  // },
  // {
  //   method: "DELETE",
  //   path: "/notes/{id}",
  //   handler: deleteNoteByIdHandler,
  // },
];

module.exports = routes;
