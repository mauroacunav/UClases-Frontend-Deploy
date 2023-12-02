import React, { useContext, useState } from 'react';
import './Session.css';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import API_URL from '../../../config';

function Login() {
    const {token, setToken} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${API_URL}/login`, {
            email,
            password
        }).then((response) => {
            setError(false);

            const access_token = response.data.acces_token
            setToken(access_token);

            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            };

            const parts = access_token.split('.');
            const encodedPayload = parts[1]; // El payload está en la posición 1

            // Decodificar el payload
            const decodedPayload = atob(encodedPayload);
            const parsedPayload = JSON.parse(decodedPayload);

            // Acceder al valor 'sub'
            const valorSub = parsedPayload.sub;
            const valorScope = parsedPayload.scope[0];

            console.log('El valor de "sub" en el payload es:', valorSub);
            console.log('El valor de "scope" en el payload es:', valorScope);
            window.alert('Login exitoso');
            
            if (valorScope == 'user') {
                window.location.href = `/dashboard/${valorSub}`;
            } else {
                window.location.href = `/admin/dashboard`;
            }

            console.log(response);
        }).catch((error) => {
            window.alert('Login fallido')
            console.log(error);
        });
    };

    return (
        <>
            <section className='session-section'>
                <div id='login-container' className='session-container'>
                    <div className='session-title'>
                        <img src='/src/assets/img/saturno.png' height='50px' alt="Saturno"/>
                        <p>Bienvenido</p>
                    </div>

                    <div className='session-form'>
                        <form onSubmit={handleSubmit}>
                            <input
                                id='login-email'
                                className='session-input'
                                placeholder='Email'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                id='login-password'
                                className='session-input'
                                placeholder='Contraseña'
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <input className='session-submit' type="submit" value="Ingresar" />
                        </form>
                    </div>
                    <div className='session-message'>
                        <p>¿No tienes una cuenta?</p>
                        <a href='/signup'><p>Regístrate</p></a>
                    </div>
                </div>
                <div>
                    <a href='/signup'><p>Olvidé mi contraseña</p></a>
                </div>
            </section>
        </>
    );
}

export default Login;