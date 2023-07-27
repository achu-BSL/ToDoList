import React, { useState, useEffect, useRef } from 'react';
import './App.css';

//importing components
import { CategoryList } from './components/CategoryList';
import { Message } from './components/Message';


const App: React.FC = () => {

  const [messages, setMessages] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const addNewMessage = (msg: string) => {
    setMessages(prevMessages => [msg, ...prevMessages]);
  }

  useEffect(() => {
    console.log('Inside useEffect');
    const removeLastMsg = () => {
      console.log('hi');
      if (messages.length > 0) {
        setMessages(prevMessages => prevMessages.slice(0, -1));
      }
    }
    intervalRef.current = setInterval(removeLastMsg, 10000);
    return () => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [])

  return (
    <div className='app'>
      <h1 className='text-3xl font-bold underline'>TODO</h1>
      <CategoryList addMsg={addNewMessage} />
      <div className='flex flex-col-reverse items-end fixed bottom-4 right-4 gap-4'>
        {messages.map(msg => <Message msg={msg} />)}
      </div>
    </div>
  )
}


export default App;
