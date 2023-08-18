import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./ProgrammingPage.css";

function ProgrammingPageGuest() {
    const navigate = useNavigate();

    return (
        <div className="ProgrammingPageContent">
            <div className="ProgrammingContainer">
                <div className="ProgrammingTitle">
                    <h2>Programming</h2>
                </div>
                <div className="Programming">
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

export default ProgrammingPageGuest;