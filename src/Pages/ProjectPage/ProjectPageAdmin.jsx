import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const [statusDB, setStatusDB] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getProject();
        } else {
            setTimeout(() => {
                setProjectData(dataFe.projectsData[id]);
                setLoadingProjectData(false);
            }, 1000);
        }
    }, [id]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const checkSession = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        fetch("/login/session", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken }),
        })
            .then((res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    return { statusCode };
                } else {
                    return { statusCode };
                }
            })
            .then(({ statusCode }) => {
                if (statusCode !== 200) {
                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.setItem("csrfToken", "");
                }
            });
    };

    const getProject = () => {
        fetch(`/projects/${id}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setLoadingProjectData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProjectData(data.foundProject);
                    setStatusDB(true);
                    setLoadingProjectData(false);
                }, 1000);
            });
    };

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
                        {windowWidth >= 1280 && (
                            <div className="projectPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>
                                        {"mainsite/admin/"}
                                        <span style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPageAdmin)}>
                                            {"projects"}
                                        </span>
                                        {"/view/" + id}
                                    </h2>
                                </div>
                                <MyProjectPageTitle loadingProjectData={loadingProjectData} projectData={projectData} />
                                <MyProject loadingProjectData={loadingProjectData} projectData={projectData} statusDB={statusDB} />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
                        {windowWidth < 1280 && (
                            <div className="projectPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>
                                        {"mainsite/admin/"}
                                        <span style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPageAdmin)}>
                                            {"projects"}
                                        </span>
                                        {"/view/ " + id}
                                    </h2>
                                </div>
                                <MyProjectPageTitleMobile loadingProjectData={loadingProjectData} projectData={projectData} />
                                <MyProjectMobile loadingProjectData={loadingProjectData} projectData={projectData} statusDB={statusDB} />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function MyProjectPageTitle({ loadingProjectData, projectData }) {
    return (
        <AnimatePresence>
            <div className="projectPageTitleContainer">
                {loadingProjectData ? (
                    <motion.h2 key="projpptA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="projpptA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {projectData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function MyProject({ loadingProjectData, projectData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="projectContainer">
            <div className="projectTitle">
                <h3>
                    MY PROJECT
                    <DBstate loading={loadingProjectData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectContent">
                <AnimatePresence>
                    <div className="projectContentGoBackAndButtons">
                        <div className="projectGoBack">
                            <motion.button
                                className="goBackBtn"
                                title="Back to projects"
                                onClick={() => navigate(info.routes.projectsPageAdmin)}
                                key="backtoprojectsA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {"<"}
                            </motion.button>
                        </div>
                        <div className="projectButtons">
                            <motion.a
                                className="projectBtn1"
                                title={"View code on " + info.projects.siteName}
                                key="pbtn1A"
                                href={projectData.codeLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <motion.a
                                className="projectBtn2"
                                title="Go to site"
                                key="pbtn2A"
                                href={projectData.projectLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </div>
                    </div>
                </AnimatePresence>
                <div className="projectImage" style={{ backgroundImage: `url(${projectData.image})` }} />
                <div className="projectType">
                    {loadingProjectData ? (
                        <p>
                            Type: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Type: <span style={{ color: "white" }}>{projectData.type}</span>
                        </p>
                    )}
                </div>
                <div className="projectDescription">
                    <div className="pDTitle">
                        <p>Project description:</p>
                    </div>
                    <div className="pDContent">{loadingProjectData ? <p>...</p> : <p>{projectData.description}</p>}</div>
                </div>
                <div className="projectTech">
                    {loadingProjectData ? (
                        <p>
                            Technologies used: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Technologies used: <span style={{ color: "white" }}>{projectData.tech}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

//Mobile:
function MyProjectPageTitleMobile({ loadingProjectData, projectData }) {
    return (
        <AnimatePresence>
            <div className="projectPageTitleContainerMobile">
                {loadingProjectData ? (
                    <motion.h2 key="projpptmA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="projpptmA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {projectData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function MyProjectMobile({ loadingProjectData, projectData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="projectContainerMobile">
            <div className="projectTitleMobile">
                <h3>
                    MY PROJECT
                    <DBstate loading={loadingProjectData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectContentMobile">
                <AnimatePresence>
                    <div className="projectContentGoBackAndButtonsMobile">
                        <div className="projectGoBackMobile">
                            <motion.button
                                className="goBackBtnMobile"
                                title="Back to projects"
                                onClick={() => navigate(info.routes.projectsPageAdmin)}
                                key="backtoprojectsmA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {"<"}
                            </motion.button>
                        </div>
                        <div className="projectButtonsMobile">
                            <motion.a
                                className="projectBtn1Mobile"
                                title={"View code on " + info.projects.siteName}
                                key="pbtn1mA"
                                href={projectData.codeLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <motion.a
                                className="projectBtn2Mobile"
                                title="Go to site"
                                key="pbtn2mA"
                                href={projectData.projectLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </div>
                    </div>
                </AnimatePresence>
                <div className="projectImageMobile" style={{ backgroundImage: `url(${projectData.image})` }} />
                <div className="projectTypeMobile">
                    {loadingProjectData ? (
                        <p>
                            Type: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Type: <span style={{ color: "white" }}>{projectData.type}</span>
                        </p>
                    )}
                </div>
                <div className="projectDescriptionMobile">
                    <div className="pDTitleMobile">
                        <p>Project description:</p>
                    </div>
                    <div className="pDContentMobile">{loadingProjectData ? <p>...</p> : <p>{projectData.description}</p>}</div>
                </div>
                <div className="projectTechMobile">
                    {loadingProjectData ? (
                        <p>
                            Technologies used: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Technologies used: <span style={{ color: "white" }}>{projectData.tech}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectPageAdmin;
