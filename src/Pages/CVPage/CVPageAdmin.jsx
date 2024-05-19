import { useState, useEffect } from "react";
import Notification from "/src/Components/Notification/Notification.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CVPage.scss";

function CVPageAdmin() {
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
                setProfessionData(data);
                setTimeout(() => {
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
            }, 1000);

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
                            <div className="cvPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>Admin / cv</h2>
                                </div>
                                <CVPageTitle />
                                <CVPageContent loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
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
                            <div className="cvPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>Admin / cv</h2>
                                </div>
                                <CVPageTitleMobile />
                                <CVPageContentMobile loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
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

function CVPageTitle() {
    return (
        <div className="cvPageTitleContainer">
            <h2>MY CV</h2>
        </div>
    );
}

function CVPageContent({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    return (
        <div className="cvPageContentContainer">
            <AnimatePresence>
                <div className="cvContent">
                    <motion.h1 key="cvcnA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                        {info.LinkedIn.name}
                    </motion.h1>
                    {info.api.enabled ? (
                        !loadingProfessionData || !loadingJobData ? (
                            <motion.h2 key="porjA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                {jobData?.jobStatus.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}
                            </motion.h2>
                        ) : (
                            <motion.h2 style={{ fontStyle: "normal" }} key="porjloaderA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                ...
                            </motion.h2>
                        )
                    ) : !loadingProfessionData || !loadingJobData ? (
                        <motion.h2 key="porjA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            {info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}
                        </motion.h2>
                    ) : (
                        <motion.h2 style={{ fontStyle: "normal" }} key="porjloaderA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            ...
                        </motion.h2>
                    )}
                    <div />
                </div>
            </AnimatePresence>
            <GeneratePDF />
        </div>
    );
}

//Mobile:
function CVPageTitleMobile() {
    return (
        <div className="cvPageTitleContainerMobile">
            <h2>MY CV</h2>
        </div>
    );
}

function CVPageContentMobile({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    return (
        <div className="cvPageContentContainerMobile">
            <AnimatePresence>
                <div className="cvContentMobile">
                    <motion.h1 key="cvcnmA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                        {info.LinkedIn.name}
                    </motion.h1>
                    {info.api.enabled ? (
                        !loadingProfessionData || !loadingJobData ? (
                            <motion.h2 key="porjmobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                {jobData?.jobStatus.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}
                            </motion.h2>
                        ) : (
                            <motion.h2 style={{ fontStyle: "normal" }} key="porjloadermobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                ...
                            </motion.h2>
                        )
                    ) : !loadingProfessionData || !loadingJobData ? (
                        <motion.h2 key="porj" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            {info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}
                        </motion.h2>
                    ) : (
                        <motion.h2 style={{ fontStyle: "normal" }} key="porjloadermobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            ...
                        </motion.h2>
                    )}
                    <div />
                </div>
            </AnimatePresence>
            <GeneratePDF />
        </div>
    );
}

export default CVPageAdmin;
