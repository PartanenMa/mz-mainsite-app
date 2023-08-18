import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstPage from "/src/Components/Pages/LoginFirstPage/LoginFirstPage.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./VideosPage.css";

function VideosPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        return (
            <div>
                <HeaderAdmin />
                <NavAdmin />
                <div className="VideosPageContainer">
                    <div className="Breadcrumb">
                        <h2>Admin / videos</h2>
                    </div>
                    <VideosPageTitle />
                    <VideosPageContent />
                </div>
                <FooterAdmin />
            </div>
        );
    } else {
        return (<LoginFirstPage />);
    }
}

function VideosPageTitle() {
    return (
        <div className="VideosPageTitleContainer">
            <h2>MY VIDEOS</h2>
        </div>
    );
}

function VideosPageContent() {
    return (
        <div className="VideosPageContentContainer">

        </div>
    );
}

export default VideosPageAdmin;