import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDJobButton.scss";

function CRUDJobButton(props) {
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getJob();
        }
    }, []);

    const getJob = () => {
        fetch("/job")
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
                    setJobData(data);
                    setLoadingJobData(false);
                }, 1000);
            });
    };

    return props.loading ? (
        <AnimatePresence>
            <motion.p className="CRUDJobBtnLoading" key="crudjobbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                LOADING...
            </motion.p>
        </AnimatePresence>
    ) : (
        <>
            <AnimatePresence>
                <motion.button
                    className="jobBtn"
                    onClick={() => setIsJobModalOpen(true)}
                    key="jobbtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    UPDATE JOB
                </motion.button>
            </AnimatePresence>
            <ModalJob isModalOpen={isJobModalOpen} setIsModalOpen={setIsJobModalOpen} loadingJobData={loadingJobData} jobData={jobData} />
        </>
    );

    function ModalJob({ isModalOpen, setIsModalOpen, loadingJobData, jobData }) {
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

        const updateJobData = () => {
            console.log("update");
            setIsModalOpen(false);
        };

        return ReactDOM.createPortal(
            <>
                {isModalOpen && (
                    <>
                        <div className="modalJobOverlay" />
                        <AnimatePresence>
                            <motion.div className="modalJob" style={modalStyle} key="modaljob" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                <div className="modalJobHeader">
                                    <div className="mJH-titleC">
                                        <h2>Update job data</h2>
                                    </div>
                                    <div className="mJH-buttonC">
                                        <motion.button
                                            className="modalJobHeaderX-button"
                                            onClick={() => setIsModalOpen(false)}
                                            key="modaljobheaderx-button"
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
                                <div className="modalJobContent"></div>
                                <div className="modalJobFooter">
                                    <motion.button
                                        className="modalJobBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modaljobbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalJobUpdateButton"
                                        onClick={() => updateJobData()}
                                        key="modaljobupdatebutton"
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

export default CRUDJobButton;
