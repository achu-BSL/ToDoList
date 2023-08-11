import React, { useState } from 'react';
import './App.css';
import { TodoListProvider } from "./context/TodoListContext";


//importing components
import { CategoryList } from './components/CategoryList';
import { Message } from './components/Message';

const messages: string[] = [];

const App: React.FC = () => {

  const [_newMsg, setnewMsg] = useState(false);
  const addNewMessage = (msg: string) => {
    messages.unshift(msg);
    setnewMsg(prevstate => !prevstate);
    removeLastMsg();
  }
  const removeLastMsg = () => {
    setTimeout(() => {
      if (messages.length > 0) {
        messages.pop();
        setnewMsg(prev => !prev);
        if (messages.length > 0) removeLastMsg();
      }
    }, 6000)
  }


  return (
    <div className='app'>
      <h1 className='text-3xl font-bold underline'>TODO</h1>
      <TodoListProvider addMsg={addNewMessage}>
        <CategoryList />
        </TodoListProvider>

      <div className='flex flex-col-reverse items-end fixed bottom-4 right-4 gap-4'>
        {messages.map(msg => <Message msg={msg} />)}
      </div>
    </div>
  )
}


export default App;
