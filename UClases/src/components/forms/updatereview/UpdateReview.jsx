import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

function UpdateReviewForm() {
    const { review_id } = useParams();
    const {token} = useContext(AuthContext);
    const [rating, setRating] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: '',
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
            const response = await axios.put(`${API_URL}/resenas/update/${review_id}`, formData, config);

            // Manejar la respuesta de la solicitud
            window.alert('Se ha actualizado la reseña');
            window.location.href = `/clases`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            window.alert('No se ha podido actualizar la reseña');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setFormData({ ...formData, rating: rating });
    }, [rating]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Realizar la solicitud PUT o PATCH al endpoint de actualización de usuario
            const response = await axios.delete(`${API_URL}/resenas/delete/${review_id}`, config);

            // Manejar la respuesta de la solicitud
            window.alert('Reseña eliminada');
            window.location.href = `/clases`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            window.alert('No se ha podido eliminar la reseña');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Actualizar reseña</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Calificación</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            <h2>Eliminar reseña</h2>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    );
}

export default UpdateReviewForm;