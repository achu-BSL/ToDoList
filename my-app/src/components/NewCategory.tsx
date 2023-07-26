import React, {useRef} from "react";

interface NewCategoryProps {
    onAdd: (title: string) => void;
}

export const NewCategory: React.FC<NewCategoryProps> = (props) => {

    const titleInput = useRef<HTMLInputElement>(null);

    const submitEventHandler: React.FormEventHandler = (event: React.FormEvent)=> {
        event.preventDefault();
        const title = titleInput.current!.value;
        props.onAdd(title);
        titleInput.current!.value = '';
    }

    return (
        <form onSubmit={submitEventHandler}>
            <label htmlFor="category-name">Category Name</label>
            <input type="text" id="category-name" ref={titleInput}/>
            <button  type="submit">ADD NEW CATEGORY</button>
        </form>
    );
}


