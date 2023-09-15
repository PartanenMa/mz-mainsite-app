import { useState, useEffect } from "react";
import { notification } from "antd";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./GoalsPage.css";

function GoalsPageGuest() {
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.success({
                    message: "LOGGED IN AS GUEST",
                    description: "Welcome to the MatrixZone!",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightgreen",
                        border: "3px solid green",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 1000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LoadingScreen />
            ) : (
                <div>
                    <HeaderGuest />
                    <NavGuest />
                    <div className="GoalsPageContainer">
                        <div className="Breadcrumb">
                            <h2>Guest / goals</h2>
                        </div>
                        <GoalsPageTitle />
                        <GoalsPageContent />
                    </div>
                    <FooterGuest />
                </div>
            )}
        </div>
    );
}

function GoalsPageTitle() {
    return (
        <div className="GoalsPageTitleContainer">
            <h2>GOALS</h2>
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

export default GoalsPageGuest;
