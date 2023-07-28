import React, {useState, useRef} from "react";

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
    onTitleEdit: (category: string, newCategoryName: string) => void;
}

const Category: React.FC<CategoryProps> = (props) => {
    const [isTitleEdting, setIsTitleEditing] = useState(false);
    const categoryTitleInput = useRef<HTMLInputElement>(null)

    const editCategoryNameHandler = (category: string) => {
        const newCategory = categoryTitleInput.current!.value;
        props.onTitleEdit(category, newCategory);
        setIsTitleEditing(prev => false);
    }

    return (
        <div className="category-container outline outline-2 rounded-lg shadow-xl">
            {isTitleEdting ?
            <>
            <input ref={categoryTitleInput} type="text" defaultValue={props.categoryName}/>
            <button onClick={editCategoryNameHandler.bind(null, props.categoryName)}>save</button>
            </> 
            : 
            <h3 onClick={()=> {setIsTitleEditing(prev => true)}} className="category-title font-bold mt-2">{props.categoryName}</h3>
            }
            <NewTodo addTodo={props.addTodo.bind(null, props.categoryName)}/>
            <div>
                <TodoList items={props.items} onStatusUpdate={props.onStatusUpdate.bind(null, props.categoryName)} onDelteTodo={props.onDelete.bind(null, props.categoryName)}/>
            </div>
        </div>
    );
}

export default Category;