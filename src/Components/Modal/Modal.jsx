import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

function Modal({ isModalOpen, setIsModalOpen }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });

    useEffect(() => {
        const updateModalPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            console.log("screenHeight: ", screenHeight, " screenWidth: ", screenWidth);

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 400}px`;
            console.log("newTop: ", newTop, " newLeft: ", newLeft);

            setModalStyle({
                top: newTop,
                left: newLeft,
                transform: "translate(-50%, -50%)",
            });
        };

        //Add an event listener to update the modal position when the window is resized:
        window.addEventListener("resize", updateModalPosition);

        //Call the updateModalPosition function once to set the initial position:
        updateModalPosition();

        //Remove the event listener when the component unmounts:
        return () => {
            window.removeEventListener("resize", updateModalPosition);
        };
    }, [isModalOpen]);

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="ModalOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="Modal"
                            style={modalStyle}
                            key="modal"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="ModalAboutTitle">
                                <h2>What is the MatrixZone?</h2>
                                <motion.button
                                    className="ModalTitleX-button"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modaltitlex-button"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    X
                                </motion.button>
                            </div>
                            <div className="ModalAbout">
                                <p>
                                    Welcome to the MatrixZone! Here, I invite you to delve into my
                                    <br />
                                    world of passion and creativity. As an enthusiast in the realm of software
                                    development, this platform serves as a window into my
                                    <br />
                                    programming journey.
                                    <br />
                                    <br />
                                    Explore my profile to discover the mind behind the projects that
                                    <br />
                                    blend imagination with ingenuity, and immerse yourself in my
                                    <br />
                                    diverse project portfolio, where innovation meets determination.
                                    <br />
                                    <br />
                                    From coding marvels to ingenious experiments, MatrixZone is a
                                    <br />
                                    testament to my journey of growth and exploration as a fellow
                                    <br />
                                    software developer.
                                </p>
                            </div>
                            <div className="ModalBack">
                                <motion.button
                                    className="ModalBackButton"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modalbackbutton"
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

export default Modal;
