import React from "react";
function InputField({ value, name, onChange, placeholder, type, error }) {
    const handleChange = (event) => {
        onChange(event)
    }
    return (
        <div>
            <input name={name} value={value} onChange={handleChange} placeholder={placeholder} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <span>{error}</span>     
        </div>
    )

}
export default InputField