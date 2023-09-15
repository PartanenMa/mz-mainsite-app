import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.css";

function CVPageGuest() {
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
                    <div className="CVPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / cv</h2>
                        </div>
                        <CVPageTitle />
                        <CVPageContent />
                    </div>
                    <FooterGuest />
                </div>
            )}
        </div>
    );
}

function CVPageTitle() {
    return (
        <div className="CVPageTitleContainer">
            <h2>CV</h2>
        </div>
    );
}

function CVPageContent() {
    return (
        <div className="CVPageContentContainer">
            <div className="CVContent">
                <h1>{info.LinkedIn.name}</h1>
                <h2>{info.LinkedIn.profession}</h2>
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPageGuest;
