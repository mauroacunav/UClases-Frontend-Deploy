import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import './EditClass.css';
import { useContext, useState, useEffect } from 'react';
import UpdateClassForm from '../../forms/updateclass/UpdateClass';
import API_URL from '../../../config';

function EditClass () {
    const { class_id } = useParams();
    const { token } = useContext(AuthContext);
    const [data, setData] = useState({});
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/clases/read?id=${class_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const clase = response.data[0];
                setData(clase);
                const user_id = clase.user_id;

                // Check if the current user matches the creator of the class
                const config = {
                    method: 'get',
                    url: `${API_URL}/scope-example/protecteduser`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                axios(config)
                    .then((response) => {
                        setIsUser(user_id == response.data.user.sub);
                    })
                    .catch((error) => {
                        console.error('Error fetching user data or not logged in:', error.message);
                        setIsUser(false);
                    });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [class_id, token]);

    return (
        <section id='editclass-section'>
            <div className='editclass-container'>
                {isUser ? (
                    <UpdateClassForm />
                ) : (
                    <p>No tienes acceso a este recurso</p>
                )}
            </div>
        </section> 
    );
};

export default EditClass;
