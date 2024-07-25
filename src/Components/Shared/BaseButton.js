import React from "react";
import "../../assests/scss/Shared/button.scss"

function BaseButton({ text, type }) {

    return (
        <button className="button mt-2 mb-2" type={type}>{text}</button>
    );
}

export default BaseButton;
