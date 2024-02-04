import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoPage.scss";

function VideoPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        setTimeout(() => {
            //setVideoData(data.videosData);
            setLoadingData(false);
        }, [1000]);
    }, []);

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

        // Close the notification after 5 seconds
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
                        <div className="videoPageContainerAdmin">
                            <div className="breadcrumb">
                                <h2>Admin / videos</h2>
                            </div>
                            <VideoPageTitle />
                            <Description loadingData={loadingData} />
                            <Video loadingData={loadingData} />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
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

function VideoPageTitle() {
    return (
        <div className="videoPageTitleContainer">
            <h2>VIDEO NAME</h2>
        </div>
    );
}

function Description({ loadingData }) {
    return (
        <div className="videoDescriptionContainer">
            <div className="videoDescriptionTitle">
                <h3>
                    DESCRIPTION
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="videoDescriptionContent"></div>
        </div>
    );
}

function Video({ loadingData }) {
    return (
        <div className="videoContainer">
            <div className="videoTitle">
                <h3>
                    VIDEO
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="videoContent"></div>
        </div>
    );
}

export default VideoPageAdmin;
