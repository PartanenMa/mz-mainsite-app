import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
        <>
            {windowWidth >= 1280 && (
                <AnimatePresence>
                    <motion.div className="navOptions" key="navO" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="navOptionsBar">
                            <motion.button
                                className="navOBtn"
                                onClick={() => handleNavClick("home")}
                                key="navbtn1"
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
                                key="navbtn2"
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
                                key="navbtn3"
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
                                key="navbtn4"
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
                                key="navbtn5"
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
                                key="navbtn6"
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
                            key="navb"
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
            )}

            {windowWidth < 1280 && <NavMobile />}
        </>
    );
}

function NavMobile() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const handleMobileNavClick = (page) => {
        toggleMobileNav();

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

    return (
        <AnimatePresence>
            <div className="navMobileContainer">
                <motion.div
                    className={`menu-toggle ${isMobileNavOpen ? "open" : ""}`}
                    onClick={() => toggleMobileNav()}
                    key="menutoggleopenorclosed"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="hamburgerLine" />
                    <div className="hamburgerLine" />
                    <div className="hamburgerLine" />
                </motion.div>
                <nav className={`menu ${isMobileNavOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("home")}>
                                Home
                            </motion.p>
                        </li>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("profile")}>
                                Profile
                            </motion.p>
                        </li>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("projects")}>
                                Projects
                            </motion.p>
                        </li>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("videos")}>
                                Videos
                            </motion.p>
                        </li>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("goals")}>
                                Goals
                            </motion.p>
                        </li>
                        <li>
                            <motion.p whileTap={{ scale: 0.9 }} onClick={() => handleMobileNavClick("cv")}>
                                CV
                            </motion.p>
                        </li>
                        <li>
                            <motion.p style={{ color: "red" }} whileTap={{ scale: 0.9 }} onClick={() => toggleMobileNav()}>
                                Close
                            </motion.p>
                        </li>
                    </ul>
                </nav>
            </div>
        </AnimatePresence>
    );
}

export default Nav;
