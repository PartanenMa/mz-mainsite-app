import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ProjectsPage.css";

function ProjectsPageGuest() {
    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="ProjectsPageContainer">
                <div className="Breadcrumb">
                    <h2>Guest / projects</h2>
                </div>
                <ProjectsPageTitle />
                <ProjectsPageContent />
            </div>
            <FooterGuest />
        </div>
    );
}

function ProjectsPageTitle() {
    return (
        <div className="ProjectsPageTitleContainer">
            <h2>PROJECTS</h2>
        </div>
    );
}

function ProjectsPageContent() {
    return <div className="ProjectsPageContentContainer"></div>;
}

export default ProjectsPageGuest;
