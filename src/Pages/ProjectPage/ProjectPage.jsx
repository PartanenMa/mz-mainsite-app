import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    return (
        <div className="projectContainer">
            <div className="projectTitle">
                <h3>
                    PROJECT
                    <DBstate loading={loadingProjectData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectContent">
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
                <div className="projectImage" style={{ backgroundImage: `url(${projectData.image})` }} />
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
    return (
        <div className="projectContainerMobile">
            <div className="projectTitleMobile">
                <h3>
                    PROJECT
                    <DBstate loading={loadingProjectData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectContentMobile">
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
                <div className="projectImageMobile" style={{ backgroundImage: `url(${projectData.image})` }} />
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
