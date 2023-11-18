import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroScreen.scss";

function IntroScreen({ isIntroScreenOpen, setIsIntroScreenOpen }) {
    const [introScreenStyle, setIntroScreenStyle] = useState({
        top: "",
        left: "",
    });

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
                    <div className="introScreenOverlay" />
                    <AnimatePresence>
                        <motion.div className="introScreen" style={introScreenStyle} key="introScreen" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            <div className="introScreenAboutTitle">
                                <h2>THIS IS AN INTRO SCREEN!</h2>
                            </div>
                            <div className="introScreenAbout">
                                <p>
                                    {info.fpModalText.introduction}
                                    <br />
                                    <br />
                                    {info.fpModalText.profile}
                                    <br />
                                    <br />
                                    {info.fpModalText.projects}
                                    <br />
                                    <br />
                                    {info.fpModalText.videos}
                                </p>
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
