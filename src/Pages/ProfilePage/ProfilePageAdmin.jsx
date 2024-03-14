import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import Notification from "/src/Components/Notification/Notification.jsx";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import CRUDTechnologiesButton from "/src/Components/CRUDTechnologiesButton/CRUDTechnologiesButton.jsx";
import CRUDProfessionButton from "/src/Components/CRUDProfessionButton/CRUDProfessionButton.jsx";
import CRUDJobButton from "/src/Components/CRUDJobButton/CRUDJobButton.jsx";
import CRUDProfileButton from "/src/Components/CRUDProfileButton/CRUDProfileButton.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.scss";

function ProfilePageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (info.api.enabled) {
            checkSession();
            getProfession();
            getJob();
            getProfile();
        } else {
            setTimeout(() => {
                setLanguages(dataFe.profileData.languages);
                setEducations(dataFe.profileData.educations);
                setSkills(dataFe.profileData.skills);
                setExperiences(dataFe.profileData.experiences);
                setLoadingProfessionData(false);
            }, 1000);
        }
    }, []);

    const checkSession = () => {
        const csrfToken = sessionStorage.getItem("csrfToken");

        fetch("/login/session", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken }),
        })
            .then((res) => {
                const statusCode = res.status;

                if (statusCode === 200) {
                    return { statusCode };
                } else {
                    return { statusCode };
                }
            })
            .then(({ statusCode }) => {
                if (statusCode !== 200) {
                    sessionStorage.setItem("isLoggedIn", "false");
                }
            });
    };

    const getProfession = () => {
        fetch("/profession", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
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
            });
    };

    const getJob = () => {
        fetch("/job", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
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
                setJobData(data);
            });
    };

    const getProfile = () => {
        fetch("/profile", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    setTimeout(() => {
                        setLoadingProfessionData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setLanguages(data.profileData.languages);
                    setEducations(data.profileData.educations);
                    setSkills(data.profileData.skills);
                    setExperiences(data.profileData.experiences);
                    setStatusDB(true);
                    setLoadingProfessionData(false);
                }, 1000);
            });
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    triggerNotification("LOGGED IN AS ADMIN", "Welcome back!", "success");
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

    const triggerNotification = (title, description, type) => {
        setNotificationContent({ title, description, type });
        setIsNotificationOpen(true);

        // Close the notification after 5 seconds
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 5000);
    };

    if (isLoggedIn === "true") {
        return (
            <div>
                {loading && load === "true" ? (
                    //Loading component here:
                    <LoadingScreen />
                ) : (
                    <div>
                        <HeaderAdmin />
                        <NavAdmin />
                        <div className="profilePageContainerAdmin">
                            <div className="breadcrumb">
                                <h2>Admin / profile</h2>
                            </div>
                            <ProfileAdminPageTitle />
                            <AboutMe loadingProfessionData={loadingProfessionData} professionData={professionData} jobData={jobData} />
                            <Languages loadingProfessionData={loadingProfessionData} statusDB={statusDB} languages={languages} />
                            <Education loadingProfessionData={loadingProfessionData} statusDB={statusDB} educations={educations} />
                            <Experience loadingProfessionData={loadingProfessionData} statusDB={statusDB} experiences={experiences} />
                            <Skills loadingProfessionData={loadingProfessionData} statusDB={statusDB} skills={skills} />
                            <Interests />
                            <Hobbies />
                            <ContactMe />
                            <Notification
                                isNotificationOpen={isNotificationOpen}
                                setIsNotificationOpen={setIsNotificationOpen}
                                title={notificationContent.title}
                                description={notificationContent.description}
                                type={notificationContent.type}
                            />
                        </div>
                        <FooterAdmin />
                    </div>
                )}
            </div>
        );
    } else {
        return <LoginFirstScreen />;
    }
}

function ProfileAdminPageTitle() {
    return (
        <div className="profilePageTitleContainer">
            <h2>MY PROFILE</h2>
        </div>
    );
}

function AboutMe({ loadingProfessionData, professionData, jobData }) {
    let description1 = "Hello, I'm Manu Partanen, a passionate software developer specializing in web development.";
    let description2 =
        "With a strong foundation in HTML, CSS, and JavaScript, I enjoy creating dynamic and responsive websites using modern front-end technologies like " +
        (jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStackFe : professionData?.professionStatus?.professionTechStackFe) +
        ". On the back-end, I'm currently working with " +
        (jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStackBe : professionData?.professionStatus?.professionTechStackBe) +
        ". " +
        (jobData?.jobStatus?.employed ? "Besides my job, " : "") +
        "I love working on my own projects during my free time using the skills that I've gained, and enjoy learning new tools and technologies while doing so.";
    let description3 =
        "In addition to my technical skills, I am a strong collaborator and enjoy working in agile development environments. I believe in continuous learning and staying up-to-date with the latest tech and best practices.";

    return (
        <div className="aboutMeContainer">
            <div className="aboutMeTitle">
                <h3>ABOUT ME</h3>
            </div>
            <div className="aboutMeContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMePhoto"
                        title="My LinkedIn"
                        href={info.LinkedIn.link}
                        target="_blank"
                        key="aboutmephotoA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <div className="aboutMeTextContainer">
                        <div className="aboutMeTextTitle">
                            <div className="aboutMeTextTitle1">
                                <h4 className="h4_1">{info.LinkedIn.name}</h4>
                                {info.api.enabled ? (
                                    (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingProfessionData) ? (
                                        <motion.h4 className="h4_2" key="h4_2successA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                                ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                                : professionData?.professionStatus?.profession}
                                        </motion.h4>
                                    ) : loadingProfessionData ? (
                                        <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loaderA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            LOADING...
                                        </motion.h4>
                                    ) : (
                                        <motion.h4 className="h4_2" style={{ color: "red", textShadow: "none" }} key="h4_2failA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            NO DATA!
                                        </motion.h4>
                                    )
                                ) : loadingProfessionData ? (
                                    <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loaderA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        LOADING...
                                    </motion.h4>
                                ) : (
                                    <motion.h4 className="h4_2" key="h4_2successA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {dataFe.jobStatus.employed && info.LinkedIn.jobTitle && info.LinkedIn.company
                                            ? info.LinkedIn.jobTitle + " at " + info.LinkedIn.company
                                            : info.LinkedIn.profession}
                                    </motion.h4>
                                )}
                            </div>
                            <div className="aboutMeTextTitle2">
                                {info.api.enabled && professionData?.professionStatus && (
                                    <>
                                        <CRUDProfessionButton loading={loadingProfessionData} />
                                        <CRUDJobButton loading={loadingProfessionData} />
                                        <CRUDTechnologiesButton loading={loadingProfessionData} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="aboutMeText">
                            {info.api.enabled ? (
                                (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingProfessionData) ? (
                                    <motion.p key="aboutmedescriptionsuccessA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {description1}
                                        <br />
                                        <br />
                                        {description2}
                                        <br />
                                        <br />
                                        {description3}
                                    </motion.p>
                                ) : loadingProfessionData ? (
                                    <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutmeA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfileAboutMe" />
                                    </motion.div>
                                ) : (
                                    <motion.p style={{ color: "red", textShadow: "none" }} key="aboutmedescriptionfailA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutmeA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileAboutMe" />
                                </motion.div>
                            ) : (
                                <motion.p key="aboutmedescriptionsuccessA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                    {info.LinkedIn.description1}
                                    <br />
                                    <br />
                                    {info.LinkedIn.description2}
                                    <br />
                                    <br />
                                    {info.LinkedIn.description3}
                                </motion.p>
                            )}
                        </div>
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function Languages({ loadingProfessionData, statusDB, languages }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>
                    MY LANGUAGES
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="languagesContent">
                <AnimatePresence>
                    {languages.length > 0 ? (
                        languages.map((language, index) => (
                            <motion.div
                                className="language"
                                style={{ backgroundColor: language.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                            >
                                <div className="languageLogo" style={{ backgroundImage: `url(${language.image})` }} />
                                <div className="languageContent">
                                    <h4>{language.name}</h4>
                                    <p>{language.proficiency}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadinglangprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="nolangprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Education({ loadingProfessionData, statusDB, educations }) {
    const [isVisibleEd, setIsVisibleEd] = useState(Array(educations.length).fill(false));

    const openOrCloseEducation = (index) => {
        const updatedVisibility = [...isVisibleEd];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEd(updatedVisibility);
    };

    return (
        <div className="educationsContainer">
            <div className="educationsTitle">
                <h3>
                    MY EDUCATION
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="educationsContent">
                <AnimatePresence>
                    {educations.length > 0 ? (
                        educations.map((education, index) => (
                            <motion.div
                                className="education"
                                style={{ "--education-color": education.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                onClick={() => openOrCloseEducation(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="educationTitle">
                                    <h4>{education.schoolName}</h4>
                                </div>
                                <div className="educationContent1" style={{ backgroundColor: education.color }}>
                                    <p>{education.degreeName}</p>
                                    <p>{education.timeAndPlace}</p>
                                    <div
                                        className="schoolLogo"
                                        style={{
                                            backgroundImage: `url(${education.image})`,
                                            backgroundColor: !education.image && education.color,
                                            backgroundPosition: education.backgroundPosition,
                                            backgroundSize: education.backgroundSize,
                                        }}
                                    />
                                </div>
                                <div className="educationContent2" style={{ display: isVisibleEd[index] ? "block" : "none" }}>
                                    <p>{education.educationDescription}</p>
                                    <p>{education.extra}</p>
                                    <p className="subjects">
                                        Education subjects: <span style={{ color: "white" }}>{education.educationSubjects}.</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadingedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Experience({ loadingProfessionData, statusDB, experiences }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    const getExperienceTime = (e) => {
        let startDate = new Date(e.startDate);
        startDate = formatDate(startDate);
        let endDate;
        let time;

        if (e.endDate === "") {
            endDate = "present";
            return startDate + " - " + endDate;
        } else {
            endDate = new Date(e.endDate);
            endDate = formatDate(endDate);
            time = e.time;

            const years = Math.floor(time / 12);
            const remainingMonths = time % 12;

            if (years < 1) {
                if (remainingMonths === 0) {
                    time = "0 months";
                } else if (remainingMonths === 1) {
                    time = remainingMonths + " month";
                } else {
                    time = remainingMonths + " months";
                }
            } else if (years === 1 && remainingMonths === 0) {
                time = "1 year";
            } else if (years === 1 && remainingMonths > 0) {
                if (remainingMonths === 1) {
                    time = `1 year and ${remainingMonths} month`;
                } else {
                    time = `1 year and ${remainingMonths} months`;
                }
            } else if (years > 1 && remainingMonths === 0) {
                if (years === 1) {
                    time = `${years} year`;
                } else {
                    time = `${years} years`;
                }
            } else {
                time = `${years} years and ${remainingMonths} months`;
            }

            return startDate + " - " + endDate + " (" + time + ")";
        }
    };

    const getTotalExperience = (index) => {
        let totalMonths = 0;

        experiences[index].experiences.map((e) => {
            if (e.time === 0) {
                const start = new Date(e.startDate);
                const end = new Date();
                const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                totalMonths += diffInMonths;
            } else {
                totalMonths += e.time;
            }
        });

        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        if (years < 1) {
            if (remainingMonths === 0) {
                return "NO EXPERIENCE YET!";
            } else if (remainingMonths === 1) {
                return remainingMonths + " month";
            } else {
                return remainingMonths + " months";
            }
        } else if (years === 1 && remainingMonths === 0) {
            return "1 year";
        } else if (years === 1 && remainingMonths > 0) {
            if (remainingMonths === 1) {
                return `1 year and ${remainingMonths} month`;
            } else {
                return `1 year and ${remainingMonths} months`;
            }
        } else if (years > 1 && remainingMonths === 0) {
            if (years === 1) {
                return `${years} year`;
            } else {
                return `${years} years`;
            }
        } else {
            return `${years} years and ${remainingMonths} months`;
        }
    };

    return (
        <div className="experiencesContainer">
            <div className="experiencesTitle">
                <h3>
                    EXPERIENCE
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="experiencesContent">
                <AnimatePresence>
                    {experiences.length > 0 ? (
                        experiences.map((experience, index) => (
                            <motion.div
                                className="experience"
                                style={{ "--experience-color": experience.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                onClick={() => openOrCloseExperience(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="experienceTitle" style={{ backgroundColor: experience.color }}>
                                    <div className="experienceTitleContainer">
                                        <h4>
                                            {experience.companyName}
                                            <span title="Currently employed" style={{ fontStyle: "normal" }}>
                                                {experience.current ? " 💼" : ""}
                                            </span>
                                        </h4>
                                    </div>
                                    <div
                                        className="companyLogo"
                                        style={{
                                            backgroundImage: `url(${experience.image})`,
                                            backgroundPosition: experience.backgroundPosition,
                                            backgroundSize: experience.backgroundSize,
                                            backgroundColor: !experience.image && experience.color,
                                        }}
                                    />
                                </div>
                                <div className="experienceContentContainer" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    {experience.experiences.map((e, i) => (
                                        <div className="experienceContent">
                                            <>
                                                <div className="companyTitle">
                                                    <p>
                                                        {e.workTitle + " at "}
                                                        {e.companyName}
                                                        {e.current && (
                                                            <span style={{ color: "lightgreen", fontSize: "20px", position: "relative", left: "5px", bottom: "1px" }}>
                                                                {" (CURRENTLY WORKING IN THIS ROLE)"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="workTitle">
                                                    <p>
                                                        Type: <span style={{ color: "white" }}>{e.workType}</span>
                                                    </p>
                                                    <p>
                                                        Time: <span style={{ color: "white" }}>{getExperienceTime(e)}</span>
                                                    </p>
                                                    <p>
                                                        Place: <span style={{ color: "white" }}>{e.place}</span>
                                                    </p>
                                                </div>
                                                <div className="description">
                                                    <p>Description:</p>
                                                    <p style={{ color: "white" }}>{e.workDescription}</p>
                                                </div>
                                                <div className="technologiesUsed">
                                                    <p>Technologies used:</p>
                                                    <p style={{ color: "white" }}>{e.workTech}.</p>
                                                </div>
                                            </>
                                            ;
                                        </div>
                                    ))}
                                    <div className="totalExperience" style={{ backgroundColor: experience.color }}>
                                        <h5>
                                            Total experience at {experience.companyName} {"(" + getTotalExperience(index) + ")"}
                                        </h5>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfessionData ? (
                        <motion.div className="loadingProfileData" key="loadingexpprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noutilexpprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Skills({ loadingProfessionData, statusDB, skills }) {
    const getSkillLevelTitle = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "Beginner";
        } else if (skillLevel === "experienced") {
            return "Experienced";
        } else if (skillLevel === "intermediate") {
            return "Intermediate";
        } else if (skillLevel === "advanced") {
            return "Advanced";
        } else if (skillLevel === "professional") {
            return "Professional";
        }
    };

    const getSkillLevel = (skillLevel) => {
        if (skillLevel === "beginner") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>*</span>****
                </div>
            );
        } else if (skillLevel === "experienced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>**</span>***
                </div>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>***</span>**
                </div>
            );
        } else if (skillLevel === "advanced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>****</span>*
                </div>
            );
        } else if (skillLevel === "professional") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "lightgreen" }}>*****</span>
                </div>
            );
        }
    };

    return (
        <div className="skillsContainer">
            <div className="skillsTitle">
                <h3>
                    MY SKILLS
                    <DBstate loading={loadingProfessionData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="skillsContent">
                <div className="webDevelopmentSoftware">
                    <div className="wDSTitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContent">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.containerizationSoftware?.length > 0 ? (
                                <>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle1}</h5>
                                        {skills.webDevelopmentSoftware.utilitySoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle2}</h5>
                                        {skills.webDevelopmentSoftware.cLISoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.LinkedIn.skills1SubTitle3}</h5>
                                        {skills.webDevelopmentSoftware.containerizationSoftware.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingwdsprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nowdsprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="front-endDevelopment">
                    <div className="fEDTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="fEDContent">
                        <AnimatePresence>
                            {skills.frontEndDevelopment?.frontEndProgrammingLanguages?.length > 0 &&
                            skills.frontEndDevelopment?.frontEndFrameworks?.length > 0 &&
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 ? (
                                <>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle1}</h5>
                                        {skills.frontEndDevelopment.frontEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle2}</h5>
                                        {skills.frontEndDevelopment.frontEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.LinkedIn.skills2SubTitle3}</h5>
                                        {skills.frontEndDevelopment.cSSFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingfedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nofedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="back-endDevelopment">
                    <div className="bEDTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="bEDContent">
                        <AnimatePresence>
                            {skills.backEndDevelopment?.backEndProgrammingLanguages?.length > 0 &&
                            skills.backEndDevelopment?.backEndFrameworks?.length > 0 &&
                            skills.backEndDevelopment?.databases?.length > 0 ? (
                                <>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle1}</h5>
                                        {skills.backEndDevelopment.backEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle2}</h5>
                                        {skills.backEndDevelopment.backEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.LinkedIn.skills3SubTitle3}</h5>
                                        {skills.backEndDevelopment.databases.map((skill, index) => (
                                            <motion.div
                                                className="skill"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogo"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContent">
                                                    <h4>{skill.name}</h4>
                                                    <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                    {getSkillLevel(skill.skillLevel)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfileData" key="loadingbedprofiledataA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nobedprofiledataA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Interests() {
    return (
        <div className="interestsContainer">
            <div className="interestsTitle">
                <h3>MY INTERESTS</h3>
            </div>
            <div className="interestsContent">
                <div className="interest1">
                    <div className="interest1Title">
                        <h4>IT infrastructure</h4>
                    </div>
                    <div className="interest1Content">
                        <div className="interest1ContentCover">
                            <div className="interest1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="interest2">
                    <div className="interest2Title">
                        <h4>Software Development</h4>
                    </div>
                    <div className="interest2Content">
                        <div className="interest2ContentCover">
                            <div className="interest2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="interest3">
                    <div className="interest3Title">
                        <h4>Robotics</h4>
                    </div>
                    <div className="interest3Content">
                        <div className="interest3ContentCover">
                            <div className="interest3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Hobbies() {
    return (
        <div className="hobbiesContainer">
            <div className="hobbiesTitle">
                <h3>MY HOBBIES</h3>
            </div>
            <div className="hobbiesContent">
                <div className="hobby1">
                    <div className="hobby1Title">
                        <h4>Gaming</h4>
                    </div>
                    <div className="hobby1Content">
                        <div className="hobby1ContentCover">
                            <div className="hobby1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby2">
                    <div className="hobby2Title">
                        <h4>Web development</h4>
                    </div>
                    <div className="hobby2Content">
                        <div className="hobby2ContentCover">
                            <div className="hobby2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby3">
                    <div className="hobby3Title">
                        <h4>Camping</h4>
                    </div>
                    <div className="hobby3Content">
                        <div className="hobby3ContentCover">
                            <div className="hobby3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMe() {
    return (
        <div className="contactContainer">
            <div className="contactTitle">
                <h3>MY CONTACT INFO</h3>
            </div>
            <div className="contactContent">
                <div className="phoneContainer">
                    <div className="phoneContainerTitle">
                        <h3>
                            PHONE<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>☎️</span>
                        </h3>
                    </div>
                    <div className="phoneContainerContent">
                        <div className="phone1">
                            <h4>{info.LinkedIn.phoneNumber}</h4>
                        </div>
                        <div className="phone2"></div>
                    </div>
                </div>
                <div className="emailContainer">
                    <div className="emailContainerTitle">
                        <h3>
                            EMAIL<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>📧</span>
                        </h3>
                    </div>
                    <div className="emailContainerContent">
                        <div className="email1">
                            <h4>{info.LinkedIn.emailAddress}</h4>
                        </div>
                        <div className="email2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePageAdmin;
