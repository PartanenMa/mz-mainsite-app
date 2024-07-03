import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.scss";

function ProjectsPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingProjectsData, setLoadingProjectsData] = useState(true);
    const [loadingPinnedProjectsData, setLoadingPinnedProjectsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [projects, setProjects] = useState([]);
    const [pinnedProjects, setPinnedProjects] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getProjects();
            getPinnedProjects();
        } else {
            let pinnedProjects = [];

            if (dataFe.projectsData[0].title === 0) {
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

    return (
        <div className="pJP">
            {windowWidth >= 1280 && (
                <div className="projectsPageContainer">
                    <ProjectsPageTitle />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <AboutMyProjects />
                    <Portfolio />
                    <PinnedProjects loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
                    <Projects loadingProjectsData={loadingProjectsData} statusDB={statusDB} projects={projects} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="projectsPageContainerMobile">
                    <ProjectsPageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <AboutMyProjectsMobile />
                    <PortfolioMobile />
                    <PinnedProjectsMobile loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
                    <ProjectsMobile loadingProjectsData={loadingProjectsData} statusDB={statusDB} projects={projects} />
                </div>
            )}
        </div>
    );
}

function ProjectsPageTitle() {
    return (
        <div className="projectsPageTitleContainer">
            <AnimatePresence>
                <motion.h2 key="projpt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    PROJECTS
                </motion.h2>
            </AnimatePresence>
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
                        title={"My " + info.projects.siteName}
                        href={info.projects.link}
                        target="_blank"
                        key="aboutmyprojectsphoto"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyProjectsTextContainer">
                    <div className="aboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.projects.user}</h4>
                        <h4 className="h4_2">{info.profile.name}</h4>
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

function Portfolio() {
    return (
        <div className="portfolioContainer">
            <div className="portfolioTitle">
                <h3>CHECK OUT MY PORTFOLIO!</h3>
            </div>
            <div className="portfolioContent">
                <AnimatePresence>
                    <motion.a
                        className="pCBox"
                        href={info.projectRoutes.portfolio}
                        title="Go to portfolio"
                        key="gotoportfolio"
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
                    </motion.a>
                </AnimatePresence>
            </div>
            <div className="space1" />
            <div className="or">
                <h3>...OR EXPLORE ALL OF MY PROJECTS DOWN BELOW</h3>
            </div>
            <div className="space2" />
        </div>
    );
}

function PinnedProjects({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsContainer">
            <div className="pPSATitle">
                <h3>
                    PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContent">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProject"
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
                                    <div className="pPCoverTitle">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitle">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContent">
                                        <div className="projectLogo" />
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
                            <div className="loaderPinnedProjects" />
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

function Projects({ loadingProjectsData, statusDB, projects }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainer">
            <div className="projectsTitle">
                <h3>
                    PROJECTS
                    <DBstate loading={loadingProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectsContent">
                <AnimatePresence>
                    {projects.length > 0 ? (
                        projects[0].title !== 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    className="project"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, delay: 0.5, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitle">
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitle">
                                        <h4>{project.title}</h4>
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
                                                    title={"View code on " + info.projects.siteName}
                                                    key="pbtn1"
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
                                                    key="pbtn2"
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
                                                    key="pbtn3"
                                                    onClick={() => navigate(`/projects/view/${project.id}`)}
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
                            <motion.div className="noProjectsYet" key="noprojectsyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingProjectsData ? (
                        <motion.div className="loadingProjectsData" key="loadingprojectsdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProjects" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProjectsData" key="noprojectsdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
            <AnimatePresence>
                <motion.h2 key="projptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    PROJECTS
                </motion.h2>
            </AnimatePresence>
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
                        title={"My " + info.projects.siteName}
                        href={info.projects.link}
                        target="_blank"
                        key="aboutmyprojectsphotomobile"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyProjectsTextContainerMobile">
                    <div className="aboutMyProjectsTextTitleMobile">
                        <h4 className="h4_1M">{info.projects.user}</h4>
                        <h4 className="h4_2M">{info.profile.name}</h4>
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

function PortfolioMobile() {
    return (
        <div className="portfolioContainerMobile">
            <div className="portfolioTitleMobile">
                <h3>CHECK OUT MY PORTFOLIO!</h3>
            </div>
            <div className="portfolioContentMobile">
                <AnimatePresence>
                    <motion.a
                        className="pCBoxMobile"
                        href={info.projectRoutes.portfolio}
                        title="Go to portfolio"
                        key="gotoportfoliomobile"
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
                    </motion.a>
                </AnimatePresence>
            </div>
            <div className="space1Mobile" />
            <div className="orMobile">
                <h3>...OR EXPLORE ALL OF MY PROJECTS DOWN BELOW</h3>
            </div>
            <div className="space2Mobile" />
        </div>
    );
}

function PinnedProjectsMobile({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsContainerMobile">
            <div className="pPSATitleMobile">
                <h3>
                    PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContentMobile">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProjectMobile"
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
                                    <div className="pPCoverTitleMobile">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitleMobile">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContentMobile">
                                        <div className="projectLogoMobile" />
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
                            <div className="loaderPinnedProjectsMobile" />
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

function ProjectsMobile({ loadingProjectsData, statusDB, projects }) {
    const navigate = useNavigate();

    return (
        <div className="projectsContainerMobile">
            <div className="projectsTitleMobile">
                <h3>
                    PROJECTS
                    <DBstate loading={loadingProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="projectsContentMobile">
                <AnimatePresence>
                    {projects.length > 0 ? (
                        projects[0].title !== 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    className="projectMobile"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, delay: 0.5, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="projectCoverTitleMobile">
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="projectTitleMobile">
                                        <h4>{project.title}</h4>
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
                                                    title={"View code on " + info.projects.siteName}
                                                    key="pbtn1m"
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
                                                    key="pbtn2m"
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
                                                    key="pbtn3m"
                                                    onClick={() => navigate(`/projects/view/${project.id}`)}
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
                            <motion.div className="noProjectsYetMobile" key="noprojectsyetmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingProjectsData ? (
                        <motion.div className="loadingProjectsDataMobile" key="loadingprojectsdatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProjectsMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProjectsDataMobile" key="noprojectsdatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProjectsPage;
