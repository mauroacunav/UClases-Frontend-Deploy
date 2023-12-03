import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import GetUserId from '../../../protected/GetUserId';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';
import './CreateReview.css';
import UranoImage from "../../../assets/img/urano.png";

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
        <div className='review-container'>
            <div className='review-title'>
                <img src={UranoImage} height='50px' alt="urano"/>
                <p>Crear reseña</p>
            </div>
            <div className='review-form'>
                <form onSubmit={handleSubmit}>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="">Calificación</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div>
                        <input
                            type="text"
                            className='review-input'
                            placeholder='Título'
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            id="description"
                            className='review-input-d'
                            placeholder='Descripción'
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button className='review-submit' type="submit">Crear</button>
                    </div>
                </form>
            </div>
            <div className='review-message'>
                <p>Recuerda respetar las normas de la comunidad</p>
            </div>
        </div>
    );
}

export default CreateReviewForm;
