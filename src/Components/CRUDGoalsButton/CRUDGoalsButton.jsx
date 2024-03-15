import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDGoalsButton.scss";

function CRUDGoalsButton(props) {
    const [isCreateGoalsModalOpen, setIsCreateGoalsModalOpen] = useState(false);
    const [isUpdateGoalsModalOpen, setIsUpdateGoalsModalOpen] = useState(false);
    const [loadingGoalsData, setLoadingGoalsData] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getGoals();
        }
    }, []);

    const getGoals = () => {
        fetch("/goals", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = await res.json();
                    return data;
                } else {
                    setLoadingGoalsData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setGoals(data.goalsData);
                    setLoadingGoalsData(false);
                }, 1000);
            });
    };

    const openUpdateGoalsModalOrDeleteGoal = (action) => {
        if (action === "Update") {
            setIsUpdateGoalsModalOpen(true);
        } else if (action === "Delete") {
            console.log(action.toLowerCase());
        }
    };

    return props.loading ? (
        <div className={props.action === "Create" ? "goalsBtnContainer" : "goalsBtnContainerMod"}>
            <AnimatePresence>
                <motion.p className={"CRUDGoals" + props.action + "BtnLoading"} key="crudgoalsbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                    LOADING...
                </motion.p>
            </AnimatePresence>
        </div>
    ) : (
        <div className={props.action === "Create" ? "goalsBtnContainer" : "goalsBtnContainerMod"}>
            <AnimatePresence>
                <motion.button
                    className={"goals" + props.action + "Btn"}
                    onClick={props.action === "Create" ? () => setIsCreateGoalsModalOpen(true) : () => openUpdateGoalsModalOrDeleteGoal(props.action)}
                    key="goalsbtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    {props.action.toUpperCase() + " GOAL"}
                </motion.button>
            </AnimatePresence>
            <ModalCreateGoals isModalOpen={isCreateGoalsModalOpen} setIsModalOpen={setIsCreateGoalsModalOpen} />
            <ModalUpdateGoals isModalOpen={isUpdateGoalsModalOpen} setIsModalOpen={setIsUpdateGoalsModalOpen} loadingGoalsData={loadingGoalsData} goals={goals} />
        </div>
    );
}

function ModalCreateGoals({ isModalOpen, setIsModalOpen }) {
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

    const createGoal = () => {
        console.log("create");
        setIsModalOpen(false);
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateGoalsOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateGoals"
                            style={modalStyle}
                            key="modalcreategoals"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateGoalsHeader">
                                <div className="mCGH-titleC">
                                    <h2>Create a new goal</h2>
                                </div>
                                <div className="mCGH-buttonC">
                                    <motion.button
                                        className="modalCreateGoalsHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreategoalsheaderx-button"
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
                            <div className="modalCreateGoalsContent"></div>
                            <div className="modalCreateGoalsFooter">
                                <motion.button
                                    className="modalCreateGoalsBackButton"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modalcreategoalsbackbutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="modalCreateGoalsCreateButton"
                                    onClick={() => createGoal()}
                                    key="modalcreategoalscreatebutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Create
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

function ModalUpdateGoals({ isModalOpen, setIsModalOpen, loadingGoalsData, goals }) {
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

    const updateGoal = () => {
        console.log("update");
        setIsModalOpen(false);
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateGoalsOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateGoals"
                            style={modalStyle}
                            key="modalupdategoals"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateGoalsHeader">
                                <div className="mUGH-titleC">
                                    <h2>Update goal</h2>
                                </div>
                                <div className="mUGH-buttonC">
                                    <motion.button
                                        className="modalUpdateGoalsHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdategoalsheaderx-button"
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
                            <div className="modalUpdateGoalsContent"></div>
                            <div className="modalUpdateGoalsFooter">
                                <motion.button
                                    className="modalUpdateGoalsBackButton"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modalupdategoalsbackbutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="modalUpdateGoalsUpdateButton"
                                    onClick={() => updateGoal()}
                                    key="modalupdategoalscreatebutton"
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

export default CRUDGoalsButton;
