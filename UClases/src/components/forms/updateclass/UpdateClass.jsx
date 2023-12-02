import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';

function UpdateClassForm() {
    const {token} = useContext(AuthContext);
    const { class_id } = useParams();
    const [courseIdToCreate, setCourseIdToCreate] = useState('');
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        user_id: GetUserId(),
        title: '',
        description: '',
        price: '',
        id_curso: ''
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
            const response = await axios.put(`${API_URL}/clases/update/${class_id}`, formData, config);

            // Manejar la respuesta de la solicitud
            window.alert('Clase actualizada con éxito');
            window.location.href = `/clases`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            window.alert('No se ha podido actualizar la clase');
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
            const response = await axios.delete(`${API_URL}/clases/delete/${class_id}`, config);

            // Manejar la respuesta de la solicitud
            window.alert('Clase eliminada con éxito');
            window.location.href = `/clases/${class_id}`;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            window.alert('No se ha podido eliminar la clase');
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
            <h2>Actualizar clase</h2>
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
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            <h2>Eliminar clase</h2>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
        
    );
}

export default UpdateClassForm;
