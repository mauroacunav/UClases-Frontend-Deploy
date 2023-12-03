import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import './EditReview.css';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateReviewForm from '../../forms/updatereview/UpdateReview';
import API_URL from '../../../config';

function UpdateReview () {
    
    const { review_id } = useParams()
    const { token } = useContext(AuthContext);
    const [isuser, setIsUser] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${API_URL}/resenas/read?id=${review_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const resena = response.data[0];
                setData(resena);
                const user_id = resena.user_id;

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
    }, [token]);

    return (
        <section id='review-section'>
            {isuser ? (
                <UpdateReviewForm />
            ) : (
                <p>No tienes acceso para editar este recurso</p>
            )}
        </section> 
    );
};

export default UpdateReview;
