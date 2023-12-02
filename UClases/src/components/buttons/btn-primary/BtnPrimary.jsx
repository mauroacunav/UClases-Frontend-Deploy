import './BtnPrimary.css';

const BtnPrimary = ({ label, to }) => {
    const handleClick = () => {
        window.location.href = to;
    };
    return (
        <button id='Btn-primary' onClick={handleClick}>{label}</button>
    );
};

export default BtnPrimary;
