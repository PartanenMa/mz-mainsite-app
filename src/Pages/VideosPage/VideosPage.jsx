import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.scss";

function VideosPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingVideosData, setLoadingVideosData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [videos, setVideos] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
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

    const checkConnection = () => {
        fetch("/connection", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            const statusCode = res.status;

            if (statusCode === 200) {
                setConnection(true);
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            }
        });
    };

    const getVideos = () => {
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

    return (
        <div className="vP">
            {windowWidth >= 1280 && (
                <div className="videosPageContainer">
                    <VideosPageTitle />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <Breadcrumb />
                    <AboutMyVideos />
                    <Videos loadingVideosData={loadingVideosData} statusDB={statusDB} videos={videos} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="videosPageContainerMobile">
                    <VideosPageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <BreadcrumbMobile />
                    <AboutMyVideosMobile />
                    <VideosMobile loadingVideosData={loadingVideosData} statusDB={statusDB} videos={videos} />
                </div>
            )}
        </div>
    );
}

function VideosPageTitle() {
    return (
        <div className="videosPageTitleContainer">
            <AnimatePresence>
                <motion.h2 key="vpt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    VIDEOS
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function Breadcrumb() {
    return (
        <div className="breadcrumb">
            <div className="breadcrumbLogo" />
            <div className="breadcrumbText">
                <h2>{info.routes.videosPage}</h2>
            </div>
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
                        key="aboutmyviedosphoto"
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

function Videos({ loadingVideosData, statusDB, videos }) {
    const navigate = useNavigate();

    return (
        <div className="videosContainer">
            <div className="videosTitle">
                <h3>
                    VIDEOS
                    <DBstate loading={loadingVideosData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="videosContent">
                <AnimatePresence>
                    {videos.length > 0 ? (
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
                                        <h4>{video.title}</h4>
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
                                                    key="vbtn1"
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
                                                    key="vbtn2"
                                                    onClick={info.deployToGHPages ? () => navigate(`/mz-personalwebsite-app/videos/watch/${video.id}`) : () => navigate(`/videos/watch/${video.id}`)}
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
                            <motion.div className="noVideosYet" key="novideosyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingVideosData ? (
                        <motion.div className="loadingVideosData" key="loadingvideosdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderVideos" />
                        </motion.div>
                    ) : (
                        <motion.div className="noVideosData" key="novideosdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
            <AnimatePresence>
                <motion.h2 key="vptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    VIDEOS
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function BreadcrumbMobile() {
    return (
        <div className="breadcrumbMobile">
            <div className="breadcrumbLogoMobile" />
            <div className="breadcrumbTextMobile">
                <h2>{info.routes.videosPage}</h2>
            </div>
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
                        key="aboutmyviedosphotomobile"
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

function VideosMobile({ loadingVideosData, statusDB, videos }) {
    const navigate = useNavigate();

    return (
        <div className="videosContainerMobile">
            <div className="videosTitleMobile">
                <h3>
                    VIDEOS
                    <DBstate loading={loadingVideosData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="videosContentMobile">
                <AnimatePresence>
                    {videos.length > 0 ? (
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
                                        <h4>{video.title}</h4>
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
                                                    key="vbtn1m"
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
                                                    key="vbtn2m"
                                                    onClick={info.deployToGHPages ? () => navigate(`/mz-personalwebsite-app/videos/watch/${video.id}`) : () => navigate(`/videos/watch/${video.id}`)}
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
                            <motion.div className="noVideosYetMobile" key="novideosyetmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingVideosData ? (
                        <motion.div className="loadingVideosDataMobile" key="loadingvideosdatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderVideosMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noVideosDataMobile" key="novideosdatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default VideosPage;
