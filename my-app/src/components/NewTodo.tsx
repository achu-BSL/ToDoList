import React, { useRef } from "react";

import './NewTodo.css'

interface NewTodoProps {
    addTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {

    const textInput = useRef<HTMLInputElement>(null);

    const submitHandler: React.FormEventHandler = (event: React.FormEvent)=> {
        event.preventDefault();
        props.addTodo(textInput.current!.value);
        textInput.current!.value = '';
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textInput}/>
            <button type="submit">ADD TODO</button>
        </form>
    );
}

export default NewTodo;