import './Catalogue.css';
import ClaseCard from '../../cards/Clase';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../auth/AuthContext';
import API_URL from '../../../config';

function Catalogue() {
    const { token } = useContext(AuthContext);

    const [data, setData] = useState([]);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`${API_URL}/clases/read`, config)
            .then((response) => {
                const clases = response.data;
                setData(clases)
            })
            .catch((error) => {
                console.error('Error al obtener los datos de las clases', error);
            });
    }, []);

    return (
        <>
        <section id='catalogue-section'>
            <div className='catalogue-container'>
                <div>
                    <h1>Clases disponibles</h1>
                </div>
                <div id='catalogue-grid'>
                    {data.map((clase) => (
                        <div className='catalogue-card' key={clase.id}>
                            <ClaseCard  clase={clase} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Catalogue;