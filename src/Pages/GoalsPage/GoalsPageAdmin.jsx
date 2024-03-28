import { useState, useEffect } from "react";
import Notification from "/src/Components/Notification/Notification.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import CRUDGoalsButton from "/src/Components/CRUDGoalsButton/CRUDGoalsButton.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./GoalsPage.scss";

function GoalsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingGoalsData, setLoadingGoalsData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [goals, setGoals] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getGoals();
        } else {
            setTimeout(() => {
                setGoals(dataFe.goalsData);
                setLoadingGoalsData(false);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const checkSession = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        fetch("/login/session", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken }),
        })
            .then((res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    return { statusCode };
                } else {
                    return { statusCode };
                }
            })
            .then(({ statusCode }) => {
                if (statusCode !== 200) {
                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.setItem("csrfToken", "");
                }
            });
    };

    const getGoalsAfterCreate = async () => {
        setLoadingGoalsData(true);
        await getGoals();
        triggerNotification("GOAL CREATED", "Goal created successfully!", "success");
    };

    const getGoalsAfterUpdate = async () => {
        setLoadingGoalsData(true);
        await getGoals();
        triggerNotification("GOAL UPDATED", "Goal updated successfully!", "success");
    };

    const getGoalsAfterDelete = async () => {
        setLoadingGoalsData(true);
        await getGoals();
        triggerNotification("GOAL DELETED", "Goal deleted successfully!", "success");
    };

    const getGoals = async () => {
        await fetch("/goals", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
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

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    triggerNotification("LOGGED IN AS ADMIN", "Welcome back!", "success");
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

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
                        {windowWidth >= 1280 && (
                            <div className="goalsPageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>Admin / goals</h2>
                                </div>
                                <GoalsPageTitle />
                                <GoalsCount loadingGoalsData={loadingGoalsData} goals={goals} />
                                <GoalsStatus loadingGoalsData={loadingGoalsData} statusDB={statusDB} />
                                {info.api.enabled && <CRUDGoalsButton loading={loadingGoalsData} action={"Create"} getGoals={() => getGoalsAfterCreate()} />}
                                <GoalsPageContent loadingGoalsData={loadingGoalsData} goals={goals} getGoalsU={() => getGoalsAfterUpdate()} getGoalsD={() => getGoalsAfterDelete()} />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
                        {windowWidth < 1280 && (
                            <div className="goalsPageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>Admin / goals</h2>
                                </div>
                                <GoalsPageTitleMobile />
                                <GoalsCountMobile loadingGoalsData={loadingGoalsData} goals={goals} />
                                <GoalsStatusMobile loadingGoalsData={loadingGoalsData} statusDB={statusDB} />
                                {info.api.enabled && <CRUDGoalsButton loading={loadingGoalsData} action={"Create"} />}
                                <GoalsPageContentMobile loadingGoalsData={loadingGoalsData} goals={goals} />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
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
        <div className="goalsPageTitleContainer">
            <h2>MY GOALS</h2>
        </div>
    );
}

function GoalsCount({ loadingGoalsData, goals }) {
    const getLoader = () => {
        return (
            <AnimatePresence>
                <motion.span style={{ fontStyle: "normal" }} key="goalloaderA" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

        return <span style={{ fontStyle: "normal" }}>{completedCount}</span>;
    };

    const getInProgressGoals = () => {
        let inProgressCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "inprogress") {
                inProgressCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{inProgressCount}</span>;
    };

    const getNotYetStartedGoals = () => {
        let notYetStartedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "notyetstarted") {
                notYetStartedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{notYetStartedCount}</span>;
    };

    return (
        <div className="goalsCountContainer">
            <AnimatePresence>
                <motion.p key="goalcount1A" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    COMPLETED: <span style={{ color: "green" }}>{loadingGoalsData ? getLoader() : getCompletedGoals()}</span>
                </motion.p>
                <motion.p key="goalcount2A" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    IN PROGRESS: <span style={{ color: "yellow" }}>{loadingGoalsData ? getLoader() : getInProgressGoals()}</span>
                </motion.p>
                <motion.p key="goalcount3A" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
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
                <motion.div className="goalsStatusContainer" key="gstatuscontA" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {statusDB ? (
                        <motion.p className="gStatus1" key="goalstatus1A" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH SUCCESS
                        </motion.p>
                    ) : (
                        <motion.p className="gStatus2" key="goalstatus2A" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH FAILED
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        )
    );
}

function GoalsPageContent({ loadingGoalsData, goals, getGoalsU, getGoalsD }) {
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
        <div className="goalsPageContentContainer">
            <AnimatePresence>
                {goals.length > 0 && !loadingGoalsData ? (
                    goals.map((goal, index) => (
                        <motion.div className="goal" key={index} transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="goalSection1">
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
                            <div className="goalSection2">
                                {info.api.enabled && (
                                    <>
                                        <CRUDGoalsButton loading={loadingGoalsData} action={"Update"} id={goal.id} getGoals={getGoalsU} />
                                        <CRUDGoalsButton loading={loadingGoalsData} action={"Delete"} id={goal.id} getGoals={getGoalsD} />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : loadingGoalsData ? (
                    <motion.div className="loadingGoalsData" key="loadinggoalsdataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="loaderGoals" />
                    </motion.div>
                ) : (
                    <motion.div className="noGoalsData" key="nogoalsdataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                        <h4>NO DATA!</h4>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

//Mobile:
function GoalsPageTitleMobile() {
    return (
        <div className="goalsPageTitleContainerMobile">
            <h2>MY GOALS</h2>
        </div>
    );
}

function GoalsCountMobile({ loadingGoalsData, goals }) {
    const getLoader = () => {
        return (
            <AnimatePresence>
                <motion.span style={{ fontStyle: "normal" }} key="goalloadermobileA" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

        return <span style={{ fontStyle: "normal" }}>{completedCount}</span>;
    };

    const getInProgressGoals = () => {
        let inProgressCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "inprogress") {
                inProgressCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{inProgressCount}</span>;
    };

    const getNotYetStartedGoals = () => {
        let notYetStartedCount = 0;

        goals.forEach((goal) => {
            if (goal.status === "notyetstarted") {
                notYetStartedCount++;
            }
        });

        return <span style={{ fontStyle: "normal" }}>{notYetStartedCount}</span>;
    };

    return (
        <div className="goalsCountContainerMobile">
            <AnimatePresence>
                <motion.p key="goalcount1mA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    COMPLETED: <span style={{ color: "green" }}>{loadingGoalsData ? getLoader() : getCompletedGoals()}</span>
                </motion.p>
                <motion.p key="goalcount2mA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    IN PROGRESS: <span style={{ color: "yellow" }}>{loadingGoalsData ? getLoader() : getInProgressGoals()}</span>
                </motion.p>
                <motion.p key="goalcount3mA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                    NOT YET STARTED: <span style={{ color: "red" }}>{loadingGoalsData ? getLoader() : getNotYetStartedGoals()}</span>
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

function GoalsStatusMobile({ loadingGoalsData, statusDB }) {
    return (
        !loadingGoalsData &&
        info.api.enabled && (
            <AnimatePresence>
                <motion.div className="goalsStatusContainerMobile" key="gstatuscontmobileA" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {statusDB ? (
                        <motion.p className="gStatus1Mobile" key="goalstatus1mobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH SUCCESS
                        </motion.p>
                    ) : (
                        <motion.p className="gStatus2Mobile" key="goalstatus2mobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            DATA FETCH FAILED
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        )
    );
}

function GoalsPageContentMobile({ loadingGoalsData, goals }) {
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
        <div className="goalsPageContentContainerMobile">
            <AnimatePresence>
                {goals.length > 0 ? (
                    goals.map((goal, index) => (
                        <motion.div className="goalMobile" key={index} transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="goalSection1Mobile">
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
                            <div className="goalSection2Mobile">
                                {info.api.enabled && (
                                    <>
                                        <CRUDGoalsButton loading={loadingGoalsData} action={"Update"} />
                                        <CRUDGoalsButton loading={loadingGoalsData} action={"Delete"} />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : loadingGoalsData ? (
                    <motion.div className="loadingGoalsDataMobile" key="loadinggoalsdatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="loaderGoalsMobile" />
                    </motion.div>
                ) : (
                    <motion.div className="noGoalsDataMobile" key="nogoalsdatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                        <h4>NO DATA!</h4>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default GoalsPageAdmin;
