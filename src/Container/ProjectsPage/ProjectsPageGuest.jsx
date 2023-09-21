import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ProjectsPage.css";

function ProjectsPageGuest() {
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.success({
                    message: "LOGGED IN AS GUEST",
                    description: "Welcome to the MatrixZone!",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightgreen",
                        border: "3px solid green",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 1000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LoadingScreen />
            ) : (
                <div>
                    <HeaderGuest />
                    <NavGuest />
                    <div className="ProjectsPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / projects</h2>
                        </div>
                        <ProjectsPageTitle />
                        <AboutMyProjects />
                    </div>
                    <FooterGuest />
                </div>
            )}
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

function AboutMyProjects() {
    return (
        <div className="AboutMyProjectsContainer">
            <div className="AboutMyProjectsTitle">
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="AboutMyProjectsContent">
                <a className="AboutMyProjectsPhoto" title="My GitHub" href={info.GitHub.link} target="_blank" />
                <div className="AboutMyProjectsTextContainer">
                    <div className="AboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.GitHub.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="AboutMyProjectsText">
                        <p>
                            {info.GitHub.description1}
                            <br />
                            <br />
                            {info.GitHub.description2}
                            <br />
                            <br />
                            {info.GitHub.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsPageGuest;
