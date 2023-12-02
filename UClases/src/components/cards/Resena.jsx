import './Resena.css';
import GetUserId from "../../protected/GetUserId";
import BtnCard from '../buttons/btn-card/BtnCard';

function ResenaCard({ resena }) {
    const user_id = GetUserId();
    
    return (
        <>
        <div className="resena-content">
            <div className='resena-title'>
                <p>Por: {resena.username}</p>
                <h2>{resena.title}</h2>
            </div>
            <div className='resena-body'>
                <p>{resena.description}</p>
                <p>Calificación: {resena.rating}</p>
                {user_id == resena.user_id ? (
                    <BtnCard label='Editar review' to={`/resenas/${resena.id}/edit`} />
                ) : (
                    null
                )}
            </div>
        </div>
        </>
    );
};

export default ResenaCard;
