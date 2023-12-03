import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';
import SaturnoImage from '../../../assets/img/saturno.png';
import './UpdateProfile.css';

function UpdateProfile() {
    const { user_id } = useParams();
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(`${API_URL}/usuarios/update/${user_id}`, formData, config);

            window.alert('Se ha actualizado el perfil');
            window.location.href = `/dashboard/${user_id}`;
        } catch (error) {
            window.alert('No se ha podido actualizar el perfil');
            console.error('Error:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${API_URL}/usuarios/delete/${user_id}`, config);

            window.alert('Usuario eliminado');
            window.location.href = `/`;
        } catch (error) {
            window.alert('No se ha podido eliminar la cuenta');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <section className='session-section'>
                <div id='update-profile-container' className='session-container'>
                    <div className='session-title'>
                        <img src={SaturnoImage} height='50px' alt="Saturno"/>
                        <h2>Actualizar perfil</h2>
                    </div>

                    <div className='session-form'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Nombre"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="session-input"
                                required
                            />
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Apellido"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="session-input"
                                required
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="session-input"
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                className="session-input"
                                required
                            />
                            <div>
                                <button type="submit" className="session-submit">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='session-delete'>
                    <h1>Eliminar cuenta</h1>
                    <div className='session-form'>
                        <button onClick={handleDelete} className='session-submit'>Eliminar</button>
                    </div>
                </div>

            </section>
        </>
    );
}

export default UpdateProfile;
