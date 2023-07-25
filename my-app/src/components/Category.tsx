import React from "react";

//importing models
import { Todo } from "../models/todo";

//importing components
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";


interface CategoryProps {
    addTodo: (text: string) => void;
    items: Todo[];
    onStatusUpdate: (todoId: string, status: 'Completed' | 'Pending') => void;
    onDelete: (todoId: string) => void;
}

const Category: React.FC<CategoryProps> = (props) => {
    return (
        <div>
            <NewTodo addTodo={props.addTodo}/>
            <div>
                <TodoList items={props.items} onStatusUpdate={props.onStatusUpdate} onDelteTodo={props.onDelete}/>
            </div>
        </div>
    );
}

export default Category;