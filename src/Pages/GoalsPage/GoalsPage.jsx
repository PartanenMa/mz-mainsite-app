import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./GoalsPage.scss";

function GoalsPage() {
    const [loadingGoalsData, setLoadingGoalsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getGoals();
        } else {
            setTimeout(() => {
                setGoals(dataFe.goalsData);
                setLoadingGoalsData(false);
            }, 1000);
        }
    }, []);

    const getGoals = () => {
        fetch("/goals")
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setLoadingGoalsData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setGoals(data.goalsData);
                    setStatusDB(true);
                    setLoadingGoalsData(false);
                }, 1000);
            });
    };

    return (
        <div className="gP">
            <div className="goalsPageContainer">
                <GoalsPageTitle />
                <GoalsCount loadingGoalsData={loadingGoalsData} goals={goals} />
                <GoalsStatus loadingGoalsData={loadingGoalsData} statusDB={statusDB} />
                <GoalsPageContent loadingGoalsData={loadingGoalsData} goals={goals} />
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

function GoalsCount({ loadingGoalsData, goals }) {
    const getLoader = () => {
        return (
            <AnimatePresence>
                <motion.span style={{ fontStyle: "normal" }} key="goalloader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ...
                </motion.span>
            </AnimatePresence>
        );
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
            <AnimatePresence>
                <motion.p key="goalcount1" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    COMPLETED: <span style={{ color: "green" }}>{loadingGoalsData ? getLoader() : getCompletedGoals()}</span>
                </motion.p>
                <motion.p key="goalcount2" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    IN PROGRESS: <span style={{ color: "yellow" }}>{loadingGoalsData ? getLoader() : getInProgressGoals()}</span>
                </motion.p>
                <motion.p key="goalcount3" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    NOT YET STARTED: <span style={{ color: "red" }}>{loadingGoalsData ? getLoader() : getNotYetStartedGoals()}</span>
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

function GoalsStatus({ loadingGoalsData, statusDB }) {
    return (
        !loadingGoalsData &&
        info.api.enabled && (
            <AnimatePresence>
                <motion.div className="goalsStatusContainer" key="gstatuscont" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {statusDB ? (
                        <motion.p className="gStatus1" key="goalstatus1" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH SUCCESS
                        </motion.p>
                    ) : (
                        <motion.p className="gStatus2" key="goalstatus2" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH FAILED
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        )
    );
}

function GoalsPageContent({ loadingGoalsData, goals }) {
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
            <AnimatePresence>
                {goals.length > 0 ? (
                    goals.map((goal, index) => (
                        <motion.div className="goal" key={index} transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
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
                        </motion.div>
                    ))
                ) : loadingGoalsData ? (
                    <motion.div className="loadingGoalsData" key="loadinggoalsdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="loaderGoals" />
                    </motion.div>
                ) : (
                    <motion.div className="noGoalsData" key="nogoalsdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                        <h4>NO DATA!</h4>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default GoalsPage;
