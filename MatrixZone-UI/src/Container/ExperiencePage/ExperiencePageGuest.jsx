import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ExperiencePage.css";

function ExperiencePageGuest() {
    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="ExperiencePageContainer">
                <div className="Breadcrumb">
                    <h2>Guest / experience</h2>
                </div>
                <ExperiencePageTitle />
                <ExperiencePageContent />
            </div>
            <FooterGuest />
        </div>
    );
}

function ExperiencePageTitle() {
    return (
        <div className="ExperiencePageTitleContainer">
            <h2>EXPERIENCE</h2>
        </div>
    );
}

function ExperiencePageContent() {
    return <div className="ExperiencePageContentContainer"></div>;
}

export default ExperiencePageGuest;
