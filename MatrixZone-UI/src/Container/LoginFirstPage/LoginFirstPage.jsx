import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { notification } from "antd";
import { info } from "/src/Constants/Info.jsx";
import "./LoginFirstPage.css";

function LoginFirstPage() {
    return (
        <div className="LoginScreenContainer">
            <LoginTitleContainer />
            <LoginSection />
        </div>
    )
}

function LoginTitleContainer() {
    return (
        <div className="LoginTitleContainer">
            <h1>YOU MUST LOG IN FIRST!</h1>
        </div>
    );
}

function LoginSection() {
    const [userValue, setUserValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();
    const location = useLocation();

    const handleUserChange = event => {
        setUserValue(event.target.value);
    }

    const handlePasswordChange = event => {
        setPasswordValue(event.target.value);
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    function handleLogin() {
        togglePassword
        const username = userValue;
        const password = passwordValue;
        if (username === info.loginInfo.adminUserName && password === info.loginInfo.adminPassword) {
            sessionStorage.setItem("load", "true");
            sessionStorage.setItem("isLoggedIn", "true");
            navigate(location.pathname);
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
                    <TextField className="UsernameField" value={userValue} label="Enter username" variant="outlined" onChange={handleUserChange} />
                </div>
                <div className="Password">
                    <h3>Password:</h3>
                    <TextField className="PasswordField" type={passwordType} value={passwordValue} label="Enter password" variant="outlined" onChange={handlePasswordChange} />
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

export default LoginFirstPage;