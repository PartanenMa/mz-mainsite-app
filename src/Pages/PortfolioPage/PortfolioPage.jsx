import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./PortfolioPage.scss";

function PortfolioPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingPortfolioProjectsData, setLoadingPortfolioProjectsData] = useState(true);
    const [portfolioProjects, setPortfolioProjects] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getPortfolioProjects();
        } else {
            let portfolioProjects = [];

            if (dataFe.projectsData[0]?.title === 0) {
                portfolioProjects.push(dataFe.projectsData[0]);
            } else {
                dataFe.projectsData.map((p) => {
                    if (p.portfolio) {
                        portfolioProjects.push(p);
                    }
                });
            }

            setTimeout(() => {
                setPortfolioProjects(portfolioProjects);
                setLoadingPortfolioProjectsData(false);
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

    const getPortfolioProjects = async () => {
        const message = "Request successful!";

        await fetch("/projects/portfolio", {
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
                        setLoadingPortfolioProjectsData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setPortfolioProjects(data.portfolioProjectsData);
                    setLoadingPortfolioProjectsData(false);
                }, 1000);
            });
    };

    return (
        <div className="prfP">
            {windowWidth >= 1280 && (
                <div className="portfolioPageContainer">
                    <Main connectionLoading={connectionLoading} connection={connection} loadingPortfolioProjectsData={loadingPortfolioProjectsData} portfolioProjects={portfolioProjects} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="portfolioPageContainerMobile">
                    <MainMobile connectionLoading={connectionLoading} connection={connection} loadingPortfolioProjectsData={loadingPortfolioProjectsData} portfolioProjects={portfolioProjects} />
                </div>
            )}
        </div>
    );
}

function Main({ connectionLoading, connection, loadingPortfolioProjectsData, portfolioProjects }) {
    const navigate = useNavigate();

    return (
        <div className="main">
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
            <div className="breadcrumb">
                <div className="breadcrumbLogo" />
                <div className="breadcrumbText">
                    <h2>
                        {"/"}
                        <span title={"Back to projects"} style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPage)}>
                            {"projects"}
                        </span>
                        {"/portfolio"}
                    </h2>
                </div>
            </div>
            <div className="firstSection">
                <AnimatePresence>
                    <motion.div className="firstSectionTitle" key="firstsectiontitle" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <h2>{"<MY PORTFOLIO/>"}</h2>
                    </motion.div>
                    <div className="firstSectionContent">
                        <motion.div className="firstSectionBox" key="firstsectionbox" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                            <div className="firstSectionImg"></div>
                            <div className="firstSectionInfo">
                                <h3>{info.profile.name}</h3>
                                <div className="professionOrJobContainer">
                                    <p style={{ color: info.profile.employed ? info.profile.companyColor : "#03a062" }}>{info.profile.employed ? info.profile.jobTitle : info.profile.profession}</p>
                                    {info.profile.employed && (
                                        <a href={info.profile.companyInfoLink} target="_blank">
                                            <div
                                                className="companyLogo"
                                                style={{ "--company-color": info.profile.companyColor, height: "30px", width: "50px", backgroundImage: `url(${info.profile.companyLogo})` }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
            <div className="aboutMeSection">
                <div className="aboutMeTitle">
                    <h2>ABOUT ME</h2>
                </div>
                <div className="aboutMeContent">
                    <div className="aboutMeTextContainer">
                        <p>{info.profile.description1}</p>
                        <p>{info.profile.description2}</p>
                        <p>{info.profile.description3}</p>
                    </div>
                </div>
            </div>
            <div className="projectsSection">
                <div className="projectsTitle">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="projectsContent">
                    <AnimatePresence>
                        {portfolioProjects.length > 0 && !loadingPortfolioProjectsData ? (
                            portfolioProjects[0].title !== 0 ? (
                                <div className="projectsGrid">
                                    {portfolioProjects.map((project, index) => (
                                        <motion.a
                                            className="portfolioProject"
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
                                            <div className="pPCoverTitle" style={{ backgroundImage: `url(${project.image})` }}>
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
                                    ))}
                                </div>
                            ) : (
                                <motion.div className="noPortfolioProjectsYet" key="noportfolioprojectsyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO PORTFOLIO PROJECTS YET!</h4>
                                </motion.div>
                            )
                        ) : loadingPortfolioProjectsData ? (
                            <motion.div className="loadingPortfolioProjectsData" key="loadingportfolioprojectsdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderPortfolioProjects" />
                            </motion.div>
                        ) : (
                            <motion.div className="noPortfolioProjectsData" key="noportfolioprojectsdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO DATA!</h4>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

//Mobile:
function MainMobile({ connectionLoading, connection, loadingPortfolioProjectsData, portfolioProjects }) {
    const navigate = useNavigate();

    return (
        <div className="mainMobile">
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
            <div className="breadcrumbMobile">
                <div className="breadcrumbLogoMobile" />
                <div className="breadcrumbTextMobile">
                    <h2>
                        {"/"}
                        <span title={"Back to projects"} style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPage)}>
                            {"projects"}
                        </span>
                        {"/portfolio"}
                    </h2>
                </div>
            </div>
            <div className="firstSectionMobile">
                <AnimatePresence>
                    <motion.div className="firstSectionTitleMobile" key="firstsectiontitlemobile" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <h2>{"<MY PORTFOLIO/>"}</h2>
                    </motion.div>
                    <div className="firstSectionContentMobile">
                        <motion.div className="firstSectionBoxMobile" key="firstsectionboxmobile" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                            <div className="firstSectionImgMobile"></div>
                            <div className="firstSectionInfoMobile">
                                <h3>{info.profile.name}</h3>
                                <div className="professionOrJobContainerMobile">
                                    <p style={{ color: info.profile.employed ? info.profile.companyColor : "#03a062" }}>{info.profile.employed ? info.profile.jobTitle : info.profile.profession}</p>
                                    {info.profile.employed && (
                                        <a href={info.profile.companyInfoLink} target="_blank">
                                            <div
                                                className="companyLogoMobile"
                                                style={{ "--company-color": info.profile.companyColor, height: "10px", width: "15px", backgroundImage: `url(${info.profile.companyLogo})` }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
            <div className="aboutMeSectionMobile">
                <div className="aboutMeTitleMobile">
                    <h2>ABOUT ME</h2>
                </div>
                <div className="aboutMeContentMobile">
                    <div className="aboutMeTextContainerMobile">
                        <p>{info.profile.description1}</p>
                        <p>{info.profile.description2}</p>
                        <p>{info.profile.description3}</p>
                    </div>
                </div>
            </div>
            <div className="projectsSectionMobile">
                <div className="projectsTitleMobile">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="projectsContentMobile">
                    <AnimatePresence>
                        {portfolioProjects.length > 0 && !loadingPortfolioProjectsData ? (
                            portfolioProjects[0].title !== 0 ? (
                                <div className="projectsGridMobile">
                                    {portfolioProjects.map((project, index) => (
                                        <motion.a
                                            className="portfolioProjectMobile"
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
                                            <div className="pPCoverTitleMobile" style={{ backgroundImage: `url(${project.image})` }}>
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
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    className="noPortfolioProjectsYetMobile"
                                    key="noportfolioprojectsyetmobile"
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h4>NO PORTFOLIO PROJECTS YET!</h4>
                                </motion.div>
                            )
                        ) : loadingPortfolioProjectsData ? (
                            <motion.div className="loadingPortfolioProjectsDataMobile" key="loadingportfolioprojectsdatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderPortfolioProjectsMobile" />
                            </motion.div>
                        ) : (
                            <motion.div
                                className="noPortfolioProjectsDataMobile"
                                key="noportfolioprojectsdatamobile"
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
        </div>
    );
}

export default PortfolioPage;
