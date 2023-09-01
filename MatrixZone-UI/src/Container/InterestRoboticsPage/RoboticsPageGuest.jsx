import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./RoboticsPage.css";

function RoboticsPageGuest() {
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
            <div className="RoboticsContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile / robotics</h2>
                </div>
                <div className="RoboticsTitle">
                    <h2>ROBOTICS</h2>
                </div>
                <div className="RoboticsContent">
                    <p>vgsfbhndhfm...</p>
                </div>
                <div className="RPBack">
                    <button className="RPBackButton" onClick={toggleContainer}>
                        Back
                    </button>
                </div>
            </div>
            <FooterGuest />
        </div>
    );
}

export default RoboticsPageGuest;
