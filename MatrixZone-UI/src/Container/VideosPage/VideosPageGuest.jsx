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
                    message: "LOGGED IN!",
                    description: "Welcome to the MatrixZone Guest.",
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
                        <VideosPageContent />
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

function VideosPageContent() {
    return <div className="VideosPageContentContainer"></div>;
}

export default VideosPageGuest;
