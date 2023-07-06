// Pada router, setelah kamu setup controller, kamu bisa gunakan function handler
// tersebut di sini.

const express = require('express');
const { deleteTodo, updateTodo, addNewTodo, getTodos } = require('../controllers/MainController');

const router = express.Router();

router
// ? Method: GET, route: /todos
  .get('/todos', getTodos)
// ? Method: POST, route: /todos
  .post('/todos', addNewTodo)
// ? Method: PUT, route: /todos/:id, param: id
  .put('/todos/:id', updateTodo)
// ? Method: DELETE, route: /todos/:id, param: id
  .delete('/todos/:id', deleteTodo);

module.exports = router;
