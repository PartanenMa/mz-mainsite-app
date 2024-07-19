import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.scss";

function Footer() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const location = useLocation();
    const appLinks = info.appLinks;

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
                <footer className="footer">
                    <div className="footerInfoBoxContainerCenter">
                        <div className="footerInfoBoxContainer">
                            <div className="footerInfoBoxTitle" style={{ marginBottom: "10px" }}>
                                <AnimatePresence>
                                    <motion.div
                                        className="footerInfoBoxTitleLogo"
                                        title={location.pathname === info.routes.frontPage ? "" : "Go to front page"}
                                        onClick={() => navigate(info.routes.frontPage)}
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
                            <div className="footerInfoBoxContent">
                                <div className="footerNav1" style={{ borderLeft: "1px solid #03a062", borderRight: "1px solid #03a062" }}>
                                    <div className="footerNav1">
                                        <div className="footerNav1-home">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.homePage)}
                                                    key="FN1-home"
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
                                        <div className="footerNav1-1">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.profilePage)}
                                                    key="FN1-1"
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
                                        <div className="footerNav1-2">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.projectsPage)}
                                                    key="FN1-2"
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
                                        <div className="footerNav1-3">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.videosPage)}
                                                    key="FN1-3"
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
                                        <div className="footerNav1-4">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.goalsPage)}
                                                    key="FN1-4"
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
                                        <div className="footerNav1-5">
                                            <AnimatePresence>
                                                <motion.h3
                                                    onClick={() => navigate(info.routes.cvPage)}
                                                    key="FN1-5"
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
                                <div className="footerNav2" style={{ borderRight: "1px solid #03a062" }}>
                                    <a style={{ textDecoration: "none" }} href={info.profile.link} target="_blank">
                                        <AnimatePresence>
                                            <motion.div
                                                className="footerNav2-1"
                                                key="FN2-1"
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
                                                key="FN2-2"
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
                                                key="FN2-3"
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
                                <div className="footerNav3" style={{ borderRight: "1px solid #03a062" }}>
                                    {appLinks.length > 0 &&
                                        appLinks.map((appLink, index) =>
                                            appLink.disabled ? (
                                                <div className="footerNav3-1D" key={`FN-3-${index}`} title="Currently not available">
                                                    <div className="image" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                    <h3>{appLink.label}</h3>
                                                </div>
                                            ) : (
                                                <a style={{ textDecoration: "none" }} href={appLink.link} key={`FN-3-${index}`}>
                                                    <AnimatePresence>
                                                        <motion.div
                                                            className="footerNav3-1"
                                                            whileHover={{
                                                                scale: 1.1,
                                                                transition: { duration: 0.1 },
                                                            }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <div className="image" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                            <h3>{appLink.label}</h3>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </a>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
            {windowWidth < 1280 && <FooterMobile />}
        </>
    );
}

//Mobile:
function FooterMobile() {
    const navigate = useNavigate();
    const location = useLocation();
    const appLinks = info.appLinks;

    return (
        <footer className="footerMobile">
            <div className="footerMobileTitle">
                <AnimatePresence>
                    <motion.div
                        className="footerMobileTitleLogo"
                        title={location.pathname === info.routes.frontPage ? "" : "Go to front page"}
                        onClick={() => navigate(info.routes.frontPage)}
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
                                    onClick={() => navigate(info.routes.homePage)}
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
                                    onClick={() => navigate(info.routes.profilePage)}
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
                                    onClick={() => navigate(info.routes.projectsPage)}
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
                                    onClick={() => navigate(info.routes.videosPage)}
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
                                    onClick={() => navigate(info.routes.goalsPage)}
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
                                    onClick={() => navigate(info.routes.cvPage)}
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
                    {appLinks.length > 0 &&
                        appLinks.map((appLink, index) =>
                            appLink.disabled ? (
                                <div className="footerNav3-1DM" key={`FN-3-${index}`} title="Currently not available">
                                    <div className="imageMobile" style={{ backgroundImage: `url(${appLink.image})` }} />
                                    <h3>{appLink.label}</h3>
                                </div>
                            ) : (
                                <a style={{ textDecoration: "none" }} href={appLink.link} key={`FN-3-${index}`}>
                                    <AnimatePresence>
                                        <motion.div
                                            className="footerNav3-1M"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="imageMobile" style={{ backgroundImage: `url(${appLink.image})` }} />
                                            <h3>{appLink.label}</h3>
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

export default Footer;
