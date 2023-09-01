import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./GamingPage.css";

function GamingPageGuest() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageGuest);
        }, 500);
    };

    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="GamingContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / gaming</h2>
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
            <FooterGuest />
        </div>
    );
}

export default GamingPageGuest;
