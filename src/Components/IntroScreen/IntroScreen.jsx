import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MatrixBG from "/src/Components/BGAnimation/MatrixBG.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroScreen.scss";

function IntroScreen({ isIntroScreenOpen, setIsIntroScreenOpen }) {
    const [introScreenStyle, setIntroScreenStyle] = useState({
        top: "",
        left: "",
    });
    const [technologiesUsed, setTechnologiesUsed] = useState([]);

    useEffect(() => {
        setTechnologiesUsed(data.technologiesUsed);
    }, []);

    useEffect(() => {
        const updateIntroScreenPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 400}px`;

            setIntroScreenStyle({
                top: newTop,
                left: newLeft,
                transform: "translate(-50%, -50%)",
            });
        };

        //Add an event listener to update the modal position when the window is resized:
        window.addEventListener("resize", updateIntroScreenPosition);

        //Call the updateModalPosition function once to set the initial position:
        updateIntroScreenPosition();

        //Remove the event listener when the component unmounts:
        return () => {
            window.removeEventListener("resize", updateIntroScreenPosition);
        };
    }, [isIntroScreenOpen]);

    const closeIntroScreen = () => {
        setIsIntroScreenOpen(false);
        sessionStorage.setItem("afterIntroLoading", "true");
        sessionStorage.setItem("hasSeenIntro", "true");
    };

    return ReactDOM.createPortal(
        <>
            {isIntroScreenOpen && (
                <>
                    <MatrixBG />
                    <AnimatePresence>
                        <motion.div className="introScreen" style={introScreenStyle} key="introScreen" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            <div className="introScreenWelcomeTitle">
                                <motion.h2 key="iswt-h2" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0, transition: { duration: 1 } }} exit={{ opacity: 0, x: 1000 }}>
                                    Welcome to the{" "}
                                    <motion.span className="iSWTName" key="iswtname" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 4 } }} exit={{ opacity: 0 }}>
                                        MatrixZone
                                    </motion.span>
                                </motion.h2>
                            </div>
                            <div className="introScreenAbout">
                                <motion.h3 key="isa-h3" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} exit={{ opacity: 0, y: 100 }}>
                                    My personal website
                                </motion.h3>
                                <motion.p key="isa-p" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} exit={{ opacity: 0, y: 100 }}>
                                    MADE USING:
                                </motion.p>
                                <motion.div className="madeWith" key="madewith" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 3 } }} exit={{ opacity: 0 }}>
                                    {technologiesUsed.length > 0 ? (
                                        technologiesUsed.map((tech, index) => (
                                            <div className="techUsed" key={index} style={{ "--techUsed-color": tech.color, textDecoration: "none" }}>
                                                <div className="techUsedTitle">
                                                    <h5 style={{ color: tech.color }}>{tech.name}</h5>
                                                </div>
                                                <div className="techUsedLogo" style={{ backgroundImage: `url(${tech.image})`, backgroundSize: tech.size }} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="noTechUsedData">
                                            <h4>NO DATA!</h4>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                            <div className="introScreenBack">
                                <motion.button
                                    className="introScreenBackButton"
                                    onClick={() => closeIntroScreen()}
                                    key="introscreenbackbutton"
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                                    exit={{ opacity: 0, y: -100 }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Enter
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

export default IntroScreen;
