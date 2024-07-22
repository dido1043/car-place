import React from "react";
function Label({ text }) {
    return (
        <label htmlFor={text} className="text-xl text-start font-bold">{text}</label>


    )
}
export default Label