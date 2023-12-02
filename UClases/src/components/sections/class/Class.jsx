import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Class.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import BtnPrimary from '../../buttons/btn-primary/BtnPrimary';
import ResenaCard from '../../cards/Resena';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';

function Class() {
    const { class_id } = useParams();
    const { token } = useContext(AuthContext);
    const userId = GetUserId();
    const [isuser, setIsUser] = useState(false);

    const [classdata, setClassData] = useState({});
    const [reviewsdata, setReviewsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Se establece la configuración
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Se saca la información de la clase
                const class_response = await axios.get(`${API_URL}/clases/read?id=${class_id}`, config);
                const clase = class_response.data[0];
                setClassData(clase);

                // Se saca la información de las reseñas
                const reviews_response = await axios.get(`${API_URL}/resenas/read?class_id=${class_id}`, config);
                const reviews = reviews_response.data;
                setReviewsData(reviews);

                // Se verifica si el usuario está autorizado
                const auth_config = {
                    method: 'get',
                    url: `${API_URL}/scope-example/protecteduser`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            
                axios(auth_config)
                    .then((response) => {
                        setIsUser(clase.user_id == response.data.user.sub);
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                        setIsUser(false);
                    });

            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [class_id, token]);

    const handleContactClick = async () => {
        const teacherId = classdata.user_id;
        try {
            await axios.post(`${API_URL}/chat/create`, {
                usuario1Id: userId,
                usuario2Id: teacherId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            alert(`Comienza un chat con ${classdata.prof}`);
            window.location.href = '/chats';
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'El chat entre estos usuarios ya existe') {
                alert(`Ya tienes un chat con ${classdata.prof}`);
                window.location.href = '/chats';
            } else if (error.response && error.response.status === 404) {
                alert('Uno o ambos usuarios no se encontraron');
            } else {
                console.error('Error creando el chat:', error);
            }
        }
    };
    

    return (
        <>
            <section id='class-section'>
                <div className='class-content'>
                    <div className='class-information'>
                        <div id='class-basics'>
                            <h1>{classdata.title}</h1>
                            <p>{classdata.description}</p>
                            {/* Se renderizan opciones */}
                            {isuser ? (
                                <div>
                                    <BtnPrimary label='Editar clase' to={`/clases/${class_id}/edit`}/>
                                </div>
                            ) : (
                                <div>
                                    <button id='contact-btn' onClick={handleContactClick}>Contactar</button>
                                </div>
                            )}
                        </div>
                        <div id='class-details'>
                            <ul>
                                <li>Precio: ${classdata.price}</li>
                                <li>Calificación: {classdata.rating}</li>
                                <li>Profesor: {classdata.prof}</li>
                                <li>Email: {classdata.contact}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='class-reviews'>
                        <div id='class-review-title'>
                            <h1>Reseñas</h1>
                        </div>
                        <div id='resenas-grid'>
                            {reviewsdata.map((resena) => (
                                <div className='resena-card' key={resena.id}>
                                    <ResenaCard resena={resena} />
                                </div>
                            ))}
                        </div>
                        {/* Se renderizan opciones */}
                        {!isuser ? (
                            <div id='class-review-btn'>
                                <BtnPrimary label='Hacer reseña' to={`/clases/${class_id}/newreview`}/>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Class;

