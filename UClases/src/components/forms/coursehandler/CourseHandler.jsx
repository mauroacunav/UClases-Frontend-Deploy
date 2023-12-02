import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import API_URL from '../../../config'

function CourseHandler() {
    const { token } = useContext(AuthContext);

    const [formDataCreate, setFormDataCreate] = useState({
        code: '',
        name: ''
    });

    const [courses, setCourses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [resenas, setResena] = useState([]);

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

        async function fetchClasses() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/clases/read`, config);
                setClasses(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de clases:', error);
            }
        }

        async function fetchResenas() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/resenas/read`, config);
                setResena(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de reseñas:', error);
            }
        }

        fetchCourses();
        fetchClasses();
        fetchResenas();
    }, [token]);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(`${API_URL}/cursos/create`, formDataCreate, config);
            console.log('Respuesta de la creación del curso:', response.data);

            // Actualizar la lista de cursos después de crear uno nuevo
            const updatedCourses = [...courses, response.data];
            setCourses(updatedCourses);
            window.alert('Curso creado exitosamente');
        } catch (error) {
            console.error('Error al crear el curso:', error);
            window.alert('Error al crear el curso');
        }
    };

    const handleUpdateCourse = async (courseId, updatedData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(`${API_URL}/cursos/update/${courseId}`, updatedData, config);
            console.log('Respuesta de la actualización del curso:', response.data);

            // Actualizar la lista de cursos después de la actualización
            const updatedCourses = courses.map((course) => (course.id === courseId ? response.data : course));
            setCourses(updatedCourses);
            window.alert('Curso actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
            window.alert('Error al actualizar el curso');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${API_URL}/cursos/delete/${courseId}`, config);
            console.log('Respuesta de la eliminación del curso:', response.data);

            // Actualizar la lista de cursos después de eliminar
            const updatedCourses = courses.filter((course) => course.id !== courseId);
            setCourses(updatedCourses);
            window.alert('Curso eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
            window.alert('Error al eliminar el curso');
        }
    };

    const handleDeleteClass = async (classId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${API_URL}/clases/delete/${classId}`, config);
            console.log('Respuesta de la eliminación de la clase:', response.data);

            // Actualizar la lista de clases después de eliminar
            const updatedClasses = classes.filter((clase) => clase.id !== classId);
            setClasses(updatedClasses);
            window.alert('Clase eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la clase:', error);
            window.alert('Error al eliminar la clase');
        }
    };

    const handleDeleteResena = async (ResenaId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${API_URL}/resenas/delete/${ResenaId}`, config);
            console.log('Respuesta de la eliminación de la reseña:', response.data);

            // Actualizar la lista de clases después de eliminar
            const updatedResenas = resenas.filter((resena) => resena.id !== ResenaId);
            setResena(updatedResenas);
            window.alert('Reseña eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
            window.alert('Error al actualizar la reseña');
        }
    };

    return (
        <div>
            <h2>Crear curso</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="code">Sigla:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formDataCreate.code}
                        onChange={(e) => setFormDataCreate({ ...formDataCreate, code: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <textarea
                        id="name"
                        name="name"
                        value={formDataCreate.name}
                        onChange={(e) => setFormDataCreate({ ...formDataCreate, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Crear curso</button>
                </div>
            </form>

            <h2>Administrar cursos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sigla</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                <input
                                    type="text"
                                    value={course.code}
                                    onChange={(e) => handleUpdateCourse(course.id, { code: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => handleUpdateCourse(course.id, { name: e.target.value })}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleUpdateCourse(course.id)}>Guardar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteCourse(course.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Administrar clases</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>ID Curso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((clase) => (
                        <tr key={clase.id}>
                            <td>{clase.user_id}</td>
                            <td>{clase.title}</td>
                            <td>{clase.description}</td>
                            <td>{clase.price}</td>
                            <td>{clase.id_curso}</td>
                            <td>
                                <button onClick={() => handleDeleteClass(clase.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Administrar reseñas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>ID clase</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Calificación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {resenas.map((resena) => (
                        <tr key={resena.user_id}>
                            <td>{resena.user_id}</td>
                            <td>{resena.class_id}</td>
                            <td>{resena.title}</td>
                            <td>{resena.description}</td>
                            <td>{resena.rating}</td>
                            <td>
                                <button onClick={() => handleDeleteResena(resena.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseHandler;
