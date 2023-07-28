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
            <div className="flex mt-2">
            <input className="flex-grow" type="text" id="category-name" ref={titleInput}/>
            <button className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 ms-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                    <span className="relative">ADD</span>
                </button>
            </div>
        </form>
    );
}


