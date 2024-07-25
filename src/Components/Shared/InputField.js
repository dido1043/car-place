import React from "react";
import "../../assests/scss/Shared/base-input.scss"

function InputField({ value, name, onChange, placeholder, type, error }) {
    const handleChange = (event) => {
        onChange(event)
    }

    const classes = "border border-gray-400 p-2 rounded-md w-full mb-2"

    return (
        <div>
            <input
                className={classes}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
            ></input>
            {error ? <div className="danger mb-2">{error}</div> : null}
        </div>
    )

}
export default InputField