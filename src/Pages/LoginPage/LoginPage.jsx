import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Notification from "/src/Components/Notification/Notification.jsx";
import LogoutLoadingScreen from "/src/Components/LogoutLoadingScreen/LogoutLoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginPage.scss";

function LoginPage() {
    const load = sessionStorage.getItem("logoutLoad");
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                triggerNotification("LOGGED OUT!", "You've logged out of the MatrixZone.", "danger");
            }
            sessionStorage.setItem("load", "false");
        }, 4000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        // Close the notification after 5 seconds
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LogoutLoadingScreen />
            ) : (
                <>
                    {windowWidth >= 1280 && (
                        <div className="loginPageContainer">
                            <BackToFrontPage />
                            <LogoSection />
                            <LoginSection />
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
                        <div className="loginPageContainerMobile">
                            <BackToFrontPageMobile />
                            <LogoSectionMobile />
                            <LoginSectionMobile />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function BackToFrontPage() {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.button
                className="backToFrontPage1"
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
        <div className="logoRGContainer">
            <div className="logoRG" title="Back to the front page" onClick={() => navigate(info.routes.frontPage)} />
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

    const handleLogin = () => {
        //togglePassword();
        const username = userValue;
        const password = passwordValue;

        if (username !== "" && password !== "") {
            if (info.api.enabled) {
                login(username, password);
            } else {
                if (info.testLoginFe.enabled) {
                    if (username === info.testLoginFe.adminUserName && password === info.testLoginFe.adminPassword) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        sessionStorage.setItem("load", "true");
                        navigate(info.routes.dashboardPage);
                    } else {
                        event.preventDefault();
                        triggerNotification("TEST LOG IN FAILED!", "Incorrect username or password.", "error");
                    }
                } else {
                    event.preventDefault();
                    triggerNotification("TEST LOG IN FAILED!", "Test log in is currently disabled.", "error");
                }
            }
        } else {
            event.preventDefault();
            triggerNotification("LOG IN FAILED!", "Empty username or password field.", "error");
        }
    };

    const login = (username, password) => {
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    const data = await res.json();
                    return { statusCode, data };
                } else {
                    const data = await res.text();
                    return { statusCode, data };
                }
            })
            .then(({ statusCode, data }) => {
                if (statusCode === 200) {
                    const csrfToken = data.csrfToken;
                    sessionStorage.setItem("csrfToken", csrfToken);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("load", "true");
                    navigate(info.routes.dashboardPage);
                } else if (statusCode === 401) {
                    triggerNotification("LOG IN FAILED!", "Incorrect username or password.", "error");
                } else if (statusCode === 500) {
                    triggerNotification("LOG IN FAILED!", "API disconnected!", "error");
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
        <div className="lPLoginContainer">
            <form className="lPLogin">
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
                        className="loginButton"
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
                        className="backToFrontPage2"
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

//Mobile:
function BackToFrontPageMobile() {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.button
                className="backToFrontPage1Mobile"
                title="Back to the front page"
                onClick={() => navigate(info.routes.frontPage)}
                key="backtofrontpage1mobile"
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

function LogoSectionMobile() {
    const navigate = useNavigate();

    return (
        <div className="logoRGContainerMobile">
            <div className="logoRGMobile" title="Back to the front page" onClick={() => navigate(info.routes.frontPage)} />
        </div>
    );
}

function LoginSectionMobile() {
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

    const handleLogin = () => {
        //togglePassword();
        const username = userValue;
        const password = passwordValue;

        if (username !== "" && password !== "") {
            if (info.api.enabled) {
                login(username, password);
            } else {
                if (info.testLoginFe.enabled) {
                    if (username === info.testLoginFe.adminUserName && password === info.testLoginFe.adminPassword) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        sessionStorage.setItem("load", "true");
                        navigate(info.routes.dashboardPage);
                    } else {
                        event.preventDefault();
                        triggerNotification("TEST LOG IN FAILED!", "Incorrect username or password.", "error");
                    }
                } else {
                    event.preventDefault();
                    triggerNotification("TEST LOG IN FAILED!", "Test log in is currently disabled.", "error");
                }
            }
        } else {
            event.preventDefault();
            triggerNotification("LOG IN FAILED!", "Empty username or password field.", "error");
        }
    };

    const login = (username, password) => {
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    const data = await res.json();
                    return { statusCode, data };
                } else {
                    const data = await res.text();
                    return { statusCode, data };
                }
            })
            .then(({ statusCode, data }) => {
                if (statusCode === 200) {
                    const csrfToken = data.csrfToken;
                    sessionStorage.setItem("csrfToken", csrfToken);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("load", "true");
                    navigate(info.routes.dashboardPage);
                } else if (statusCode === 401) {
                    triggerNotification("LOG IN FAILED!", "Incorrect username or password.", "error");
                } else if (statusCode === 500) {
                    triggerNotification("LOG IN FAILED!", "API disconnected!", "error");
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
        <div className="lPLoginContainerMobile">
            <form className="lPLoginMobile">
                <h2>MatrixZone</h2>
                <div className="userMobile">
                    <h3>Username:</h3>
                    <TextField className="usernameFieldMobile" value={userValue} label="Enter username" variant="outlined" onChange={handleUserChange} />
                </div>
                <div className="passwordMobile">
                    <h3>Password:</h3>
                    <TextField className="passwordFieldMobile" type={passwordType} value={passwordValue} label="Enter password" variant="outlined" onChange={handlePasswordChange} />
                </div>
                <AnimatePresence>
                    <motion.button
                        className="loginButtonMobile"
                        onClick={() => handleLogin()}
                        key="loginbuttonmobile"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Log in
                    </motion.button>
                    <motion.button
                        className="backToFrontPage2Mobile"
                        onClick={() => navigate(info.routes.frontPage)}
                        key="backtofrontpage2mobile"
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

export default LoginPage;
