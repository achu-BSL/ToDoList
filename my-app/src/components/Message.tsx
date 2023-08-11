import React from "react";

const Message: React.FC<{ msg: string }> = (props) => {
    return (
        <div className="bg-gray-300 p-4 rounded-md shadow-md w-60 break-words">{props.msg}</div>
    );
}

export { Message }