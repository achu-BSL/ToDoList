import { TodoCategory } from "../models/todo";


export const isCategoryExist = (todoState: TodoCategory, categoryName: string): boolean=> {
    const lowerCaseCategoryName = categoryName.toLocaleLowerCase();
    for(const category of Object.keys(todoState)){
        if(category.toLocaleLowerCase() === lowerCaseCategoryName){
            return true;
        }
    }
    return false;
}

export const isEmpty = (text: string)=> {
    return text.trim().length === 0;
}