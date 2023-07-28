import React from 'react';
import './TodoList.css';
import { HighlightOff, CheckCircleOutline, DeleteOutline } from '@mui/icons-material';


//importing models
import { Todo } from '../models/todo';

//importing conponents
import Category from './Category';


interface TodoListProps {
    items: Todo[];
    onDelteTodo: (id: string) => void;
    onStatusUpdate: (id: string, status: 'Completed' | 'Pending') => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {

    



    return (
        <ul>
            {props.items.map(todo => <li onClick={props.onStatusUpdate.bind(null, todo.id, todo.isCompleted ? 'Pending' : 'Completed')} className={todo.isCompleted ? 'completed relative cursor-pointer' : 'pending relative cursor-pointer'} key={todo.id}>
                <span className={todo.isCompleted ? 'line-through text-gray-500 ': ''}>{todo.text}</span>
                <div >
                    {/* <button onClick={props.onStatusUpdate.bind(null, todo.id, todo.isCompleted ? 'Pending' : 'Completed')}>{todo.isCompleted ? <HighlightOff/> : <CheckCircleOutline/>}</button> */}
                    <DeleteOutline className='absolute top-0 right-0 cursor-pointer' onClick={props.onDelteTodo.bind(null, todo.id)}/>
                </div>
            </li>)}
        </ul>
    );
}


export default TodoList;