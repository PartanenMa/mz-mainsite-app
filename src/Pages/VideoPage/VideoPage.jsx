import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoPage.scss";

function VideoPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingVideoData, setLoadingVideoData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
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

    return (
        <div className="vPV">
            {windowWidth >= 1280 && (
                <div className="videoPageContainer">
                    <VideoPageTitle loadingVideoData={loadingVideoData} videoData={videoData} />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <Video loadingVideoData={loadingVideoData} videoData={videoData} statusDB={statusDB} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="videoPageContainer">
                    <VideoPageTitleMobile loadingVideoData={loadingVideoData} videoData={videoData} />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <VideoMobile loadingVideoData={loadingVideoData} videoData={videoData} statusDB={statusDB} />
                </div>
            )}
        </div>
    );
}

function VideoPageTitle({ loadingVideoData, videoData }) {
    return (
        <AnimatePresence>
            <div className="videoPageTitleContainer">
                {loadingVideoData ? (
                    <motion.h2 key="vpvt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="vpvt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {videoData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function Video({ loadingVideoData, videoData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="videoContainer">
            <div className="videoTitle">
                <h3>
                    VIDEO
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
                                onClick={() => navigate(info.routes.videosPage)}
                                key="backtovideos"
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
                                title={"Watch video on " + info.videos.siteName}
                                key="vbtn1"
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
                    <div className="videoImage">
                        {!loadingVideoData && videoData?.videoWatchLink !== "" ? (
                            <motion.iframe src={videoData.videoWatchLink} key="videoplayer" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} />
                        ) : (
                            !loadingVideoData && (
                                <motion.div className="noVideoLink" key="novideolink" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                                    <p>CAN NOT PLAY VIDEO!</p>
                                    <p>NO VIDEO WATCH LINK!</p>
                                    <a href={videoData.videoLink} target="_blank">
                                        <motion.button
                                            key="watchelsewherebtn"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {"Watch on " + info.videos.siteName}
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
function VideoPageTitleMobile({ loadingVideoData, videoData }) {
    return (
        <AnimatePresence>
            <div className="videoPageTitleContainerMobile">
                {loadingVideoData ? (
                    <motion.h2 key="vpvtm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        ...
                    </motion.h2>
                ) : (
                    <motion.h2 key="vpvtm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                        {videoData.title}
                    </motion.h2>
                )}
            </div>
        </AnimatePresence>
    );
}

function VideoMobile({ loadingVideoData, videoData, statusDB }) {
    const navigate = useNavigate();

    return (
        <div className="videoContainerMobile">
            <div className="videoTitleMobile">
                <h3>
                    VIDEO
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
                                onClick={() => navigate(info.routes.videosPage)}
                                key="backtovideosm"
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
                                title={"Watch video on " + info.videos.siteName}
                                key="pbtn1m"
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
                    <div className="videoImageMobile">
                        {!loadingVideoData && videoData?.videoWatchLink !== "" ? (
                            <motion.iframe src={videoData.videoWatchLink} key="videoplayerm" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} />
                        ) : (
                            !loadingVideoData && (
                                <motion.div className="noVideoLinkMobile" key="novideolinkm" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                                    <p>CAN NOT PLAY VIDEO!</p>
                                    <p>NO VIDEO WATCH LINK!</p>
                                    <a href={videoData.videoLink} target="_blank">
                                        <motion.button
                                            key="watchelsewherebtnm"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {"Watch on " + info.videos.siteName}
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

export default VideoPage;
