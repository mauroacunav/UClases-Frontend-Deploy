import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';
import './CreateAprobado.css';

function CreateAprobado() {
    const { token } = useContext(AuthContext);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const userId = GetUserId();
        // Nuevo estado para almacenar los IDs de los cursos aprobados
    const [approvedCourses, setApprovedCourses] = useState([]);


    useEffect(() => {
        async function fetchCourses() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Petición para obtener todos los cursos
                const responseCourses = await axios.get(`${API_URL}/cursos/read`, config);
                setCourses(responseCourses.data);

                // Petición para obtener los cursos aprobados por el usuario
                const responseApproved = await axios.get(`${API_URL}/aprobados/read/${userId}`, config);
                setApprovedCourses(responseApproved.data.map(course => course.course_id));
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        }

        fetchCourses();
    }, [token, userId]);

        // Filtrar los cursos que ya han sido aprobados
    const filteredCourses = courses.filter(course => !approvedCourses.includes(course.id));



    const handleSubmit = async (e) => {
        e.preventDefault();

        const aprobadoData = {
            user_id: userId,
            course_id: selectedCourseId
        };

        try {
            console.log(aprobadoData)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post(`${API_URL}/aprobados/create`, aprobadoData, config);
            window.alert('Curso aprobado agregado con éxito');
            // Aquí puedes redirigir al usuario o realizar otra acción
        } catch (error) {
            window.alert('Error al agregar el curso aprobado');
            console.error('Error:', error);
        }
    };

    return (
        <div className="create-aprobado-container">
            <h2 className="create-aprobado-title">Agregar Curso Aprobado</h2>
            <form onSubmit={handleSubmit} className="create-aprobado-form">
                <div className="form-group">
                    <label htmlFor="course">Curso:</label>
                    <select
                        id="course"
                        className="form-control"
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar curso</option>
                        {filteredCourses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {`${course.name} (${course.code})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Agregar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateAprobado;
