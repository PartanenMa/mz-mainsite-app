import { useState, useEffect } from "react";
import { notification } from "antd";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideosPage.css";

function VideosPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(data.videosData);
    }, []);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN AS ADMIN",
                        description: "Welcome back!",
                        placement: "bottomLeft",
                        style: {
                            backgroundColor: "lightgreen",
                            border: "3px solid green",
                        },
                    });
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

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
                        <div className="VideosPageContainerAdmin">
                            <div className="Breadcrumb">
                                <h2>Admin / videos</h2>
                            </div>
                            <VideosPageTitle />
                            <AboutMyVideos />
                            <Videos videos={videos} />
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

function VideosPageTitle() {
    return (
        <div className="VideosPageTitleContainer">
            <h2>MY VIDEOS</h2>
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
                        key="aboutmyviedosphotoA"
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

export default VideosPageAdmin;
