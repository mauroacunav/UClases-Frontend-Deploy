import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../config';

// Verifica la autorización del usuario entregado
function UserCheck( user_id ) {
    const { token } = useContext(AuthContext);

    const config = {
        method: 'get',
        url: `${API_URL}/scope-example/protecteduser`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    axios(config)
        .then((response) => {
            return (user_id === response.data.user.sub);
        })
        .catch((error) => {
            console.error('Error:', error.message);
            return false;
        });
}

export default UserCheck;
