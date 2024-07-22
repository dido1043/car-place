import React from "react";
function InputField({ value, name, onChange, placeholder, type, error }) {
    const handleChange = (event) => {
        onChange(event)
    }
    return (
        <div>
            <input
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
            ></input>
            <span>{error}</span>
        </div>
    )

}
export default InputField