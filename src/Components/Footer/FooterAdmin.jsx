import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./footer.scss";

function FooterAdmin() {
    return (
        <footer className="footerContainer">
            <FooterInfoBox />
        </footer>
    );
}

function FooterInfoBox() {
    const navigate = useNavigate();

    return (
        <div className="footerInfoBoxContainer">
            <div className="footerInfoBoxTitle">
                <AnimatePresence>
                    <motion.div
                        className="footerInfoBoxTitleLogo"
                        title="Go to home page"
                        onClick={() => navigate(info.routes.homePageAdmin)}
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
                                    onClick={() => navigate(info.routes.profilePageAdmin)}
                                    key="FN1-1A"
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
                                    onClick={() => navigate(info.routes.projectsPageAdmin)}
                                    key="FN1-2A"
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
                                    onClick={() => navigate(info.routes.videosPageAdmin)}
                                    key="FN1-3A"
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
                                    onClick={() => navigate(info.routes.goalsPageAdmin)}
                                    key="FN1-4A"
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
                                    onClick={() => navigate(info.routes.cvPageAdmin)}
                                    key="FN1-5A"
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
                    <a style={{ textDecoration: "none" }} href={info.LinkedIn.link} target="_blank">
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
                                <h3>LinkedIn</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                    <a style={{ textDecoration: "none" }} href={info.GitHub.link} target="_blank">
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
                                <h3>GitHub</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                    <a style={{ textDecoration: "none" }} href={info.YouTube.link} target="_blank">
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
                                <h3>YouTube</h3>
                            </motion.div>
                        </AnimatePresence>
                    </a>
                </div>
                <div className="footerNav3">
                    <div className="footerNav3-1">
                        <h3></h3>
                    </div>
                    <div className="footerNav3-2">
                        <h3></h3>
                    </div>
                    <div className="footerNav3-3">
                        <h3></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterAdmin;
