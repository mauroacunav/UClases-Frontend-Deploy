import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

function GetUserId() {

    const {token} = useContext(AuthContext);

    if (token === 'null' || token === null) {
        return null;
    }

    const parts = token.split('.');
    const encodedPayload = parts[1]; // El payload está en la posición 1

    // Decodificar el payload
    const decodedPayload = atob(encodedPayload);
    const parsedPayload = JSON.parse(decodedPayload);

    // Acceder al valor 'sub'
    const valorSub = parsedPayload.sub;

    return valorSub;
}

export default GetUserId;