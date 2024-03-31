import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDProfessionButton.scss";

function CRUDProfessionButton(props) {
    const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [professionData, setProfessionData] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

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
            <motion.p className="CRUDProfessionBtnLoading" key="crudprofessionbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                LOADING...
            </motion.p>
        </AnimatePresence>
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
                    UPDATE PROFESSION
                </motion.button>
            </AnimatePresence>
            <ModalProfession
                isModalOpen={isProfessionModalOpen}
                setIsModalOpen={setIsProfessionModalOpen}
                loadingProfessionData={loadingProfessionData}
                professionData={professionData}
                getProfession={props.getProfessionU}
                reload={() => getProfession()}
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

    function ModalProfession({ isModalOpen, setIsModalOpen, professionData, getProfession, reload, notification }) {
        const [modalStyle, setModalStyle] = useState({
            top: "",
            left: "",
        });
        const [formData, setFormData] = useState({
            profession: "",
            professionDetailed: "",
            professionTech: "",
            professionTechStack: "",
            professionTechStackFe: "",
            professionTechStackBe: "",
            professionAdditionalTech: "",
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
            if (professionData) {
                setFormData(professionData.professionStatus);
            }
        }, [professionData]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const updateProfession = () => {
            const updatedProfessionData = formData;

            setIsModalOpen(false);

            fetch("/profession", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfessionData),
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    reload();
                    getProfession();
                } else {
                    notification("ERROR", "Failed to update profession!", "error");
                }
            });
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
                                        <h2>Update profession data</h2>
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
                                <form className="modalProfessionContent" onSubmit={() => updateProfession()}>
                                    <div className="formComponent">
                                        <div className="fCDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div>
                                                <label htmlFor="profession">Profession:</label>
                                                <input type="text" id="profession" name="profession" value={formData.profession} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div>
                                                <label htmlFor="professionDetailed">Profession detailed:</label>
                                                <input type="text" id="professionDetailed" name="professionDetailed" value={formData.professionDetailed} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formComponent">
                                        <div className="fCDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div>
                                                <label htmlFor="professionTech">Profession tech:</label>
                                                <input type="text" id="professionTech" name="professionTech" value={formData.professionTech} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div>
                                                <label htmlFor="professionTechStack">Profession tech stack:</label>
                                                <input type="text" id="professionTechStack" name="professionTechStack" value={formData.professionTechStack} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formComponent">
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="professionTechStackFe">Profession tech stack fe:</label>
                                                <input type="text" id="professionTechStackFe" name="professionTechStackFe" value={formData.professionTechStackFe} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="professionTechStackBe">Profession tech stack be:</label>
                                                <input type="text" id="professionTechStackBe" name="professionTechStackBe" value={formData.professionTechStackBe} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="professionAdditionalTech">Profession additional tech:</label>
                                                <input type="text" id="professionAdditionalTech" name="professionAdditionalTech" value={formData.professionAdditionalTech} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formFooter">
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
                                            type="submit"
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
                                </form>
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
