import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDGoalsButton.scss";

function CRUDGoalsButton(props) {
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
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

    const updateOrDeleteGoal = (action) => {
        if (action === "Update") {
            console.log(action.toLowerCase());
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
                    onClick={props.action === "Create" ? () => setIsGoalsModalOpen(true) : () => updateOrDeleteGoal(props.action)}
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
            <ModalGoals isModalOpen={isGoalsModalOpen} setIsModalOpen={setIsGoalsModalOpen} loadingGoalsData={loadingGoalsData} goals={goals} />
        </div>
    );
}

function ModalGoals({ isModalOpen, setIsModalOpen, loadingGoalsData, goals }) {
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

    const updateGoal = () => {
        console.log("update");
    };

    const deleteGoal = () => {
        console.log("delete");
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalGoalsOverlay" />
                    <AnimatePresence>
                        <motion.div className="modalGoals" style={modalStyle} key="modalgoals" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            <div className="modalGoalsHeader">
                                <div className="mGH-titleC">
                                    <h2>Create a new goal</h2>
                                </div>
                                <div className="mGH-buttonC">
                                    <motion.button
                                        className="modalGoalsHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalgoalsheaderx-button"
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
                            <div className="modalGoalsContent"></div>
                            <div className="modalGoalsFooter">
                                <motion.button
                                    className="modalGoalsBackButton"
                                    onClick={() => setIsModalOpen(false)}
                                    key="modalgoalsbackbutton"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="modalGoalsCreateButton"
                                    onClick={() => createGoal()}
                                    key="modalgoalscreatebutton"
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

export default CRUDGoalsButton;
