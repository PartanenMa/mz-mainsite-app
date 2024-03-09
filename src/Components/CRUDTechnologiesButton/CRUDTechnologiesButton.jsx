import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDTechnologiesButton.scss";

function CRUDTechnologiesButton(props) {
    const [isTechnologiesModalOpen, setIsTechnologiesModalOpen] = useState(false);
    const [loadingTechnologiesData, setLoadingTechnologiesData] = useState(true);
    const [technologiesFe, setTechnologiesFe] = useState([]);
    const [technologiesBe, setTechnologiesBe] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getTechnologies();
        }
    }, []);

    const getTechnologies = () => {
        fetch("/technologies")
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
                setTimeout(() => {
                    setTechnologiesFe(data.technologiesData.technologiesFe);
                    setTechnologiesBe(data.technologiesData.technologiesBe);
                    setLoadingTechnologiesData(false);
                }, 1000);
            });
    };

    return props.loading ? (
        <motion.p className="CRUDTechnologiesBtnLoading" key="crudtechnologiesbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
            LOADING...
        </motion.p>
    ) : (
        <>
            <AnimatePresence>
                <motion.button
                    className="technologiesBtn"
                    onClick={() => setIsTechnologiesModalOpen(true)}
                    key="technologiesbtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    TECHNOLOGIES SETTINGS
                </motion.button>
            </AnimatePresence>
            <ModalTechnologies
                isModalOpen={isTechnologiesModalOpen}
                setIsModalOpen={setIsTechnologiesModalOpen}
                loadingTechnologiesData={loadingTechnologiesData}
                techFe={technologiesFe}
                techBe={technologiesBe}
            />
        </>
    );
}

function ModalTechnologies({ isModalOpen, setIsModalOpen, loadingTechnologiesData, techFe, techBe }) {
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

    const updateTechnologiesData = () => {
        console.log("update");
        setIsModalOpen(false);
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalTechnologiesOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalTechnologies"
                            style={modalStyle}
                            key="modaltechnologies"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalTechnologiesHeader">
                                <div className="mTH-titleC">
                                    <h2>
                                        Technologies settings <span style={{ color: "orange", fontStyle: "normal" }}>{"(UPDATE)"}</span>
                                    </h2>
                                </div>
                                <div className="mTH-buttonC">
                                    <motion.button
                                        className="modalTechnologiesHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modaltechnologiesheaderx-button"
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
                            <div className="modalTechnologiesContent">
                                <div className="modalTechnologiesContentFe">
                                    <div className="modalTechnologiesContentFeTitle">
                                        <h3>Front-end technologies:</h3>
                                    </div>
                                    <div className="modalTechnologiesContentFeContent">
                                        {techFe.length > 0 && !loadingTechnologiesData ? (
                                            techFe.map((tech, index) => (
                                                <motion.div className="mTCFC-technology" key={index} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tName">Name:</label>
                                                            <input id="tName" type="text" defaultValue={tech.name} />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tColor">Color:</label>
                                                            <input id="tColor" type="text" defaultValue={tech.color} />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tImage">Image:</label>
                                                            <input id="tImage" type="text" defaultValue={tech.image} />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tSize">Size:</label>
                                                            <input id="ySize" type="text" defaultValue={tech.size} />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tInfoLink">Info link:</label>
                                                            <input id="tInfoLink" type="text" defaultValue={tech.infoLink} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechData" key="loadingtechdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div className="loaderTech" />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechData" key="notechdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                                <div className="modalTechnologiesContentBe">
                                    <div className="modalTechnologiesContentBeTitle">
                                        <h3>Back-end technologies:</h3>
                                    </div>
                                    <div className="modalTechnologiesContentBeContent">
                                        {techBe.length > 0 && !loadingTechnologiesData ? (
                                            techBe.map((tech, index) => (
                                                <motion.div className="mTCFC-technology" key={index} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tName">Name:</label>
                                                            <input id="tName" type="text" defaultValue={tech.name} />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tColor">Color:</label>
                                                            <input id="tColor" type="text" defaultValue={tech.color} />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tImage">Image:</label>
                                                            <input id="tImage" type="text" defaultValue={tech.image} />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tSize">Size:</label>
                                                            <input id="ySize" type="text" defaultValue={tech.size} />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label for="tInfoLink">Info link:</label>
                                                            <input id="tInfoLink" type="text" defaultValue={tech.infoLink} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechData" key="loadingtechdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div className="loaderTech" />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechData" key="notechdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modalTechnologiesFooter">
                                <motion.button
                                    className="modalTechnologiesBackButton"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modaltechnologiesbackbutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="modalTechnologiesUpdateButton"
                                    onClick={() => updateTechnologiesData()}
                                    key="modaltechnologiesupdatebutton"
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

export default CRUDTechnologiesButton;
