import React, { useState, useEffect } from "react";

import { NewCategory } from './NewCategory';
import Category from "./Category";

import { Todo } from "../models/todo";
import { TodoCategory } from "../models/todo";




export const CategoryList: React.FC = () => {

    const [todoState, setTodoState] = useState<TodoCategory>({});

    useEffect(() => {
        const url = 'http://localhost:5000/gettodos';
        const fetchData = async () => {
            try {
                const res = await fetch(url, { method: 'GET' });
                if (res.ok) {
                    const data: { todos: Todo[], categoryName: string, category_id: string }[] = await res.json();
                    setTodoState(prevTodos => {
                        const todos: TodoCategory = {};
                        data.forEach(todo => {
                            todos[`${todo.categoryName}`] = {
                                todos: todo.todos,
                                id: todo.category_id
                            }
                        })
                        return todos;
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    const todoAddHandler = async (categoryName: string, text: string) => {
        const url = `http://localhost:5000/todo/add/${categoryName}`;
        const body = { text };
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            const todoData: { id: string } = await res.json();
            const newTodo = {
                text,
                id: todoData.id,
                isCompleted: false,
            }

            setTodoState(prevTodos => {
                const updatedState = { ...prevTodos };
                updatedState[categoryName].todos.push(newTodo);
                console.log(updatedState[categoryName].todos.length);
                return updatedState;
            });
        }
        else console.log("Opps something wrong..");
    }

    const todoDeleteHandler = async (category: string, todoId: string) => {
        const url = `http://localhost:5000/todo/delete/${category}/${todoId}`;
        const res = await fetch(url, {
            method: 'DELETE'
        })
        if (res.ok) {
            setTodoState(prevTodos => {
                const updatedState = { ...prevTodos }
                updatedState[category].todos = updatedState[category].todos.filter(todo => todo.id !== todoId);
                return updatedState;
            });
            console.log("Deleted Successfully...");
        }
        else {
            console.log("OPPS Something wrong...");
        }
    }


    const todoStatusUpdate = async (category: string, todoId: string, status: 'Completed' | 'Pending') => {
        const url = `http://localhost:5000/todo/update/status/${category}/${todoId}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newStatus: status })
        })

        if (res.ok) {
            setTodoState(prevTodos => {
                const updatedState = { ...prevTodos };
                updatedState[category].todos = updatedState[category].todos.map(todo => {
                    if (todo.id === todoId) {
                        todo.isCompleted = status === 'Completed';
                    }
                    return todo;
                })
                return updatedState;
            })
        } else console.log("OPPS Something wrong");
    }

    const categoryAddHandler = async (category: string) => {
        const url = 'http://localhost:5000/category/create';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryname: category })
        })
        if (res.ok) {
            const newCategory: { category_id: string } = await res.json();
            setTodoState(prevTodos => {
                const updatedTodoState = { ...prevTodos }
                updatedTodoState[category] = { todos: [], id: newCategory.category_id }
                return updatedTodoState;
            })
        }
    }


    const editCategoryNameHandler = async (categoryName: string, newCategoryName: string) => {
        const url = `http://localhost:5000/category/edit/${categoryName}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newCategoryName})
        })
        if(res.ok) {
            setTodoState(prevTodos => {
                // const updatedState = {...prevTodos};
                // const categoryValues = prevTodos[categoryName];
                // updatedState[newCategoryName] = categoryValues;
                // delete updatedState[categoryName];
                // return updatedState;
                const updatedState:TodoCategory = {}
                Object.keys(prevTodos).forEach(key => {
                    if(key === categoryName){
                        updatedState[newCategoryName] = prevTodos[key];
                    } else {
                        updatedState[key] = prevTodos[key];
                    }
                })
                console.log(prevTodos == updatedState);
                return updatedState;
            })
        }
    }

    return (
        <div>
            <NewCategory onAdd={categoryAddHandler} />
            {Object.keys(todoState).map((todo: keyof typeof todoState) =>

                <Category key={todoState[todo].id}
                    addTodo={todoAddHandler}
                    items={todoState[todo].todos}
                    onStatusUpdate={todoStatusUpdate}
                    onDelete={todoDeleteHandler}
                    categoryName={todo as string}
                    editCategoryName={editCategoryNameHandler}
                />
            )}
        </div>
    );
}