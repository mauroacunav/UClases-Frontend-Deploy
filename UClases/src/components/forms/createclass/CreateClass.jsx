import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';
import './CreateClass.css';

function CreateClassForm() {
    const { token } = useContext(AuthContext);
    const [courseIdToCreate, setCourseIdToCreate] = useState('');
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        user_id: GetUserId(),
        title: '',
        description: '',
        price: '',
        id_curso: '' // No lo establecemos aquí, lo actualizaremos cuando se seleccione un curso
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

            const response = await axios.post(`${API_URL}/clases/create`, formData, config);
            window.alert('Clase creada con éxito');
            window.location.href = `/dashboard/${formData.user_id}`;
        } catch (error) {
            window.alert('No se ha podido crear la clase');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        async function fetchCourses() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/cursos/read`, config);
                setCourses(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de cursos:', error);
            }
        }

        fetchCourses();
    }, [token]);

    useEffect(() => {
        setFormData({ ...formData, id_curso: courseIdToCreate });
    }, [courseIdToCreate]);

    return (
        <div className="create-class-container">
            <h2 className="create-class-title">Crear clase</h2>
            <form onSubmit={handleSubmit} className="create-class-form">
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course">Curso:</label>
                    <select 
                        id="course" 
                        className="form-control"
                        value={courseIdToCreate} 
                        onChange={(e) => setCourseIdToCreate(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar curso</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Crear</button>
                </div>
            </form>
        </div>
    );

}

export default CreateClassForm;
