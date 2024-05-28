import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoPage.scss";

function VideoPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingVideoData, setLoadingVideoData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const { id } = useParams();
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
            getVideo();
        } else {
            setTimeout(() => {
                setVideoData(dataFe.videosData[id]);
                setLoadingVideoData(false);
            }, 1000);
        }
    }, [id]);

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

    const getVideo = () => {
        fetch(`/videos/${id}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setLoadingVideoData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setVideoData(data.foundVideo);
                    setStatusDB(true);
                    setLoadingVideoData(false);
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
                            <div className="videoPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{"Admin / videos / view / " + id}</h2>
                                </div>
                                <MyVideoPageTitle loadingVideoData={loadingVideoData} videoData={videoData} />
                                <MyVideo loadingVideoData={loadingVideoData} videoData={videoData} statusDB={statusDB} />
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
                            <div className="videoPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{"Admin / videos / view / " + id}</h2>
                                </div>
                                <MyVideoPageTitleMobile loadingVideoData={loadingVideoData} videoData={videoData} />
                                <MyVideoMobile loadingVideoData={loadingVideoData} videoData={videoData} statusDB={statusDB} />
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

function MyVideoPageTitle({ loadingVideoData, videoData }) {
    return (
        <AnimatePresence>
            <div className="videoPageTitleContainer">
                {loadingVideoData ? (
                    <motion.h2 key="vpvtA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="vpvtA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {videoData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function MyVideo({ loadingVideoData, videoData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="videoContainer">
            <div className="videoTitle">
                <h3>
                    MY VIDEO
                    <DBstate loading={loadingVideoData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="videoContent">
                <AnimatePresence>
                    <div className="videoContentGoBackAndButtons">
                        <div className="videoGoBack">
                            <motion.button
                                className="goBackBtn"
                                title="Back to videos"
                                onClick={() => navigate(info.routes.videosPageAdmin)}
                                key="backtovideosA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {"<"}
                            </motion.button>
                        </div>
                        <div className="videoButtons">
                            <motion.a
                                className="videoBtn1"
                                title="Watch video on YouTube"
                                key="vbtn1A"
                                href={videoData.videoLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </div>
                    </div>
                </AnimatePresence>
                <AnimatePresence>
                    <div className="videoImage" style={{ backgroundImage: `url(${videoData.image})` }}>
                        {!loadingVideoData && videoData?.videoWatchLink !== "" ? (
                            <motion.iframe src={videoData.videoWatchLink} key="videoplayerA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} />
                        ) : (
                            !loadingVideoData && (
                                <motion.div className="noVideoLink" key="novideolinkA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                                    <p>CAN NOT PLAY VIDEO!</p>
                                    <p>NO VIDEO WATCH LINK!</p>
                                    <a href={videoData.videoLink} target="_blank">
                                        <motion.button
                                            key="watchelsewherebtnA"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Watch on YouTube
                                        </motion.button>
                                    </a>
                                </motion.div>
                            )
                        )}
                    </div>
                </AnimatePresence>
                <div className="videoCategory">
                    {loadingVideoData ? (
                        <p>
                            Category: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Category: <span style={{ color: "white" }}>{videoData.category}</span>
                        </p>
                    )}
                </div>
                <div className="videoDescription">
                    <div className="vDTitle">
                        <p>Video description:</p>
                    </div>
                    <div className="vDContent">{loadingVideoData ? <p>...</p> : <p>{videoData.description}</p>}</div>
                </div>
                <div className="videoTags">
                    {loadingVideoData ? (
                        <p>
                            Tags: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Tags: <span style={{ color: "white" }}>{videoData.tags}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

//Mobile:
function MyVideoPageTitleMobile({ loadingVideoData, videoData }) {
    return (
        <AnimatePresence>
            <div className="videoPageTitleContainerMobile">
                {loadingVideoData ? (
                    <motion.h2 key="vpvtmA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="vpvtmA" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {videoData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function MyVideoMobile({ loadingVideoData, videoData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="videoContainerMobile">
            <div className="videoTitleMobile">
                <h3>
                    MY VIDEO
                    <DBstate loading={loadingVideoData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="videoContentMobile">
                <AnimatePresence>
                    <div className="videoContentGoBackAndButtonsMobile">
                        <div className="videoGoBackMobile">
                            <motion.button
                                className="goBackBtnMobile"
                                title="Back to videos"
                                onClick={() => navigate(info.routes.videosPageAdmin)}
                                key="backtovideosmA"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {"<"}
                            </motion.button>
                        </div>
                        <div className="videoButtonsMobile">
                            <motion.a
                                className="videoBtn1Mobile"
                                title="Watch video on YouTube"
                                key="vbtn1mA"
                                href={videoData.videoLink}
                                target="_blank"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </div>
                    </div>
                </AnimatePresence>
                <AnimatePresence>
                    <div className="videoImageMobile" style={{ backgroundImage: `url(${videoData.image})` }}>
                        {!loadingVideoData && videoData?.videoWatchLink !== "" ? (
                            <motion.iframe src={videoData.videoWatchLink} key="videoplayermA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} />
                        ) : (
                            !loadingVideoData && (
                                <motion.div className="noVideoLinkMobile" key="novideolinkmA" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                                    <p>CAN NOT PLAY VIDEO!</p>
                                    <p>NO VIDEO WATCH LINK!</p>
                                    <a href={videoData.videoLink} target="_blank">
                                        <motion.button
                                            key="watchelsewherebtnmA"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Watch on YouTube
                                        </motion.button>
                                    </a>
                                </motion.div>
                            )
                        )}
                    </div>
                </AnimatePresence>
                <div className="videoCategoryMobile">
                    {loadingVideoData ? (
                        <p>
                            Category: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Category: <span style={{ color: "white" }}>{videoData.category}</span>
                        </p>
                    )}
                </div>
                <div className="videoDescriptionMobile">
                    <div className="vDTitleMobile">
                        <p>Video description:</p>
                    </div>
                    <div className="vDContentMobile">{loadingVideoData ? <p>...</p> : <p>{videoData.description}</p>}</div>
                </div>
                <div className="videoTechMobile">
                    {loadingVideoData ? (
                        <p>
                            Tags: <span style={{ color: "white" }}>...</span>
                        </p>
                    ) : (
                        <p>
                            Tags: <span style={{ color: "white" }}>{videoData.tags}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPageAdmin;
