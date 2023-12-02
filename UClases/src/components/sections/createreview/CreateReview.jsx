import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import './CreateReview.css';
import { useContext, useState, useEffect } from 'react';
import CreateReviewForm from '../../forms/createreview/CreateReview';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

function CreateReview () {
    
    const { class_id } = useParams()
    const { token } = useContext(AuthContext);
    const [isnotuser, setIsNotUser] = useState(false)
    const [data, setData] = useState([])

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
                        setIsNotUser(user_id == response.data.user.sub);
                    })
                    .catch((error) => {
                        console.error('Error fetching user data or not logged in:', error.message);
                        setIsNotUser(true);
                    });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <section id='dashboard-section'>
            <div className='dashboard-container'>
                {isnotuser ? (
                    <p>No puedes crear reseñas</p>
                ) : (
                    <CreateReviewForm />
                )}
            </div>
        </section> 
    );
};

export default CreateReview;
