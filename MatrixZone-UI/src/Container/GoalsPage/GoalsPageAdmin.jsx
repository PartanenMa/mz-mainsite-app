import { useState, useEffect } from "react";
import { notification } from "antd";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./GoalsPage.css";

function GoalsPageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN AS ADMIN",
                        description: "Welcome back!",
                        placement: "bottomLeft",
                        style: {
                            backgroundColor: "lightgreen",
                            border: "3px solid green",
                        },
                    });
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

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
                        <div className="GoalsPageContainer">
                            <div className="Breadcrumb">
                                <h2>Admin / goals</h2>
                            </div>
                            <GoalsPageTitle />
                            <GoalsPageContent />
                        </div>
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
        <div className="GoalsPageTitleContainer">
            <h2>MY GOALS</h2>
        </div>
    );
}

function GoalsPageContent() {
    return (
        <div className="GoalsPageContentContainer">
            <div className="Goal">
                <h3>
                    Learn basic programming: <span style={{ color: "green" }}>COMPLETED</span>
                </h3>
                <p>
                    - Learn languages such as C++, Java and C#. <span style={{ color: "green" }}>COMPLETED</span>
                </p>
                <p>
                    - Learn data structures, algorithms and heuristics.{" "}
                    <span style={{ color: "green" }}>COMPLETED</span>
                </p>
                <p>
                    - Learn to use office software, version control software and task automation software.{" "}
                    <span style={{ color: "green" }}>COMPLETED</span>
                </p>
            </div>
            <div className="Goal">
                <h3>
                    Learn basic web development: <span style={{ color: "green" }}>COMPLETED</span>
                </h3>
                <p>
                    - Learn languages such as HTML, CSS and JavaScript.{" "}
                    <span style={{ color: "green" }}>COMPLETED</span>
                </p>
                <p>
                    - Learn to use browser dev tools. <span style={{ color: "green" }}>COMPLETED</span>
                </p>
                <p>
                    - Learn to make websites responsive. <span style={{ color: "green" }}>COMPLETED</span>
                </p>
            </div>
            <div className="Goal">
                <h3>
                    Learn front-end development: <span style={{ color: "yellow" }}>IN PROGRESS</span>
                </h3>
                <p>
                    - Learn a front-end framework and TypeScript. <span style={{ color: "yellow" }}>IN PROGRESS</span>
                </p>
                <p>
                    - Learn an additional front-end framework like Next.js.{" "}
                    <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
                <p>
                    - Learn a CSS framework. <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
            </div>
            <div className="Goal">
                <h3>
                    Learn back-end development: <span style={{ color: "yellow" }}>IN PROGRESS</span>
                </h3>
                <p>
                    - Learn a back-end framework, and languages such as Go and PHP.{" "}
                    <span style={{ color: "yellow" }}>IN PROGRESS</span>
                </p>
                <p>
                    - Learn an additional back-end framework like Express.js.{" "}
                    <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
                <p>
                    - Learn to use SQL databases and NoSQL databases.{" "}
                    <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
            </div>
            <div className="Goal">
                <h3>
                    Learn full-stack development: <span style={{ color: "red" }}>NOT YET STARTED</span>
                </h3>
                <p>
                    - Learn to connect the front-end to the back-end.{" "}
                    <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
                <p>
                    - Learn sensible web design. <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
                <p>
                    - Learn project management. <span style={{ color: "red" }}>NOT YET STARTED</span>
                </p>
            </div>
        </div>
    );
}

export default GoalsPageAdmin;
