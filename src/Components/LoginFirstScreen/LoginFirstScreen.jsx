import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginFirstScreen.scss";

function LoginFirstScreen() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 1280 && (
                <div className="loginScreenContainer">
                    <LoginTitleContainer />
                    <LoginSection />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="loginScreenContainerMobile">
                    <LoginTitleContainerMobile />
                    <LoginSectionMobile />
                </div>
            )}
        </>
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
                        navigate(location.pathname);
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
                    navigate(location.pathname);
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
        <div className="loginContainer">
            <form className="login">
                <h2>MatrixZone</h2>
                <div className="user">
                    <h3>Username:</h3>
                    <input type="text" placeholder="Enter username" className="usernameField" value={userValue} onChange={handleUserChange} />
                </div>
                <div className="password">
                    <h3>Password:</h3>
                    <input type="password" placeholder="Enter password" className="passwordField" value={passwordValue} onChange={handlePasswordChange} />
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

//Mobile:
function LoginTitleContainerMobile() {
    return (
        <div className="loginTitleContainerMobile">
            <h1>YOU MUST LOG IN FIRST!</h1>
        </div>
    );
}

function LoginSectionMobile() {
    const [userValue, setUserValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
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
                        navigate(location.pathname);
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
                    navigate(location.pathname);
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
        <div className="loginContainerMobile">
            <form className="loginMobile">
                <h2>MatrixZone</h2>
                <div className="userMobile">
                    <h3>Username:</h3>
                    <input type="text" placeholder="Enter username" className="usernameFieldMobile" value={userValue} onChange={handleUserChange} />
                </div>
                <div className="passwordMobile">
                    <h3>Password:</h3>
                    <input type="password" placeholder="Enter password" className="passwordFieldMobile" value={passwordValue} onChange={handlePasswordChange} />
                </div>
                <AnimatePresence>
                    <motion.button
                        className="loginFButtonMobile"
                        onClick={() => handleLogin()}
                        key="loginfbuttonmobile"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Log in
                    </motion.button>
                    <motion.button
                        className="backToFPButtonMobile"
                        onClick={() => navigate(info.routes.frontPage)}
                        key="backtofpbuttonmobile"
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
