import { useParams } from 'react-router-dom';
import'./EditProfile.css';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import UpdateProfile from '../../forms/updateprofile/UpdateProfile';
import API_URL from '../../../config';


function EditProfile () {
    const { token } = useContext(AuthContext);
    const { user_id } = useParams();
    const [data, setData] = useState({});
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/usuarios/read?id=${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = response.data[0];
                setData(user);

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
    }, [user_id, token]);

    return (
        <section id='editprofile-section'>
            <div className='editprofile-container'>
                {isUser ? (
                    <UpdateProfile />
                ) : (
                    <p>No tienes acceso a este recurso</p>
                )}
            </div>
        </section> 
    );
};

export default EditProfile;