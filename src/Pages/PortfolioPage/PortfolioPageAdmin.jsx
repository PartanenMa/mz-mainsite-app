import { useState, useEffect } from "react";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./PortfolioPage.scss";

function PortfolioPageAdmin() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
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

    return (
        <div className="prfP">
            {windowWidth >= 1280 && (
                <div className="portfolioPageContainer">
                    <Main connectionLoading={connectionLoading} connection={connection} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="portfolioPageContainerMobile">
                    <MainMobile connectionLoading={connectionLoading} connection={connection} />
                </div>
            )}
        </div>
    );
}

function Main({ connectionLoading, connection }) {
    return (
        <div className="main">
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
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
                <div className="projectsContent"></div>
            </div>
        </div>
    );
}

//Mobile:
function MainMobile({ connectionLoading, connection }) {
    return (
        <div className="mainMobile">
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
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
                <div className="projectsContentMobile"></div>
            </div>
        </div>
    );
}

export default PortfolioPageAdmin;
