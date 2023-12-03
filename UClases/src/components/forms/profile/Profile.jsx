import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";
import { AuthContext } from '../../../auth/AuthContext';
import ClaseCard from '../../cards/Clase';
import BtnPrimary from '../../buttons/btn-primary/BtnPrimary';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';

function Profile() {
    const { user_id } = useParams();
    const { token } = useContext(AuthContext);

    const [profileData, setProfileData] = useState({});
    const [classesData, setClassesData] = useState([]);
    const [approvedCourses, setApprovedCourses] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Obtener información del perfil
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_URL}/usuarios/read?id=${user_id}`, config);
                const user_data = response.data[0];
                setProfileData(user_data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        // Obtener clases
        const fetchClassesData = async () => {
            try {
                const response = await axios.get(`${API_URL}/clases/read?user_id=${user_id}`, config);
                setClassesData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de las clases', error);
            }
        };

        // Obtener cursos aprobados
        const fetchApprovedCourses = async () => {
            try {
                const response = await axios.get(`${API_URL}/aprobados/read/${user_id}`, config);
                const approvedCoursesIds = response.data.map(course => course.course_id);

                const coursesDetails = await Promise.all(approvedCoursesIds.map(async (id) => {
                    const response = await axios.get(`${API_URL}/cursos/read?id=${id}`);
                    return response.data[0];
                }));

                setApprovedCourses(coursesDetails);
            } catch (error) {
                console.error('Error al obtener los cursos aprobados', error);
            }
        };

        fetchProfileData();
        fetchClassesData();
        fetchApprovedCourses();
    }, [user_id, token]);

    return (
        <div id='profile-section'>
            <div className="profile-header">
                <h1>Información del perfil</h1>
                {GetUserId() === user_id && (
                    <BtnPrimary label='Editar perfil' to={`/dashboard/${user_id}/edit`}/>
                )}
            </div>
            <div className="profile-details">
                <p>Nombre: {`${profileData.firstname} ${profileData.lastname}`}</p>
                <p>Contacto: {profileData.email}</p>
            </div>
            <div className="profile-classes">
                <h2>Clases ofrecidas por {profileData.firstname}</h2>
                <div id='catalogue-grid-p'>
                    {classesData.map((clase) => (
                        <div className='catalogue-card' key={clase.id}>
                            {/* Asumiendo que ClaseCard es un componente */}
                            <ClaseCard clase={clase} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="profile-approved-courses">
                <h2>Cursos Aprobados</h2>
                <div id='approved-courses-list'>
                    {approvedCourses.map((course) => (
                        <p key={course.id}>{course.name} ({course.code})</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
