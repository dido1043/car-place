import React from "react";

function StatusComponent({icon, status, message}) {
    return(<span>{icon}{status}{message}</span>);
    
}
export default StatusComponent