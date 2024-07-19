import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header() {
    return (
    <nav>
        <h2 className="text-xl font-italic underline">Menu</h2>
        <ul>
            <Link to="/cars" className="link"> Cars </Link>
            <Link to="/allCars" className="link">All </Link>
        </ul>
    </nav>
    )
}
export default Header;