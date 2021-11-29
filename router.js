const Router = require('koa-router')
const router = new Router()
const LoginController = require('./login-controller')
const TodoController = require('./todo-controller')

router.post('/login', LoginController.verifyPassword)
router.get('/todo', TodoController.getAllTodo)
router.post('/todo/insert', TodoController.insertTodo)
router.delete('/todo/delete',TodoController.delete_todo)
router.put('/todo/update',TodoController.update_todo)

module.exports = router