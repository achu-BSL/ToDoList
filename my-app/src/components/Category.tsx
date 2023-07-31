import React, {useState, useRef} from "react";
import { useTodoList } from "../context/TodoListContext";

//importing components
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";


interface CategoryProps {
    categoryName: string;
}

const Category: React.FC<CategoryProps> = ({categoryName}) => {
    const [isTitleEdting, setIsTitleEditing] = useState(false);
    const categoryTitleInput = useRef<HTMLInputElement>(null);
    const { changeCategoryName } = useTodoList();

    return (
        <div className="category-container outline outline-2 rounded-lg shadow-xl">
            {isTitleEdting ?
            <>
            <input ref={categoryTitleInput} type="text" defaultValue={categoryName}/>
            <button onClick={()=> changeCategoryName(categoryName, categoryTitleInput.current!.value)}>save</button>
            </> 
            : 
            <h3 onClick={()=> {setIsTitleEditing(prev => true)}} className="category-title font-bold mt-2">{categoryName}</h3>
            }
            <NewTodo categoryName={categoryName}/>
            <div>
                <TodoList categoryName={categoryName}/>
            </div>
        </div>
    );
}

export default Category;