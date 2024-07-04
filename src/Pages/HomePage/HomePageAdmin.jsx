import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "/src/Components/Carousel/Carousel.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
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
            getProfession();
            getJob();
        } else {
            setTimeout(() => {
                setLoadingProfessionData(false);
                setLoadingJobData(false);
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
                        {windowWidth >= 1280 && (
                            <div className="homePageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{info.routes.homePageAdmin}</h2>
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
                        )}
                        {windowWidth < 1280 && (
                            <div className="homePageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>{info.routes.homePageAdmin}</h2>
                                </div>
                                <HomePageTitleMobile />
                                <FirstSectionMobile loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
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

function HomePageTitle() {
    return (
        <div className="homePageTitleContainer">
            <h2>HOME</h2>
        </div>
    );
}

function FirstSection({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

    return (
        <div className="firstSectionContainer">
            <section className="homeFirstSectionCarousel">
                <div className="carouselIntro">
                    <div className="cIC">
                        <h1 className="text-shadow"> -- MatrixZone -- </h1>
                        <div className="tags">
                            <p className="text-shadow">
                                <small>My personal website.</small>
                            </p>
                        </div>
                    </div>
                </div>
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
                            title={"My " + info.profile.siteName}
                            href={info.profile.link}
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
                                title={"My " + info.profile.siteName}
                                href={info.profile.link}
                                target="_blank"
                                key="linkedinlogoA"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.profile.siteName}</h3>
                        <p>{info.profile.user}</p>
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.p key="professionorjobdatasuccessA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
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
                                {info.profile.employed ? info.profile.jobTitle : info.profile.profession}
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
                            title={"My " + info.projects.siteName}
                            href={info.projects.link}
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
                                title={"My " + info.projects.siteName}
                                href={info.projects.link}
                                target="_blank"
                                key="ghlogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.projects.siteName}</h3>
                        <p>{info.projects.user}</p>
                        <p>{info.profile.name}</p>
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
                            title={"My " + info.videos.siteName}
                            href={info.videos.link}
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
                                title={"My " + info.videos.siteName}
                                href={info.videos.link}
                                target="_blank"
                                key="ytlogo2A"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.videos.siteName}</h3>
                        <p>{info.videos.user}</p>
                        <p>{info.profile.name}</p>
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

//Mobile:
function HomePageTitleMobile() {
    return (
        <div className="homePageTitleContainerMobile">
            <h2>HOME</h2>
        </div>
    );
}

function FirstSectionMobile({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

    return (
        <div className="firstSectionContainerMobile">
            <section className="homeFirstSectionCarouselMobile">
                <Carousel images={carouselImages} height={"90%"} width={"90%"} />
            </section>
            <section className="homeFirstSection1Mobile">
                <div className="checkMyProfileMobile">
                    <h2>MY PROFILE</h2>
                </div>
                <div className="goToMyProfileMobile">
                    <AnimatePresence>
                        <motion.a
                            className="photoMobile"
                            title={"My " + info.profile.siteName}
                            href={info.profile.link}
                            target="_blank"
                            key="photomobileA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="profileTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title={"My " + info.profile.siteName}
                                href={info.profile.link}
                                target="_blank"
                                key="linkedinlogomobileA"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.profile.siteName}</h3>
                        <p>{info.profile.user}</p>
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.p key="professionorjobdatasuccessmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionDataMobile" key="loadingprofessiondatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionDataMobile" />
                                </motion.div>
                            ) : (
                                <motion.p style={{ color: "red" }} key="professionorjobdatafailmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    NO DATA!{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionDataMobile" key="loadingprofessiondatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionDataMobile" />
                            </motion.div>
                        ) : (
                            <motion.p key="professionorjobdatasuccessmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.profile.employed ? info.profile.jobTitle : info.profile.profession}
                            </motion.p>
                        )}
                        <AnimatePresence>
                            <motion.button
                                className="goToProfileMobile"
                                onClick={() => navigate(info.routes.profilePageAdmin)}
                                key="gotoprofilemobileA"
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
                </div>
            </section>
            <section className="homeFirstSection2Mobile">
                <div className="checkMyProjectsMobile">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="goToMyProjectsMobile">
                    <AnimatePresence>
                        <motion.a
                            className="gHLogoMobile"
                            title={"My " + info.projects.siteName}
                            href={info.projects.link}
                            target="_blank"
                            key="ghlogo1mobileA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="projectsTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title={"My " + info.projects.siteName}
                                href={info.projects.link}
                                target="_blank"
                                key="ghlogo2mobileA"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.projects.siteName}</h3>
                        <p>{info.projects.user}</p>
                        <p>{info.profile.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToProjectsMobile"
                                onClick={() => navigate(info.routes.projectsPageAdmin)}
                                key="gotoprojectsmobileA"
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
                </div>
            </section>
            <section className="homeFirstSection3Mobile">
                <div className="checkMyVideosMobile">
                    <h2>MY VIDEOS</h2>
                </div>
                <div className="goToMyVideosMobile">
                    <AnimatePresence>
                        <motion.a
                            className="yTLogoMobile"
                            title={"My " + info.videos.siteName}
                            href={info.videos.link}
                            target="_blank"
                            key="ytlogo1mobileA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="videosTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title={"My " + info.videos.siteName}
                                href={info.videos.link}
                                target="_blank"
                                key="ytlogo2mobileA"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>{info.videos.siteName}</h3>
                        <p>{info.videos.user}</p>
                        <p>{info.profile.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToVideosMobile"
                                onClick={() => navigate(info.routes.videosPageAdmin)}
                                key="gotovideosmobileA"
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
                </div>
            </section>
            <section className="homeFirstSection4Mobile">
                <div className="checkMyGoalsMobile">
                    <h2>MY GOALS</h2>
                </div>
                <div className="goToMyGoalsMobile">
                    <AnimatePresence>
                        <motion.div
                            className="goalsLogoMobile"
                            title="My goals"
                            onClick={() => navigate(info.routes.goalsPageAdmin)}
                            key="goalslogo1mobileA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="goalsTextBoxMobile">
                        <AnimatePresence>
                            <motion.div
                                className="myGoalsLogoMobile"
                                title="My goals"
                                onClick={() => navigate(info.routes.goalsPageAdmin)}
                                key="goalslogo2mobileA"
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
                                className="goToGoalsMobile"
                                onClick={() => navigate(info.routes.goalsPageAdmin)}
                                key="gotogoalsmobileA"
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
                </div>
            </section>
            <section className="homeFirstSection5Mobile">
                <div className="checkMyCVMobile">
                    <h2>MY CV</h2>
                </div>
                <div className="goToMyCVMobile">
                    <AnimatePresence>
                        <motion.div
                            className="cvLogoMobile"
                            title="My CV"
                            onClick={() => navigate(info.routes.cvPageAdmin)}
                            key="cvlogo1mobileA"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="cvTextBoxMobile">
                        <AnimatePresence>
                            <motion.div
                                className="myCVLogoMobile"
                                title="My CV"
                                onClick={() => navigate(info.routes.cvPageAdmin)}
                                key="cvlogo2mobileA"
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
                                className="goToCVMobile"
                                onClick={() => navigate(info.routes.cvPageAdmin)}
                                key="gotocvmobileA"
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
                </div>
            </section>
        </div>
    );
}

export default HomePageAdmin;
