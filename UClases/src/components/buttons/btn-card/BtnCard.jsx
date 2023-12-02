import './BtnCard.css';

const BtnCard = ({ label, to }) => {
    const handleClick = () => {
        window.location.href = to;
    };
    return (
        <button id='Btn-card' onClick={handleClick}>{label}</button>
    );
};

export default BtnCard;
