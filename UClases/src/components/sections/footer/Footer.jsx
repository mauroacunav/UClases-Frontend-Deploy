import './Footer.css';
import BtnPrimary from '../../buttons/btn-primary/BtnPrimary';
import LinkedinImage from '../../../assets/img/linkedin.png'
import TwitterImage from '../../../assets/img/twitter.png'

function Footer() {
    return (
        <>
        <section id='footer'>
            <div className='section-footer'>
                <h1>Contáctanos</h1>
                <div className='rrss-footer'>
                    <a href='#'><img src={TwitterImage} height='50px'/></a>
                    <a href='#'><img src={LinkedinImage} height='50px'/></a>
                </div>
            </div>
            <div className='section-footer'>
                <h2>¿Eres admin?</h2>
                <BtnPrimary label='Modera aquí' to='/admin/dashboard'/>
            </div>
        </section>
        </>
    );
};

export default Footer;
