import { useEffect, useState } from "react";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ResetDBButton.scss";

function ResetDBButton(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            //getGoals();
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

    const resetDB = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        const originalGoalsData = dataFe.goalsData;

        fetch("/reset", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalGoalsData, csrfToken }),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                triggerNotification("DATABASE RESET", "Database reset successfully!", "success");
            } else {
                triggerNotification("ERROR", "Failed to reset database!", "error");
            }
        });
    };

    const clearDB = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        fetch("/reset", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken }),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                triggerNotification("DATABASE CLEARED", "Database cleared successfully!", "success");
            } else {
                triggerNotification("ERROR", "Failed clear database!", "error");
            }
        });
    };

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    return (
        <>
            {windowWidth >= 1280 && info.api.enabled && (
                <>
                    <AnimatePresence>
                        <motion.button
                            className={props.action === "RESET" ? "resetDBBtn" : "clearDBBtn"}
                            onClick={props.action === "RESET" ? () => resetDB() : () => clearDB()}
                            key="resetdbbtn"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action === "RESET" && "Reset database"}
                            {props.action === "CLEAR" && "Clear database"}
                        </motion.button>
                    </AnimatePresence>
                    <Notification
                        isNotificationOpen={isNotificationOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        title={notificationContent.title}
                        description={notificationContent.description}
                        type={notificationContent.type}
                    />
                </>
            )}
            {windowWidth < 1280 && info.api.enabled && (
                <>
                    <AnimatePresence>
                        <motion.button
                            className={props.action === "RESET" ? "resetDBBtnMobile" : "clearDBBtnMobile"}
                            onClick={props.action === "RESET" ? () => resetDB() : () => clearDB()}
                            key="resetdbbtnmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action === "RESET" && "Reset database"}
                            {props.action === "CLEAR" && "Clear database"}
                        </motion.button>
                    </AnimatePresence>
                    <Notification
                        isNotificationOpen={isNotificationOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        title={notificationContent.title}
                        description={notificationContent.description}
                        type={notificationContent.type}
                    />
                </>
            )}
        </>
    );
}

export default ResetDBButton;
