import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDVideosButton.scss";

function CRUDVideosButton(props) {
    const [isCreateVideosModalOpen, setIsCreateVideosModalOpen] = useState(false);
    const [isUpdateVideosModalOpen, setIsUpdateVideosModalOpen] = useState(false);
    const [loadingVideosData, setLoadingVideosData] = useState(true);
    const [videos, setVideos] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            getVideos();
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

    const getVideos = () => {
        fetch("/videos", {
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
                    setLoadingVideosData(false);
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setVideos(data.videosData);
                    setLoadingVideosData(false);
                }, 1000);
            });
    };

    const openUpdateVideosModalOrDeleteVideo = (action, videoId) => {
        if (action === "Update") {
            setIsUpdateVideosModalOpen(true);
        } else if (action === "Delete") {
            const id = videoId;

            fetch(`/videos/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    props.getVideos();
                } else {
                    triggerNotification("ERROR", "Failed to delete video!", "error");
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
                <div className={props.action === "Create" ? "videosBtnContainer" : "videosBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDVideos" + props.action + "BtnLoading"} key="crudvideosbtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
            {windowWidth < 1280 && (
                <div className={props.action === "Create" ? "videosBtnContainerMobile" : "videosBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.p className={"CRUDVideos" + props.action + "BtnLoadingMobile"} key="crudvideosbtnloadingmobile" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                            LOADING...
                        </motion.p>
                    </AnimatePresence>
                </div>
            )}
        </>
    ) : (
        <>
            {windowWidth >= 1280 && (
                <div className={props.action === "Create" ? "videosBtnContainer" : "videosBtnContainerMod"}>
                    <AnimatePresence>
                        <motion.button
                            className={"videos" + props.action + "Btn"}
                            onClick={props.action === "Create" ? () => setIsCreateVideosModalOpen(true) : () => openUpdateVideosModalOrDeleteVideo(props.action, props.id)}
                            key="videosbtn"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action.toUpperCase() + " VIDEO"}
                        </motion.button>
                    </AnimatePresence>
                    <ModalCreateVideos isModalOpen={isCreateVideosModalOpen} setIsModalOpen={setIsCreateVideosModalOpen} getVideos={props.getVideos} notification={triggerNotification} />
                    <ModalUpdateVideos
                        isModalOpen={isUpdateVideosModalOpen}
                        setIsModalOpen={setIsUpdateVideosModalOpen}
                        loadingVideosData={loadingVideosData}
                        videoData={videos.find((v) => v.id === props.id)}
                        id={props.id}
                        getVideos={props.getVideos}
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
                <div className={props.action === "Create" ? "videosBtnContainerMobile" : "videosBtnContainerModMobile"}>
                    <AnimatePresence>
                        <motion.button
                            className={"videos" + props.action + "BtnMobile"}
                            onClick={props.action === "Create" ? () => setIsCreateVideosModalOpen(true) : () => openUpdateVideosModalOrDeleteVideo(props.action, props.id)}
                            key="videosbtnmobile"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {props.action.toUpperCase() + " VIDEO"}
                        </motion.button>
                    </AnimatePresence>
                    <ModalCreateVideosMobile isModalOpen={isCreateVideosModalOpen} setIsModalOpen={setIsCreateVideosModalOpen} getVideos={props.getVideos} notification={triggerNotification} />
                    <ModalUpdateVideosMobile
                        isModalOpen={isUpdateVideosModalOpen}
                        setIsModalOpen={setIsUpdateVideosModalOpen}
                        loadingVideosData={loadingVideosData}
                        video={videos.find((v) => v.id === props.id)}
                        id={props.id}
                        getVideos={props.getVideos}
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

function ModalCreateVideos({ isModalOpen, setIsModalOpen, getVideos, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        tags: "",
        image: "",
        link: "",
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

    const createVideo = () => {
        const newVideoData = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            tags: formData.tags,
            image: formData.image,
            link: formData.link,
        };

        setIsModalOpen(false);

        fetch("/videos", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVideoData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getVideos();
            } else {
                notification("ERROR", "Failed to create video!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateVideosOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateVideos"
                            style={modalStyle}
                            key="modalcreatevideos"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateVideosHeader">
                                <div className="mCVH-titleC">
                                    <h2>Create a new video</h2>
                                </div>
                                <div className="mCVH-buttonC">
                                    <motion.button
                                        className="modalCreateVideosHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreatevideosheaderx-button"
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
                            <form className="modalCreateVideosContent" onSubmit={() => createVideo()}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Category:</label>
                                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tags">Tags:</label>
                                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="link">Link:</label>
                                        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
                                    <motion.button
                                        className="modalCreateVideosBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreatevideosbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateVideosCreateButton"
                                        type="submit"
                                        key="modalcreatevideoscreatebutton"
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

function ModalUpdateVideos({ isModalOpen, setIsModalOpen, videoData, id, getVideos, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        tags: "",
        image: "",
        link: "",
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
        if (videoData) {
            setFormData({
                title: videoData.title,
                category: videoData.category,
                description: videoData.description,
                tags: videoData.tags,
                image: videoData.image,
                link: videoData.link,
            });
        }
    }, [videoData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateVideo = (videoId) => {
        const id = videoId;

        const updatedVideoData = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            tags: formData.tags,
            image: formData.image,
            link: formData.link,
        };

        setIsModalOpen(false);

        fetch(`/videos/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedVideoData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getVideos();
            } else {
                notification("ERROR", "Failed to update video!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateVideosOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateVideos"
                            style={modalStyle}
                            key="modalupdatevideos"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateVideosHeader">
                                <div className="mUVH-titleC">
                                    <h2>Update video</h2>
                                </div>
                                <div className="mUVH-buttonC">
                                    <motion.button
                                        className="modalUpdateVideosHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdatevideosheaderx-button"
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
                            <form className="modalUpdateVideosContent" onSubmit={() => updateVideo(id)}>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Category:</label>
                                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tags">Tags:</label>
                                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponent">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="link">Link:</label>
                                        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooter">
                                    <motion.button
                                        className="modalUpdateVideosBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdatevideosbackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateVideosUpdateButton"
                                        type="submit"
                                        key="modalupdatevideossupdatebutton"
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
function ModalCreateVideosMobile({ isModalOpen, setIsModalOpen, getVideos, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        tags: "",
        image: "",
        link: "",
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

    const createVideo = () => {
        const newVideoData = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            tags: formData.tags,
            image: formData.image,
            link: formData.link,
        };

        setIsModalOpen(false);

        fetch("/videos", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVideoData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getVideos();
            } else {
                notification("ERROR", "Failed to create video!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateVideosOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateVideosMobile"
                            style={modalStyle}
                            key="modalcreatevideosmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateVideosHeaderMobile">
                                <div className="mCVH-titleCM">
                                    <h2>Create a new video</h2>
                                </div>
                                <div className="mCVH-buttonCM">
                                    <motion.button
                                        className="modalCreateVideosHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreatevideosheaderx-buttonmobile"
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
                            <form className="modalCreateVideosContentMobile" onSubmit={() => createVideo()}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Category:</label>
                                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tags">Tags:</label>
                                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="link">Link:</label>
                                        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalCreateVideosBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreatevideosbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateVideosCreateButtonMobile"
                                        type="submit"
                                        key="modalcreatevideoscreatebuttonmobile"
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

function ModalUpdateVideosMobile({ isModalOpen, setIsModalOpen, videoData, id, getVideos, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        tags: "",
        image: "",
        link: "",
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
        if (videoData) {
            setFormData({
                title: videoData.title,
                category: videoData.category,
                description: videoData.description,
                tags: videoData.tags,
                image: videoData.image,
                link: videoData.link,
            });
        }
    }, [videoData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateVideo = (videoId) => {
        const id = videoId;

        const updatedVideoData = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            tags: formData.tags,
            image: formData.image,
            link: formData.link,
        };

        setIsModalOpen(false);

        fetch(`/videos/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedVideoData),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getVideos();
            } else {
                notification("ERROR", "Failed to update video!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateVideosOverlayMobile" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateVideosMobile"
                            style={modalStyle}
                            key="modalupdatevideosmobile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateVideosHeaderMobile">
                                <div className="mUVH-titleCM">
                                    <h2>Update video</h2>
                                </div>
                                <div className="mUVH-buttonCM">
                                    <motion.button
                                        className="modalUpdateVideosHeaderX-buttonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdatevideosheaderx-buttonMobile"
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
                            <form className="modalUpdateVideosContentMobile" onSubmit={() => updateVideo(id)}>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Category:</label>
                                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="tags">Tags:</label>
                                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formComponentMobile">
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="link">Link:</label>
                                        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="formFooterMobile">
                                    <motion.button
                                        className="modalUpdateVideosBackButtonMobile"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdatevideosbackbuttonmobile"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateVideosUpdateButtonMobile"
                                        type="submit"
                                        key="modalupdatevideosupdatebuttonmobile"
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

export default CRUDVideosButton;
