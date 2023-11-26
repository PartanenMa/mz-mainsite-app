import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginFirstScreen.scss";

function LoginFirstScreen() {
    return (
        <div className="loginScreenContainer">
            <LoginTitleContainer />
            <LoginSection />
        </div>
    );
}

function LoginTitleContainer() {
    return (
        <div className="loginTitleContainer">
            <h1>YOU MUST LOG IN FIRST!</h1>
        </div>
    );
}

function LoginSection() {
    const [userValue, setUserValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });
    const navigate = useNavigate();
    const location = useLocation();

    const handleUserChange = (event) => {
        setUserValue(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
    };

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    function handleLogin() {
        togglePassword;
        const username = userValue;
        const password = passwordValue;
        if (info.loginInfo.enabled) {
            if (username === info.loginInfo.adminUserName && password === info.loginInfo.adminPassword) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("load", "true");
                navigate(location.pathname);
            } else {
                event.preventDefault();
                triggerNotification("LOG IN FAILED!", "Incorrect username or password.", "error");
            }
        } else {
            event.preventDefault();
            triggerNotification("LOG IN FAILED!", "Logging in is currently disabled.", "error");
        }
    }

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    return (
        <div className="loginContainer">
            <form className="login">
                <h2>MatrixZone</h2>
                <div className="user">
                    <h3>Username:</h3>
                    <TextField className="usernameField" value={userValue} label="Enter username" variant="outlined" onChange={handleUserChange} />
                </div>
                <div className="password">
                    <h3>Password:</h3>
                    <TextField className="passwordField" type={passwordType} value={passwordValue} label="Enter password" variant="outlined" onChange={handlePasswordChange} />
                </div>
                <AnimatePresence>
                    <motion.button
                        className="loginFButton"
                        onClick={() => handleLogin()}
                        key="loginfbutton"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Log in
                    </motion.button>
                    <motion.button
                        className="backToFPButton"
                        onClick={() => navigate(info.routes.frontPage)}
                        key="backtofpbutton"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Back
                    </motion.button>
                </AnimatePresence>
            </form>
            <Notification
                isNotificationOpen={isNotificationOpen}
                setIsNotificationOpen={setIsNotificationOpen}
                title={notificationContent.title}
                description={notificationContent.description}
                type={notificationContent.type}
            />
        </div>
    );
}

export default LoginFirstScreen;
