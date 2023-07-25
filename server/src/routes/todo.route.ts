import { Router } from "express";

//Controllers
import * as todoController from '../controllers/todo.controller'

const router = Router();

router.get('/gettodos', todoController.getTodos);
router.post('/todo/create', todoController.createTodo);
router.put('/todo/update/:id', todoController.updateTodo);
router.put('/todo/update/status/:id', todoController.updateTodoStatus);
router.delete('/todo/delete/:id', todoController.deleteTodo);

export default router;