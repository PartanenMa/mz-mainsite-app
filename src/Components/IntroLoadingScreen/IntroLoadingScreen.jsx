import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroLoadingScreen.scss";

function IntroLoadingScreen() {
    const [introLoadingScreenStyle, setIntroLoadingScreenStyle] = useState({
        top: "",
        left: "",
    });

    useEffect(() => {
        const updateIntroLoadingScreenPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 400}px`;

            setIntroLoadingScreenStyle({
                top: newTop,
                left: newLeft,
                transform: "translate(-50%, -50%)",
            });
        };

        //Add an event listener to update the modal position when the window is resized:
        window.addEventListener("resize", updateIntroLoadingScreenPosition);

        //Call the updateModalPosition function once to set the initial position:
        updateIntroLoadingScreenPosition();

        //Remove the event listener when the component unmounts:
        return () => {
            window.removeEventListener("resize", updateIntroLoadingScreenPosition);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className="introLoadingScreenOverlay" />
            <AnimatePresence>
                <motion.div
                    className="introLoadingScreen"
                    style={introLoadingScreenStyle}
                    key="introLoadingScreen"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                >
                    <div className="introLoadingScreenLogoContainer">
                        <div className="iLSLCLogo" />
                    </div>
                    <div className="introLoadingScreenLoadingBar">
                        <div className="iLSLBLogo" />
                        <h2>LOADING...</h2>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>,
        document.getElementById("portal")
    );
}

export default IntroLoadingScreen;
