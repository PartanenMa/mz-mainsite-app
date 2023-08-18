import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstPage from "/src/Components/Pages/LoginFirstPage/LoginFirstPage.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ProjectsPage.css";

function ProjectsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        return (
            <div>
                <HeaderAdmin />
                <NavAdmin />
                <div className="ProjectsPageContainer">
                    <div className="Breadcrumb">
                        <h2>Admin / projects</h2>
                    </div>
                    <ProjectsPageTitle />
                    <ProjectsPageContent />
                </div>
                <FooterAdmin />
            </div>
        );
    } else {
        return (<LoginFirstPage />);
    }
}

function ProjectsPageTitle() {
    return (
        <div className="ProjectsPageTitleContainer">
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function ProjectsPageContent() {
    return (
        <div className="ProjectsPageContentContainer">

        </div>
    );
}

export default ProjectsPageAdmin;