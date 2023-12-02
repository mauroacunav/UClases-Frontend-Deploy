import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import BtnSecondary from '../buttons/btn-secondary/BtnSecondary';
import './Navbar.css';
import LogoutButton from '../forms/session/Logout';
import { AuthContext } from '../../auth/AuthContext';
import GetUserId from '../../protected/GetUserId';

function Navbar() {

    const [scrolling, setScrolling] = useState(false);
    const location = useLocation();
    const {token} = useContext(AuthContext);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 1000) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        });
    
        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);

    const isSpecialPage = location.pathname === '/';

    return (
        <>
        <nav id='navbar' className={!scrolling && isSpecialPage ? 'scrolled' : ''}>
            <div id='navbar-logo'>
                <a href='/'><h1>UClases</h1></a>
                {token === 'null' ? (
                    null
                ) : (
                    <a href={`/dashboard/${GetUserId()}`}><BtnSecondary label='Mi Dashboard'/></a>
                )}
            </div>
            <div id='navbar-options'>
                <ul>
                    <li className='navbar-option'><a href='/clases'>Clases</a></li>
                    <li className='navbar-option'><a href='/nosotros'>Nosotros</a></li>
                    <li className='navbar-option'><a href='#footer'>Contacto</a></li>
                    {token === 'null' ? (
                        null
                    ) : (
                        <li className='navbar-option'><a href='/chats'>Chats</a></li>
                    )}
                    {token === 'null' ? (
                        <li className='navbar-option'><a href='/login'>Iniciar sesión</a></li>
                    ) : (
                        <li className='navbar-option'><LogoutButton /></li>
                    )}
                </ul>
            </div>
        </nav>
        </>
    );
};

export default Navbar;
