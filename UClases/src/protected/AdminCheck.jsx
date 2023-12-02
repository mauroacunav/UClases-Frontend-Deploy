import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../config';

function AdminCheck(){
    const {token} = useContext(AuthContext);
    const [admin, setAdmin] = useState(false);

    const config = {
        'method': 'get',
        'url': `${API_URL}/scope-example/protectedadmin`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios(config).then((response) => {
            console.log("Enviaste un token bueno, esta logueado y eres admin!")
            setAdmin(true)
        }).catch((error) => {
            console.log("Hubo un error, no estas logueado o no eres admin")
            setAdmin(false)
        })
    }, [])

    return admin;
}

export default AdminCheck;