import { RequestHandler } from "express";

import TodoModel, {Todo} from "../models/todo.model";


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


//localshot:5000/todo/create
//Method POST
export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const {text} = (req.body as {text: string});
        const newTodo: Todo = {text};
        await TodoModel.create(newTodo);
    
        res.status(201).send(`Created ${text}`);
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


//localhost:5000/todo/delete/:id
//Method DELETE
export const deleteTodo: RequestHandler = async (req, res, next)=> {
    try {
        const {id} = req.params;
        await TodoModel.deleteOne({_id: id});
        res.status(200).send(`Deleted Successfully..`);
    } catch (err) {
        next(err);
    }
}