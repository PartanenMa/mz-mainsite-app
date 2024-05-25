import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDProjectsButton.scss";

function CRUDProjectsButton(props) {
    const [isCreateProjectsModalOpen, setIsCreateProjectsModalOpen] = useState(false);
    const [isUpdateProjectsModalOpen, setIsUpdateProjectsModalOpen] = useState(false);
    const [loadingProjectsData, setLoadingProjectsData] = useState(true);
    const [projects, setProjects] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            getProjects();
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

    const getProjects = () => {
        fetch("/projects", {
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
                    setLoadingProjectsData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProjects(data.projectsData);
                    setLoadingProjectsData(false);
                }, 1000);
            });
    };

    const openUpdateProjectsModalOrDeleteProject = (action, projectId) => {
        if (action === "Update") {
            setIsUpdateProjectsModalOpen(true);
        } else if (action === "Delete") {
            const id = projectId;

            fetch(`/projects/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    props.getProjects();
                } else {
                    triggerNotification("ERROR", "Failed to delete project!", "error");
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
                <div className={props.action === "Create" ? "projectsBtnContainer" : "projectsBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDProjects" + props.action + "BtnLoading"} key="crudprojectsbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
            {windowWidth < 1280 && (
                <div className={props.action === "Create" ? "projectsBtnContainerMobile" : "projectsBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDProjects" + props.action + "BtnLoadingMobile"} key="crudprojectsbtnloadingmobile" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
        </>
    ) : (
        <>
            {windowWidth >= 1280 && (
                <div className={props.action === "Create" ? "projectsBtnContainer" : "projectsBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.button
                            className={"projects" + props.action + "Btn"}
                            onClick={props.action === "Create" ? () => setIsCreateProjectsModalOpen(true) : () => openUpdateProjectsModalOrDeleteProject(props.action, props.id)}
                            key="projectsbtn"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action.toUpperCase() + " PROJECT"}
                        </motion.button>
                    </AnimatePresence>
                    <ModalCreateProjects isModalOpen={isCreateProjectsModalOpen} setIsModalOpen={setIsCreateProjectsModalOpen} getProjects={props.getProjects} notification={triggerNotification} />
                    <ModalUpdateProjects
                        isModalOpen={isUpdateProjectsModalOpen}
                        setIsModalOpen={setIsUpdateProjectsModalOpen}
                        loadingProjectsData={loadingProjectsData}
                        projectData={projects.find((p) => p.id === props.id)}
                        id={props.id}
                        getProjects={props.getProjects}
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
                <div className={props.action === "Create" ? "projectsBtnContainerMobile" : "projectsBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.button
                            className={"projects" + props.action + "BtnMobile"}
                            onClick={props.action === "Create" ? () => setIsCreateProjectsModalOpen(true) : () => openUpdateProjectsModalOrDeleteProject(props.action, props.id)}
                            key="projectsbtnmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action.toUpperCase() + " PROJECT"}
                        </motion.button>
                    </AnimatePresence>
                    <ModalCreateProjectsMobile
                        isModalOpen={isCreateProjectsModalOpen}
                        setIsModalOpen={setIsCreateProjectsModalOpen}
                        getProjects={props.getProjects}
                        notification={triggerNotification}
                    />
                    <ModalUpdateProjectsMobile
                        isModalOpen={isUpdateProjectsModalOpen}
                        setIsModalOpen={setIsUpdateProjectsModalOpen}
                        loadingProjectsData={loadingProjectsData}
                        project={projects.find((p) => p.id === props.id)}
                        id={props.id}
                        getProjects={props.getProjects}
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

function ModalCreateProjects({ isModalOpen, setIsModalOpen, getProjects, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        tech: "",
        image: "",
        gHlink: "",
        pLink: "",
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

    const createProject = () => {
        const newProjectData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            tech: formData.tech,
            image: formData.image,
            gHlink: formData.gHlink,
            pLink: formData.pLink,
        };

        setIsModalOpen(false);

        fetch("/projects", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProjectData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProjects();
            } else {
                notification("ERROR", "Failed to create project!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateProjectsOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateProjects"
                            style={modalStyle}
                            key="modalcreateprojects"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateProjectsHeader">
                                <div className="mCPH-titleC">
                                    <h2>Create a new project</h2>
                                </div>
                                <div className="mCPH-buttonC">
                                    <motion.button
                                        className="modalCreateProjectsHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprojectsheaderx-button"
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
                            <form className="modalCreateProjectsContent" onSubmit={() => createProject()}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="type">Type:</label>
                                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tech">Tech:</label>
                                        <input type="text" id="tech" name="tech" value={formData.tech} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="gHlink">GitHub link:</label>
                                        <input type="text" id="gHlink" name="gHlink" value={formData.gHlink} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="pLink">Project link:</label>
                                        <input type="text" id="pLink" name="pLink" value={formData.pLink} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
                                    <motion.button
                                        className="modalCreateProjectsBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprojectsbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateProjectsCreateButton"
                                        type="submit"
                                        key="modalcreateprojectscreatebutton"
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

function ModalUpdateProjects({ isModalOpen, setIsModalOpen, projectData, id, getProjects, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        tech: "",
        image: "",
        gHlink: "",
        pLink: "",
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
        if (projectData) {
            setFormData({
                title: projectData.title,
                type: projectData.type,
                description: projectData.description,
                tech: projectData.tech,
                image: projectData.image,
                gHlink: projectData.gHlink,
                pLink: projectData.pLink,
            });
        }
    }, [projectData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateProject = (projectId) => {
        const id = projectId;

        const updatedProjectData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            tech: formData.tech,
            image: formData.image,
            gHlink: formData.gHlink,
            pLink: formData.pLink,
        };

        setIsModalOpen(false);

        fetch(`/projects/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProjectData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProjects();
            } else {
                notification("ERROR", "Failed to update project!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateProjectsOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateProjects"
                            style={modalStyle}
                            key="modalupdateprojects"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateProjectsHeader">
                                <div className="mUPH-titleC">
                                    <h2>Update project</h2>
                                </div>
                                <div className="mUPH-buttonC">
                                    <motion.button
                                        className="modalUpdateProjectsHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprojectsheaderx-button"
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
                            <form className="modalUpdateProjectsContent" onSubmit={() => updateProject(id)}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="type">Type:</label>
                                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tech">Tech:</label>
                                        <input type="text" id="tech" name="tech" value={formData.tech} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="gHlink">GitHub link:</label>
                                        <input type="text" id="gHlink" name="gHlink" value={formData.gHlink} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="pLink">Project link:</label>
                                        <input type="text" id="pLink" name="pLink" value={formData.pLink} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
                                    <motion.button
                                        className="modalUpdateProjectsBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprojectsbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateProjectsUpdateButton"
                                        type="submit"
                                        key="modalupdateprojectsupdatebutton"
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
function ModalCreateProjectsMobile({ isModalOpen, setIsModalOpen, getProjects, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        tech: "",
        image: "",
        gHlink: "",
        pLink: "",
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

    const createProject = () => {
        const newProjectData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            tech: formData.tech,
            image: formData.image,
            gHlink: formData.gHlink,
            pLink: formData.pLink,
        };

        setIsModalOpen(false);

        fetch("/projects", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProjectData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProjects();
            } else {
                notification("ERROR", "Failed to create project!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateProjectsOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateProjectsMobile"
                            style={modalStyle}
                            key="modalcreateprojectsmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateProjectsHeaderMobile">
                                <div className="mCPH-titleCM">
                                    <h2>Create a new project</h2>
                                </div>
                                <div className="mCPH-buttonCM">
                                    <motion.button
                                        className="modalCreateProjectsHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprojectsheaderx-buttonmobile"
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
                            <form className="modalCreateProjectsContentMobile" onSubmit={() => createProject()}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="type">Type:</label>
                                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tech">Tech:</label>
                                        <input type="text" id="tech" name="tech" value={formData.tech} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="gHlink">GitHub link:</label>
                                        <input type="text" id="gHlink" name="gHlink" value={formData.gHlink} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="pLink">Project link:</label>
                                        <input type="text" id="pLink" name="pLink" value={formData.pLink} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalCreateProjectsBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprojectsbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateProjectsCreateButtonMobile"
                                        type="submit"
                                        key="modalcreateprojectscreatebuttonmobile"
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

function ModalUpdateProjectsMobile({ isModalOpen, setIsModalOpen, projectData, id, getProjects, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        tech: "",
        image: "",
        gHlink: "",
        pLink: "",
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
        if (projectData) {
            setFormData({
                title: projectData.title,
                type: projectData.type,
                description: projectData.description,
                tech: projectData.tech,
                image: projectData.image,
                gHlink: projectData.gHlink,
                pLink: projectData.pLink,
            });
        }
    }, [projectData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateProject = (projectId) => {
        const id = projectId;

        const updatedProjectData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            tech: formData.tech,
            image: formData.image,
            gHlink: formData.gHlink,
            pLink: formData.pLink,
        };

        setIsModalOpen(false);

        fetch(`/project/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProjectData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProjects();
            } else {
                notification("ERROR", "Failed to update project!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateProjectsOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateProjectsMobile"
                            style={modalStyle}
                            key="modalupdateprojectsmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateProjectsHeaderMobile">
                                <div className="mUPH-titleCM">
                                    <h2>Update project</h2>
                                </div>
                                <div className="mUPH-buttonCM">
                                    <motion.button
                                        className="modalUpdateProjectsHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprojectsheaderx-buttonMobile"
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
                            <form className="modalUpdateProjectsContentMobile" onSubmit={() => updateProject(id)}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="type">Type:</label>
                                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tech">Tech:</label>
                                        <input type="text" id="tech" name="tech" value={formData.tech} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="gHlink">GitHub link:</label>
                                        <input type="text" id="gHlink" name="gHlink" value={formData.gHlink} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="pLink">Project link:</label>
                                        <input type="text" id="pLink" name="pLink" value={formData.pLink} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalUpdateProjectsBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprojectsbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateProjectsUpdateButtonMobile"
                                        type="submit"
                                        key="modalupdateprojectsupdatebuttonmobile"
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

export default CRUDProjectsButton;
