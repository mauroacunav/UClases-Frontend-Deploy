import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import GetUserId from '../../../protected/GetUserId';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

function CreateReviewForm() {
    const { class_id } = useParams()
    const { token } = useContext(AuthContext);
    const [rating, setRating] = useState('');
    const [formData, setFormData] = useState({
        user_id: GetUserId(),
        class_id: class_id,
        title: '',
        description: '',
        rating: '' // No lo establecemos aquí, lo actualizaremos cuando se seleccione un rating
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

            const response = await axios.post(`${API_URL}/resenas/create`, formData, config);
            window.alert('Reseña creada con éxito');
            window.location.href = `/clases/${class_id}`;
        } catch (error) {
            window.alert('No se ha podido crear la reseña');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setFormData({ ...formData, rating: rating });
    }, [rating]);

    return (
        <div>
            <h2>Crear reseña</h2>
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
                    <textarea
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
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateReviewForm;
