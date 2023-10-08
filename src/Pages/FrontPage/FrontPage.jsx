import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./FrontPage.css";

function FrontPage() {
    return (
        <div className="FP">
            <div className="FrontPageContainer">
                <Main />
            </div>
        </div>
    );
}

function Main() {
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        if (page === "profile") {
            navigate(info.routes.profilePage);
        } else if (page === "projects") {
            navigate(info.routes.projectsPage);
        } else if (page === "videos") {
            navigate(info.routes.videosPage);
        }
    };

    return (
        <main className="Main">
            <section className="HeroSection">
                <AnimatePresence>
                    <motion.div
                        className="HeroTitle"
                        key="heroT"
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 1000 }}
                    >
                        <div className="HTWelcome1">
                            <h3 className="HTW1text">
                                Hi, 👋 I'm <span style={{ color: "green" }}>{info.LinkedIn.name}</span>
                            </h3>
                        </div>
                        <div className="HTWelcome2">
                            <p>I'm a</p>
                            <div className="HTW2animation">
                                <div className="HTW2first">
                                    <div>{info.LinkedIn.profession}</div>
                                </div>
                                <div className="HTW2second">
                                    <div>Software Developer</div>
                                </div>
                                <div className="HTW2third">
                                    <div>IT Engineer</div>
                                </div>
                            </div>
                        </div>
                        <div className="HTWelcome3">
                            <h3>Welcome to the MatrixZone</h3>
                        </div>
                    </motion.div>
                    <motion.div
                        className="HeroContent"
                        key="heroC"
                        initial={{ opacity: 0, x: 1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -1000 }}
                    >
                        <motion.div
                            className="HeroContent1"
                            onClick={() => handleNavigation("profile")}
                            key="heroC1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="HC-1T">PROFILE</h2>
                            <div className="HC1-1">
                                <div className="TitleProfile">
                                    <h3>View my profile</h3>
                                    <div className="LogoProfile" />
                                </div>
                                <div className="ContentProfile">
                                    <p>- About me.</p>
                                    <p>- My educational background.</p>
                                    <p>- My programming skills.</p>
                                    <p>
                                        - My experience as a <br />
                                        software developer.
                                    </p>
                                </div>
                            </div>
                            <div className="HC1-2" />
                        </motion.div>
                        <motion.div
                            className="HeroContent2"
                            onClick={() => handleNavigation("projects")}
                            key="heroC2"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="HC-2T">PROJECTS</h2>
                            <div className="HC2-1">
                                <div className="TitleProjects">
                                    <h3>View my projects</h3>
                                    <div className="LogoProjects" />
                                </div>
                                <div className="ContentProjects">
                                    <p>- About my projects.</p>
                                    <p>- My projects.</p>
                                </div>
                            </div>
                            <div className="HC2-2" />
                        </motion.div>
                        <motion.div
                            className="HeroContent3"
                            onClick={() => handleNavigation("videos")}
                            key="heroC3"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="HC-3T">VIDEOS</h2>
                            <div className="HC3-1">
                                <div className="TitleVideos">
                                    <h3>View my videos</h3>
                                    <div className="LogoVideos" />
                                </div>
                                <div className="ContentVideos">
                                    <p>- About my videos.</p>
                                    <p>- My videos.</p>
                                </div>
                            </div>
                            <div className="HC3-2" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </section>
        </main>
    );
}

export default FrontPage;
