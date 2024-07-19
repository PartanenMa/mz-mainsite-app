import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./PortfolioPage.scss";

function PortfolioPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
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
                            <div className="portfolioPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>
                                        {"/admin/"}
                                        <span title={"Back to projects"} style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPageAdmin)}>
                                            {"projects"}
                                        </span>
                                        {"/portfolio"}
                                    </h2>
                                </div>
                                <Main />
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
                            <div className="portfolioPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>
                                        {"/admin/"}
                                        <span title={"Back to projects"} style={{ cursor: "pointer" }} onClick={() => navigate(info.routes.projectsPageAdmin)}>
                                            {"projects"}
                                        </span>
                                        {"/portfolio"}
                                    </h2>
                                </div>
                                <MainMobile />
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

function Main() {
    return (
        <div className="main">
            <div className="firstSection">
                <AnimatePresence>
                    <motion.div className="firstSectionTitle" key="firstsectiontitleA" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <h2>{"<MY PORTFOLIO/>"}</h2>
                    </motion.div>
                    <div className="firstSectionContent">
                        <motion.div className="firstSectionBox" key="firstsectionboxA" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                            <div className="firstSectionImg"></div>
                            <div className="firstSectionInfo">
                                <h3>{info.profile.name}</h3>
                                <div className="professionOrJobContainer">
                                    <p style={{ color: info.profile.employed ? info.profile.companyColor : "#03a062" }}>{info.profile.employed ? info.profile.jobTitle : info.profile.profession}</p>
                                    {info.profile.employed && (
                                        <a href={info.profile.companyInfoLink} target="_blank">
                                            <div
                                                className="companyLogo"
                                                style={{ "--company-color": info.profile.companyColor, height: "30px", width: "50px", backgroundImage: `url(${info.profile.companyLogo})` }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
            <div className="aboutMeSection">
                <div className="aboutMeTitle">
                    <h2>ABOUT ME</h2>
                </div>
                <div className="aboutMeContent">
                    <div className="aboutMeTextContainer">
                        <p>{info.profile.description1}</p>
                        <p>{info.profile.description2}</p>
                        <p>{info.profile.description3}</p>
                    </div>
                </div>
            </div>
            <div className="projectsSection">
                <div className="projectsTitle">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="projectsContent"></div>
            </div>
        </div>
    );
}

//Mobile:
function MainMobile() {
    return (
        <div className="mainMobile">
            <div className="firstSectionMobile">
                <AnimatePresence>
                    <motion.div className="firstSectionTitleMobile" key="firstsectiontitlemobileA" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <h2>{"<MY PORTFOLIO/>"}</h2>
                    </motion.div>
                    <div className="firstSectionContentMobile">
                        <motion.div className="firstSectionBoxMobile" key="firstsectionboxmobileA" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                            <div className="firstSectionImgMobile"></div>
                            <div className="firstSectionInfoMobile">
                                <h3>{info.profile.name}</h3>
                                <div className="professionOrJobContainerMobile">
                                    <p style={{ color: info.profile.employed ? info.profile.companyColor : "#03a062" }}>{info.profile.employed ? info.profile.jobTitle : info.profile.profession}</p>
                                    {info.profile.employed && (
                                        <a href={info.profile.companyInfoLink} target="_blank">
                                            <div
                                                className="companyLogoMobile"
                                                style={{ "--company-color": info.profile.companyColor, height: "10px", width: "15px", backgroundImage: `url(${info.profile.companyLogo})` }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
            <div className="aboutMeSectionMobile">
                <div className="aboutMeTitleMobile">
                    <h2>ABOUT ME</h2>
                </div>
                <div className="aboutMeContentMobile">
                    <div className="aboutMeTextContainerMobile">
                        <p>{info.profile.description1}</p>
                        <p>{info.profile.description2}</p>
                        <p>{info.profile.description3}</p>
                    </div>
                </div>
            </div>
            <div className="projectsSectionMobile">
                <div className="projectsTitleMobile">
                    <h2>MY PROJECTS</h2>
                </div>
                <div className="projectsContentMobile"></div>
            </div>
        </div>
    );
}

export default PortfolioPageAdmin;
