import React, { useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

interface Todo {
  id: string;
  text: string;
}

const App: React.FC = ()=> {

  const [todoState, setTodoState] = useState<Todo[]>([]);

  const todoAddHandler = (text: string)=>{
    const newTodo: Todo = {
      text,
      id: Math.random().toString()
    }
    setTodoState(prevTodods => [...prevTodods, newTodo])
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodoState(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
  }

  return (
    <div className='app'>
      <h1>TODO</h1>
      <NewTodo addTodo={todoAddHandler}/>
      <TodoList onDelteTodo={todoDeleteHandler} items={todoState}/>
    </div>
  )
}


export default App;
