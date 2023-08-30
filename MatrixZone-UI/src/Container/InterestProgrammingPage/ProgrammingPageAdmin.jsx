import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProgrammingPage.css";

function ProgrammingPageAdmin() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageAdmin);
        }, 500);
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN!",
                        description: "Welcome back Admin.",
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
                    <AnimatePresence>
                        <div className="ProgrammingPageContent">
                            <motion.div
                                className="ProgrammingContainer"
                                initial={{ height: "0%" }}
                                animate={{ height: isOpen ? "100%" : "0%" }}
                                exit={{ height: "0%" }}
                                transition={{ duration: 0.5 }}
                                exitBeforeEnter
                            >
                                <div className="ProgrammingTitle">
                                    <h2>Programming</h2>
                                </div>
                                <div className="Programming">
                                    <p>vgsfbhndhfm...</p>
                                </div>
                                <div className="Back">
                                    <button className="PPBackButton" onClick={toggleContainer}>
                                        Back
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </AnimatePresence>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

export default ProgrammingPageAdmin;
