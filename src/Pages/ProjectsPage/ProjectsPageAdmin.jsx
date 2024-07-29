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
    const [loadingPinnedProjectsData, setLoadingPinnedProjectsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [projects, setProjects] = useState([]);
    const [pinnedProjects, setPinnedProjects] = useState([]);
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
            getPinnedProjects();
        } else {
            let pinnedProjects = [];

            if (dataFe.projectsData[0]?.title === 0) {
                pinnedProjects.push(dataFe.projectsData[0]);
            } else {
                dataFe.projectsData.map((p) => {
                    if (p.pinned) {
                        pinnedProjects.push(p);
                    }
                });
            }

            setTimeout(() => {
                setProjects(dataFe.projectsData);
                setPinnedProjects(pinnedProjects);
                setStatusDB(true);
                setLoadingProjectsData(false);
                setLoadingPinnedProjectsData(false);
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
        setLoadingPinnedProjectsData(true);
        await getProjects();
        await getPinnedProjects();
        triggerNotification("PROJECT CREATED", "Project created successfully!", "success");
    };

    const getProjectsAfterUpdate = async () => {
        setLoadingProjectsData(true);
        setLoadingPinnedProjectsData(true);
        await getProjects();
        await getPinnedProjects();
        triggerNotification("PROJECT UPDATED", "Project updated successfully!", "success");
    };

    const getProjectsAfterDelete = async () => {
        setLoadingProjectsData(true);
        setLoadingPinnedProjectsData(true);
        await getProjects();
        await getPinnedProjects();
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

    const getPinnedProjects = async () => {
        const message = "Request successful!";

        await fetch("/projects/pinned", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setTimeout(() => {
                        setLoadingPinnedProjectsData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setPinnedProjects(data.pinnedProjectsData);
                    setStatusDB(true);
                    setLoadingPinnedProjectsData(false);
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
                                    <h2>{info.routes.projectsPageAdmin}</h2>
                                </div>
                                <ProjectsPageTitle />
                                <AboutMyProjects />
                                <MyPortfolio />
                                <MyPinnedProjects loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
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
                                    <h2>{info.routes.projectsPageAdmin}</h2>
                                </div>
                                <ProjectsPageTitleMobile />
                                <AboutMyProjectsMobile />
                                <MyPortfolioMobile />
                                <MyPinnedProjectsMobile loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
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
        <div className="projectsPageTitleContainer" style={{ backgroundColor: info.projects.color }}>
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function AboutMyProjects() {
    return (
        <div className="aboutMyProjectsContainer">
            <div className="aboutMyProjectsTitle" style={{ backgroundColor: info.projects.color }}>
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="aboutMyProjectsContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyProjectsPhoto"
                        title={"My " + info.projects.siteName}
                        style={{ "--projects-color": info.projects.color }}
                        href={info.projects.link}
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
                        <div className="aboutMyProjectsTextTitleLogo" />
                        <div className="aboutMyProjectsTextTitleText">
                            <h4 className="h4_1">{info.projects.user}</h4>
                            <h4 className="h4_2">{info.profile.name}</h4>
                        </div>
                    </div>
                    <div className="aboutMyProjectsText">
                        <p>
                            {info.projects.description1}
                            <br />
                            <br />
                            {info.projects.description2}
                            <br />
                            <br />
                            {info.projects.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyPortfolio() {
    const navigate = useNavigate();
    const appLinks = info.appLinks;

    return (
        <div className="portfolioContainer">
            <div className="portfolioTitle" style={{ backgroundColor: info.projects.color }}>
                <h3>MY PORTFOLIO</h3>
            </div>
            <div className="portfolioContent">
                <AnimatePresence>
                    <motion.div
                        className="pCBox"
                        title="Go to portfolio"
                        key="gotoportfolioA"
                        onClick={() => navigate(info.routes.portfolioPageAdmin)}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="pCB1">
                            <div className="portfolioImg" />
                        </div>
                        <div className="pCB2">
                            <p>{"<MyPortfolio/>"}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="space1" />
            <div className="or">
                <h3>ALL OF MY PROJECTS ARE DOWN BELOW</h3>
            </div>
            <div className="space2" />
        </div>
    );
}

function MyPinnedProjects({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsContainer">
            <div className="pPSATitle" style={{ backgroundColor: info.projects.color }}>
                <h3>
                    MY PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContent">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProject"
                                    style={{ "--projects-color": info.projects.color, backgroundColor: info.projects.color }}
                                    key={index}
                                    href={project.projectLink}
                                    target="_blank"
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="pPCoverTitle" style={{ backgroundColor: info.projects.color }}>
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitle">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContent">
                                        <div className="projectInfo">
                                            <div className="pI1">
                                                <p>{project.type}</p>
                                            </div>
                                            <div className="pI2" style={{ "--project-color": project.color, backgroundImage: `url(${project.logo})` }} />
                                        </div>
                                        <div className="projectImage" style={{ backgroundImage: `url(${project.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div className="noPinnedProjectsYet" key="nopinnedprojectsyetA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PINNED PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingPinnedProjectsData ? (
                        <motion.div className="loadingPinnedProjectsData" key="loadingpinnedprojectsdataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderPinnedProjects" style={{ borderTop: `8px solid ${info.projects.color}` }} />
                        </motion.div>
                    ) : (
                        <motion.div className="noPinnedProjectsData" key="nopinnedprojectsdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function MyProjects({ loadingProjectsData, statusDB, projects, getProjectsC, getProjectsU, getProjectsD }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainer">
            <div className="projectsTitle" style={{ backgroundColor: info.projects.color }}>
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
                                    style={{ "--projects-color": info.projects.color }}
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitle" style={{ backgroundColor: info.projects.color }}>
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitle" style={{ backgroundColor: info.projects.color }}>
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
                                            <div className="projectContentButtons" style={{ backgroundColor: info.projects.color }}>
                                                <motion.a
                                                    className="projectBtn1"
                                                    title={"View my code on " + info.projects.siteName}
                                                    style={{ "--projects-color": info.projects.color }}
                                                    key="pbtn1A"
                                                    href={project.codeLink}
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
                                                    href={project.projectLink}
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
                                                    onClick={
                                                        info.deployToGHPages
                                                            ? () => navigate(`/mz-personalwebsite-app/admin/projects/view/${project.id}`)
                                                            : () => navigate(`/admin/projects/view/${project.id}`)
                                                    }
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
                            <div className="loaderProjects" style={{ borderTop: `16px solid ${info.projects.color}` }} />
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
        <div className="projectsPageTitleContainerMobile" style={{ backgroundColor: info.projects.color }}>
            <h2>MY PROJECTS</h2>
        </div>
    );
}

function AboutMyProjectsMobile() {
    return (
        <div className="aboutMyProjectsContainerMobile">
            <div className="aboutMyProjectsTitleMobile" style={{ backgroundColor: info.projects.color }}>
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="aboutMyProjectsContentMobile">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyProjectsPhotoMobile"
                        title={"My " + info.projects.siteName}
                        style={{ "--projects-color": info.projects.color }}
                        href={info.projects.link}
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
                        <div className="aboutMyProjectsTextTitleLogoMobile" />
                        <div className="aboutMyProjectsTextTitleTextMobile">
                            <h4 className="h4_1M">{info.projects.user}</h4>
                            <h4 className="h4_2M">{info.profile.name}</h4>
                        </div>
                    </div>
                    <div className="aboutMyProjectsTextMobile">
                        <p>
                            {info.projects.description1}
                            <br />
                            <br />
                            {info.projects.description2}
                            <br />
                            <br />
                            {info.projects.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyPortfolioMobile() {
    const navigate = useNavigate();
    const appLinks = info.appLinks;

    return (
        <div className="portfolioContainerMobile">
            <div className="portfolioTitleMobile" style={{ backgroundColor: info.projects.color }}>
                <h3>MY PORTFOLIO</h3>
            </div>
            <div className="portfolioContentMobile">
                <AnimatePresence>
                    <motion.div
                        className="pCBoxMobile"
                        title="Go to portfolio"
                        key="gotoportfoliomobileA"
                        onClick={() => navigate(info.routes.portfolioPageAdmin)}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="pCB1M">
                            <div className="portfolioImgMobile" />
                        </div>
                        <div className="pCB2M">
                            <p>{"<MyPortfolio/>"}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="space1Mobile" />
            <div className="orMobile">
                <h3>ALL OF MY PROJECTS ARE DOWN BELOW</h3>
            </div>
            <div className="space2Mobile" />
        </div>
    );
}

function MyPinnedProjectsMobile({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsContainerMobile">
            <div className="pPSATitleMobile" style={{ backgroundColor: info.projects.color }}>
                <h3>
                    MY PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContentMobile">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProjectMobile"
                                    style={{ "--projects-color": info.projects.color, backgroundColor: info.projects.color }}
                                    key={index}
                                    href={project.projectLink}
                                    target="_blank"
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="pPCoverTitleMobile" style={{ backgroundColor: info.projects.color }}>
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitleMobile">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContentMobile">
                                        <div className="projectInfoMobile">
                                            <div className="pI1M">
                                                <p>{project.type}</p>
                                            </div>
                                            <div className="pI2M" style={{ "--project-color": project.color, backgroundImage: `url(${project.logo})` }} />
                                        </div>
                                        <div className="projectImageMobile" style={{ backgroundImage: `url(${project.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div
                                className="noPinnedProjectsYetMobile"
                                key="nopinnedprojectsyetmobileA"
                                transition={{ delay: 0.5 }}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h4>NO PINNED PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingPinnedProjectsData ? (
                        <motion.div className="loadingPinnedProjectsDataMobile" key="loadingpinnedprojectsdatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderPinnedProjectsMobile" style={{ borderTop: `8px solid ${info.projects.color}` }} />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="noPinnedProjectsDataMobile"
                            key="nopinnedprojectsdatamobileA"
                            transition={{ delay: 0.5 }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function MyProjectsMobile({ loadingProjectsData, statusDB, projects, getProjectsC, getProjectsU, getProjectsD }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainerMobile">
            <div className="projectsTitleMobile" style={{ backgroundColor: info.projects.color }}>
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
                                    style={{ "--projects-color": info.projects.color }}
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitleMobile" style={{ backgroundColor: info.projects.color }}>
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitleMobile" style={{ backgroundColor: info.projects.color }}>
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
                                            <div className="projectContentButtonsMobile" style={{ backgroundColor: info.projects.color }}>
                                                <motion.a
                                                    className="projectBtn1Mobile"
                                                    title={"View my code " + info.projects.siteName}
                                                    style={{ "--projects-color": info.projects.color }}
                                                    key="pbtn1mA"
                                                    href={project.codeLink}
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
                                                    href={project.projectLink}
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
                                                    onClick={
                                                        info.deployToGHPages
                                                            ? () => navigate(`/mz-personalwebsite-app/admin/projects/view/${project.id}`)
                                                            : () => navigate(`/admin/projects/view/${project.id}`)
                                                    }
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
                            <div className="loaderProjectsMobile" style={{ borderTop: `16px solid ${info.projects.color}` }} />
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
