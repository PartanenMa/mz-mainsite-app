import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./ITInfraPage.css";

function ITInfraPageAdmin() {
    const navigate = useNavigate();

    return (
        <div className="ITInfraPageContent">
            <div className="ITInfraContainer">
                <div className="ITInfraTitle">
                    <h2>IT infrastructure</h2>
                </div>
                <div className="ITInfra">
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

export default ITInfraPageAdmin;