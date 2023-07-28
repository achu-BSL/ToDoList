import React, { useRef } from "react";


import './NewTodo.css'

interface NewTodoProps {
    addTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {

    const textInput = useRef<HTMLInputElement>(null);

    const submitHandler: React.FormEventHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.addTodo(textInput.current!.value);
        textInput.current!.value = '';
    }

    return (
        <form className="mt-0" onSubmit={submitHandler}>
            <div className="flex h-10 p-1">
                <input className="" type="text" id="todo-text" ref={textInput} />
                {/* <button className="btn" type="submit">ADD TODO</button> */}
                <button className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 ms-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                    <span className="relative">+</span>
                </button>
            </div>


        </form>
    );
}

export default NewTodo;

