import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./VideosPage.css";

function VideosPageGuest() {
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.success({
                    message: "LOGGED IN AS GUEST",
                    description: "Welcome to the MatrixZone!",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightgreen",
                        border: "3px solid green",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 1000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LoadingScreen />
            ) : (
                <div>
                    <HeaderGuest />
                    <NavGuest />
                    <div className="VideosPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / videos</h2>
                        </div>
                        <VideosPageTitle />
                        <AboutMyVideos />
                    </div>
                    <FooterGuest />
                </div>
            )}
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
                <a className="AboutMyVideosPhoto" title="My YouTube" href={info.YouTube.link} target="_blank" />
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

export default VideosPageGuest;
