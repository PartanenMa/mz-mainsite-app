import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./GamingPage.css";

function GamingPageAdmin() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageAdmin);
        }, 500);
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN!",
                        description: "Welcome back Admin.",
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
                        <div className="GamingContainer">
                            <div className="Breadcrumb">
                                <h2>Admin / profile / gaming</h2>
                            </div>
                            <div className="GamingTitle">
                                <h2>GAMING</h2>
                            </div>
                            <div className="GamingContent">
                                <p>vgsfbhndhfm...</p>
                            </div>
                            <div className="GPBack">
                                <button className="GPBackButton" onClick={toggleContainer}>
                                    Back
                                </button>
                            </div>
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

export default GamingPageAdmin;
