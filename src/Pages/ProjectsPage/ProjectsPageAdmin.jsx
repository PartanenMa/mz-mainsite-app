import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import CRUDProjectsButton from "/src/Components/CRUDProjectsButton/CRUDProjectsButton.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.scss";

function ProjectsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingProjectsData, setLoadingProjectsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [projects, setProjects] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getProjects();
        } else {
            setTimeout(() => {
                setProjects(dataFe.projectsData);
                setLoadingProjectsData(false);
            }, 1000);
        }
    }, []);

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

    const getProjectsAfterCreate = async () => {
        setLoadingProjectsData(true);
        await getProjects();
        triggerNotification("PROJECT CREATED", "Project created successfully!", "success");
    };

    const getProjectsAfterUpdate = async () => {
        setLoadingProjectsData(true);
        await getProjects();
        triggerNotification("PROJECT UPDATED", "Project updated successfully!", "success");
    };

    const getProjectsAfterDelete = async () => {
        setLoadingProjectsData(true);
        await getProjects();
        triggerNotification("PROJECT DELETED", "Project deleted successfully!", "success");
    };

    const getProjects = async () => {
        fetch("/projects", {
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
                    setLoadingProjectsData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProjects(data.projectsData);
                    setStatusDB(true);
                    setLoadingProjectsData(false);
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
                            <div className="projectsPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>Admin / projects</h2>
                                </div>
                                <ProjectsPageTitle />
                                <AboutMyProjects />
                                <MyProjects
                                    loadingProjectsData={loadingProjectsData}
                                    statusDB={statusDB}
                                    projects={projects}
                                    getProjectsC={() => getProjectsAfterCreate()}
                                    getProjectsU={() => getProjectsAfterUpdate()}
                                    getProjectsD={() => getProjectsAfterDelete()}
                                />
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
                            <div className="projectsPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>Admin / projects</h2>
                                </div>
                                <ProjectsPageTitleMobile />
                                <AboutMyProjectsMobile />
                                <MyProjectsMobile
                                    loadingProjectsData={loadingProjectsData}
                                    statusDB={statusDB}
                                    projects={projects}
                                    getProjectsC={() => getProjectsAfterCreate()}
                                    getProjectsU={() => getProjectsAfterUpdate()}
                                    getProjectsD={() => getProjectsAfterDelete()}
                                />
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

function ProjectsPageTitle() {
    return (
        <div className="projectsPageTitleContainer">
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function AboutMyProjects() {
    return (
        <div className="aboutMyProjectsContainer">
            <div className="aboutMyProjectsTitle">
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="aboutMyProjectsContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyProjectsPhoto"
                        title="My GitHub"
                        href={info.GitHub.link}
                        target="_blank"
                        key="aboutmyprojectsphotoA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyProjectsTextContainer">
                    <div className="aboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.GitHub.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="aboutMyProjectsText">
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

function MyProjects({ loadingProjectsData, statusDB, projects, getProjectsC, getProjectsU, getProjectsD }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainer">
            <div className="projectsTitle">
                <h3>
                    MY PROJECTS
                    <DBstate loading={loadingProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createProject">
                    <CRUDProjectsButton loading={loadingProjectsData} action={"Create"} getProjects={getProjectsC} />
                </div>
            )}
            <div className="projectsContent">
                <AnimatePresence>
                    {projects.length > 0 && !loadingProjectsData ? (
                        projects[0].title !== 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    className="project"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitle">
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitle">
                                        <div className="projectTitleSection1">
                                            <h4>{project.title}</h4>
                                        </div>
                                        <div className="projectTitleSection2">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDProjectsButton loading={loadingProjectsData} action={"Update"} id={project.id} getProjects={getProjectsU} />
                                                    <CRUDProjectsButton loading={loadingProjectsData} action={"Delete"} id={project.id} getProjects={getProjectsD} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="projectContent">
                                        <div className="projectContentDescription">
                                            <div className="pCDBox1">
                                                <p>
                                                    Project type: <span style={{ color: "white", fontSize: "15px" }}>{project.type}</span>
                                                </p>
                                            </div>
                                            <div className="pCDBox2">
                                                <div className="pCDBox2Title">
                                                    <p>Project description:</p>
                                                </div>
                                                <div className="pCDBox2Content">
                                                    <p>{project.description}</p>
                                                </div>
                                            </div>
                                            <div className="pCDBox3">
                                                <p>
                                                    Technologies used: <span style={{ color: "white", fontSize: "15px" }}>{project.tech}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="projectContentOther">
                                            <div className="projectContentPhoto" style={{ backgroundImage: `url(${project.image})` }} />
                                            <div className="projectContentButtons">
                                                <motion.a
                                                    className="projectBtn1"
                                                    title="View code on GitHub"
                                                    key="pbtn1A"
                                                    href={project.gHlink}
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
                                                    href={project.pLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.button
                                                    className="projectBtn3"
                                                    key="pbtn3A"
                                                    onClick={() => navigate(`/admin/projects/view/${project.id}`)}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    View project
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="noProjectsYet" key="noprojectsyetA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingProjectsData ? (
                        <motion.div className="loadingProjectsData" key="loadingprojectsdataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProjects" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProjectsData" key="noprojectsdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

//Mobile:
function ProjectsPageTitleMobile() {
    return (
        <div className="projectsPageTitleContainerMobile">
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function AboutMyProjectsMobile() {
    return (
        <div className="aboutMyProjectsContainerMobile">
            <div className="aboutMyProjectsTitleMobile">
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="aboutMyProjectsContentMobile">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyProjectsPhotoMobile"
                        title="My GitHub"
                        href={info.GitHub.link}
                        target="_blank"
                        key="aboutmyprojectsphotomobileA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyProjectsTextContainerMobile">
                    <div className="aboutMyProjectsTextTitleMobile">
                        <h4 className="h4_1M">{info.GitHub.user}</h4>
                        <h4 className="h4_2M">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="aboutMyProjectsTextMobile">
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

function MyProjectsMobile({ loadingProjectsData, statusDB, projects, getProjectsC, getProjectsU, getProjectsD }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainerMobile">
            <div className="projectsTitleMobile">
                <h3>
                    MY PROJECTS
                    <DBstate loading={loadingProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createProjectMobile">
                    <CRUDProjectsButton loading={loadingProjectsData} action={"Create"} getProjects={getProjectsC} />
                </div>
            )}
            <div className="projectsContentMobile">
                <AnimatePresence>
                    {projects.length > 0 && !loadingProjectsData ? (
                        projects[0].title !== 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    className="projectMobile"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitleMobile">
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitleMobile">
                                        <div className="projectTitleSection1Mobile">
                                            <h4>{project.title}</h4>
                                        </div>
                                        <div className="projectTitleSection2Mobile">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDProjectsButton loading={loadingProjectsData} action={"Update"} id={project.id} getProjects={getProjectsU} />
                                                    <CRUDProjectsButton loading={loadingProjectsData} action={"Delete"} id={project.id} getProjects={getProjectsD} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="projectContentMobile">
                                        <div className="projectContentDescriptionMobile">
                                            <div className="pCDBox1Mobile">
                                                <p>
                                                    Project type: <span style={{ color: "white", fontSize: "10px" }}>{project.type}</span>
                                                </p>
                                            </div>
                                            <div className="pCDBox2Mobile">
                                                <div className="pCDBox2TitleMobile">
                                                    <p>Project description:</p>
                                                </div>
                                                <div className="pCDBox2ContentMobile">
                                                    <p>{project.description}</p>
                                                </div>
                                            </div>
                                            <div className="pCDBox3Mobile">
                                                <p>
                                                    Technologies used: <span style={{ color: "white", fontSize: "10px" }}>{project.tech}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="projectContentOtherMobile">
                                            <div className="projectContentPhotoMobile" style={{ backgroundImage: `url(${project.image})` }} />
                                            <div className="projectContentButtonsMobile">
                                                <motion.a
                                                    className="projectBtn1Mobile"
                                                    title="View code on GitHub"
                                                    key="pbtn1mA"
                                                    href={project.gHlink}
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
                                                    href={project.pLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.button
                                                    className="projectBtn3Mobile"
                                                    key="pbtn3mA"
                                                    onClick={() => navigate(`/admin/projects/view/${project.id}`)}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    View project
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="noProjectsYetMobile" key="noprojectsyetmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingProjectsData ? (
                        <motion.div className="loadingProjectsDataMobile" key="loadingprojectsdatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProjects" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProjectsDataMobile" key="noprojectsdatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProjectsPageAdmin;
