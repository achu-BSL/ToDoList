import { RequestHandler } from "express";
import {customAlphabet} from "nanoid";

import TodoModel from "../models/todo.model.js";

//for generate custom nano id
const generateId = ()=> {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstvwxyz';
    const idLength = 10;
    return customAlphabet(alphabet, idLength)();
}


//localhost:5000/gettodos
//Method GET
export const getTodos: RequestHandler = async (_req, res, next)=> {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
}


//localshot:5000/todo/add/:categoryname
//Method POST
export const addTodo: RequestHandler = async (req, res, next) => {
    try {
        const {categoryname} = req.params;
        const {text} = (req.body as {text: string});

        const id = generateId();

        const newTodo = {text, id};
        await TodoModel.updateOne({categoryName: categoryname}, {$push: {todos: newTodo}});
        res.status(201).send({...newTodo, isCompleted: false});
    } catch (err) {
      next(err);  
    }
}


//localhost:5000/todo/update/:id
//Method PUT
export const updateTodo: RequestHandler =   async (req, res, next) => {
    try {
        const {id} = req.params;
        const {newText} = (req.body as {newText: string});
        await TodoModel.updateOne({_id: id}, {$set: {text: newText}});
        res.status(200).send(`Updated Successfully..`);
    } catch (err) {
        next(err);
    }
}


//localhost:5000/todo/update/status/:categoryname/:id
//Method PUT
export const updateTodoStatus: RequestHandler =   async (req, res, next) => {
    try {
        const {id, categoryname} = req.params;
        const {newStatus} = (req.body as {newStatus: 'Completed' | 'Pending'});
        await TodoModel.updateOne({categoryName: categoryname, 'todos.id': id}, {$set: {'todos.$.isCompleted': newStatus === 'Completed'}});
        res.status(200).send(`Updated Successfully..`);
    } catch (err) {
        next(err);
    }
}



//localhost:5000/todo/delete/:categoryname/:id
//Method DELETE
export const deleteTodo: RequestHandler = async (req, res, next)=> {
    try {
        const {id, categoryname} = req.params;
        await TodoModel.updateOne({categoryName: categoryname}, {$pull: {todos: {id}}})
        res.status(200).send(`Deleted Successfully..`);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//localshot:5000/category/add
//Method POST

export const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const {categoryname} = req.body;
        const id = generateId();
        const category = await TodoModel.create({category_id: id, categoryName: categoryname});
        res.status(201).json(category);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//localhost:5000/category/edit/:categoryname
//Method POST
export const editCategory: RequestHandler = async (req, res, next)=> {
    try {
        const {categoryname} = req.params;
        const {newCategoryName} = req.body;
        await TodoModel.updateOne({categoryName: categoryname}, {$set: {categoryName: newCategoryName}});
        res.status(200).json("Category updated...");
    } catch (err) {
        next(err);
    }
}