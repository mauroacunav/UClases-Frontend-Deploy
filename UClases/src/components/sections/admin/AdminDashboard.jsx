import './AdminDashboard.css';
import AdminCheck from '../../../protected/AdminCheck';
import CourseHandler from '../../forms/coursehandler/CourseHandler';

function AdminDashboard() {
    const isadmin = AdminCheck();

    return (
        <>
        <section id='admin-section'>
            {isadmin ? (
                <div className='admin-container'>
                    Bienvenido admin, este es tu dashboard
                    <CourseHandler />
                </div>
            ) : (
                <div className='admin-container'>
                    No cuentas con los permisos para acceder a esta sección
                </div>
            )}
        </section>
        </>
    );
};

export default AdminDashboard;