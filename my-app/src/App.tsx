import React, { useEffect, useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

interface Todo {
  id: string;
  text: string;
}

const App: React.FC = () => {

  const [todoState, setTodoState] = useState<Todo[]>([]);

  useEffect (()=>{
    const url = 'http://localhost:5000/gettodos';
    const fetchData = async ()=> {
      try {
        const res = await fetch(url, {method: 'GET'});
        if(res.ok){
          const data: {text: string, _id: string}[] = await res.json();
          setTodoState(prevTodos => data.map(todo => {
            return {text: todo.text, id: todo._id}
          }))
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const todoAddHandler = async (text: string) => {
    const newTodo: Todo = {
      text,
      id: Math.random().toString()
    }
    setTodoState(prevTodods => [...prevTodods, newTodo]);
    const url = 'http://localhost:5000/todo/create';
    const body = { text };
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (res.ok) console.log("Added success");
    else console.log("Opps something wrong..");
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodoState(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
  }


  return (
    <div className='app'>
      <h1>TODO</h1>
      <NewTodo addTodo={todoAddHandler} />
      <TodoList onDelteTodo={todoDeleteHandler} items={todoState} />
    </div>
  )
}


export default App;
