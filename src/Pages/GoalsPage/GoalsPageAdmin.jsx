import { useState, useEffect } from "react";
import { notification } from "antd";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import "./GoalsPage.css";

function GoalsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        setGoals(data.goalsData);
    }, []);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN AS ADMIN",
                        description: "Welcome back!",
                        placement: "bottomLeft",
                        style: {
                            backgroundColor: "lightgreen",
                            border: "3px solid green",
                        },
                    });
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    if (isLoggedIn === "true") {
        return (
            <div>
                {loading && load === "true" ? (
                    //Loading component here:
                    <LoadingScreen />
                ) : (
                    <div>
                        <HeaderAdmin />
                        <NavAdmin />
                        <div className="GoalsPageContainerAdmin">
                            <div className="Breadcrumb">
                                <h2>Admin / goals</h2>
                            </div>
                            <GoalsPageTitle />
                            <GoalsPageContent goals={goals} />
                        </div>
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function GoalsPageTitle() {
    return (
        <div className="GoalsPageTitleContainer">
            <h2>MY GOALS</h2>
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
            return "COMPLETED";
        } else if (status === "inprogress") {
            return "IN PROGRESS";
        } else if (status === "notyetstarted") {
            return "NOT YET STARTED";
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

export default GoalsPageAdmin;
