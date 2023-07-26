import React from "react";

//importing models
import { Todo } from "../models/todo";

//importing components
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";


interface CategoryProps {
    addTodo: (category: string, text: string) => void;
    items: Todo[];
    onStatusUpdate: (category: string, todoId: string, status: 'Completed' | 'Pending') => void;
    onDelete: (category: string, todoId: string) => void;
    categoryName: string;
}

const Category: React.FC<CategoryProps> = (props) => {
    return (
        <div className="category-container">
            <h3 className="category-title">{props.categoryName}</h3>
            <NewTodo addTodo={props.addTodo.bind(null, props.categoryName)}/>
            <div>
                <TodoList items={props.items} onStatusUpdate={props.onStatusUpdate.bind(null, props.categoryName)} onDelteTodo={props.onDelete.bind(null, props.categoryName)}/>
            </div>
        </div>
    );
}

export default Category;