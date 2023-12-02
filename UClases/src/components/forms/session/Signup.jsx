import React, { useContext, useState } from 'react';
import './Session.css';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import API_URL from '../../../config';
import SaturnoImage from '../../../assets/img/saturno.png';

function Signup() {
    const {token, setToken} = useContext(AuthContext);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${API_URL}/signup`, {
            firstname,
            lastname,    
            email,
            password
        }).then((response) => {

            axios.post(`${API_URL}/login`, {
                email,
                password
            }).then((response) => {
    
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
                window.alert('Signup exitoso');
                
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

        }).catch((error) => {
            window.alert('Signup fallido')
            console.log(error);
        });
    };

    return (
        <>
            <section className='session-section'>
                <div id='signup-container' className='session-container'>
                    <div className='session-title'>
                        <img src={SaturnoImage} height='50px' alt="Saturno"/>
                        <p>Crea tu cuenta y únete a nuestra comunidad</p>
                    </div>
                    <div className='session-form'>
                        <form onSubmit={handleSubmit}>
                            <input
                                id='signup-firstname'
                                className='session-input'
                                placeholder='Nombre'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                            <input
                                id='signup-lastname'
                                className='session-input'
                                placeholder='Apellido'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                            <input
                                id='signup-email'
                                className='session-input'
                                placeholder='Email'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                id='signup-password'
                                className='session-input'
                                placeholder='Contraseña'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input className='session-submit' type="submit" value="Ingresar" />
                        </form>
                    </div>
                    <div className='session-message'>
                        <p>¿Ya tienes una cuenta?</p>
                        <a href='/login'><p>Inicia sesión</p></a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Signup;
