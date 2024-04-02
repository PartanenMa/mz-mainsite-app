import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDJobButton.scss";

function CRUDJobButton(props) {
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [jobData, setJobData] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

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
            <ModalJob
                isModalOpen={isJobModalOpen}
                setIsModalOpen={setIsJobModalOpen}
                loadingJobData={loadingJobData}
                jobData={jobData}
                getJob={props.getJob}
                reload={() => getJob()}
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

    function ModalJob({ isModalOpen, setIsModalOpen, jobData, getJob, reload, notification }) {
        const [modalStyle, setModalStyle] = useState({
            top: "",
            left: "",
        });
        const [formData, setFormData] = useState({
            employed: false,
            jobTitle: "",
            company: "",
            companyInfoLink: "",
            jobTechStack: "",
            jobTechStackFe: "",
            jobTechStackBe: "",
            jobAdditionalTech: "",
            companyColor: "",
            companyLogo: "",
            companyLogoH: "",
            companyLogoW: "",
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
            if (jobData) {
                setFormData(jobData.jobStatus);
            }
        }, [jobData]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const updateJob = () => {
            const employedBool = formData.employed === "true";

            const updatedJobData = {
                ...formData,
                employed: employedBool,
            };

            setIsModalOpen(false);

            fetch("/job", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedJobData),
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    reload();
                    getJob();
                } else {
                    notification("ERROR", "Failed to update job!", "error");
                }
            });
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
                                <form className="modalJobContent" onSubmit={() => updateJob()}>
                                    <div className="formComponent">
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="employed">{"Employed (true/false)"}</label>
                                                <input type="text" id="employed" name="employed" value={formData.employed} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="jobTitle">Job title:</label>
                                                <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="company">Company:</label>
                                                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="companyInfoLink">Company info link:</label>
                                                <input type="text" id="companyInfoLink" name="companyInfoLink" value={formData.companyInfoLink} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formComponent">
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="jobTechStack">Job tech stack:</label>
                                                <input type="text" id="jobTechStack" name="jobTechStack" value={formData.jobTechStack} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="jobAdditionalTech">Job additional tech:</label>
                                                <input type="text" id="jobAdditionalTech" name="jobAdditionalTech" value={formData.jobAdditionalTech} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="jobTechStackFe">Job tech stack fe:</label>
                                                <input type="text" id="jobTechStackFe" name="jobTechStackFe" value={formData.jobTechStackFe} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="jobTechStackBe">Job tech stack be:</label>
                                                <input type="text" id="jobTechStackBe" name="jobTechStackBe" value={formData.jobTechStackBe} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formComponent">
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="companyColor">Company color:</label>
                                                <input type="text" id="companyColor" name="companyColor" value={formData.companyColor} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="companyLogo">Company logo:</label>
                                                <input type="text" id="companyLogo" name="companyLogo" value={formData.companyLogo} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="fCDiv">
                                            <div>
                                                <label htmlFor="companyLogoH">Company logo height:</label>
                                                <input type="text" id="companyLogoH" name="companyLogoH" value={formData.companyLogoH} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="companyLogoW">Company logo width:</label>
                                                <input type="text" id="companyLogoW" name="companyLogoW" value={formData.companyLogoW} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="formFooter">
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
                                            type="submit"
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

export default CRUDJobButton;
