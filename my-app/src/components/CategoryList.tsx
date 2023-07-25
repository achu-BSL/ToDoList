import React, { useState, useEffect } from "react";

import Category from "./Category";

import { Todo } from "../models/todo";

export const CategoryList: React.FC = () => {

    const [todoState, setTodoState] = useState<Todo[]>([]);

    useEffect(() => {
        const url = 'http://localhost:5000/gettodos';
        const fetchData = async () => {
            try {
                const res = await fetch(url, { method: 'GET' });
                if (res.ok) {
                    const data: { text: string, _id: string, isCompleted: boolean }[] = await res.json();
                    setTodoState(prevTodos => data.map(todo => {
                        return { text: todo.text, id: todo._id, isCompleted: todo.isCompleted };
                    }))
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    const todoAddHandler = async (text: string) => {

        const url = 'http://localhost:5000/todo/create';
        const body = { text };
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            const todoData: { _id: string } = await res.json();
            const newTodo: Todo = {
                text,
                id: todoData._id,
                isCompleted: false
            }
            setTodoState(prevTodods => [...prevTodods, newTodo]);
        }
        else console.log("Opps something wrong..");
    }

    const todoDeleteHandler = async (todoId: string) => {
        const url = `http://localhost:5000/todo/delete/${todoId}`;
        const res = await fetch(url, {
            method: 'DELETE'
        })
        if (res.ok) {
            setTodoState(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
            console.log("Deleted Successfully...");
        }
        else {
            console.log("OPPS Something wrong...");
        }
    }


    const todoStatusUpdate = async (todoId: string, status: 'Completed' | 'Pending') => {
        const url = `http://localhost:5000/todo/update/status/${todoId}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({newStatus: status})
        })
      
        if(res.ok) {
          setTodoState(prevTodos => prevTodos.map(todo => {
            if(todo.id === todoId) {
              return {id: todo.id, text: todo.text, isCompleted: status === 'Completed'}
            }
            return todo;
          }))
        } else console.log("OPPS Something wrong");
      }
      


    return (
        <div>
            <Category 
            addTodo={todoAddHandler} 
            items={todoState} 
            onStatusUpdate={todoStatusUpdate}
            onDelete={todoDeleteHandler}
            />
        </div>
    );
}