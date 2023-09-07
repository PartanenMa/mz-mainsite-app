import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./GoalsPage.css";

function GoalsPageGuest() {
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
                    <div className="GoalsPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / goals</h2>
                        </div>
                        <GoalsPageTitle />
                        <GoalsPageContent />
                    </div>
                    <FooterGuest />
                </div>
            )}
        </div>
    );
}

function GoalsPageTitle() {
    return (
        <div className="GoalsPageTitleContainer">
            <h2>GOALS</h2>
        </div>
    );
}

function GoalsPageContent() {
    return <div className="GoalsPageContentContainer"></div>;
}

export default GoalsPageGuest;
