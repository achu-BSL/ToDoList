import React from 'react';

import './TodoList.css'

interface TodoListProps {
    items: {
        id: string,
        text: string
    }[];
    onDelteTodo : (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
    return (
        <ul>
            {props.items.map(todo => <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={props.onDelteTodo.bind(null, todo.id)}>Delete</button>
            </li>)}
        </ul>
    );
}


export default TodoList;