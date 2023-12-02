import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage'
import HomePage from '../../pages/HomePage';
import InformationPage from '../../pages/InformationPage'
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import DashboardPage from '../../pages/DashboardPage';
import ClassPage from '../../pages/ClassPage';
import EditProfilePage from '../../pages/EditProfilePage';
import AdminPage from '../../pages/AdminPage';
import EditClassPage from '../../pages/EditClassPage';
import CreateReviewPage from '../../pages/NewReviewPage';
import EditReviewPage from '../../pages/EditReviewPage';
import Chats from '../../pages/ChatPage';

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>} />
                    <Route path={'/clases'} element={<HomePage/>} />
                    <Route path={'/clases/:class_id'} element={<ClassPage/>} />
                    <Route path={'/clases/:class_id/edit'} element={<EditClassPage/>} />
                    <Route path={'/nosotros'} element={<InformationPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/signup'} element={<SignupPage/>}/>
                    <Route path={'/dashboard/:user_id'} element={<DashboardPage/>}/>
                    <Route path={'/dashboard/:user_id/edit'} element={<EditProfilePage/>}/>
                    <Route path={'/admin/dashboard'} element={<AdminPage/>}/>
                    <Route path={'/clases/:class_id/newreview'} element={<CreateReviewPage/>}/>
                    <Route path={'/resenas/:review_id/edit'} element={<EditReviewPage/>}/>
                    <Route path={'/chats'} element={<Chats/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Routing;
