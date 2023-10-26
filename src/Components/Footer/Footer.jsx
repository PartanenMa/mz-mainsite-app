import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.css";

function Footer() {
    return (
        <footer className="Footer">
            <FooterInfoBox />
        </footer>
    );
}

function FooterInfoBox() {
    const navigate = useNavigate();

    return (
        <div className="FooterInfoBoxContainerCenter">
            <div className="FooterInfoBoxContainer">
                <div className="FooterInfoBoxTitle" style={{ marginBottom: "10px" }}>
                    <AnimatePresence>
                        <motion.div
                            className="FooterInfoBoxTitleLogo"
                            title="Go to front page"
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
                <div className="FooterInfoBoxContent">
                    <div className="FooterNav1" style={{ borderLeft: "1px solid #03a062", borderRight: "1px solid #03a062" }}>
                        <div className="FooterNav1">
                            <div className="FooterNav1-home">
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
                            <div className="FooterNav1-1">
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
                            <div className="FooterNav1-2">
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
                            <div className="FooterNav1-3">
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
                            <div className="FooterNav1-4">
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
                            <div className="FooterNav1-5">
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
                    <div className="FooterNav2" style={{ borderRight: "1px solid #03a062" }}>
                        <a style={{ textDecoration: "none" }} href={info.LinkedIn.link} target="_blank">
                            <AnimatePresence>
                                <motion.div
                                    className="FooterNav2-1"
                                    key="FN2-1"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="LinkedInLogoContainer">
                                        <div className="LinkedInLogo" />
                                    </div>
                                    <h3>LinkedIn</h3>
                                </motion.div>
                            </AnimatePresence>
                        </a>
                        <a style={{ textDecoration: "none" }} href={info.GitHub.link} target="_blank">
                            <AnimatePresence>
                                <motion.div
                                    className="FooterNav2-2"
                                    key="FN2-2"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="GitHubLogoContainer">
                                        <div className="GitHubLogo" />
                                    </div>
                                    <h3>GitHub</h3>
                                </motion.div>
                            </AnimatePresence>
                        </a>
                        <a style={{ textDecoration: "none" }} href={info.YouTube.link} target="_blank">
                            <AnimatePresence>
                                <motion.div
                                    className="FooterNav2-3"
                                    key="FN2-3"
                                    whileHover={{
                                        scale: 1.2,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="YouTubeLogoContainer">
                                        <div className="YouTubeLogo" />
                                    </div>
                                    <h3>YouTube</h3>
                                </motion.div>
                            </AnimatePresence>
                        </a>
                    </div>
                    <div className="FooterNav3" style={{ borderRight: "1px solid #03a062" }}>
                        <div className="FooterNav3-1">
                            <h3></h3>
                        </div>
                        <div className="FooterNav3-2">
                            <h3></h3>
                        </div>
                        <div className="FooterNav3-3">
                            <h3></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
