import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Terminal.css";

function Terminal({ isTerminalOpen, setIsTerminalOpen }) {
    const [terminalCommands, setTerminalCommands] = useState([]);
    const [currentCommand, setCurrentCommand] = useState("");
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

        //Add an event listener to update the terminal position when the window is resized:
        window.addEventListener("resize", updateTerminalPosition);

        //Call the updateTerminalPosition function once to set the initial position:
        updateTerminalPosition();

        //Remove the event listener when the component unmounts:
        return () => {
            window.removeEventListener("resize", updateTerminalPosition);
        };
    }, [isTerminalOpen]);

    const handleCommandSubmit = () => {
        if (currentCommand.trim() !== "") {
            if (currentCommand.trim().toLowerCase() === "clear") {
                setTerminalCommands([]);
            } else {
                setTerminalCommands((prevCommands) => [...prevCommands, currentCommand]);
            }
            setCurrentCommand("");
        }
    };

    const closeTerminal = () => {
        setTerminalCommands([]);
        setIsTerminalOpen(false);
    };

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
                                    onClick={() => closeTerminal()}
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
                                <div className="TerminalInputField">
                                    {terminalCommands.map((command, index) => (
                                        <div key={index}>
                                            <p>$</p>
                                            <h3>{command}</h3>
                                        </div>
                                    ))}
                                    <div>
                                        <p>$</p>
                                        <input
                                            type="text"
                                            value={currentCommand}
                                            onChange={(e) => setCurrentCommand(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleCommandSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="TerminalClose">
                                <motion.button
                                    className="TerminalCloseButton"
                                    onClick={() => closeTerminal()}
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
