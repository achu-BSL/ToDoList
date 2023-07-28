import { Router } from "express";

//Controllers
import * as todoController from '../controllers/todo.controller.js'

const router = Router();

router.get('/gettodos', todoController.getTodos);
router.post('/todo/add/:categoryname', todoController.addTodo);
router.put('/todo/update/:id', todoController.updateTodo);
router.put('/todo/update/status/:categoryname/:id', todoController.updateTodoStatus);
router.delete('/todo/delete/:categoryname/:id', todoController.deleteTodo);

router.put('/category/create', todoController.createCategory);
router.put('/category/edit/:categoryname', todoController.changeCategoryName);

export default router;