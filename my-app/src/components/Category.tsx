import React, { useState, useRef } from "react";

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
    editCategoryName: (categoryName: string, newCategoryName: string) => void;
}

const Category: React.FC<CategoryProps> = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const categoryNameInput = useRef<HTMLInputElement>(null);
    
    const editCategoryNameHandler = ()=> {
        setIsEditing(prevState => false);
        const newCategoryName = categoryNameInput.current!.value;
        props.editCategoryName(props.categoryName, newCategoryName);
    }

    

    return (
        <div className="category-container">
            <div>
                {isEditing ?
                <>
                    <input  ref={categoryNameInput}  type="text" defaultValue={props.categoryName}/>
                    <button onClick={editCategoryNameHandler}>save</button>
                </> :
                    <h3 onClick={()=> setIsEditing(prevState => true)} className="category-title">{props.categoryName}</h3>
                }
            </div>
            <NewTodo addTodo={props.addTodo.bind(null, props.categoryName)} />
            <div>
                <TodoList items={props.items} onStatusUpdate={props.onStatusUpdate.bind(null, props.categoryName)} onDelteTodo={props.onDelete.bind(null, props.categoryName)} />
            </div>
        </div>
    );
}

export default Category;