import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Notification.scss";

function Notification({ isNotificationOpen, setIsNotificationOpen, title, description, type }) {
    const getNotificationColor = (type) => {
        if (type === "success") {
            return "green";
        } else if (type === "danger") {
            return "orange";
        } else if (type === "error") {
            return "red";
        }
    };

    const getTitleColor = (type) => {
        if (type === "success") {
            return "green";
        } else if (type === "danger") {
            return "orange";
        } else if (type === "error") {
            return "red";
        }
    };

    const getTitleIcon = (type) => {
        if (type === "success") {
            return "✔️";
        } else if (type === "danger") {
            return "🟡";
        } else if (type === "error") {
            return "❌";
        }
    };

    const getColor = (type) => {
        if (type === "success") {
            return "lightgreen";
        } else if (type === "danger") {
            return "yellow";
        } else if (type === "error") {
            return "lightcoral";
        }
    };

    return ReactDOM.createPortal(
        <>
            {isNotificationOpen && (
                <>
                    <AnimatePresence>
                        <motion.div
                            className="notification"
                            style={{ "--notification-color": getNotificationColor(type) }}
                            key="notification"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="notificationTitle">
                                <div className="notificationTitleText">
                                    <h2 style={{ color: getTitleColor(type) }}>
                                        <span style={{ textShadow: "none", fontStyle: "normal", paddingRight: "10px" }}>{getTitleIcon(type)}</span>
                                        {title}
                                    </h2>
                                </div>
                                <div className="notificationTitleX">
                                    <motion.button
                                        className="notificationTitleX-button"
                                        onClick={() => setIsNotificationOpen(false)}
                                        key="notificationtitlex-button"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        X
                                    </motion.button>
                                </div>
                            </div>
                            <div className="notificationDescription" style={{ backgroundColor: getColor(type) }}>
                                <p style={{ color: getTitleColor(type) }}>{description}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

export default Notification;
