import React from 'react';
import './Info.css';

function Info() {
    return (
        <section id='info-section'>
            <div className='info-container'>
                <h1>Información sobre UClases</h1>
                
                {/* Sección Dashboard */}
                <div className='section'>
                    <h2>Dashboard</h2>
                    <p>Accede a tu perfil personal, donde puedes gestionar tu información, editar tus datos y contraseñas, ver y administrar las clases que ofreces, y revisar tus cursos aprobados. Además, puedes añadir nuevas clases y marcar cursos como aprobados.</p>
                </div>

                {/* Sección Catálogo de Clases */}
                <div className='section'>
                    <h2>Catálogo de Clases</h2>
                    <p>Descubre clases disponibles, obten detalles de cada clase, contacta a profesores, lee y escribe reseñas, y conoce más sobre los instructores.</p>
                </div>

                {/* Sección Nosotros */}
                <div className='section'>
                    <h2>Nosotros</h2>
                    <p>Conoce más sobre UClases, nuestra visión, y cómo facilitamos la conexión entre alumnos de la Universidad Católica para clases particulares.</p>
                </div>

                {/* Sección Chat */}
                <div className='section'>
                    <h2>Chat</h2>
                    <p>Comunícate con otros usuarios y el administrador para consultas o asistencia. El chat es tu herramienta para la comunicación directa dentro de la plataforma.</p>
                </div>

                {/* Sección Administrativa */}
                <div className='section'>
                    <h2>Funcionalidades Administrativas</h2>
                    <p>Para administradores, herramientas especiales están disponibles para la gestión de la aplicación, incluyendo la eliminación de usuarios o clases y el acceso a información crucial para el mantenimiento y la seguridad de UClases.</p>
                </div>

                {/* Sección Información de Contacto */}
                <div className='section'>
                    <h2>Contacto y Redes Sociales</h2>
                    <p>Para más información, preguntas o apoyo, visita la sección de contacto en nuestro footer o en la navbar. También estamos presentes en redes sociales donde puedes seguirnos y mantenerte actualizado con las últimas noticias y actualizaciones de UClases.</p>
                </div>
            </div>
        </section>
    );
}

export default Info;

