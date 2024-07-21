import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import ResetDbButton from "/src/Components/ResetDbButton/ResetDbButton.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import TimeAndDate from "/src/Components/CurrentTime/TimeAndDate.jsx";
import reactLogo from "/src/Assets/Images/React.svg";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./DashboardPage.scss";

function DashboardPage() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingPinnedProjectsData, setLoadingPinnedProjectsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [pinnedProjects, setPinnedProjects] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getPinnedProjects();
        } else {
            let pinnedProjects = [];

            if (dataFe.projectsData[0]?.title === 0) {
                pinnedProjects.push(dataFe.projectsData[0]);
            } else {
                dataFe.projectsData.map((p) => {
                    if (p.pinned) {
                        pinnedProjects.push(p);
                    }
                });
            }

            setTimeout(() => {
                setPinnedProjects(pinnedProjects);
                setStatusDB(true);
                setLoadingPinnedProjectsData(false);
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

    const checkSession = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        fetch("/login/session", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken }),
        })
            .then((res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    return { statusCode };
                } else {
                    return { statusCode };
                }
            })
            .then(({ statusCode }) => {
                if (statusCode !== 200) {
                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.setItem("csrfToken", "");
                }
            });
    };

    const getPinnedProjects = async () => {
        const message = "Request successful!";

        await fetch("/projects/pinned", {
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
                        setLoadingPinnedProjectsData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setPinnedProjects(data.pinnedProjectsData);
                    setStatusDB(true);
                    setLoadingPinnedProjectsData(false);
                }, 1000);
            });
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    triggerNotification("LOGGED IN AS ADMIN", "Welcome back!", "success");
                }
            }, 2000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    if (isLoggedIn === "true") {
        return (
            <div>
                {loading && load === "true" ? (
                    //Loading component here:
                    <LoadingScreen />
                ) : (
                    <div>
                        <HeaderAdmin />
                        <NavAdmin />
                        {windowWidth >= 1280 && (
                            <div className="dashboardPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{info.routes.dashboardPage}</h2>
                                </div>
                                <LogOutSection />
                                <PinnedProjectsSection loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
                                <DatabaseSettingsSection />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
                        {windowWidth < 1280 && (
                            <div className="dashboardPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>{info.routes.dashboardPage}</h2>
                                </div>
                                <LogOutSectionMobile />
                                <PinnedProjectsSectionMobile loadingPinnedProjectsData={loadingPinnedProjectsData} statusDB={statusDB} pinnedProjects={pinnedProjects} />
                                <DatabaseSettingsSectionMobile />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function LogOutSection() {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisibleY, setIsVisibleY] = useState(true);
    const [BGoption, setBGoption] = useState("OFF");
    const [isGIFVisible, setIsGIFVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let option = document.getElementsByClassName("optionBall")[0];
        let bg = document.getElementsByClassName("optionBG")[0];
        const GIF = sessionStorage.getItem("isAdminGIF");
        if (GIF === "true") {
            setBGoption("ON");
            option.style.left = "60px";
            bg.style.backgroundColor = "lightgreen";
        } else {
            setBGoption("OFF");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        }
    }, []);

    useEffect(() => {
        setIsGIFVisible(BGoption === "ON");
    }, [BGoption]);

    const option = () => {
        let option = document.getElementsByClassName("optionBall")[0];
        let bg = document.getElementsByClassName("optionBG")[0];
        if (BGoption === "ON") {
            setBGoption("OFF");
            sessionStorage.setItem("isAdminGIF", "false");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        } else if (BGoption === "OFF") {
            setBGoption("ON");
            sessionStorage.setItem("isAdminGIF", "true");
            option.style.left = "60px";
            bg.style.backgroundColor = "lightgreen";
        }
    };

    const displayUser1 = () => {
        setIsVisibleY(true);
        setIsVisible4(false);
        setIsVisible3(false);
        setIsVisible2(false);
        setIsVisible1(true);
    };

    const displayUser2 = () => {
        setIsVisibleY(false);
        setIsVisible4(false);
        setIsVisible3(false);
        setIsVisible2(true);
        setIsVisible1(false);
    };

    const displayUser3 = () => {
        setIsVisible2(false);
        setIsVisible3(true);
    };

    const displayUser4 = () => {
        setIsVisible2(false);
        setIsVisible4(true);
    };

    const logOut = () => {
        let option = document.getElementsByClassName("optionBall")[0];
        setBGoption("OFF");
        option.style.left = "0px";
        sessionStorage.setItem("isAdminGIF", "false");
        sessionStorage.setItem("logoutLoad", "true");
        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.setItem("csrfToken", "");
        setIsVisible2(false);
        setIsVisible1(true);
        navigate(info.routes.loginPage);
    };

    return (
        <div className={`logOutSectionAdmin ${isGIFVisible ? "showGIF" : ""}`}>
            <AnimatePresence>
                <motion.div
                    className="logOutContainer1"
                    title="User"
                    style={{ display: isVisible1 ? "block" : "none" }}
                    onClick={() => displayUser2()}
                    key="loc1A"
                    initial={{ opacity: 0, y: -100 }}
                    animate={isVisible1 ? { opacity: 1, y: 0 } : {}}
                    whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={reactLogo} className="logo_react" alt="React logo" />
                    <div className="logoAdmin1"></div>
                    <h3 className="nameAdmin">Admin</h3>
                </motion.div>
            </AnimatePresence>
            <div className="logOutContainer2" style={{ display: isVisible2 ? "block" : "none" }}>
                <h3>Admin</h3>
                <AnimatePresence>
                    <motion.button
                        className="x-buttonAdmin"
                        onClick={() => displayUser1()}
                        key="x-buttonadmin"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        X
                    </motion.button>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.div
                        className="logoAdmin2"
                        onClick={() => navigate(info.routes.profilePageAdmin)}
                        key="logoadmin2"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <AnimatePresence>
                    <motion.button
                        className="settingsButtonAdmin"
                        onClick={() => displayUser3()}
                        key="settingsbuttonadmin"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Settings
                    </motion.button>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.button
                        className="logOutButtonAdmin"
                        onClick={() => displayUser4()}
                        key="logoutbuttonadmin"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Log out
                    </motion.button>
                </AnimatePresence>
            </div>
            <div className="logOutContainer3" style={{ display: isVisible3 ? "block" : "none" }}>
                <h3>Settings</h3>
                <AnimatePresence>
                    <motion.button
                        className="settings_X-button"
                        onClick={() => displayUser1()}
                        key="settings_x-buttonA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        X
                    </motion.button>
                </AnimatePresence>
                <p className="optionText">BG GIF: {BGoption}</p>
                <div className="optionBG" onClick={() => option()}>
                    <div className="optionBall" />
                </div>
                <AnimatePresence>
                    <motion.button
                        className="settingsBackButton"
                        onClick={() => displayUser2()}
                        key="settingsbackbuttonA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Back
                    </motion.button>
                </AnimatePresence>
            </div>
            <div className="logOutContainer4" style={{ display: isVisible4 ? "block" : "none" }}>
                <h3>Log out?</h3>
                <AnimatePresence>
                    <motion.button
                        className="logOut_X-button"
                        onClick={() => displayUser1()}
                        key="logout_x-buttonA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        X
                    </motion.button>
                </AnimatePresence>
                <div className="lOC4Buttons">
                    <AnimatePresence>
                        <motion.button
                            className="logOutButton"
                            onClick={() => logOut()}
                            key="logoutbuttonA"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Log out
                        </motion.button>
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.button
                            className="logOutBackButton"
                            onClick={() => displayUser2()}
                            key="logoutbackbuttonA"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Back
                        </motion.button>
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence>
                <motion.div className="clock" style={{ display: isVisibleY ? "block" : "none" }} key="clockA" initial={{ opacity: 0, x: 300 }} animate={isVisibleY ? { opacity: 1, x: 0 } : {}}>
                    <TimeAndDate />
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <motion.h2 className="welcome" style={{ display: isVisibleY ? "block" : "none" }} key="welcomeA" initial={{ opacity: 0, x: -1000 }} animate={isVisibleY ? { opacity: 1, x: 0 } : {}}>
                    WELCOME ADMIN
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function PinnedProjectsSection({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsSectionAdmin">
            <div className="pPSATitle">
                <h3>
                    PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContent">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProject"
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
                                    <div className="pPCoverTitle">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitle">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContent">
                                        <div className="projectLogo" />
                                        <div className="projectImage" style={{ backgroundImage: `url(${project.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div className="noPinnedProjectsYet" key="nopinnedprojectsyetA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PINNED PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingPinnedProjectsData ? (
                        <motion.div className="loadingPinnedProjectsData" key="loadingpinnedprojectsdataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderPinnedProjects" />
                        </motion.div>
                    ) : (
                        <motion.div className="noPinnedProjectsData" key="nopinnedprojectsdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function DatabaseSettingsSection() {
    return (
        <div className="databaseSettingsSectionAdmin">
            <div className="dBSSATitle">
                <h3>DATABASE SETTINGS</h3>
            </div>
            <div className="dBSSAContent">
                <div className="dBSSAC1"></div>
                <div className="dBSSAC2">
                    <ResetDbButton action={"RESET"} />
                    <ResetDbButton action={"CLEAR"} />
                </div>
            </div>
        </div>
    );
}

//Mobile:
function LogOutSectionMobile() {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisibleY, setIsVisibleY] = useState(true);
    const [BGoption, setBGoption] = useState("OFF");
    const [isGIFVisible, setIsGIFVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let option = document.getElementsByClassName("optionBallMobile")[0];
        let bg = document.getElementsByClassName("optionBGMobile")[0];
        const GIF = sessionStorage.getItem("isAdminGIF");
        if (GIF === "true") {
            setBGoption("ON");
            option.style.left = "60px";
            bg.style.backgroundColor = "lightgreen";
        } else {
            setBGoption("OFF");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        }
    }, []);

    useEffect(() => {
        setIsGIFVisible(BGoption === "ON");
    }, [BGoption]);

    const option = () => {
        let option = document.getElementsByClassName("optionBallMobile")[0];
        let bg = document.getElementsByClassName("optionBGMobile")[0];
        if (BGoption === "ON") {
            setBGoption("OFF");
            sessionStorage.setItem("isAdminGIF", "false");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        } else if (BGoption === "OFF") {
            setBGoption("ON");
            sessionStorage.setItem("isAdminGIF", "true");
            option.style.left = "30px";
            bg.style.backgroundColor = "lightgreen";
        }
    };

    const displayUser1 = () => {
        setIsVisibleY(true);
        setIsVisible4(false);
        setIsVisible3(false);
        setIsVisible2(false);
        setIsVisible1(true);
    };

    const displayUser2 = () => {
        setIsVisibleY(false);
        setIsVisible4(false);
        setIsVisible3(false);
        setIsVisible2(true);
        setIsVisible1(false);
    };

    const displayUser3 = () => {
        setIsVisible2(false);
        setIsVisible3(true);
    };

    const displayUser4 = () => {
        setIsVisible2(false);
        setIsVisible4(true);
    };

    const logOut = () => {
        let option = document.getElementsByClassName("optionBallMobile")[0];
        setBGoption("OFF");
        option.style.left = "0px";
        sessionStorage.setItem("isAdminGIF", "false");
        sessionStorage.setItem("logoutLoad", "true");
        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.setItem("csrfToken", "");
        setIsVisible2(false);
        setIsVisible1(true);
        navigate(info.routes.loginPage);
    };

    return (
        <div className={`logOutSectionAdminMobile ${isGIFVisible ? "showGIFMobile" : ""}`}>
            <div className="logOutSectionMobile">
                <AnimatePresence>
                    <motion.div
                        className="logOutContainer1Mobile"
                        title="User"
                        style={{ display: isVisible1 ? "block" : "none" }}
                        onClick={() => displayUser2()}
                        key="loc1mobileA"
                        initial={{ opacity: 0, y: -100 }}
                        animate={isVisible1 ? { opacity: 1, y: 0 } : {}}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="logoAdmin1Mobile" />
                        <h3 className="nameAdminMobile">Admin</h3>
                        <img src={reactLogo} className="logo_reactMobile" alt="React logo" />
                    </motion.div>
                </AnimatePresence>
                <div className="logOutContainer2Mobile" style={{ display: isVisible2 ? "block" : "none" }}>
                    <h3>Admin</h3>
                    <AnimatePresence>
                        <motion.button
                            className="x-buttonAdminMobile"
                            onClick={() => displayUser1()}
                            key="x-buttonadminmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            X
                        </motion.button>
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.div
                            className="logoAdmin2Mobile"
                            onClick={() => navigate(info.routes.profilePageAdmin)}
                            key="logoadmin2mobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.button
                            className="settingsButtonAdminMobile"
                            onClick={() => displayUser3()}
                            key="settingsbuttonadminmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Settings
                        </motion.button>
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.button
                            className="logOutButtonAdminMobile"
                            onClick={() => displayUser4()}
                            key="logoutbuttonadminmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Log out
                        </motion.button>
                    </AnimatePresence>
                </div>
                <div className="logOutContainer3Mobile" style={{ display: isVisible3 ? "block" : "none" }}>
                    <h3>Settings</h3>
                    <AnimatePresence>
                        <motion.button
                            className="settings_X-buttonMobile"
                            onClick={() => displayUser1()}
                            key="settings_x-buttonmobileA"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            X
                        </motion.button>
                    </AnimatePresence>
                    <p className="optionTextMobile">BG GIF: {BGoption}</p>
                    <div className="optionBGMobile" onClick={() => option()}>
                        <div className="optionBallMobile" />
                    </div>
                    <AnimatePresence>
                        <motion.button
                            className="settingsBackButtonMobile"
                            onClick={() => displayUser2()}
                            key="settingsbackbuttonmobileA"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Back
                        </motion.button>
                    </AnimatePresence>
                </div>
                <div className="logOutContainer4Mobile" style={{ display: isVisible4 ? "block" : "none" }}>
                    <h3>Log out?</h3>
                    <AnimatePresence>
                        <motion.button
                            className="logOut_X-buttonMobile"
                            onClick={() => displayUser1()}
                            key="logout_x-buttonmobileA"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            X
                        </motion.button>
                    </AnimatePresence>
                    <div className="lOC4ButtonsMobile">
                        <AnimatePresence>
                            <motion.button
                                className="logOutButtonMobile"
                                onClick={() => logOut()}
                                key="logoutbuttonmobileA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Log out
                            </motion.button>
                        </AnimatePresence>
                        <AnimatePresence>
                            <motion.button
                                className="logOutBackButtonMobile"
                                onClick={() => displayUser2()}
                                key="logoutbackbuttonmobileA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Back
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
                <AnimatePresence>
                    <motion.div
                        className="clockMobile"
                        style={{ display: isVisibleY ? "block" : "none" }}
                        key="clockA"
                        initial={{ opacity: 0, x: 300 }}
                        animate={isVisibleY ? { opacity: 1, x: 0 } : {}}
                    >
                        <TimeAndDate />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="welcomeSectionMobile">
                <AnimatePresence>
                    <motion.h2
                        className="welcomeMobile"
                        style={{ display: isVisibleY ? "block" : "none" }}
                        key="welcomeA"
                        initial={{ opacity: 0, x: -1000 }}
                        animate={isVisibleY ? { opacity: 1, x: 0 } : {}}
                    >
                        WELCOME ADMIN
                    </motion.h2>
                </AnimatePresence>
            </div>
        </div>
    );
}

function PinnedProjectsSectionMobile({ loadingPinnedProjectsData, statusDB, pinnedProjects }) {
    return (
        <div className="pinnedProjectsSectionAdminMobile">
            <div className="pPSATitleMobile">
                <h3>
                    PINNED PROJECTS <DBstate loading={loadingPinnedProjectsData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="pPSAContentMobile">
                <AnimatePresence>
                    {pinnedProjects.length > 0 && !loadingPinnedProjectsData ? (
                        pinnedProjects[0].title !== 0 ? (
                            pinnedProjects.map((project, index) => (
                                <motion.a
                                    className="pinnedProjectMobile"
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
                                    <div className="pPCoverTitleMobile">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPTitleMobile">
                                        <p>{project.title}</p>
                                    </div>
                                    <div className="pPContentMobile">
                                        <div className="projectLogoMobile" />
                                        <div className="projectImageMobile" style={{ backgroundImage: `url(${project.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div
                                className="noPinnedProjectsYetMobile"
                                key="nopinnedprojectsyetmobileA"
                                transition={{ delay: 0.5 }}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h4>NO PINNED PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingPinnedProjectsData ? (
                        <motion.div className="loadingPinnedProjectsDataMobile" key="loadingpinnedprojectsdatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderPinnedProjectsMobile" />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="noPinnedProjectsDataMobile"
                            key="nopinnedprojectsdatamobileA"
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
    );
}

function DatabaseSettingsSectionMobile() {
    return (
        <div className="databaseSettingsSectionAdminMobile">
            <div className="dBSSATitleMobile">
                <h3>DATABASE SETTINGS</h3>
            </div>
            <div className="dBSSAContentMobile">
                <div className="dBSSAC1M"></div>
                <div className="dBSSAC2M">
                    <ResetDbButton action={"RESET"} />
                    <ResetDbButton action={"CLEAR"} />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
