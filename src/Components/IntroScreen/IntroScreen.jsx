import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MatrixBG from "/src/Components/BGAnimation/MatrixBG.jsx";
import { info } from "/src/Constants/Info.jsx";
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
                                <h2>
                                    Welcome to the <span className="iSWTName">MatrixZone</span>
                                </h2>
                            </div>
                            <div className="introScreenAbout">
                                <h3>My personal website</h3>
                                <p>MADE USING:</p>
                                <div className="madeWith">
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
                                </div>
                            </div>
                            <div className="introScreenBack">
                                <motion.button
                                    className="introScreenBackButton"
                                    onClick={() => closeIntroScreen()}
                                    key="introscreenbackbutton"
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
