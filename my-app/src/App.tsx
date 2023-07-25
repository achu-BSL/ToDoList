import React, { useState, useEffect } from 'react';
import './App.css';

//importing models
import { Todo } from './models/todo';

//importing components
import { CategoryList } from './components/CategoryList';
import { NewCategory } from './components/NewCategory';


const App: React.FC = () => {

  const [categories, setCategories] = useState<Todo[]>([]);



  const categoryAddHandler = (category: string) => {
    setCategories(prevCategories => [...prevCategories, /*add new category here*/])
  }

  return (
    <div className='app'>
      <h1>TODO</h1>
      <NewCategory onAdd={categoryAddHandler} />
      <CategoryList />
    </div>
  )
}


export default App;
