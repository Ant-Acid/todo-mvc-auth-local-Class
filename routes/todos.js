const express = require('express') // import express
const router = express.Router() // create router
const todosController = require('../controllers/todos')  // import todos controller
const { ensureAuth } = require('../middleware/auth') // import auth middleware

router.get('/', ensureAuth, todosController.getTodos) // get all todos

router.post('/createTodo', todosController.createTodo) // create todo

router.put('/markComplete', todosController.markComplete) // mark todo as complete

router.put('/markIncomplete', todosController.markIncomplete) // mark todo as incomplete

router.delete('/deleteTodo', todosController.deleteTodo) // delete todo

module.exports = router // export router