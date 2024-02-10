import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectPage.scss";

function ProjectPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingProjectData, setLoadingProjectData] = useState(true);
    const [projectData, setProjectData] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        setTimeout(() => {
            //setProjectData(dataFe.projectsData);
            setLoadingProjectData(false);
        }, [1000]);
    }, []);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    triggerNotification("LOGGED IN AS ADMIN", "Welcome back!", "success");
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    if (isLoggedIn === "true") {
        return (
            <div>
                {loading && load === "true" ? (
                    //Loading component here:
                    <LoadingScreen />
                ) : (
                    <div>
                        <HeaderAdmin />
                        <NavAdmin />
                        <div className="projectPageContainerAdmin">
                            <div className="breadcrumb">
                                <h2>Admin / projects / view</h2>
                            </div>
                            <ProjectPageTitle />
                            <Description loadingProjectData={loadingProjectData} />
                            <Project loadingProjectData={loadingProjectData} />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
                        </div>
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function ProjectPageTitle() {
    return (
        <div className="projectPageTitleContainer">
            <h2>PROJECT NAME</h2>
        </div>
    );
}

function Description({ loadingProjectData }) {
    return (
        <div className="descriptionContainer">
            <div className="descriptionTitle">
                <h3>
                    DESCRIPTION
                    <DBstate loading={loadingProjectData} />
                </h3>
            </div>
            <div className="descriptionContent"></div>
        </div>
    );
}

function Project({ loadingProjectData }) {
    return (
        <div className="projectContainer">
            <div className="projectTitle">
                <h3>
                    PROJECT
                    <DBstate loading={loadingProjectData} />
                </h3>
            </div>
            <div className="projectContent"></div>
        </div>
    );
}

export default ProjectPageAdmin;
