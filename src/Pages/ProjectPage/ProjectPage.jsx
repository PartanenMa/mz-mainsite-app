import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectPage.scss";

function ProjectPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingProjectData, setLoadingProjectData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
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

    const checkConnection = () => {
        fetch("/connection", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            const statusCode = res.status;

            if (statusCode === 200) {
                setConnection(true);
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
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

    return (
        <div className="pJPV">
            {windowWidth >= 1280 && (
                <div className="projectPageContainer">
                    <ProjectPageTitle loadingProjectData={loadingProjectData} projectData={projectData} />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <Project loadingProjectData={loadingProjectData} projectData={projectData} statusDB={statusDB} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="projectPageContainerMobile">
                    <ProjectPageTitleMobile loadingProjectData={loadingProjectData} projectData={projectData} />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <ProjectMobile loadingProjectData={loadingProjectData} projectData={projectData} statusDB={statusDB} />
                </div>
            )}
        </div>
    );
}

function ProjectPageTitle({ loadingProjectData, projectData }) {
    return (
        <AnimatePresence>
            <div className="projectPageTitleContainer">
                {loadingProjectData ? (
                    <motion.h2 key="projppt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="projppt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {projectData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function Project({ loadingProjectData, projectData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="projectContainer">
            <div className="projectTitle">
                <h3>
                    PROJECT
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
                                onClick={() => navigate(info.routes.projectsPage)}
                                key="backtoprojects"
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
                                key="pbtn1"
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
                                key="pbtn2"
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
function ProjectPageTitleMobile({ loadingProjectData, projectData }) {
    return (
        <AnimatePresence>
            <div className="projectPageTitleContainerMobile">
                {loadingProjectData ? (
                    <motion.h2 key="projpptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="projpptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {projectData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function ProjectMobile({ loadingProjectData, projectData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="projectContainerMobile">
            <div className="projectTitleMobile">
                <h3>
                    PROJECT
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
                                onClick={() => navigate(info.routes.projectsPage)}
                                key="backtoprojectsm"
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
                                key="pbtn1m"
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
                                key="pbtn2m"
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

export default ProjectPage;
