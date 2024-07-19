import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Header() {
    return (
    <nav>
        <ul>
            <Link to="/cars"> Cars </Link>
        </ul>
    </nav>
    )
}
export default Header;