import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.css";

function FooterAdmin() {
    return (
        <footer className="FooterContainer">
            <FooterInfoBox />
            <FooterTitle />
            <FooterBoxLeft />
            <FooterBoxMiddle />
            <FooterBoxRight />
            <FooterBoxNames />
        </footer>
    );
}

function FooterInfoBox() {
    const navigate = useNavigate();

    return (
        <div className="FooterInfoBoxContainer">
            <div className="FooterInfoBoxTitle">
                <AnimatePresence>
                    <motion.div
                        className="FooterInfoBoxTitleLogo"
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
            <div className="FooterInfoBoxContent">
                <AnimatePresence>
                    <div className="FooterNav1">
                        <div className="FooterNav1">
                            <div className="FooterNav1-1">
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
                            </div>
                            <div className="FooterNav1-2">
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
                            </div>
                            <div className="FooterNav1-3">
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
                            </div>
                            <div className="FooterNav1-4">
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
                            </div>
                            <div className="FooterNav1-5">
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
                            </div>
                        </div>
                    </div>
                    <div className="FooterNav2">
                        <a style={{ textDecoration: "none" }} href={info.LinkedIn.link} target="_blank">
                            <motion.div
                                className="FooterNav2-1"
                                key="FN2-1A"
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
                        </a>
                        <a style={{ textDecoration: "none" }} href={info.GitHub.link} target="_blank">
                            <motion.div
                                className="FooterNav2-2"
                                key="FN2-2A"
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
                        </a>
                        <a style={{ textDecoration: "none" }} href={info.YouTube.link} target="_blank">
                            <motion.div
                                className="FooterNav2-3"
                                key="FN2-3A"
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
                        </a>
                    </div>
                    <div className="FooterNav3">
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
                </AnimatePresence>
            </div>
        </div>
    );
}

function FooterTitle() {
    return (
        <div className="FooterTitleText">
            <h3>MADE USING:</h3>
        </div>
    );
}

function FooterBoxLeft() {
    return (
        <div className="LeftBox">
            <a href="https://react.dev" target="_blank">
                <AnimatePresence>
                    <motion.div
                        className="ReactLogo"
                        key="reactlogoA"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
            </a>
        </div>
    );
}

function FooterBoxMiddle() {
    return (
        <div className="MiddleBox">
            <a href="https://vitejs.dev" target="_blank">
                <AnimatePresence>
                    <motion.div
                        className="ViteLogo"
                        key="vitelogoA"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
            </a>
        </div>
    );
}

function FooterBoxRight() {
    return (
        <div className="RightBox">
            <a
                href="https://en.wikipedia.org/wiki/JavaScript#:~:text=JavaScript%20(%2F%CB%88d%CA%92%C9%91%CB%90v,often%20incorporating%20third-party%20librarie"
                target="_blank"
            >
                <AnimatePresence>
                    <motion.div
                        className="JSLogo"
                        key="jslogoA"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
            </a>
        </div>
    );
}

function FooterBoxNames() {
    return (
        <div className="FooterNames">
            <h3 id="ReactText">React</h3>
            <h3 id="ViteText">Vite</h3>
            <h3 id="JSText">JavaScript</h3>
        </div>
    );
}

export default FooterAdmin;
