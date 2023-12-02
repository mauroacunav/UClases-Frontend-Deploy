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
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/usuarios/read?id=${user_id}`, config);
                const user_data = response.data[0];
                setProfileData(user_data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [user_id, token]);

    const [classesData, setClassesData] = useState([]);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`${API_URL}/clases/read?user_id=${user_id}`, config)
            .then((response) => {
                const clases = response.data;
                setClassesData(clases)
            })
            .catch((error) => {
                console.error('Error al obtener los datos de las clases', error);
            });
    }, [user_id, token]);

    return (
        <div id='profile-section'>
            <h1>Información del perfil</h1>
            <div>
                <p>Nombre: {`${profileData.firstname} ${profileData.lastname}`}</p>
                <p>Contacto: {profileData.email}</p>
                {GetUserId() == user_id ? (
                    <BtnPrimary label='Editar perfil' to={`/dashboard/${user_id}/edit`}/>
                ) : (
                    null
                )}
            </div>
            {user_id != '1' ? (
                <h1>Clases ofrecidas por {profileData.firstname}</h1>
            ) : (
                null
            )}
            <div id='catalogue-grid'>
                {classesData.map((clase) => (
                    <div className='catalogue-card' key={clase.id}>
                        <ClaseCard clase={clase} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
