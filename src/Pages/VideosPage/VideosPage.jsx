import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.scss";

function VideosPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setVideos(data.videosData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="vP">
            <div className="videosPageContainer">
                <VideosPageTitle />
                <AboutMyVideos loadingData={loadingData} />
                <Videos loadingData={loadingData} videos={videos} />
            </div>
        </div>
    );
}

function VideosPageTitle() {
    return (
        <div className="videosPageTitleContainer">
            <h2>VIDEOS</h2>
        </div>
    );
}

function AboutMyVideos({ loadingData }) {
    return (
        <div className="aboutMyVideosContainer">
            <div className="aboutMyVideosTitle">
                <h3>
                    ABOUT MY VIDEOS
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="aboutMyVideosContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyVideosPhoto"
                        title="My YouTube"
                        href={info.YouTube.link}
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
                        <h4 className="h4_1">{info.YouTube.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="aboutMyVideosText">
                        <p>
                            {info.YouTube.description1}
                            <br />
                            <br />
                            {info.YouTube.description2}
                            <br />
                            <br />
                            {info.YouTube.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Videos({ loadingData, videos }) {
    return (
        <div className="videosContainer">
            <div className="videosTitle">
                <h3>
                    VIDEOS
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="videosContent">
                <AnimatePresence>
                    {videos.length > 0 ? (
                        videos[0].title !== 0 ? (
                            videos.map((video, index) => (
                                <motion.a
                                    className="video"
                                    href={video.link}
                                    target="_blank"
                                    key={index}
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                >
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
                                        <div className="videoContentPhoto" style={{ backgroundImage: `url(${video.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div className="noVideosYet" key="novideosyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO VIDEOS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingData ? (
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

export default VideosPage;
