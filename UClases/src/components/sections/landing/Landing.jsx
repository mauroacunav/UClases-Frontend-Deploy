import BtnPrimary from '../../buttons/btn-primary/BtnPrimary';
import LogoutButton from '../../forms/session/Logout';
import './Landing.css';
import { AuthContext } from '../../../auth/AuthContext';
import { useContext } from 'react';

function Landing() {
    const {token} = useContext(AuthContext);

    return (
        <>
        <section id='landing-section'>
            <div className='landing-container'>
                <div id='landing-animation'>
                    <img src='/src/assets/img/saturno.png' height='400px'/>
                </div>
                <div id='landing-options'>
                    <h1>Enseña y aprende de los mejores</h1>
                    {token === 'null' ? (
                        <div>
                            <BtnPrimary label='Iniciar sesión' to='/login' />
                            <BtnPrimary label='Registrarse' to='/signup' />
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </section>
        </>
    );
};

export default Landing;
