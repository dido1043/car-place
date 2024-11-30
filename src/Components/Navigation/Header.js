import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import "../../assests/scss/header.scss";
import logoRight from '../../assests/images/logo.webp';
import logoLeft from '../../assests/images/logo2.webp';

function Header() {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [role, setRole] = useState(() => localStorage.getItem("role"));
    //!!!
    console.log(token);

    const LogoutFn = () => {
        localStorage.clear()
        setToken(null);
        renderMenu()
        Navigate('/');

    };
    const deafaultMenu = [
        {
            path: "/register",
            name: "Register"
        },

        {
            path: '/login',
            name: 'Login'
        },
        {
            path: "/about",
            name: "About us"
        }
    ]

    const mainMenu = [
        {
            path: "/about",
            name: "About us"
        },

        {
            path: "/allCars",
            name: "All"
        },

        {
            path: "/login",
            name: "Logout",
            fn: LogoutFn
        }
    ]
    const adminMenu = [
        {
            path: "/about",
            name: "About us"
        },
        {
            path: "/cars/add",
            name: "Add"
        },
        {
            path: "/allCars",
            name: "All"
        },
        {
            path: "/admin",
            name: "Admin page"
        },
        {
            path: "/login",
            name: "Logout",
            fn: LogoutFn
        }
    ]
    const renderMenu = () => {
        const clientMenu = token != null ? mainMenu : deafaultMenu;
        const menu = role == "Admin" ? adminMenu : clientMenu;
        return menu.map(item => (
            <li key={item.path}>
                <Link to={item.path} className="menu-item" onClick={item.fn ? item.fn : null}>
                    {item.name}
                </Link>
            </li>
        ))
    }

    return (
        <nav className="menu">
            <img src={logoLeft} alt="Logo" className="logo-left" />
            <img src={logoRight} alt="Logo" className="logo-right" />
            {renderMenu()}
        </nav>
    )
}

export default Header;