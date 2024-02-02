import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import "./GoalsPage.scss";

function GoalsPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setGoals(data.goalsData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="gP">
            <div className="goalsPageContainer">
                <GoalsPageTitle />
                <GoalsCount loadingData={loadingData} goals={goals} />
                {data.statusDB !== "disabled" && <GoalsStatus loadingData={loadingData} />}
                <GoalsPageContent loadingData={loadingData} goals={goals} />
            </div>
        </div>
    );
}

function GoalsPageTitle() {
    return (
        <div className="goalsPageTitleContainer">
            <h2>GOALS</h2>
        </div>
    );
}

function GoalsCount({ loadingData, goals }) {
    const getLoader = () => {
        return <span style={{ fontStyle: "normal" }}>...</span>;
    };

    const getCompletedGoals = () => {
        let completedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "completed") {
                completedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{completedCount + " ✔️"}</span>;
    };

    const getInProgressGoals = () => {
        let inProgressCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "inprogress") {
                inProgressCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{inProgressCount + " 🟡"}</span>;
    };

    const getNotYetStartedGoals = () => {
        let notYetStartedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "notyetstarted") {
                notYetStartedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{notYetStartedCount + " ❌"}</span>;
    };

    return (
        <div className="goalsCountContainer">
            <p>
                COMPLETED: <span style={{ color: "green" }}>{loadingData ? getLoader() : getCompletedGoals()}</span>
            </p>
            <p>
                IN PROGRESS: <span style={{ color: "yellow" }}>{loadingData ? getLoader() : getInProgressGoals()}</span>
            </p>
            <p>
                NOT YET STARTED: <span style={{ color: "red" }}>{loadingData ? getLoader() : getNotYetStartedGoals()}</span>
            </p>
        </div>
    );
}

function GoalsStatus({ loadingData }) {
    return !loadingData && <div className="goalsStatusContainer">{data?.statusDB ? <p className="gStatus1">FROM: DB MAIN</p> : <p className="gStatus2">FROM: DB BACKUP</p>}</div>;
}

function GoalsPageContent({ loadingData, goals }) {
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
        <div className="goalsPageContentContainer">
            {goals.length > 0 ? (
                goals.map((goal, index) => (
                    <div className="goal" key={index}>
                        <h3>
                            {goal.title}: <span style={{ color: getColor(goal.status), fontStyle: "normal" }}>{getStatus(goal.status)}</span>
                        </h3>
                        <p>
                            - {goal.step1.step} <span style={{ color: getColor(goal.step1.status), fontStyle: "normal" }}>{getStatus(goal.step1.status)}</span>
                        </p>
                        <p>
                            - {goal.step2.step} <span style={{ color: getColor(goal.step2.status), fontStyle: "normal" }}>{getStatus(goal.step2.status)}</span>
                        </p>
                        <p>
                            - {goal.step3.step} <span style={{ color: getColor(goal.step3.status), fontStyle: "normal" }}>{getStatus(goal.step3.status)}</span>
                        </p>
                    </div>
                ))
            ) : loadingData ? (
                <div className="loadingGoalsData">
                    <div className="loaderGoals" />
                </div>
            ) : (
                <div className="noGoalsData">
                    <h4>NO DATA!</h4>
                </div>
            )}
        </div>
    );
}

export default GoalsPage;
