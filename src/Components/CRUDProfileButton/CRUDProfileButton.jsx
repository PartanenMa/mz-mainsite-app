import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Notification from "/src/Components/Notification/Notification.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./CRUDProfileButton.scss";

function CRUDProfileButton(props) {
    const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] = useState(false);
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
    const [loadingProfileData, setLoadingProfileData] = useState(true);
    const [profile, setProfile] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [requiredData, setRequiredData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            getProfile();
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

    const getProfile = () => {
        fetch("/profile", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const data = res.json();
                    return data;
                } else {
                    setTimeout(() => {
                        setLoadingProfileData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProfile(data.profileData);
                    setLanguages(data.profileData.languages);
                    setEducations(data.profileData.educations);
                    setSkills(data.profileData.skills);
                    setExperiences(data.profileData.experiences);
                    setLoadingProfileData(false);

                    if (props.data === "language") {
                        setRequiredData(data.profileData.languages.find((d) => d.id === props.id));
                    } else if (props.data === "education") {
                        setRequiredData(data.profileData.educations.find((d) => d.id === props.id));
                    } else if (props.data === "experience") {
                        setRequiredData(data.profileData.experiences.find((d) => d.id === props.id));
                    } else if (props.data === "role") {
                        const experience = data.profileData.experiences.find((d) => d.id === props.id);
                        setRequiredData(experience.roles.find((r) => r.id === props.roleId));
                    } else if (props.data === "skill") {
                        if (props.dataSkillType === "us") {
                            setRequiredData(data.profileData.skills.webDevelopmentSoftware.utilitySoftware.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "clis") {
                            setRequiredData(data.profileData.skills.webDevelopmentSoftware.cLISoftware.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "cs") {
                            setRequiredData(data.profileData.skills.webDevelopmentSoftware.devOpsSoftware.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "fepl") {
                            setRequiredData(data.profileData.skills.frontEndDevelopment.frontEndProgrammingLanguages.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "fef") {
                            setRequiredData(data.profileData.skills.frontEndDevelopment.frontEndFrameworks.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "cssf") {
                            setRequiredData(data.profileData.skills.frontEndDevelopment.cSSFrameworks.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "bepl") {
                            setRequiredData(data.profileData.skills.backEndDevelopment.backEndProgrammingLanguages.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "bef") {
                            setRequiredData(data.profileData.skills.backEndDevelopment.backEndFrameworks.find((d) => d.id === props.id));
                        } else if (props.dataSkillType === "db") {
                            setRequiredData(data.profileData.skills.backEndDevelopment.databases.find((d) => d.id === props.id));
                        }
                    }
                }, 1000);
            });
    };

    const openUpdateProfileModalOrDeleteProfile = (action, profileId, data, dataSkillType) => {
        if (action === "Update") {
            setIsUpdateProfileModalOpen(true);
        } else if (action === "Delete") {
            const csrfToken = sessionStorage.getItem("csrfToken");
            let id = profileId;
            let rId;
            let dataType = data;
            let skillType;

            if (data === "role") {
                rId = props.roleId;
            } else if (data === "skill") {
                skillType = dataSkillType;
            } else {
                skillType = "";
            }

            let typeOfSkill = "";

            if (skillType === "us") {
                skillType = "utilitySoftware";
                typeOfSkill = "web";
            } else if (skillType === "clis") {
                skillType = "cLISoftware";
                typeOfSkill = "web";
            } else if (skillType === "cs") {
                skillType = "devOpsSoftware";
                typeOfSkill = "web";
            } else if (skillType === "fepl") {
                skillType = "frontEndProgrammingLanguages";
                typeOfSkill = "fe";
            } else if (skillType === "fef") {
                skillType = "frontEndFrameworks";
                typeOfSkill = "fe";
            } else if (skillType === "cssf") {
                skillType = "cSSFrameworks";
                typeOfSkill = "fe";
            } else if (skillType === "bepl") {
                skillType = "backEndProgrammingLanguages";
                typeOfSkill = "be";
            } else if (skillType === "bef") {
                skillType = "backEndFrameworks";
                typeOfSkill = "be";
            } else if (skillType === "db") {
                skillType = "databases";
                typeOfSkill = "be";
            }

            if (dataType === "skill" && typeOfSkill === "web") {
                dataType = "skillWeb";
            } else if (dataType === "skill" && typeOfSkill === "fe") {
                dataType = "skillFe";
            } else if (dataType === "skill" && typeOfSkill === "be") {
                dataType = "skillBe";
            }

            let body = { type: dataType, skillType: skillType, roleId: rId, csrfToken: csrfToken };

            fetch(`/profile/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then((res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    props.getProfile();
                } else {
                    triggerNotification("ERROR", "Failed to delete " + data + "!", "error");
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
        <div className={props.action === "Create" ? "profileBtnContainer" : "profileBtnContainerMod"}>
            <AnimatePresence>
                <motion.p className={"CRUDProfile" + props.action + "BtnLoading"} key="crudprofilebtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                    LOADING...
                </motion.p>
            </AnimatePresence>
        </div>
    ) : (
        <div className={props.action === "Create" ? "profileBtnContainer" : "profileBtnContainerMod"}>
            <AnimatePresence>
                <motion.button
                    className={"profile" + props.action + "Btn"}
                    onClick={props.action === "Create" ? () => setIsCreateProfileModalOpen(true) : () => openUpdateProfileModalOrDeleteProfile(props.action, props.id, props.data, props.dataSkillType)}
                    key="profilebtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    {props.action.toUpperCase() + " " + props.data.toUpperCase()}
                </motion.button>
            </AnimatePresence>
            <ModalCreateProfile
                isModalOpen={isCreateProfileModalOpen}
                setIsModalOpen={setIsCreateProfileModalOpen}
                data={props.data}
                id={props.id}
                getProfile={props.getProfile}
                notification={triggerNotification}
            />
            <ModalUpdateProfile
                isModalOpen={isUpdateProfileModalOpen}
                setIsModalOpen={setIsUpdateProfileModalOpen}
                data={props.data}
                dataSkillType={props.dataSkillType}
                loadingProfileData={loadingProfileData}
                profileData={requiredData}
                id={props.id}
                roleId={props.roleId}
                getProfile={props.getProfile}
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
    );
}

function ModalCreateProfile({ isModalOpen, setIsModalOpen, data, id, getProfile, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({});

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
        if (data === "language") {
            setFormData({
                name: "",
                proficiency: "",
                color: "",
                image: "",
            });
        } else if (data === "education") {
            setFormData({
                schoolName: "",
                degreeName: "",
                timeAndPlace: "",
                educationDescription: "",
                educationSubjects: "",
                color: "",
                image: "",
                backgroundPosition: "",
                backgroundSize: "",
            });
        } else if (data === "experience") {
            setFormData({
                companyName: "",
                color: "",
                image: "",
                backgroundPosition: "",
                backgroundSize: "",
                current: false,
                roles: [],
            });
        } else if (data === "role") {
            setFormData({
                companyName: "",
                color: "",
                current: false,
                workTitle: "",
                workType: "",
                startDate: "",
                endDate: "",
                time: 0,
                place: "",
                workDescription: "",
                workTech: "",
            });
        } else if (data === "skill") {
            setFormData({
                name: "",
                skillLevel: "",
                color: "",
                image: "",
                backgroundSize: "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createProfile = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");
        let eId;
        let dataType = data;
        let skillType;

        if (data === "role") {
            eId = id;
        } else if (data === "skill") {
            skillType = document.getElementById("skillType").value;
        } else {
            skillType = "";
        }

        let typeOfSkill = "";

        if (skillType === "us") {
            skillType = "utilitySoftware";
            typeOfSkill = "web";
        } else if (skillType === "clis") {
            skillType = "cLISoftware";
            typeOfSkill = "web";
        } else if (skillType === "cs") {
            skillType = "devOpsSoftware";
            typeOfSkill = "web";
        } else if (skillType === "fepl") {
            skillType = "frontEndProgrammingLanguages";
            typeOfSkill = "fe";
        } else if (skillType === "fef") {
            skillType = "frontEndFrameworks";
            typeOfSkill = "fe";
        } else if (skillType === "cssf") {
            skillType = "cSSFrameworks";
            typeOfSkill = "fe";
        } else if (skillType === "bepl") {
            skillType = "backEndProgrammingLanguages";
            typeOfSkill = "be";
        } else if (skillType === "bef") {
            skillType = "backEndFrameworks";
            typeOfSkill = "be";
        } else if (skillType === "db") {
            skillType = "databases";
            typeOfSkill = "be";
        }

        if (dataType === "skill" && typeOfSkill === "web") {
            dataType = "skillWeb";
        } else if (dataType === "skill" && typeOfSkill === "fe") {
            dataType = "skillFe";
        } else if (dataType === "skill" && typeOfSkill === "be") {
            dataType = "skillBe";
        }

        const newData = formData;

        if (data === "role") {
            newData.current = document.getElementById("current").value === "true";
        } else if (data === "experience") {
            newData.current = document.getElementById("current").value === "true";
        }

        let body = { type: dataType, skillType: skillType, data: newData, experienceId: eId, csrfToken: csrfToken };

        setIsModalOpen(false);

        fetch("/profile", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProfile();
            } else {
                notification("ERROR", "Failed to create " + dataType + "!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalCreateProfileOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalCreateProfile"
                            style={modalStyle}
                            key="modalcreateprofile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalCreateProfileHeader">
                                <div className="mCPH-titleC">
                                    <h2>{"Create a new " + data}</h2>
                                </div>
                                <div className="mCPH-buttonC">
                                    <motion.button
                                        className="modalCreateProfileHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprofileheaderx-button"
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
                            <form className="modalCreateProfileContent" onSubmit={() => createProfile()}>
                                {data === "language" && (
                                    <>
                                        <div className="formComponent" style={{ height: "40%" }}>
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="proficiency">Proficiency:</label>
                                                <input type="text" id="proficiency" name="proficiency" value={formData.proficiency} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "40%" }}>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "education" && (
                                    <>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="schoolName">School name:</label>
                                                <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="degreeName">Degree name:</label>
                                                <input type="text" id="degreeName" name="degreeName" value={formData.degreeName} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="timeAndPlace">Time and place:</label>
                                                <input type="text" id="timeAndPlace" name="timeAndPlace" value={formData.timeAndPlace} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="educationDescription">Education description:</label>
                                                <input type="text" id="educationDescription" name="educationDescription" value={formData.educationDescription} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="educationSubjects">Education subjects:</label>
                                                <input type="text" id="educationSubjects" name="educationSubjects" value={formData.educationSubjects} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input style={{ width: "180px" }} type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundPosition">Background position:</label>
                                                <input
                                                    style={{ width: "180px" }}
                                                    type="text"
                                                    id="backgroundPosition"
                                                    name="backgroundPosition"
                                                    value={formData.backgroundPosition}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundSize">{"Background size (%)"}</label>
                                                <input style={{ width: "180px" }} type="text" id="backgroundSize" name="backgroundSize" value={formData.backgroundSize} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "experience" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="companyName">Company name:</label>
                                                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input style={{ width: "180px" }} type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundPosition">Background position:</label>
                                                <input
                                                    style={{ width: "180px" }}
                                                    type="text"
                                                    id="backgroundPosition"
                                                    name="backgroundPosition"
                                                    value={formData.backgroundPosition}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div>
                                                <label htmlFor="backGroundSize">{"Background size (%):"}</label>
                                                <input type="text" id="backGroundSize" name="backGroundSize" value={formData.backGroundSize} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="current">{"Current (true/false):"}</label>
                                                <select name="current" id="current" defaultValue={formData.current}>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "role" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <div className="fCD">
                                                    <label htmlFor="companyName">Company name:</label>
                                                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="current">{"Current (true/false):"}</label>
                                                    <select name="current" id="current" defaultValue={formData.current}>
                                                        <option value="true">True</option>
                                                        <option value="false">False</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="workTitle">Work title:</label>
                                                    <input type="text" id="workTitle" name="workTitle" value={formData.workTitle} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="workType">Work type:</label>
                                                    <input type="text" id="workType" name="workType" value={formData.workType} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="time">{"Time (months):"}</label>
                                                    <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="startDate">Start date:</label>
                                                    <input type="text" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="endDate">End date:</label>
                                                    <input type="text" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="place">Place:</label>
                                                    <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="workDescription">Work description:</label>
                                                    <input type="text" id="workDescription" name="workDescription" value={formData.workDescription} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="workTech">Work tech:</label>
                                                    <input type="text" id="workTech" name="workTech" value={formData.workTech} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "skill" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="skillLevel">Skill level:</label>
                                                <input type="text" id="skillLevel" name="skillLevel" value={formData.skillLevel} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div>
                                                <label htmlFor="backGroundSize">{"Background size (%)"}</label>
                                                <input type="text" id="backGroundSize" name="backGroundSize" value={formData.backGroundSize} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="skillType">Skill type:</label>
                                                <select name="skillType" id="skillType">
                                                    <option value="us">Utility software</option>
                                                    <option value="clis">CLI software</option>
                                                    <option value="cs">DevOps software</option>
                                                    <option value="fepl">Fe programming language</option>
                                                    <option value="fef">Fe framework</option>
                                                    <option value="cssf">CSS framework</option>
                                                    <option value="bepl">Be programming language</option>
                                                    <option value="bef">Be framework</option>
                                                    <option value="db">Database</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="formFooter">
                                    <motion.button
                                        className="modalCreateProfileBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalcreateprofilebackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalCreateProfileCreateButton"
                                        type="submit"
                                        key="modalcreateprofilecreatebutton"
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

function ModalUpdateProfile({ isModalOpen, setIsModalOpen, data, dataSkillType, profileData, id, roleId, getProfile, notification }) {
    const [modalStyle, setModalStyle] = useState({
        top: "",
        left: "",
    });
    const [formData, setFormData] = useState({});

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
        if (data === "language") {
            setFormData({
                name: profileData?.name,
                proficiency: profileData?.proficiency,
                color: profileData?.color,
                image: profileData?.image,
            });
        } else if (data === "education") {
            setFormData({
                schoolName: profileData?.schoolName,
                degreeName: profileData?.degreeName,
                timeAndPlace: profileData?.timeAndPlace,
                educationDescription: profileData?.educationDescription,
                educationSubjects: profileData?.educationSubjects,
                color: profileData?.color,
                image: profileData?.image,
                backgroundPosition: profileData?.backgroundPosition,
                backgroundSize: profileData?.backgroundSize,
            });
        } else if (data === "experience") {
            setFormData({
                companyName: profileData?.companyName,
                color: profileData?.color,
                image: profileData?.image,
                backgroundPosition: profileData?.backgroundPosition,
                backgroundSize: profileData?.backgroundSize,
                current: profileData?.current,
                roles: profileData?.roles,
            });
        } else if (data === "role") {
            setFormData({
                companyName: profileData?.companyName,
                color: profileData?.color,
                current: profileData?.current,
                workTitle: profileData?.workTitle,
                workType: profileData?.workType,
                startDate: profileData?.startDate,
                endDate: profileData?.endDate,
                time: profileData?.time,
                place: profileData?.place,
                workDescription: profileData?.workDescription,
                workTech: profileData?.workTech,
            });
        } else if (data === "skill") {
            setFormData({
                name: profileData?.name,
                skillLevel: profileData?.skillLevel,
                color: profileData?.color,
                image: profileData?.image,
                backgroundSize: profileData?.backgroundSize,
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateProfile = (profileId) => {
        const csrfToken = sessionStorage.getItem("csrfToken");
        let id = profileId;
        let rId;
        let dataType = data;
        let skillType;

        if (data === "role") {
            rId = roleId;
        } else if (data === "skill") {
            skillType = document.getElementById("skillType").value;
        } else {
            skillType = "";
        }

        let typeOfSkill = "";

        if (skillType === "us") {
            skillType = "utilitySoftware";
            typeOfSkill = "web";
        } else if (skillType === "clis") {
            skillType = "cLISoftware";
            typeOfSkill = "web";
        } else if (skillType === "cs") {
            skillType = "devOpsSoftware";
            typeOfSkill = "web";
        } else if (skillType === "fepl") {
            skillType = "frontEndProgrammingLanguages";
            typeOfSkill = "fe";
        } else if (skillType === "fef") {
            skillType = "frontEndFrameworks";
            typeOfSkill = "fe";
        } else if (skillType === "cssf") {
            skillType = "cSSFrameworks";
            typeOfSkill = "fe";
        } else if (skillType === "bepl") {
            skillType = "backEndProgrammingLanguages";
            typeOfSkill = "be";
        } else if (skillType === "bef") {
            skillType = "backEndFrameworks";
            typeOfSkill = "be";
        } else if (skillType === "db") {
            skillType = "databases";
            typeOfSkill = "be";
        }

        if (dataType === "skill" && typeOfSkill === "web") {
            dataType = "skillWeb";
        } else if (dataType === "skill" && typeOfSkill === "fe") {
            dataType = "skillFe";
        } else if (dataType === "skill" && typeOfSkill === "be") {
            dataType = "skillBe";
        }

        const updatedData = formData;

        if (data === "role") {
            updatedData.current = document.getElementById("current").value === "true";
        } else if (data === "experience") {
            updatedData.current = document.getElementById("current").value === "true";
        }

        let body = { type: dataType, skillType: skillType, data: updatedData, roleId: rId, csrfToken: csrfToken };

        setIsModalOpen(false);

        fetch(`/profile/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((res) => {
            const statusCode = res.status;

            if (statusCode < 400) {
                getProfile();
            } else {
                notification("ERROR", "Failed to update " + data + "!", "error");
            }
        });
    };

    return ReactDOM.createPortal(
        <>
            {isModalOpen && (
                <>
                    <div className="modalUpdateProfileOverlay" />
                    <AnimatePresence>
                        <motion.div
                            className="modalUpdateProfile"
                            style={modalStyle}
                            key="modalupdateprofile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                        >
                            <div className="modalUpdateProfileHeader">
                                <div className="mUPH-titleC">
                                    <h2>{"Update " + data}</h2>
                                </div>
                                <div className="mUPH-buttonC">
                                    <motion.button
                                        className="modalUpdateProfileHeaderX-button"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprofileheaderx-button"
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
                            <form className="modalUpdateProfileContent" onSubmit={() => updateProfile(id)}>
                                {data === "language" && (
                                    <>
                                        <div className="formComponent" style={{ height: "40%" }}>
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="proficiency">Proficiency:</label>
                                                <input type="text" id="proficiency" name="proficiency" value={formData.proficiency} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "40%" }}>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "education" && (
                                    <>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="schoolName">School name:</label>
                                                <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="degreeName">Degree name:</label>
                                                <input type="text" id="degreeName" name="degreeName" value={formData.degreeName} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="timeAndPlace">Time and place:</label>
                                                <input type="text" id="timeAndPlace" name="timeAndPlace" value={formData.timeAndPlace} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="educationDescription">Education description:</label>
                                                <input type="text" id="educationDescription" name="educationDescription" value={formData.educationDescription} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="educationSubjects">Education subjects:</label>
                                                <input type="text" id="educationSubjects" name="educationSubjects" value={formData.educationSubjects} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "20%" }}>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input style={{ width: "180px" }} type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundPosition">Background position:</label>
                                                <input
                                                    style={{ width: "180px" }}
                                                    type="text"
                                                    id="backgroundPosition"
                                                    name="backgroundPosition"
                                                    value={formData.backgroundPosition}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundSize">{"Background size (%)"}</label>
                                                <input style={{ width: "180px" }} type="text" id="backgroundSize" name="backgroundSize" value={formData.backgroundSize} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "experience" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="companyName">Company name:</label>
                                                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input style={{ width: "180px" }} type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="backgroundPosition">Background position:</label>
                                                <input
                                                    style={{ width: "180px" }}
                                                    type="text"
                                                    id="backgroundPosition"
                                                    name="backgroundPosition"
                                                    value={formData.backgroundPosition}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div>
                                                <label htmlFor="backGroundSize">{"Background size (%):"}</label>
                                                <input type="text" id="backGroundSize" name="backGroundSize" value={formData.backGroundSize} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="current">{"Current (true/false):"}</label>
                                                <select name="current" id="current" defaultValue={formData.current}>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "role" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <div className="fCD">
                                                    <label htmlFor="companyName">Company name:</label>
                                                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="current">{"Current (true/false):"}</label>
                                                    <select name="current" id="current" defaultValue={formData.current}>
                                                        <option value="true">True</option>
                                                        <option value="false">False</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="workTitle">Work title:</label>
                                                    <input type="text" id="workTitle" name="workTitle" value={formData.workTitle} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="workType">Work type:</label>
                                                    <input type="text" id="workType" name="workType" value={formData.workType} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="time">{"Time (months):"}</label>
                                                    <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="startDate">Start date:</label>
                                                    <input type="text" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="endDate">End date:</label>
                                                    <input type="text" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="place">Place:</label>
                                                    <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="workDescription">Work description:</label>
                                                    <input type="text" id="workDescription" name="workDescription" value={formData.workDescription} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fCD">
                                                <div>
                                                    <label htmlFor="workTech">Work tech:</label>
                                                    <input type="text" id="workTech" name="workTech" value={formData.workTech} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data === "skill" && (
                                    <>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="skillLevel">Skill level:</label>
                                                <input type="text" id="skillLevel" name="skillLevel" value={formData.skillLevel} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "25%" }}>
                                            <div>
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="image">Image:</label>
                                                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="formComponent" style={{ height: "30%" }}>
                                            <div>
                                                <label htmlFor="backGroundSize">{"Background size (%)"}</label>
                                                <input type="text" id="backGroundSize" name="backGroundSize" value={formData.backGroundSize} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="skillType">Skill type:</label>
                                                <select name="skillType" id="skillType" defaultValue={dataSkillType}>
                                                    <option value="us">Utility software</option>
                                                    <option value="clis">CLI software</option>
                                                    <option value="cs">DevOps software</option>
                                                    <option value="fepl">Fe programming language</option>
                                                    <option value="fef">Fe framework</option>
                                                    <option value="cssf">CSS framework</option>
                                                    <option value="bepl">Be programming language</option>
                                                    <option value="bef">Be framework</option>
                                                    <option value="db">Database</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="formFooter">
                                    <motion.button
                                        className="modalUpdateProfileBackButton"
                                        onClick={() => setIsModalOpen(false)}
                                        key="modalupdateprofilebackbutton"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="modalUpdateProfileUpdateButton"
                                        type="submit"
                                        key="modalupdateprofileupdatebutton"
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

export default CRUDProfileButton;
