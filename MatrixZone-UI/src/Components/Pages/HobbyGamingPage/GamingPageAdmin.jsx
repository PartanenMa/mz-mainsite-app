import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./GamingPage.css";

function GamingPageAdmin() {
    const navigate = useNavigate();

    return (
        <div className="GamingPageContent">
            <div className="GamingContainer">
                <div className="GamingTitle">
                    <h2>Gaming</h2>
                </div>
                <div className="Gaming">
                    <p>
                        vgsfbhndhfm...
                    </p>
                </div>
                <div className="Back">
                    <button className="BackButton" onClick={() => navigate(info.routes.profilePageAdmin)}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default GamingPageAdmin;