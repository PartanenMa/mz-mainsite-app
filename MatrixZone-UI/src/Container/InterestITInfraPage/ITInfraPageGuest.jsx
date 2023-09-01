import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ITInfraPage.css";

function ITInfraPageGuest() {
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
            <div className="ITInfraContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / IT_infra</h2>
                </div>
                <div className="ITInfraTitle">
                    <h2>IT INFRASTRUCTURE</h2>
                </div>
                <div className="ITInfraContent">
                    <p>vgsfbhndhfm...</p>
                </div>
                <div className="ITIPBack">
                    <button className="ITIPBackButton" onClick={toggleContainer}>
                        Back
                    </button>
                </div>
            </div>
            <FooterGuest />
        </div>
    );
}

export default ITInfraPageGuest;
