import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';

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
        <div>
            <h2>Crear clase</h2>
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
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <select value={courseIdToCreate} onChange={(e) => setCourseIdToCreate(e.target.value)}>
                    <option value="">Seleccionar curso</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <div>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateClassForm;
