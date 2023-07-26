export interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
}


export interface TodoCategory {
    [key: string]: {
        todos: Todo[],
        id: string;
    }
}
