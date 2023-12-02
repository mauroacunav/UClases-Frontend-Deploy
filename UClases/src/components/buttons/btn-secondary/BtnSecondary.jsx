import './BtnSecondary.css';

const BtnSecondary = ({ label, to }) => {
    const handleClick = () => {
        window.location.href = to;
    };
    return (
        <button id='Btn-secondary' onClick={handleClick}>{label}</button>
    );
};

export default BtnSecondary;
