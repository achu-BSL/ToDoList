import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { isCategoryExist, isEmpty } from "../helper/helper";
import { TodoCategory } from "../models/todo";
import { Todo } from "../models/todo";

interface TodoListProviderProps {
    children: ReactNode;
    addMsg: (msg: string) => void;
}

interface TodoListContextInterface {
    addTodo: (categoryName: string, text: string) => Promise<void>;
    deleteTodo: (category: string, todoId: string) => Promise<void>;
    updateStatus: (category: string, todoId: string, status: 'Completed' | 'Pending') => Promise<void>;
    addCategory: (categoryName: string) => Promise<void>;
    changeCategoryName: (categoryName: string, newCategoryName: string) => Promise<void>;
    state: TodoCategory;
}

const TodoListContext = createContext({} as TodoListContextInterface);

export const useTodoList = () => {
    return useContext(TodoListContext);
}

export const TodoListProvider = ({children, addMsg}: TodoListProviderProps)=> {

    const [state, setState] = useState<TodoCategory>({});


    useEffect(() => {
        const url = 'http://localhost:5000/gettodos';
        const fetchData = async () => {
            try {
                const res = await fetch(url, { method: 'GET' });
                if (res.ok) {
                    const data: { todos: Todo[], categoryName: string, category_id: string }[] = await res.json();
                    console.log(data, " ⚡");
                    setState(prevTodos => {
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


    const addTodo = async (categoryName: string, text: string) => {
        if(isEmpty(text)) return addMsg("Todo can't be empty");
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
            setState(prevTodos => {
                const updatedState = { ...prevTodos };
                console.log(updatedState[categoryName].todos.length);
                updatedState[categoryName].todos.push(newTodo);
                console.log(updatedState[categoryName].todos.length);
                return updatedState;
            });
            addMsg("Todo added successfully.");
        }
        else addMsg("Opps something wrong..");
    }

    const deleteTodo = async (category: string, todoId: string) => {
        const url = `http://localhost:5000/todo/delete/${category}/${todoId}`;
        const res = await fetch(url, {
            method: 'DELETE'
        })
        if (res.ok) {
            setState(prevTodos => {
                const updatedState = {...prevTodos}
                updatedState[category].todos = updatedState[category].todos.filter(todo => todo.id !== todoId);
                return updatedState;
            });
            addMsg("Todo Deleted Successfully...");
        }
        else {
            addMsg("OPPS Something wrong...");
        }
    }


    const updateStatus = async (category: string, todoId: string, status: 'Completed' | 'Pending') => {
        const url = `http://localhost:5000/todo/update/status/${category}/${todoId}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newStatus: status })
        })

        if (res.ok) {
            setState(prevTodos => { 
                const updatedState = {...prevTodos};
                updatedState[category].todos = updatedState[category].todos.map(todo => {
                    if(todo.id === todoId) {
                        todo.isCompleted = status === 'Completed';
                    }
                    return todo;
                })
                return updatedState;
            })
            addMsg(status === 'Completed' ? 'Congratulations': 'Take your time');
        } else addMsg("OPPS Something wrong");
    }

    const addCategory = async (category: string) => {
        console.log("🙌 from addcategory hadler..");
        if (isCategoryExist(state, category)) return addMsg('Category Name Already Exist...!')
        if(isEmpty(category)) return addMsg("Category name cant'be empty..!");
        const url = 'http://localhost:5000/category/create';
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryname: category })
        })
        if(res.ok) {
            const newCategory: {category_id: string} = await res.json();
            setState(prevTodos => {
                const updatedTodoState = {...prevTodos}
                updatedTodoState[category] = {todos: [], id: newCategory.category_id}
                return updatedTodoState;
            })
            addMsg('New Category added successfully..');
        }
    }



    const changeCategoryName = async (categoryName: string, newCategoryName: string) => {
        if(categoryName.trim() === newCategoryName.trim()) return;
        if(isCategoryExist(state, newCategoryName)) return addMsg('Category Name already Exist...!');
        if(isEmpty(newCategoryName)) return addMsg("Category name cant'be empty");
        const url = `http://localhost:5000/category/edit/${categoryName}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newCategoryName})
        })
        if(res.ok) {
            setState(prevTodos => {
                const updatedState:TodoCategory = {}
                Object.keys(prevTodos).forEach(key => {
                    if(key === categoryName){
                        updatedState[newCategoryName] = prevTodos[key];
                    } else {
                        updatedState[key] = prevTodos[key];
                    }
                })
                console.log(prevTodos === updatedState);
                return updatedState;
            })
            addMsg('Changed category name');
        } else addMsg("OPPS something went wrong..!");
    }

    return (
        <TodoListContext.Provider value={{addTodo, deleteTodo, updateStatus, addCategory, changeCategoryName, state}}>
            {children}
        </TodoListContext.Provider>
    );
}