import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import "../../assests/scss/header.scss"
import logoRight from '../../assests/images/logo.webp';
import logoLeft from '../../assests/images/logo2.webp';

function Header() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const LogoutFn = () => {
        localStorage.removeItem("token");
        setToken(null);
    };
    const deafaultMenu = [
        {
            path: "/register",
            name: "Register"
        },
        {
            path: '/login',
            name: 'Login'
        }
    ]
    const mainMenu = [
        {
            path: "/cars",
            name: "Cars"
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
            path: "/login",
            name: "Logout",
            fn: LogoutFn
        }
    ]

    return (
        <nav className="menu">
            <img src={logoLeft} alt="Logo" className="logo-left" />
            <img src={logoRight} alt="Logo" className="logo-right" />

            {token ? deafaultMenu.map(item => (
                <li key={item.path}>
                    <Link to={item.path} className="menu-item">
                        {item.name}
                    </Link>
                </li>
            )) :
                mainMenu.map(item => (
                    <li key={item.path}>

                        <Link to={item.path} className="menu-item" onClick={item.fn ? item.fn() : ''} >
                            {item.name}
                        </Link>
                    </li>
                ))}
        </nav>
    )
}
export default Header;