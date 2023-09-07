import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { notification } from "antd";
import { info } from "/src/Constants/Info.jsx";
import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="LoginPageContainer">
            <BackToFrontPage />
            <LogoSection />
            <LoginSection />
        </div>
    );
}

function BackToFrontPage() {
    const navigate = useNavigate();

    return (
        <button
            className="BackToFrontPage"
            title="Back to the front page"
            onClick={() => navigate(info.routes.frontPage)}
        >
            {"<"}
        </button>
    );
}

function LogoSection() {
    const navigate = useNavigate();

    return (
        <div className="LogoRGContainer">
            <div
                className="LogoRG"
                title="Back to the front page"
                onClick={() => navigate(info.routes.frontPage)}
            ></div>
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
    }

    function handleLoginGuest() {
        sessionStorage.setItem("load", "true");
        navigate(info.routes.homePageGuest);
    }

    return (
        <div className="LoginContainer">
            <form className="Login">
                <h2>MatrixZone</h2>
                <div className="User">
                    <h3>Username:</h3>
                    <TextField
                        className="UsernameField"
                        value={userValue}
                        label="Enter username"
                        variant="outlined"
                        onChange={handleUserChange}
                    />
                </div>
                <div className="Password">
                    <h3>Password:</h3>
                    <TextField
                        className="PasswordField"
                        type={passwordType}
                        value={passwordValue}
                        label="Enter password"
                        variant="outlined"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button className="LoginButton" onClick={() => handleLogin()}>
                    Log in
                </button>
                <button className="LoginGuestButton" onClick={() => handleLoginGuest()}>
                    I'm a guest
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
