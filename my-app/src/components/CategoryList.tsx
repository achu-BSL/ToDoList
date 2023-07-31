import React from "react";

import { NewCategory } from './NewCategory';
import Category from "./Category";

import { useTodoList } from "../context/TodoListContext";



export const CategoryList: React.FC = () => {

    const { state } = useTodoList();
    console.log(state, " ⭐");


    return (
        <>
            <NewCategory />
            <div className='flex gap-5 px-10 flex-wrap justify-center'>
                {state && Object.keys(state).map((todo) =>
                    <Category key={state[todo].id}
                        categoryName={todo as string}
                    />
                )}
            </div>
        </>

    );
}