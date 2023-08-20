import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./VideosPage.css";

function VideosPageGuest() {
    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="VideosPageContainer">
                <div className="Breadcrumb">
                    <h2>Guest / videos</h2>
                </div>
                <VideosPageTitle />
                <VideosPageContent />
            </div>
            <FooterGuest />
        </div>
    );
}

function VideosPageTitle() {
    return (
        <div className="VideosPageTitleContainer">
            <h2>VIDEOS</h2>
        </div>
    );
}

function VideosPageContent() {
    return <div className="VideosPageContentContainer"></div>;
}

export default VideosPageGuest;
