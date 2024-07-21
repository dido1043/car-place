import React from "react";
import { Link } from 'react-router-dom'
import "../../assests/scss/header.scss"
import logoRight from '../../assests/images/logo.webp';
import logoLeft from '../../assests/images/logo2.webp';

function Header() {

    const menuItems = [
        {
            path: "/cars",
            name: "Cars"
        },
        {
            path: "/allCars",
            name: "All"
        },
        {
            path: "/register",
            name: "Register"
        },
    ]

    return (
        <nav className="menu">
            <img src={logoLeft} alt="Logo" className="logo-left" />
            <img src={logoRight} alt="Logo" className="logo-right" />
            {menuItems.map(item => (
                <li key={item.path}>
                    <Link to={item.path} className="menu-item">
                        {item.name}
                    </Link>
                </li>
            ))}
        </nav>
    )
}
export default Header;