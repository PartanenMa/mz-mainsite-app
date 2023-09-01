import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CampingPage.css";

function CampingPageGuest() {
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
            <div className="CampingContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / camping</h2>
                </div>
                <div className="CampingTitle">
                    <h2>CAMPING</h2>
                </div>
                <div className="CampingContent">
                    <p>vgsfbhndhfm...</p>
                </div>
                <div className="CPBack">
                    <button className="CPBackButton" onClick={toggleContainer}>
                        Back
                    </button>
                </div>
            </div>
            <FooterGuest />
        </div>
    );
}

export default CampingPageGuest;
