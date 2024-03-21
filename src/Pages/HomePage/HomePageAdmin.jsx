import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "/src/Components/Carousel/Carousel.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import TimeAndDate from "/src/Components/CurrentTime/TimeAndDate.jsx";
import reactLogo from "/src/Assets/Images/React.svg";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Carousel1 from "/src/Assets/Images/Carousel1.jpg";
import Carousel2 from "/src/Assets/Images/Carousel2.jpg";
import Carousel3 from "/src/Assets/Images/Carousel3.jpg";
import "./HomePage.scss";

function HomePageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getProfession();
            getJob();
        } else {
            setTimeout(() => {
                setLoadingProfessionData(false);
                setLoadingJobData(false);
            }, 1000);
        }
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
                }
            });
    };

    const getProfession = () => {
        fetch("/profession", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProfessionData(data);
                    setLoadingProfessionData(false);
                }, 1000);
            });
    };

    const getJob = () => {
        fetch("/job", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setJobData(data);
                    setLoadingJobData(false);
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
                        <div className="homePageContainerAdmin">
                            <div className="breadcrumb">
                                <h2>Admin / home</h2>
                            </div>
                            <HomePageTitle />
                            <FirstSection loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
                        </div>
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function HomePageTitle() {
    return (
        <div className="homePageTitleContainer">
            <h2>HOME</h2>
        </div>
    );
}

function FirstSection({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisibleY, setIsVisibleY] = useState(true);
    const [BGoption, setBGoption] = useState("OFF");
    const [isGIFVisible, setIsGIFVisible] = useState(true);
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

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
        <div className="firstSectionContainer">
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
                    <motion.h2
                        className="welcome"
                        style={{ display: isVisibleY ? "block" : "none" }}
                        key="welcomeA"
                        initial={{ opacity: 0, x: -1000 }}
                        animate={isVisibleY ? { opacity: 1, x: 0 } : {}}
                    >
                        WELCOME ADMIN
                    </motion.h2>
                </AnimatePresence>
            </div>
            <section className="homeFirstSectionCarousel">
                <Carousel images={carouselImages} height={"550px"} width={"900px"} />
            </section>
            <section className="homeFirstSection1">
                <div className="checkMyProfile">
                    <h2>MY PROFILE</h2>
                </div>
                <div className="goToMyProfile">
                    <AnimatePresence>
                        <motion.a
                            className="photo"
                            title="My LinkedIn"
                            href={info.LinkedIn.link}
                            target="_blank"
                            key="photoA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="profileTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My LinkedIn"
                                href={info.LinkedIn.link}
                                target="_blank"
                                key="linkedinlogoA"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>LinkedIn</h3>
                        <p>{info.LinkedIn.user}</p>
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.p key="professionorjobdatasuccessA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionData" key="loadingprofessiondataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionData" />
                                </motion.div>
                            ) : (
                                <motion.p style={{ color: "red" }} key="professionorjobdatafailA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    NO DATA!{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionData" key="loadingprofessiondataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionData" />
                            </motion.div>
                        ) : (
                            <motion.p key="professionorjobdatasuccessA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle : info.LinkedIn.profession}
                            </motion.p>
                        )}
                        <AnimatePresence>
                            <motion.button
                                className="goToProfile"
                                onClick={() => navigate(info.routes.profilePageAdmin)}
                                key="gotoprofileA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Profile
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box1" />
                </div>
            </section>
            <section className="homeFirstSection2">
                <div className="checkMyProjects">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="goToMyProjects">
                    <AnimatePresence>
                        <motion.a
                            className="gHLogo"
                            title="My GitHub"
                            href={info.GitHub.link}
                            target="_blank"
                            key="ghlogo1A"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="projectsTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My GitHub"
                                href={info.GitHub.link}
                                target="_blank"
                                key="ghlogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>GitHub</h3>
                        <p>{info.GitHub.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToProjects"
                                onClick={() => navigate(info.routes.projectsPageAdmin)}
                                key="gotoprojectsA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Projects
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box2" />
                </div>
            </section>
            <section className="homeFirstSection3">
                <div className="checkMyVideos">
                    <h2>MY VIDEOS</h2>
                </div>
                <div className="goToMyVideos">
                    <AnimatePresence>
                        <motion.a
                            className="yTLogo"
                            title="My YouTube"
                            href={info.YouTube.link}
                            target="_blank"
                            key="ytlogo1A"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="videosTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My YouTube"
                                href={info.YouTube.link}
                                target="_blank"
                                key="ytlogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>YouTube</h3>
                        <p>{info.YouTube.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToVideos"
                                onClick={() => navigate(info.routes.videosPageAdmin)}
                                key="gotovideosA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Videos
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box3" />
                </div>
            </section>
            <section className="homeFirstSection4">
                <div className="checkMyGoals">
                    <h2>MY GOALS</h2>
                </div>
                <div className="goToMyGoals">
                    <AnimatePresence>
                        <motion.div
                            className="goalsLogo"
                            title="My goals"
                            onClick={() => navigate(info.routes.goalsPageAdmin)}
                            key="goalslogo1A"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="goalsTextBox">
                        <AnimatePresence>
                            <motion.div
                                className="myGoalsLogo"
                                title="My goals"
                                onClick={() => navigate(info.routes.goalsPageAdmin)}
                                key="goalslogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My goals</h3>
                        <p>All of my goals.</p>
                        <p>Can be viewed.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToGoals"
                                onClick={() => navigate(info.routes.goalsPageAdmin)}
                                key="gotogoalsA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Goals
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box4" />
                </div>
            </section>
            <section className="homeFirstSection5">
                <div className="checkMyCV">
                    <h2>MY CV</h2>
                </div>
                <div className="goToMyCV">
                    <AnimatePresence>
                        <motion.div
                            className="cvLogo"
                            title="My CV"
                            onClick={() => navigate(info.routes.cvPageAdmin)}
                            key="cvlogo1A"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="cvTextBox">
                        <AnimatePresence>
                            <motion.div
                                className="myCVLogo"
                                title="My CV"
                                onClick={() => navigate(info.routes.cvPageAdmin)}
                                key="cvlogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My CV</h3>
                        <p>My experience summed up.</p>
                        <p>Can be downloaded.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToCV"
                                onClick={() => navigate(info.routes.cvPageAdmin)}
                                key="gotocvA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                CV
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box5" />
                </div>
            </section>
        </div>
    );
}

export default HomePageAdmin;
