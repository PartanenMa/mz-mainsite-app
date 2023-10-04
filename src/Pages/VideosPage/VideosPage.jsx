import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.css";

function VideosPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(info.videosData);
    }, []);

    return (
        <div className="VideosPageContainer">
            <VideosPageTitle />
            <AboutMyVideos />
            <Videos videos={videos} />
        </div>
    );
}

function VideosPageTitle() {
    return (
        <div className="VideosPageTitleContainer">
            <h2>VIDEOS</h2>
        </div>
    );
}

function AboutMyVideos() {
    return (
        <div className="AboutMyVideosContainer">
            <div className="AboutMyVideosTitle">
                <h3>ABOUT MY VIDEOS</h3>
            </div>
            <div className="AboutMyVideosContent">
                <AnimatePresence>
                    <motion.a
                        className="AboutMyVideosPhoto"
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
                <div className="AboutMyVideosTextContainer">
                    <div className="AboutMyVideosTextTitle">
                        <h4 className="h4_1">{info.YouTube.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="AboutMyVideosText">
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

function Videos({ videos }) {
    return (
        <div className="VideosContainer">
            <div className="VideosTitle">
                <h3>VIDEOS</h3>
            </div>
            <div className="VideosContent">
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <AnimatePresence>
                            <motion.div
                                className="Video"
                                key={index}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="VideoTitle">
                                    <h4>{video.title}</h4>
                                </div>
                                <div className="VideoContent">
                                    <div className="VideoContentDescription">
                                        <div className="VCDBox1">
                                            <p>
                                                Video category:{" "}
                                                <span style={{ color: "white", fontSize: "15px" }}>
                                                    {video.category}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="VCDBox2">
                                            <div className="VCDBox2Title">
                                                <p>Video description:</p>
                                            </div>
                                            <div className="VCDBox2Content">
                                                <p>{video.description}</p>
                                            </div>
                                        </div>
                                        <div className="VCDBox3">
                                            <p>
                                                Video tags:{" "}
                                                <span style={{ color: "white", fontSize: "15px" }}>{video.tags}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="VideoContentPhoto"
                                        style={{ backgroundImage: `url(${video.image})` }}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))
                ) : (
                    <div className="NoVideosData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideosPage;
