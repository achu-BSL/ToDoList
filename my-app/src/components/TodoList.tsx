import React from 'react';
import './TodoList.css'

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
            {props.items.map(todo => <li className={todo.isCompleted ? 'completed' : 'pending'} key={todo.id}>
                <span>{todo.text}</span>
                <div>
                    <button onClick={props.onStatusUpdate.bind(null, todo.id, todo.isCompleted ? 'Pending' : 'Completed')}>{todo.isCompleted ? 'Completed' : 'Pending'}</button>
                    <button onClick={props.onDelteTodo.bind(null, todo.id)}>Delete</button>
                </div>
            </li>)}
        </ul>
    );
}


export default TodoList;