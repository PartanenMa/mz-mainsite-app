import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./RoboticsPage.css";

function RoboticsPageGuest() {
    const navigate = useNavigate();

    return (
        <div className="RoboticsPageContent">
            <div className="RoboticsContainer">
                <div className="RoboticsTitle">
                    <h2>Robotics</h2>
                </div>
                <div className="Robotics">
                    <p>
                        vgsfbhndhfm...
                    </p>
                </div>
                <div className="Back">
                    <button className="BackButton" onClick={() => navigate(info.routes.profilePageGuest)}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default RoboticsPageGuest;