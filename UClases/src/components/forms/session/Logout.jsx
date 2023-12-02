import React, {useContext, useState} from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import './Session.css';


const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        window.alert('Logout exitoso')
        window.location.href = '/';
    }

    return (
        <>
            {/*msg.length > 0 && <div className="successMsg"> {msg} </div>*/}
            <a onClick={handleLogout}>
                Cerrar sesión
            </a>
        </>
    );
}

export default LogoutButton;