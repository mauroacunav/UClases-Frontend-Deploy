import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

function UpdateProfile() {
    const { user_id } = useParams();
    const {token} = useContext(AuthContext);
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

            // Realizar la solicitud PUT o PATCH al endpoint de actualización de usuario
            const response = await axios.put(`${API_URL}/usuarios/update/${user_id}`, formData, config);

            // Manejar la respuesta de la solicitud
            window.alert('Se ha actualizado el perfil');
            window.location.href = `/dashboard/${user_id}`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
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

            // Realizar la solicitud PUT o PATCH al endpoint de actualización de usuario
            const response = await axios.delete(`${API_URL}/usuarios/delete/${user_id}`, config);

            // Manejar la respuesta de la solicitud
            window.alert('Usuario eliminado');
            window.location.href = `/`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            window.alert('No se ha podido eliminar la cuenta');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Actualizar perfil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstname">Nombre:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Apellido:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            <h2>Eliminar cuenta</h2>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    );
}

export default UpdateProfile;