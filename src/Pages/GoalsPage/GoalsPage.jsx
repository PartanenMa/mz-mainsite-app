import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import "./GoalsPage.css";

function GoalsPage() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        setGoals(data.goalsData);
    }, []);

    return (
        <div className="GP">
            <div className="GoalsPageContainer">
                <GoalsPageTitle />
                <GoalsPageContent goals={goals} />
            </div>
        </div>
    );
}

function GoalsPageTitle() {
    return (
        <div className="GoalsPageTitleContainer">
            <h2>GOALS</h2>
        </div>
    );
}

function GoalsPageContent({ goals }) {
    const getColor = (status) => {
        if (status === "completed") {
            return "green";
        } else if (status === "inprogress") {
            return "yellow";
        } else if (status === "notyetstarted") {
            return "red";
        }
    };

    const getStatus = (status) => {
        if (status === "completed") {
            return "COMPLETED ✔️";
        } else if (status === "inprogress") {
            return "IN PROGRESS 🟡";
        } else if (status === "notyetstarted") {
            return "NOT YET STARTED ❌";
        }
    };

    return (
        <div className="GoalsPageContentContainer">
            {goals.length > 0 ? (
                goals.map((goal, index) => (
                    <div className="Goal" key={index}>
                        <h3>
                            {goal.title}: <span style={{ color: getColor(goal.status) }}>{getStatus(goal.status)}</span>
                        </h3>
                        <p>
                            - {goal.step1.step}{" "}
                            <span style={{ color: getColor(goal.step1.status) }}>{getStatus(goal.step1.status)}</span>
                        </p>
                        <p>
                            - {goal.step2.step}{" "}
                            <span style={{ color: getColor(goal.step2.status) }}>{getStatus(goal.step2.status)}</span>
                        </p>
                        <p>
                            - {goal.step3.step}{" "}
                            <span style={{ color: getColor(goal.step3.status) }}>{getStatus(goal.step3.status)}</span>
                        </p>
                    </div>
                ))
            ) : (
                <div className="NoGoalsData">
                    <h4>NO DATA!</h4>
                </div>
            )}
        </div>
    );
}

export default GoalsPage;
