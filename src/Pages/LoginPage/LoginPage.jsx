import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { notification } from "antd";
import LogoutLoadingScreen from "/src/Components/LogoutLoadingScreen/LogoutLoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginPage.css";

function LoginPage() {
    const load = sessionStorage.getItem("logoutLoad");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.warning({
                    message: "LOGGED OUT!",
                    description: "You've logged out of the MatrixZone.",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "yellow",
                        border: "3px solid orange",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 4000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LogoutLoadingScreen />
            ) : (
                <div className="LoginPageContainer">
                    <BackToFrontPage />
                    <LogoSection />
                    <LoginSection />
                </div>
            )}
        </div>
    );
}

function BackToFrontPage() {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.button
                className="BackToFrontPage1"
                title="Back to the front page"
                onClick={() => navigate(info.routes.frontPage)}
                key="backtofrontpage1"
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
            >
                {"<"}
            </motion.button>
        </AnimatePresence>
    );
}

function LogoSection() {
    const navigate = useNavigate();

    return (
        <div className="LogoRGContainer">
            <div className="LogoRG" title="Back to the front page" onClick={() => navigate(info.routes.frontPage)} />
        </div>
    );
}

function LoginSection() {
    const [userValue, setUserValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();

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
                navigate(info.routes.homePageAdmin);
            } else {
                event.preventDefault();
                notification.error({
                    message: "LOG IN FAILED!",
                    description: "Incorrect username or password.",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightcoral",
                        border: "3px solid red",
                    },
                });
            }
        } else {
            event.preventDefault();
            notification.error({
                message: "LOG IN FAILED!",
                description: "Logging in is currently disabled.",
                placement: "bottomLeft",
                style: {
                    backgroundColor: "lightcoral",
                    border: "3px solid red",
                },
            });
        }
    }

    return (
        <div className="LPLoginContainer">
            <form className="LPLogin">
                <h2>MatrixZone</h2>
                <div className="User">
                    <h3>Username:</h3>
                    <TextField className="UsernameField" value={userValue} label="Enter username" variant="outlined" onChange={handleUserChange} />
                </div>
                <div className="Password">
                    <h3>Password:</h3>
                    <TextField className="PasswordField" type={passwordType} value={passwordValue} label="Enter password" variant="outlined" onChange={handlePasswordChange} />
                </div>
                <AnimatePresence>
                    <motion.button
                        className="LoginButton"
                        onClick={() => handleLogin()}
                        key="loginbutton"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Log in
                    </motion.button>
                    <motion.button
                        className="BackToFrontPage2"
                        onClick={() => navigate(info.routes.frontPage)}
                        key="backtofrontpage2"
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
        </div>
    );
}

export default LoginPage;
