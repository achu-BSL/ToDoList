import React from 'react';
import './TodoList.css';
import { DeleteOutline } from '@mui/icons-material';


import { useTodoList } from '../context/TodoListContext';

interface TodoListProps {
    categoryName: string;
}

const TodoList: React.FC<TodoListProps> = ({categoryName}) => {
    const {updateStatus, deleteTodo, state} = useTodoList();
    return (
        <ul>
            {state[categoryName].todos.map(todo => <li onClick={() => updateStatus(categoryName, todo.id, todo.isCompleted ? 'Pending' : 'Completed')} className={todo.isCompleted ? 'completed relative cursor-pointer' : 'pending relative cursor-pointer'} key={todo.id}>
                <span className={todo.isCompleted ? 'line-through text-gray-500 ': ''}>{todo.text}</span>
                <div >
                    {/* <button onClick={props.onStatusUpdate.bind(null, todo.id, todo.isCompleted ? 'Pending' : 'Completed')}>{todo.isCompleted ? <HighlightOff/> : <CheckCircleOutline/>}</button> */}
                    <DeleteOutline className='absolute top-0 right-0 cursor-pointer' onClick={()=> deleteTodo(categoryName, todo.id)}/>
                </div>
            </li>)}
        </ul>
    );
}


export default TodoList;