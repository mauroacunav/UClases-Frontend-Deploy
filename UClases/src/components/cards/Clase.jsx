import { useContext } from 'react';
import BtnCard from '../buttons/btn-card/BtnCard';
import { AuthContext } from '../../auth/AuthContext';
import './Cards.css';

function ClaseCard({ clase }) {
    const { token } = useContext(AuthContext);

    // Determinar el mensaje de calificación
    const ratingMessage = clase.rating !== null ? clase.rating : 'Aún no ha sido calificado';

    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className='card-rating'>
                        <p>Calificación: {ratingMessage}</p>
                    </div>
                    <div className='card-title'>
                        <h2>{clase.title}</h2>
                    </div>
                    <div className='card-body'>
                        <p>Prof: {clase.prof}</p>
                        { token === 'null' ? (
                            <BtnCard label={'Detalle'} to={'/login'} />
                        ) : (
                            <BtnCard label='Detalle' to={`/clases/${clase.id}`} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClaseCard;

