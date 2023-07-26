import React, { useState, useEffect } from 'react';
import './App.css';

//importing models
import { Todo } from './models/todo';

//importing components
import { CategoryList } from './components/CategoryList';


const App: React.FC = () => {

  const [categories, setCategories] = useState<Todo[]>([]);





  return (
    <div className='app'>
      <h1>TODO</h1>
      <CategoryList />
    </div>
  )
}


export default App;
