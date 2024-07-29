import React from "react";
import "../../assests/scss/Shared/button.scss"

function BaseButton({ text, type, onClick }) {

    return (
        <button className="button mt-2 mb-2" onClick={onClick} type={type}>{text}</button>
    );
}

export default BaseButton;
