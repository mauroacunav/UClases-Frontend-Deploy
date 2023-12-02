import Navbar from "../components/navbar/Navbar";
import AdminDashboard from "../components/sections/admin/AdminDashboard";
import Footer from "../components/sections/footer/Footer";

function AdminPage() {
    return (
        <>
            <Navbar />
            <AdminDashboard />
            <Footer />
        </>
    );
};

export default AdminPage;