import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDGoalsButton.scss";

function CRUDGoalsButton(props) {
    const [isCreateGoalsModalOpen, setIsCreateGoalsModalOpen] = useState(false);
    const [isUpdateGoalsModalOpen, setIsUpdateGoalsModalOpen] = useState(false);
    const [loadingGoalsData, setLoadingGoalsData] = useState(true);
    const [goals, setGoals] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            getGoals();
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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

    const openUpdateGoalsModalOrDeleteGoal = (action, goalId) => {
        if (action === "Update") {
            setIsUpdateGoalsModalOpen(true);
        } else if (action === "Delete") {
            const id = goalId;

            fetch(`/goals/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    props.getGoals();
                } else {
                    triggerNotification("ERROR", "Failed to delete goal!", "error");
                }
            });
        }
    };

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        //Close the notification after 5 seconds:
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    return props.loading ? (
        <>
            {windowWidth >= 1280 && (
                <div className={props.action === "Create" ? "goalsBtnContainer" : "goalsBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDGoals" + props.action + "BtnLoading"} key="crudgoalsbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
            {windowWidth < 1280 && (
                <div className={props.action === "Create" ? "goalsBtnContainerMobile" : "goalsBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDGoals" + props.action + "BtnLoadingMobile"} key="crudgoalsbtnloadingmobile" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
        </>
    ) : (
        <>
            {windowWidth >= 1280 && (
                <div className={props.action === "Create" ? "goalsBtnContainer" : "goalsBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.button
                            className={"goals" + props.action + "Btn"}
                            onClick={props.action === "Create" ? () => setIsCreateGoalsModalOpen(true) : () => openUpdateGoalsModalOrDeleteGoal(props.action, props.id)}
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
                    <ModalCreateGoals isModalOpen={isCreateGoalsModalOpen} setIsModalOpen={setIsCreateGoalsModalOpen} getGoals={props.getGoals} notification={triggerNotification} />
                    <ModalUpdateGoals
                        isModalOpen={isUpdateGoalsModalOpen}
                        setIsModalOpen={setIsUpdateGoalsModalOpen}
                        loadingGoalsData={loadingGoalsData}
                        goalData={goals.find((g) => g.id === props.id)}
                        id={props.id}
                        getGoals={props.getGoals}
                        notification={triggerNotification}
                    />
                    <Notification
                        isNotificationOpen={isNotificationOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        title={notificationContent.title}
                        description={notificationContent.description}
                        type={notificationContent.type}
                    />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className={props.action === "Create" ? "goalsBtnContainerMobile" : "goalsBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.button
                            className={"goals" + props.action + "BtnMobile"}
                            onClick={props.action === "Create" ? () => setIsCreateGoalsModalOpen(true) : () => openUpdateGoalsModalOrDeleteGoal(props.action, props.id)}
                            key="goalsbtnmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action.toUpperCase() + " GOAL"}
                        </motion.button>
                    </AnimatePresence>
                    <ModalCreateGoalsMobile isModalOpen={isCreateGoalsModalOpen} setIsModalOpen={setIsCreateGoalsModalOpen} getGoals={props.getGoals} notification={triggerNotification} />
                    <ModalUpdateGoalsMobile
                        isModalOpen={isUpdateGoalsModalOpen}
                        setIsModalOpen={setIsUpdateGoalsModalOpen}
                        loadingGoalsData={loadingGoalsData}
                        goalData={goals.find((g) => g.id === props.id)}
                        id={props.id}
                        getGoals={props.getGoals}
                        notification={triggerNotification}
                    />
                    <Notification
                        isNotificationOpen={isNotificationOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        title={notificationContent.title}
                        description={notificationContent.description}
                        type={notificationContent.type}
                    />
                </div>
            )}
        </>
    );
}

function ModalCreateGoals({ isModalOpen, setIsModalOpen, getGoals, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        status: "",
        step1: "",
        status1: "",
        step2: "",
        status2: "",
        step3: "",
        status3: "",
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createGoal = () => {
        const newGoalData = {
            title: formData.title,
            status: formData.status,
            step1: {
                step: formData.step1,
                status: formData.status1,
            },
            step2: {
                step: formData.step2,
                status: formData.status2,
            },
            step3: {
                step: formData.step3,
                status: formData.status3,
            },
        };

        setIsModalOpen(false);

        fetch("/goals", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGoalData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getGoals();
            } else {
                notification("ERROR", "Failed to create goal!", "error");
            }
        });
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
                            <form className="modalCreateGoalsContent" onSubmit={() => createGoal()}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">Status:</label>
                                        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step1">Step 1:</label>
                                        <input type="text" id="step1" name="step1" value={formData.step1} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status1">Status 1:</label>
                                        <input type="text" id="status1" name="status1" value={formData.status1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step2">Step 2:</label>
                                        <input type="text" id="step2" name="step2" value={formData.step2} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status2">Status 2:</label>
                                        <input type="text" id="status2" name="status2" value={formData.status2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step3">Step 3:</label>
                                        <input type="text" id="step3" name="step3" value={formData.step3} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status3">Status 3:</label>
                                        <input type="text" id="status3" name="status3" value={formData.status3} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
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
                                        type="submit"
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
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

function ModalUpdateGoals({ isModalOpen, setIsModalOpen, goalData, id, getGoals, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        status: "",
        step1: "",
        status1: "",
        step2: "",
        status2: "",
        step3: "",
        status3: "",
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

    useEffect(() => {
        if (goalData) {
            setFormData({
                title: goalData.title,
                status: goalData.status,
                step1: goalData.step1.step,
                status1: goalData.step1.status,
                step2: goalData.step2.step,
                status2: goalData.step2.status,
                step3: goalData.step3.step,
                status3: goalData.step3.status,
            });
        }
    }, [goalData]);

    const handleChange = (e) => {
        console.log(goalData);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateGoal = (goalId) => {
        const id = goalId;

        const updatedGoalData = {
            title: formData.title,
            status: formData.status,
            step1: {
                step: formData.step1,
                status: formData.status1,
            },
            step2: {
                step: formData.step2,
                status: formData.status2,
            },
            step3: {
                step: formData.step3,
                status: formData.status3,
            },
        };

        setIsModalOpen(false);

        fetch(`/goals/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoalData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getGoals();
            } else {
                notification("ERROR", "Failed to update goal!", "error");
            }
        });
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
                            <form className="modalUpdateGoalsContent" onSubmit={() => updateGoal(id)}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">Status:</label>
                                        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step1">Step 1:</label>
                                        <input type="text" id="step1" name="step1" value={formData.step1} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status1">Status 1:</label>
                                        <input type="text" id="status1" name="status1" value={formData.status1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step2">Step 2:</label>
                                        <input type="text" id="step2" name="step2" value={formData.step2} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status2">Status 2:</label>
                                        <input type="text" id="status2" name="status2" value={formData.status2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="step3">Step 3:</label>
                                        <input type="text" id="step3" name="step3" value={formData.step3} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status3">Status 3:</label>
                                        <input type="text" id="status3" name="status3" value={formData.status3} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
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
                                        type="submit"
                                        key="modalupdategoalsupdatebutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

//Mobile:
function ModalCreateGoalsMobile({ isModalOpen, setIsModalOpen, getGoals, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        status: "",
        step1: "",
        status1: "",
        step2: "",
        status2: "",
        step3: "",
        status3: "",
    });

    useEffect(() => {
        const updateModalPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 178}px`;

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createGoal = () => {
        const newGoalData = {
            title: formData.title,
            status: formData.status,
            step1: {
                step: formData.step1,
                status: formData.status1,
            },
            step2: {
                step: formData.step2,
                status: formData.status2,
            },
            step3: {
                step: formData.step3,
                status: formData.status3,
            },
        };

        setIsModalOpen(false);

        fetch("/goals", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGoalData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getGoals();
            } else {
                notification("ERROR", "Failed to create goal!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateGoalsOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateGoalsMobile"
                            style={modalStyle}
                            key="modalcreategoalsmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateGoalsHeaderMobile">
                                <div className="mCGH-titleCM">
                                    <h2>Create a new goal</h2>
                                </div>
                                <div className="mCGH-buttonCM">
                                    <motion.button
                                        className="modalCreateGoalsHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreategoalsheaderx-buttonmobile"
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
                            <form className="modalCreateGoalsContentMobile" onSubmit={() => createGoal()}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">Status:</label>
                                        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step1">Step 1:</label>
                                        <input type="text" id="step1" name="step1" value={formData.step1} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status1">Status 1:</label>
                                        <input type="text" id="status1" name="status1" value={formData.status1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step2">Step 2:</label>
                                        <input type="text" id="step2" name="step2" value={formData.step2} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status2">Status 2:</label>
                                        <input type="text" id="status2" name="status2" value={formData.status2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step3">Step 3:</label>
                                        <input type="text" id="step3" name="step3" value={formData.step3} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status3">Status 3:</label>
                                        <input type="text" id="status3" name="status3" value={formData.status3} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalCreateGoalsBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreategoalsbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateGoalsCreateButtonMobile"
                                        type="submit"
                                        key="modalcreategoalscreatebuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Create
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

function ModalUpdateGoalsMobile({ isModalOpen, setIsModalOpen, goalData, id, getGoals, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        status: "",
        step1: "",
        status1: "",
        step2: "",
        status2: "",
        step3: "",
        status3: "",
    });

    useEffect(() => {
        const updateModalPosition = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newTop = `${screenHeight / 2 - 298}px`;
            const newLeft = `${screenWidth / 2 - 178}px`;

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

    useEffect(() => {
        if (goalData) {
            setFormData({
                title: goalData.title,
                status: goalData.status,
                step1: goalData.step1.step,
                status1: goalData.step1.status,
                step2: goalData.step2.step,
                status2: goalData.step2.status,
                step3: goalData.step3.step,
                status3: goalData.step3.status,
            });
        }
    }, [goalData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateGoal = (goalId) => {
        const id = goalId;

        const updatedGoalData = {
            title: formData.title,
            status: formData.status,
            step1: {
                step: formData.step1,
                status: formData.status1,
            },
            step2: {
                step: formData.step2,
                status: formData.status2,
            },
            step3: {
                step: formData.step3,
                status: formData.status3,
            },
        };

        setIsModalOpen(false);

        fetch(`/goals/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoalData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getGoals();
            } else {
                notification("ERROR", "Failed to update goal!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateGoalsOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateGoalsMobile"
                            style={modalStyle}
                            key="modalupdategoalsmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateGoalsHeaderMobile">
                                <div className="mUGH-titleCM">
                                    <h2>Update goal</h2>
                                </div>
                                <div className="mUGH-buttonCM">
                                    <motion.button
                                        className="modalUpdateGoalsHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdategoalsheaderx-buttonMobile"
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
                            <form className="modalUpdateGoalsContentMobile" onSubmit={() => updateGoal(id)}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">Status:</label>
                                        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step1">Step 1:</label>
                                        <input type="text" id="step1" name="step1" value={formData.step1} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status1">Status 1:</label>
                                        <input type="text" id="status1" name="status1" value={formData.status1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step2">Step 2:</label>
                                        <input type="text" id="step2" name="step2" value={formData.step2} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status2">Status 2:</label>
                                        <input type="text" id="status2" name="status2" value={formData.status2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="step3">Step 3:</label>
                                        <input type="text" id="step3" name="step3" value={formData.step3} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="status3">Status 3:</label>
                                        <input type="text" id="status3" name="status3" value={formData.status3} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalUpdateGoalsBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdategoalsbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateGoalsUpdateButtonMobile"
                                        type="submit"
                                        key="modalupdategoalsupdatebuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

export default CRUDGoalsButton;
