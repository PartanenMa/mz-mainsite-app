import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import CRUDVideosButton from "/src/Components/CRUDVideosButton/CRUDVideosButton.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.scss";

function VideosPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingVideosData, setLoadingVideosData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [videos, setVideos] = useState([]);
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
            getVideos();
        } else {
            setTimeout(() => {
                setVideos(dataFe.videosData);
                setLoadingVideosData(false);
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

    const getVideosAfterCreate = async () => {
        setLoadingVideosData(true);
        await getVideos();
        triggerNotification("VIDEO CREATED", "Video created successfully!", "success");
    };

    const getVideosAfterUpdate = async () => {
        setLoadingVideosData(true);
        await getVideos();
        triggerNotification("VIDEO UPDATED", "Video updated successfully!", "success");
    };

    const getVideosAfterDelete = async () => {
        setLoadingVideosData(true);
        await getVideos();
        triggerNotification("VIDEO DELETED", "Video deleted successfully!", "success");
    };

    const getVideos = async () => {
        fetch("/videos", {
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
                    setLoadingVideosData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setVideos(data.videosData);
                    setStatusDB(true);
                    setLoadingVideosData(false);
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
                            <div className="videosPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{info.routes.videosPageAdmin}</h2>
                                </div>
                                <VideosPageTitle />
                                <AboutMyVideos />
                                <MyVideos
                                    loadingVideosData={loadingVideosData}
                                    statusDB={statusDB}
                                    videos={videos}
                                    getVideosC={() => getVideosAfterCreate()}
                                    getVideosU={() => getVideosAfterUpdate()}
                                    getVideosD={() => getVideosAfterDelete()}
                                />
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
                            <div className="videosPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>{info.routes.videosPageAdmin}</h2>
                                </div>
                                <VideosPageTitleMobile />
                                <AboutMyVideosMobile />
                                <MyVideosMobile
                                    loadingVideosData={loadingVideosData}
                                    statusDB={statusDB}
                                    videos={videos}
                                    getVideosC={() => getVideosAfterCreate()}
                                    getVideosU={() => getVideosAfterUpdate()}
                                    getVideosD={() => getVideosAfterDelete()}
                                />
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

function VideosPageTitle() {
    return (
        <div className="videosPageTitleContainer">
            <h2>MY VIDEOS</h2>
        </div>
    );
}

function AboutMyVideos() {
    return (
        <div className="aboutMyVideosContainer">
            <div className="aboutMyVideosTitle">
                <h3>ABOUT MY VIDEOS</h3>
            </div>
            <div className="aboutMyVideosContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyVideosPhoto"
                        title={"My " + info.videos.siteName}
                        href={info.videos.link}
                        target="_blank"
                        key="aboutmyviedosphotoA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyVideosTextContainer">
                    <div className="aboutMyVideosTextTitle">
                        <h4 className="h4_1">{info.videos.user}</h4>
                        <h4 className="h4_2">{info.profile.name}</h4>
                    </div>
                    <div className="aboutMyVideosText">
                        <p>
                            {info.videos.description1}
                            <br />
                            <br />
                            {info.videos.description2}
                            <br />
                            <br />
                            {info.videos.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyVideos({ loadingVideosData, statusDB, videos, getVideosC, getVideosU, getVideosD }) {
    const navigate = useNavigate();

    return (
        <div className="videosContainer">
            <div className="videosTitle">
                <h3>
                    MY VIDEOS
                    <DBstate loading={loadingVideosData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createVideo">
                    <CRUDVideosButton loading={loadingVideosData} action={"Create"} getVideos={getVideosC} />
                </div>
            )}
            <div className="videosContent">
                <AnimatePresence>
                    {videos.length > 0 && !loadingVideosData ? (
                        videos[0].title !== 0 ? (
                            videos.map((video, index) => (
                                <motion.div
                                    className="video"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="videoCoverTitle">
                                        <h2>{video.title}</h2>
                                    </div>
                                    <div className="videoTitle">
                                        <div className="videoTitleSection1">
                                            <h4>{video.title}</h4>
                                        </div>
                                        <div className="videoTitleSection2">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDVideosButton loading={loadingVideosData} action={"Update"} id={video.id} getVideos={getVideosU} />
                                                    <CRUDVideosButton loading={loadingVideosData} action={"Delete"} id={video.id} getVideos={getVideosD} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="videoContent">
                                        <div className="videoContentDescription">
                                            <div className="vCDBox1">
                                                <p>
                                                    Video category: <span style={{ color: "white", fontSize: "15px" }}>{video.category}</span>
                                                </p>
                                            </div>
                                            <div className="vCDBox2">
                                                <div className="vCDBox2Title">
                                                    <p>Video description:</p>
                                                </div>
                                                <div className="vCDBox2Content">
                                                    <p>{video.description}</p>
                                                </div>
                                            </div>
                                            <div className="vCDBox3">
                                                <p>
                                                    Video tags: <span style={{ color: "white", fontSize: "15px" }}>{video.tags}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="videoContentOther">
                                            <div className="videoContentPhoto" style={{ backgroundImage: `url(${video.image})` }} />
                                            <div className="videoContentButtons">
                                                <motion.a
                                                    className="videoBtn1"
                                                    title={"Watch video on " + info.videos.siteName}
                                                    key="vbtn1A"
                                                    href={video.videoLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.button
                                                    className="videoBtn2"
                                                    key="vbtn2A"
                                                    onClick={
                                                        info.deployToGHPages
                                                            ? () => navigate(`/mz-personalwebsite-app/admin/videos/watch/${video.id}`)
                                                            : () => navigate(`/admin/videos/watch/${video.id}`)
                                                    }
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    Watch video
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="noVideosYet" key="novideosyetA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingVideosData ? (
                        <motion.div className="loadingVideosData" key="loadingvideosdataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderVideos" />
                        </motion.div>
                    ) : (
                        <motion.div className="noVideosData" key="novideosdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

//Mobile:
function VideosPageTitleMobile() {
    return (
        <div className="videosPageTitleContainerMobile">
            <h2>MY VIDEOS</h2>
        </div>
    );
}

function AboutMyVideosMobile() {
    return (
        <div className="aboutMyVideosContainerMobile">
            <div className="aboutMyVideosTitleMobile">
                <h3>ABOUT MY VIDEOS</h3>
            </div>
            <div className="aboutMyVideosContentMobile">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyVideosPhotoMobile"
                        title={"My " + info.videos.siteName}
                        href={info.videos.link}
                        target="_blank"
                        key="aboutmyviedosphotomobileA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyVideosTextContainerMobile">
                    <div className="aboutMyVideosTextTitleMobile">
                        <h4 className="h4_1M">{info.videos.user}</h4>
                        <h4 className="h4_2M">{info.profile.name}</h4>
                    </div>
                    <div className="aboutMyVideosTextMobile">
                        <p>
                            {info.videos.description1}
                            <br />
                            <br />
                            {info.videos.description2}
                            <br />
                            <br />
                            {info.videos.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyVideosMobile({ loadingVideosData, statusDB, videos, getVideosC, getVideosU, getVideosD }) {
    const navigate = useNavigate();

    return (
        <div className="videosContainerMobile">
            <div className="videosTitleMobile">
                <h3>
                    MY VIDEOS
                    <DBstate loading={loadingVideosData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createVideoMobile">
                    <CRUDVideosButton loading={loadingVideosData} action={"Create"} getVideos={getVideosC} />
                </div>
            )}
            <div className="videosContentMobile">
                <AnimatePresence>
                    {videos.length > 0 && !loadingVideosData ? (
                        videos[0].title !== 0 ? (
                            videos.map((video, index) => (
                                <motion.div
                                    className="videoMobile"
                                    key={index}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className="videoCoverTitleMobile">
                                        <h2>{video.title}</h2>
                                    </div>
                                    <div className="videoTitleMobile">
                                        <div className="videoTitleSection1Mobile">
                                            <h4>{video.title}</h4>
                                        </div>
                                        <div className="videoTitleSection2Mobile">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDVideosButton loading={loadingVideosData} action={"Update"} id={video.id} getVideos={getVideosU} />
                                                    <CRUDVideosButton loading={loadingVideosData} action={"Delete"} id={video.id} getVideos={getVideosD} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="videoContentMobile">
                                        <div className="videoContentDescriptionMobile">
                                            <div className="vCDBox1Mobile">
                                                <p>
                                                    Video category: <span style={{ color: "white", fontSize: "10px" }}>{video.category}</span>
                                                </p>
                                            </div>
                                            <div className="vCDBox2Mobile">
                                                <div className="vCDBox2TitleMobile">
                                                    <p>Video description:</p>
                                                </div>
                                                <div className="vCDBox2ContentMobile">
                                                    <p>{video.description}</p>
                                                </div>
                                            </div>
                                            <div className="vCDBox3Mobile">
                                                <p>
                                                    Video tags: <span style={{ color: "white", fontSize: "10px" }}>{video.tags}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="videoContentOtherMobile">
                                            <div className="videoContentPhotoMobile" style={{ backgroundImage: `url(${video.image})` }} />
                                            <div className="videoContentButtonsMobile">
                                                <motion.a
                                                    className="videoBtn1Mobile"
                                                    title={"Watch video on " + info.videos.siteName}
                                                    key="vbtn1mA"
                                                    href={video.videoLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                                <motion.button
                                                    className="videoBtn2Mobile"
                                                    key="vbtn2mA"
                                                    onClick={
                                                        info.deployToGHPages
                                                            ? () => navigate(`/mz-personalwebsite-app/admin/videos/watch/${video.id}`)
                                                            : () => navigate(`/admin/videos/watch/${video.id}`)
                                                    }
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    Watch video
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="noVideosYetMobile" key="novideosyetmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingVideosData ? (
                        <motion.div className="loadingVideosDataMobile" key="loadingvideosdatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderVideosMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noVideosDataMobile" key="novideosdatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default VideosPageAdmin;
