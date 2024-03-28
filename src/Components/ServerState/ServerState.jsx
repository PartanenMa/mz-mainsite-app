import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ServerState.scss";

function ServerState(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return props.loading ? (
        <>
            {windowWidth >= 1280 && (
                <AnimatePresence>
                    <div
                        className="ServerStateContainer"
                        style={{
                            backgroundColor: "gray",
                            border: "white",
                        }}
                    >
                        <motion.p style={{ color: "white" }} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            CHECKING CONNECTION...
                        </motion.p>
                    </div>
                </AnimatePresence>
            )}
            {windowWidth < 1280 && (
                <AnimatePresence>
                    <div
                        className="ServerStateContainerMobile"
                        style={{
                            backgroundColor: "gray",
                            border: "white",
                        }}
                    >
                        <motion.p style={{ color: "white" }} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            CHECKING CONNECTION...
                        </motion.p>
                    </div>
                </AnimatePresence>
            )}
        </>
    ) : (
        <>
            {windowWidth >= 1280 && (
                <AnimatePresence>
                    <div
                        className="ServerStateContainer"
                        style={{
                            backgroundColor: props.connected ? "green" : "red",
                            border: props.connected ? "1px solid lightgreen" : "1px solid lightcoral",
                        }}
                    >
                        <motion.p style={{ color: props.connected ? "lightgreen" : "lightcoral" }} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            SERVER {props.connected ? "CONNECTED" : "DISCONNECTED"}
                        </motion.p>
                    </div>
                </AnimatePresence>
            )}
            {windowWidth < 1280 && (
                <AnimatePresence>
                    <div
                        className="ServerStateContainerMobile"
                        style={{
                            backgroundColor: props.connected ? "green" : "red",
                            border: props.connected ? "1px solid lightgreen" : "1px solid lightcoral",
                        }}
                    >
                        <motion.p style={{ color: props.connected ? "lightgreen" : "lightcoral" }} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            SERVER {props.connected ? "CONNECTED" : "DISCONNECTED"}
                        </motion.p>
                    </div>
                </AnimatePresence>
            )}
        </>
    );
}

export default ServerState;
