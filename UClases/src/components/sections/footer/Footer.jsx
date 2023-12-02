import './Footer.css';
import BtnPrimary from '../../buttons/btn-primary/BtnPrimary';

function Footer() {
    return (
        <>
        <section id='footer'>
            <div className='section-footer'>
                <h1>Contáctanos</h1>
                <div className='rrss-footer'>
                    <a href='#'><img src='/src/assets/img/twitter.png' height='50px'/></a>
                    <a href='#'><img src='/src/assets/img/linkedin.png' height='50px'/></a>
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
