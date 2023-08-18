import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./CampingPage.css";

function CampingPageGuest() {
    const navigate = useNavigate();

    return (
        <div className="CampingPageContent">
            <div className="CampingContainer">
                <div className="CampingTitle">
                    <h2>Camping</h2>
                </div>
                <div className="Camping">
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

export default CampingPageGuest;