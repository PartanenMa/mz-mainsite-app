import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDProfessionButton.scss";

function CRUDProfessionButton(props) {
    const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [professionData, setProfessionData] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getProfession();
        }
    }, []);

    const getProfession = () => {
        fetch("/profession")
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setProfessionData(data);
                setTimeout(() => {
                    setLoadingProfessionData(false);
                }, 1000);
            });
    };

    return props.loading ? (
        <motion.p className="CRUDProfessionBtnLoading" key="crudprofessionbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
            LOADING...
        </motion.p>
    ) : (
        <>
            <AnimatePresence>
                <motion.button
                    className="professionBtn"
                    onClick={() => setIsProfessionModalOpen(true)}
                    key="professionbtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    PROFESSION SETTINGS
                </motion.button>
            </AnimatePresence>
            <ModalProfession isModalOpen={isProfessionModalOpen} setIsModalOpen={setIsProfessionModalOpen} loadingProfessionData={loadingProfessionData} professionData={professionData} />
        </>
    );

    function ModalProfession({ isModalOpen, setIsModalOpen, loadingProfessionData, professionData }) {
        const [modalStyle, setModalStyle] = useState({
            top: "",
            left: "",
        });

        useEffect(() => {
            const updateModalPosition = () => {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                const newTop = `${screenHeight / 2 - 298}px`;
                const newLeft = `${screenWidth / 2 - 400}px`;

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

        const updateProfessionData = () => {
            console.log("update");
            setIsModalOpen(false);
        };

        return ReactDOM.createPortal(
            <>
                {isModalOpen && (
                    <>
                        <div className="modalProfessionOverlay" />
                        <AnimatePresence>
                            <motion.div
                                className="modalProfession"
                                style={modalStyle}
                                key="modalprofession"
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                            >
                                <div className="modalProfessionHeader">
                                    <div className="mPH-titleC">
                                        <h2>
                                            Profession settings <span style={{ color: "orange", fontStyle: "normal" }}>{"(UPDATE)"}</span>
                                        </h2>
                                    </div>
                                    <div className="mPH-buttonC">
                                        <motion.button
                                            className="modalProfessionHeaderX-button"
                                            onClick={() => setIsModalOpen(false)}
                                            key="modalprofessionheaderx-button"
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            X
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="modalProfessionContent"></div>
                                <div className="modalProfessionFooter">
                                    <motion.button
                                        className="modalProfessionBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalprofessionbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalProfessionUpdateButton"
                                        onClick={() => updateProfessionData()}
                                        key="modalprofessionupdatebutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
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
}

export default CRUDProfessionButton;
