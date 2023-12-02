import Navbar from "../components/navbar/Navbar";
import Landing from "../components/sections/landing/Landing";
import Presentation from "../components/sections/presentation/Presentation";
import Footer from "../components/sections/footer/Footer";

function LandingPage() {
    return (
        <>
            <Navbar />
            <Landing />
            <Presentation />
            <Footer />
        </>
    );
};

export default LandingPage;
