import './Dashboard.css';
import Profile from '../../forms/profile/Profile';
import CreateClassForm from '../../forms/createclass/CreateClass';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import API_URL from '../../../config';
import CreateAprobado from '../../forms/createaprobado/CreateAprobado';


function Dashboard () {
    const { token } = useContext(AuthContext);
    const { user_id } = useParams();
    const [isuser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        <section id='dashboard-section'>
            <div className='dashboard-container'>
                <div className='left-section'>
                    <Profile />
                </div>
                {isuser && (
                    <>
                        <div className='right-column'>
                            <CreateClassForm />
                            <CreateAprobado />
                        </div>
                    </>
                )}
            </div>
        </section>
    );

};

export default Dashboard;