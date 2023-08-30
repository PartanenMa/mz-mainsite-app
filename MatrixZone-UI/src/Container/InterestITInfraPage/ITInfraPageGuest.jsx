import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ITInfraPage.css";

function ITInfraPageGuest() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toggleContainer = () => {
        setIsOpen(!isOpen);

        setTimeout(() => {
            navigate(info.routes.profilePageGuest);
        }, 500);
    };

    return (
        <AnimatePresence>
            <div className="ITInfraPageContent">
                <motion.div
                    className="ITInfraContainer"
                    initial={{ height: "0%" }}
                    animate={{ height: isOpen ? "100%" : "0%" }}
                    exit={{ height: "0%" }}
                    transition={{ duration: 0.5 }}
                    exitBeforeEnter
                >
                    <div className="ITInfraTitle">
                        <h2>IT infrastructure</h2>
                    </div>
                    <div className="ITInfra">
                        <p>vgsfbhndhfm...</p>
                    </div>
                    <div className="Back">
                        <button className="ITIPBackButton" onClick={toggleContainer}>
                            Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default ITInfraPageGuest;
