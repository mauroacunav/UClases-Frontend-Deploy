import './Presentation.css';
import { useEffect } from 'react';
import UranoImage from "../../../assets/img/urano.png"
import JupiterImage from "../../../assets/img/jupiter.png"
import MarteImage from "../../../assets/img/marte.png"

function Presentation() {
    useEffect(() => {
        const boxes = document.querySelectorAll('.presentation-box');
        const checkBoxes = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;
            boxes.forEach((box) => {
                const boxTop = box.getBoundingClientRect().top;
                if (boxTop < triggerBottom) {
                    box.classList.add('show');
                } else {
                    box.classList.remove('show');
                }
            });
        };

        window.addEventListener('scroll', checkBoxes);
        checkBoxes();

        return () => {
            window.removeEventListener('scroll', checkBoxes);
        };
    }, []);

    return (
        <>
        <section id='presentation-section'>
            <div className='presentation-box'>
                <div className='presentation-box-img'><img src={MarteImage} height='100pxpx'/></div>
                <div className='presentation-box-text'>
                    <h2>Aprende y pasa tus ramos</h2>
                    <p>Los profesores de UClases son estudiantes como tú</p>
                </div>
            </div>
            <div className='presentation-box'>
                <div className='presentation-box-text'>
                    <h2>Enseña lo que sabes</h2>
                    <p>Puedes compartir tu conocimiento y ayudar a otros miembros de la comunidad</p>
                </div>
                <div className='presentation-box-img'><img src={UranoImage} height='100px'/></div>
            </div>
            <div className='presentation-box'>
                <div className='presentation-box-img'><img src={JupiterImage} height='100px'/></div>
                <div className='presentation-box-text'>
                    <h2>Recomienda las clases</h2>
                    <p>Cuenta tu experiencia y califica a los profesores</p>
                </div>
            </div>
        </section>
        </>
    );
};

export default Presentation;