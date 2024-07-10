import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.scss";

function FooterAdmin() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const projectLinks = info.projectLinks;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 1280 && (
                <footer className="footerContainer">
                    <div className="footerInfoBoxContainer">
                        <div className="footerInfoBoxTitle">
                            <AnimatePresence>
                                <motion.div
                                    className="footerInfoBoxTitleLogo"
                                    title="Go to dashboard"
                                    onClick={() => navigate(info.routes.dashboardPage)}
                                    key="fibtlA"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </AnimatePresence>
                            <h3>MatrixZone</h3>
                        </div>
                        <div className="footerInfoBoxContent">
                            <div className="footerNav1">
                                <div className="footerNav1">
                                    <div className="footerNav1-1">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.homePageAdmin)}
                                                key="fn1-1A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Home
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                    <div className="footerNav1-2">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.profilePageAdmin)}
                                                key="fn1-2A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Profile
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                    <div className="footerNav1-3">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.projectsPageAdmin)}
                                                key="fn1-3A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Projects
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                    <div className="footerNav1-4">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.videosPageAdmin)}
                                                key="fn1-4A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Videos
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                    <div className="footerNav1-5">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.goalsPageAdmin)}
                                                key="fn1-5A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Goals
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                    <div className="footerNav1-6">
                                        <AnimatePresence>
                                            <motion.h3
                                                onClick={() => navigate(info.routes.cvPageAdmin)}
                                                key="fn1-6A"
                                                whileHover={{
                                                    scale: 1.2,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                CV
                                            </motion.h3>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <div className="footerNav2">
                                <a style={{ textDecoration: "none" }} href={info.profile.link} target="_blank">
                                    <AnimatePresence>
                                        <motion.div
                                            className="footerNav2-1"
                                            key="FN2-1A"
                                            whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="linkedInLogoContainer">
                                                <div className="linkedInLogo" />
                                            </div>
                                            <h3>{info.profile.siteName}</h3>
                                        </motion.div>
                                    </AnimatePresence>
                                </a>
                                <a style={{ textDecoration: "none" }} href={info.projects.link} target="_blank">
                                    <AnimatePresence>
                                        <motion.div
                                            className="footerNav2-2"
                                            key="FN2-2A"
                                            whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="gitHubLogoContainer">
                                                <div className="gitHubLogo" />
                                            </div>
                                            <h3>{info.projects.siteName}</h3>
                                        </motion.div>
                                    </AnimatePresence>
                                </a>
                                <a style={{ textDecoration: "none" }} href={info.videos.link} target="_blank">
                                    <AnimatePresence>
                                        <motion.div
                                            className="footerNav2-3"
                                            key="FN2-3A"
                                            whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="youTubeLogoContainer">
                                                <div className="youTubeLogo" />
                                            </div>
                                            <h3>{info.videos.siteName}</h3>
                                        </motion.div>
                                    </AnimatePresence>
                                </a>
                            </div>
                            <div className="footerNav3">
                                {projectLinks.length > 0 &&
                                    projectLinks.map((projectLink, index) =>
                                        projectLink.disabled ? (
                                            <div className="footerNav3-1D" key={"FN-3-" + index + 1 + "A"} title={"Currently not available"}>
                                                <div className="image" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                                <h3>{projectLink.label}</h3>
                                            </div>
                                        ) : (
                                            <a style={{ textDecoration: "none" }} href={projectLink.link}>
                                                <AnimatePresence>
                                                    <motion.div
                                                        className="footerNav3-1"
                                                        key={"FN-3-" + index + 1 + "A"}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            transition: { duration: 0.1 },
                                                        }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <div className="image" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                                        <h3>{projectLink.label}</h3>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </a>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </footer>
            )}
            {windowWidth < 1280 && <FooterAdminMobile />}
        </>
    );
}

//Mobile:
function FooterAdminMobile() {
    const navigate = useNavigate();
    const projectLinks = info.projectLinks;

    return (
        <footer className="footerAdminMobile">
            <div className="footerMobileTitle">
                <AnimatePresence>
                    <motion.div
                        className="footerMobileTitleLogo"
                        title="Go to dashboard"
                        onClick={() => navigate(info.routes.dashboardPage)}
                        key="fibtl"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <h3>MatrixZone</h3>
            </div>
            <div className="footerMobileContent">
                <div className="footerNav1Mobile">
                    <div className="footerNav1Mobile">
                        <div className="footerNav1-homeMobile">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.homePageAdmin)}
                                    key="fn1-homem"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Home
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                        <div className="footerNav1-1M">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.profilePageAdmin)}
                                    key="fn1-1m"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Profile
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                        <div className="footerNav1-2M">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.projectsPageAdmin)}
                                    key="fn1-2m"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Projects
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                        <div className="footerNav1-3M">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.videosPageAdmin)}
                                    key="fn1-3m"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Videos
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                        <div className="footerNav1-4M">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.goalsPageAdmin)}
                                    key="fn1-4m"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Goals
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                        <div className="footerNav1-5M">
                            <AnimatePresence>
                                <motion.h3
                                    onClick={() => navigate(info.routes.cvPageAdmin)}
                                    key="fn1-5m"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    CV
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="footerNav2Mobile">
                    <a style={{ textDecoration: "none" }} href={info.profile.link} target="_blank">
                        <AnimatePresence>
                            <motion.div
                                className="footerNav2-1M"
                                key="fn2-1m"
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="linkedInLogoContainerMobile">
                                    <div className="linkedInLogoMobile" />
                                </div>
                                <h3>{info.profile.siteName}</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                    <a style={{ textDecoration: "none" }} href={info.projects.link} target="_blank">
                        <AnimatePresence>
                            <motion.div
                                className="footerNav2-2M"
                                key="fn2-2m"
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="gitHubLogoContainerMobile">
                                    <div className="gitHubLogoMobile" />
                                </div>
                                <h3>{info.projects.siteName}</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                    <a style={{ textDecoration: "none" }} href={info.videos.link} target="_blank">
                        <AnimatePresence>
                            <motion.div
                                className="footerNav2-3M"
                                key="fn2-3m"
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="youTubeLogoContainerMobile">
                                    <div className="youTubeLogoMobile" />
                                </div>
                                <h3>{info.videos.siteName}</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                </div>
                <div className="footerNav3Mobile">
                    {projectLinks.length > 0 &&
                        projectLinks.map((projectLink, index) =>
                            projectLink.disabled ? (
                                <div className="footerNav3-1DM" key={"FN-3-" + index + 1 + "A"} title={"Currently not available"}>
                                    <div className="imageMobile" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                    <h3>{projectLink.label}</h3>
                                </div>
                            ) : (
                                <a style={{ textDecoration: "none" }} href={projectLink.link}>
                                    <AnimatePresence>
                                        <motion.div
                                            className="footerNav3-1M"
                                            key={"FN-3-" + index + 1 + "A"}
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="imageMobile" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                            <h3>{projectLink.label}</h3>
                                        </motion.div>
                                    </AnimatePresence>
                                </a>
                            )
                        )}
                </div>
            </div>
        </footer>
    );
}

export default FooterAdmin;
