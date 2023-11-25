import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Terminal.scss";

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

    const getUnknown = (command) => {
        return (
            <p style={{ color: "#03a062" }}>
                $ {command}
                <span style={{ color: "red" }}>{" UNKNOWN COMMAND!"}</span>
            </p>
        );
    };

    const handleCommandSubmit = () => {
        if (currentCommand.trim() !== "") {
            if (currentCommand.trim().toLowerCase() === "clear") {
                setTerminalCommands([]);
            } else {
                setTerminalCommands((prevCommands) => [...prevCommands, getUnknown(currentCommand)]);
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
                    <div className="terminalOverlay" />
                    <AnimatePresence>
                        <motion.div className="terminal" style={terminalStyle} key="terminal" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            <div className="terminalTitle">
                                <h2>
                                    <span className="terminalTitleSiteName">MatrixZone</span> terminal
                                </h2>
                            </div>
                            <div className="terminalInput">
                                <div className="terminalInputField">
                                    {terminalCommands.map((command, index) => (
                                        <div key={index}>
                                            <h3>{command}</h3>
                                        </div>
                                    ))}
                                    <div>
                                        <p style={{ paddingLeft: "5px" }}>$</p>
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
                            <div className="terminalClose">
                                <motion.button
                                    className="terminalCloseButton"
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
