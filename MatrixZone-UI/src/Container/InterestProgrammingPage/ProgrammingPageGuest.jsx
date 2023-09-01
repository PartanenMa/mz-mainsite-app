import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ProgrammingPage.css";

function ProgrammingPageGuest() {
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
            <div className="ProgrammingContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / programming</h2>
                </div>
                <div className="ProgrammingTitle">
                    <h2>PROGRAMMING</h2>
                </div>
                <div className="ProgrammingContent">
                    <p>vgsfbhndhfm...</p>
                </div>
                <div className="PPBack">
                    <button className="PPBackButton" onClick={toggleContainer}>
                        Back
                    </button>
                </div>
            </div>
            <FooterGuest />
        </div>
    );
}

export default ProgrammingPageGuest;
