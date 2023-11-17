import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Nav.scss";

function Nav() {
    const [showBtnHoverEffect1, setShowBtnHoverEffect1] = useState(false);
    const [showBtnHoverEffect2, setShowBtnHoverEffect2] = useState(false);
    const [showBtnHoverEffect3, setShowBtnHoverEffect3] = useState(false);
    const [showBtnHoverEffect4, setShowBtnHoverEffect4] = useState(false);
    const [showBtnHoverEffect5, setShowBtnHoverEffect5] = useState(false);
    const [showBtnHoverEffect6, setShowBtnHoverEffect6] = useState(false);
    const navigate = useNavigate();

    const enableHoverEffect1 = () => {
        setShowBtnHoverEffect1(true);
    };

    const enableHoverEffect2 = () => {
        setShowBtnHoverEffect2(true);
    };

    const enableHoverEffect3 = () => {
        setShowBtnHoverEffect3(true);
    };

    const enableHoverEffect4 = () => {
        setShowBtnHoverEffect4(true);
    };

    const enableHoverEffect5 = () => {
        setShowBtnHoverEffect5(true);
    };

    const enableHoverEffect6 = () => {
        setShowBtnHoverEffect6(true);
    };

    const disableHoverEffect1 = () => {
        setShowBtnHoverEffect1(false);
    };

    const disableHoverEffect2 = () => {
        setShowBtnHoverEffect2(false);
    };

    const disableHoverEffect3 = () => {
        setShowBtnHoverEffect3(false);
    };

    const disableHoverEffect4 = () => {
        setShowBtnHoverEffect4(false);
    };

    const disableHoverEffect5 = () => {
        setShowBtnHoverEffect5(false);
    };

    const disableHoverEffect6 = () => {
        setShowBtnHoverEffect6(false);
    };

    const handleNavClick = (page) => {
        if (page === "home") {
            navigate(info.routes.homePage);
        } else if (page === "profile") {
            navigate(info.routes.profilePage);
        } else if (page === "projects") {
            navigate(info.routes.projectsPage);
        } else if (page === "videos") {
            navigate(info.routes.videosPage);
        } else if (page === "goals") {
            navigate(info.routes.goalsPage);
        } else if (page === "cv") {
            navigate(info.routes.cvPage);
        }
    };

    const handleLoginClick = () => {
        sessionStorage.setItem("logoutLoad", "false");
        navigate(info.routes.loginPage);
    };

    return (
        <AnimatePresence>
            <motion.div className="navOptions" key="navO" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                <div className="navOptionsBar">
                    <motion.button
                        className="navOBtn"
                        onClick={() => handleNavClick("home")}
                        key="navBtn1"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect1()}
                        onMouseLeave={() => disableHoverEffect1()}
                    >
                        {showBtnHoverEffect1 ? (
                            <>
                                &lt;
                                <span className="nB">Home</span>
                                &gt;
                            </>
                        ) : (
                            <span>Home</span>
                        )}
                    </motion.button>
                    <motion.button
                        className="navOBtn"
                        onClick={() => handleNavClick("profile")}
                        key="navBtn2"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect2()}
                        onMouseLeave={() => disableHoverEffect2()}
                    >
                        {showBtnHoverEffect2 ? (
                            <>
                                &lt;
                                <span className="nB">Profile</span>
                                &gt;
                            </>
                        ) : (
                            <span>Profile</span>
                        )}
                    </motion.button>
                    <motion.button
                        className="navOBtn"
                        id="nBtn3"
                        onClick={() => handleNavClick("projects")}
                        key="navBtn3"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect3()}
                        onMouseLeave={() => disableHoverEffect3()}
                    >
                        {showBtnHoverEffect3 ? (
                            <>
                                &lt;
                                <span className="nB">Projects</span>
                                &gt;
                            </>
                        ) : (
                            <span>Projects</span>
                        )}
                    </motion.button>
                    <motion.button
                        className="navOBtn"
                        onClick={() => handleNavClick("videos")}
                        key="navBtn4"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect4()}
                        onMouseLeave={() => disableHoverEffect4()}
                    >
                        {showBtnHoverEffect4 ? (
                            <>
                                &lt;
                                <span className="nB">Videos</span>
                                &gt;
                            </>
                        ) : (
                            <span>Videos</span>
                        )}
                    </motion.button>
                    <motion.button
                        className="navOBtn"
                        onClick={() => handleNavClick("goals")}
                        key="navBtn5"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect5()}
                        onMouseLeave={() => disableHoverEffect5()}
                    >
                        {showBtnHoverEffect5 ? (
                            <>
                                &lt;
                                <span className="nB">Goals</span>
                                &gt;
                            </>
                        ) : (
                            <span>Goals</span>
                        )}
                    </motion.button>
                    <motion.button
                        className="navOBtn"
                        onClick={() => handleNavClick("cv")}
                        key="navBtn6"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => enableHoverEffect6()}
                        onMouseLeave={() => disableHoverEffect6()}
                    >
                        {showBtnHoverEffect6 ? (
                            <>
                                &lt;
                                <span className="nB">CV</span>
                                &gt;
                            </>
                        ) : (
                            <span>CV</span>
                        )}
                    </motion.button>
                </div>
                <motion.button
                    className="loginButtonFP"
                    onClick={() => handleLoginClick()}
                    key="navB"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    Log in
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
}

export default Nav;
