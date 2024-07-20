import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header() {
    return (

        <nav className="bg-blue">
            <h1 className='text-2xl font-bold text-purple'>Car Place</h1>   
            <ul>
                <Link to="/cars" className="link"> Cars </Link>
                <Link to="/allCars" className="link">All </Link>
            </ul>
        </nav>
    )
}
export default Header;