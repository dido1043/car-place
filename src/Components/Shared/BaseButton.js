import React from "react";
function BaseButton({text, type}) {
    return (

        <button type={type}>{text}</button>
    )

}
export default BaseButton