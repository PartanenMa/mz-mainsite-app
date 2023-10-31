import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Terminal.css";

function Terminal({ isTerminalOpen, setIsTerminalOpen }) {
    const [terminalStyle, setTerminalStyle] = useState({
        top: "",
        left: "",
    });

    useEffect(() => {
        const updateTerminalPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 400}px`;

            setTerminalStyle({
                top: newTop,
                left: newLeft,
                transform: "translate(-50%, -50%)",
            });
        };

        //Add an event listener to update the modal position when the window is resized:
        window.addEventListener("resize", updateTerminalPosition);

        //Call the updateModalPosition function once to set the initial position:
        updateTerminalPosition();

        //Remove the event listener when the component unmounts:
        return () => {
            window.removeEventListener("resize", updateTerminalPosition);
        };
    }, [isTerminalOpen]);

    return ReactDOM.createPortal(
        <>
            {isTerminalOpen && (
                <>
                    <div className="TerminalOverlay" />
                    <AnimatePresence>
                        <motion.div className="Terminal" style={terminalStyle} key="terminal" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            <div className="TerminalTitle">
                                <h2>TERMINAL</h2>
                                <motion.button
                                    className="TerminalTitleX-button"
                                    onClick={() => setIsTerminalOpen(false)}
                                    key="terminaltitlex-button"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    X
                                </motion.button>
                            </div>
                            <div className="TerminalInput">
                                <textarea className="TerminalInputField" rows="4" cols="50" />
                            </div>
                            <div className="TerminalClose">
                                <motion.button
                                    className="TerminalCloseButton"
                                    onClick={() => setIsTerminalOpen(false)}
                                    key="terminalclosebutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Close
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

export default Terminal;
