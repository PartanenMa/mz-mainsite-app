import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDTechnologiesButton.scss";

function CRUDTechnologiesButton(props) {
    const [isTechnologiesModalOpen, setIsTechnologiesModalOpen] = useState(false);
    const [loadingTechnologiesData, setLoadingTechnologiesData] = useState(true);
    const [technologies, setTechnologies] = useState([]);
    const [technologiesFe, setTechnologiesFe] = useState([]);
    const [technologiesBe, setTechnologiesBe] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

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
                    setTechnologies(data.technologiesData);
                    setTechnologiesFe(data.technologiesData.technologiesFe);
                    setTechnologiesBe(data.technologiesData.technologiesBe);
                    setLoadingTechnologiesData(false);
                }, 1000);
            });
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
        <AnimatePresence>
            <motion.p className="CRUDTechnologiesBtnLoading" key="crudtechnologiesbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                LOADING...
            </motion.p>
        </AnimatePresence>
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
                    UPDATE TECHNOLOGIES
                </motion.button>
            </AnimatePresence>
            <ModalTechnologies
                isModalOpen={isTechnologiesModalOpen}
                setIsModalOpen={setIsTechnologiesModalOpen}
                loadingTechnologiesData={loadingTechnologiesData}
                techData={technologies}
                techFe={technologiesFe}
                techBe={technologiesBe}
                notification={triggerNotification}
            />
            <Notification
                isNotificationOpen={isNotificationOpen}
                setIsNotificationOpen={setIsNotificationOpen}
                title={notificationContent.title}
                description={notificationContent.description}
                type={notificationContent.type}
            />
        </>
    );
}

function ModalTechnologies({ isModalOpen, setIsModalOpen, loadingTechnologiesData, techData, techFe, techBe, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        technologiesFe: [],
        technologiesBe: [],
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
        if (techData) {
            setFormData({
                technologiesFe: techData.technologiesFe,
                technologiesBe: techData.technologiesBe,
            });
        }
    }, [techData]);

    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData };

        //Update the specific field that changed:
        updatedFormData[type][index] = {
            ...updatedFormData[type][index],
            [name]: value,
        };

        setFormData(updatedFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTechData = {
            technologiesFe: formData.technologiesFe,
            technologiesBe: formData.technologiesBe,
        };

        fetch("/technologies", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTechData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                setIsModalOpen(false);
                notification("TECHNOLOGIES UPDATED", "Technologies updated successfully!", "success");
            } else {
                notification("ERROR", "Failed to update technologies!", "error");
            }
        });
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
                                    <h2>Update technologies data</h2>
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
                            <form className="modalTechnologiesContent" onSubmit={() => handleSubmit()}>
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
                                                            <label htmlFor={`tNameFe_${index}`}>Name:</label>
                                                            <input
                                                                id={`tNameFe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.name}
                                                                name="name"
                                                                onChange={(e) => handleChange(e, index, "technologiesFe")}
                                                            />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tColorFe_${index}`}>Color:</label>
                                                            <input
                                                                id={`tColorFe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.color}
                                                                name="color"
                                                                onChange={(e) => handleChange(e, index, "technologiesFe")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tImageFe_${index}`}>Image:</label>
                                                            <input
                                                                id={`tImageFe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.image}
                                                                name="image"
                                                                onChange={(e) => handleChange(e, index, "technologiesFe")}
                                                            />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tSizeFe_${index}`}>Size:</label>
                                                            <input
                                                                id={`tSizeFe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.size}
                                                                name="size"
                                                                onChange={(e) => handleChange(e, index, "technologiesFe")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tInfoLinkFe_${index}`}>Info link:</label>
                                                            <input
                                                                id={`tInfoLinkFe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.infoLink}
                                                                name="infoLink"
                                                                onChange={(e) => handleChange(e, index, "technologiesFe")}
                                                            />
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
                                                            <label htmlFor={`tNameBe_${index}`}>Name:</label>
                                                            <input
                                                                id={`tNameBe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.name}
                                                                name="name"
                                                                onChange={(e) => handleChange(e, index, "technologiesBe")}
                                                            />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tColorBe_${index}`}>Color:</label>
                                                            <input
                                                                id={`tColorBe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.color}
                                                                name="color"
                                                                onChange={(e) => handleChange(e, index, "technologiesBe")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tImageBe_${index}`}>Image:</label>
                                                            <input
                                                                id={`tImageBe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.image}
                                                                name="image"
                                                                onChange={(e) => handleChange(e, index, "technologiesBe")}
                                                            />
                                                        </div>
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tSizeBe_${index}`}>Size:</label>
                                                            <input
                                                                id={`tSizeBe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.size}
                                                                name="size"
                                                                onChange={(e) => handleChange(e, index, "technologiesBe")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mTCFC-technologySection">
                                                        <div className="mTCFCTSFragment">
                                                            <label htmlFor={`tInfoLinkBe_${index}`}>Info link:</label>
                                                            <input
                                                                id={`tInfoLinkBe_${index}`}
                                                                type="text"
                                                                defaultValue={tech.infoLink}
                                                                name="infoLink"
                                                                onChange={(e) => handleChange(e, index, "technologiesBe")}
                                                            />
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
                            </form>
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
                                    onClick={handleSubmit}
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
