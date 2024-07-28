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
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [loadingProfileData, setLoadingProfileData] = useState(true);
    const [statusDB, setStatusDB] = useState(false);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
                setLoadingJobData(false);
                setLoadingProfileData(false);
            }, 1000);
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
                    sessionStorage.setItem("csrfToken", "");
                }
            });
    };

    const getProfessionAfterUpdate = async () => {
        setLoadingProfessionData(true);
        setLoadingJobData(true);
        await getProfession();
        await getJob();
        triggerNotification("PROFESSION UPDATED", "Profession updated successfully!", "success");
    };

    const getJobAfterUpdate = async () => {
        setLoadingProfessionData(true);
        setLoadingJobData(true);
        await getProfession();
        await getJob();
        triggerNotification("JOB UPDATED", "Job updated successfully!", "success");
    };

    const getProfileAfterCreate = async () => {
        setLoadingProfileData(true);
        await getProfile();
        triggerNotification("PROFILE DATA CREATED", "Profile data created successfully!", "success");
    };

    const getProfileAfterUpdate = async () => {
        setLoadingProfileData(true);
        await getProfile();
        triggerNotification("PROFILE DATA UPDATED", "Profile data updated successfully!", "success");
    };

    const getProfileAfterDelete = async () => {
        setLoadingProfileData(true);
        await getProfile();
        triggerNotification("PROFILE DATA DELETED", "Profile data deleted successfully!", "success");
    };

    const getProfession = async () => {
        await fetch("/profession", {
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
                        setLoadingProfessionData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setProfessionData(data);
                    setLoadingProfessionData(false);
                }, 1000);
            });
    };

    const getJob = async () => {
        await fetch("/job", {
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
                        setLoadingJobData(false);
                        return;
                    }, 1000);
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setJobData(data);
                    setLoadingJobData(false);
                }, 1000);
            });
    };

    const getProfile = async () => {
        await fetch("/profile", {
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
                    setLanguages(data.profileData.languages);
                    setEducations(data.profileData.educations);
                    setSkills(data.profileData.skills);
                    setExperiences(data.profileData.experiences);
                    setStatusDB(true);
                    setLoadingProfileData(false);
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

        //Close the notification after 5 seconds:
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
                        {windowWidth >= 1280 && (
                            <div className="profilePageContainerAdmin">
                                <div className="breadcrumb">
                                    <h2>{info.routes.profilePageAdmin}</h2>
                                </div>
                                <ProfileAdminPageTitle />
                                <AboutMe
                                    loadingProfessionData={loadingProfessionData}
                                    loadingJobData={loadingJobData}
                                    professionData={professionData}
                                    jobData={jobData}
                                    getJobU={() => getJobAfterUpdate()}
                                    getProfessionU={() => getProfessionAfterUpdate()}
                                />
                                <Languages
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    languages={languages}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <Education
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    educations={educations}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <Experience
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    experiences={experiences}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <Skills
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    skills={skills}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
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
                        )}
                        {windowWidth < 1280 && (
                            <div className="profilePageContainerAdminMobile">
                                <div className="breadcrumbMobile">
                                    <h2>{info.routes.profilePageAdmin}</h2>
                                </div>
                                <ProfileAdminPageTitleMobile />
                                <AboutMeMobile
                                    loadingProfessionData={loadingProfessionData}
                                    loadingJobData={loadingJobData}
                                    professionData={professionData}
                                    jobData={jobData}
                                    getJobU={() => getJobAfterUpdate()}
                                    getProfessionU={() => getProfessionAfterUpdate()}
                                />
                                <LanguagesMobile
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    languages={languages}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <EducationMobile
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    educations={educations}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <ExperienceMobile
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    experiences={experiences}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <SkillsMobile
                                    loadingProfileData={loadingProfileData}
                                    statusDB={statusDB}
                                    skills={skills}
                                    getProfileC={() => getProfileAfterCreate()}
                                    getProfileU={() => getProfileAfterUpdate()}
                                    getProfileD={() => getProfileAfterDelete()}
                                />
                                <InterestsMobile />
                                <HobbiesMobile />
                                <ContactMeMobile />
                                <Notification
                                    isNotificationOpen={isNotificationOpen}
                                    setIsNotificationOpen={setIsNotificationOpen}
                                    title={notificationContent.title}
                                    description={notificationContent.description}
                                    type={notificationContent.type}
                                />
                            </div>
                        )}
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

function AboutMe({ loadingProfessionData, loadingJobData, professionData, jobData, getJobU, getProfessionU }) {
    let description1 =
        "Hello, I'm Manu Partanen, a passionate software developer specializing in " +
        (professionData?.professionStatus?.professionTech === "Front-end Developer" ? "front-end" : "") +
        (professionData?.professionStatus?.professionTech === "Back-end Developer" ? "back-end" : "") +
        (professionData?.professionStatus?.professionTech === "Full-stack Developer" ? "full-stack" : "") +
        " web development.";
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
                        title={"My " + info.profile.siteName}
                        href={info.profile.link}
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
                            <div className="aboutMeTextTitleLogo" />
                            <div className="aboutMeTextTitle1">
                                <h4 className="h4_1">{info.profile.name}</h4>
                                {info.api.enabled ? (
                                    (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                        <motion.h4 className="h4_2" key="h4_2successA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                                ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                                : professionData?.professionStatus?.profession}
                                        </motion.h4>
                                    ) : loadingProfessionData || loadingJobData ? (
                                        <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loaderA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            LOADING...
                                        </motion.h4>
                                    ) : (
                                        <motion.h4 className="h4_2" style={{ color: "red", textShadow: "none" }} key="h4_2failA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            NO DATA!
                                        </motion.h4>
                                    )
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loaderA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        LOADING...
                                    </motion.h4>
                                ) : (
                                    <motion.h4 className="h4_2" key="h4_2successA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {dataFe.jobStatus.employed && info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " + info.profile.company : info.profile.profession}
                                    </motion.h4>
                                )}
                            </div>
                            <div className="aboutMeTextTitle2">
                                {info.api.enabled && professionData?.professionStatus && (
                                    <>
                                        <CRUDProfessionButton loading={loadingProfessionData} getProfession={getProfessionU} />
                                        <CRUDJobButton loading={loadingJobData} getJob={getJobU} />
                                        <CRUDTechnologiesButton loading={loadingJobData} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="aboutMeText">
                            {info.api.enabled ? (
                                (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                    <motion.p key="aboutmedescriptionsuccessA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {description1}
                                        <br />
                                        <br />
                                        {description2}
                                        <br />
                                        <br />
                                        {description3}
                                    </motion.p>
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutmeA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfileAboutMe" />
                                    </motion.div>
                                ) : (
                                    <motion.p style={{ color: "red", textShadow: "none" }} key="aboutmedescriptionfailA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutmeA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileAboutMe" />
                                </motion.div>
                            ) : (
                                <motion.p key="aboutmedescriptionsuccessA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                    {info.profile.description1}
                                    <br />
                                    <br />
                                    {info.profile.description2}
                                    <br />
                                    <br />
                                    {info.profile.description3}
                                </motion.p>
                            )}
                        </div>
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function Languages({ loadingProfileData, statusDB, languages, getProfileC, getProfileU, getProfileD }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>
                    MY LANGUAGES
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createProfile">
                    <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"language"} getProfile={getProfileC} />
                </div>
            )}
            <div className="languagesContent">
                <AnimatePresence>
                    {languages.length > 0 && !loadingProfileData ? (
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
                                    <div className="lC1">
                                        <h4>{language.name}</h4>
                                        <p>{language.proficiency}</p>
                                    </div>
                                    <div className="lC2">
                                        {info.api.enabled && (
                                            <>
                                                <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={language.id} data={"language"} getProfile={getProfileU} />
                                                <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={language.id} data={"language"} getProfile={getProfileD} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
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

function Education({ loadingProfileData, statusDB, educations, getProfileC, getProfileU, getProfileD }) {
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
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="createProfile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"education"} getProfile={getProfileC} />}</div>
            <div className="educationsContent">
                <AnimatePresence>
                    {educations.length > 0 && !loadingProfileData ? (
                        educations.map((education, index) => (
                            <motion.div
                                className="education"
                                style={{ "--education-color": education.color, backgroundColor: education.color }}
                                key={index}
                                onClick={() => openOrCloseEducation(index)}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="educationTitle">
                                    <h4>{education.schoolName}</h4>
                                </div>
                                <div className="educationContent1">
                                    <div className="eC1">
                                        <p>{education.degreeName}</p>
                                        <p>{education.timeAndPlace}</p>
                                    </div>
                                    <div className="eC2">
                                        {info.api.enabled && (
                                            <>
                                                <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={education.id} data={"education"} getProfile={getProfileU} />
                                                <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={education.id} data={"education"} getProfile={getProfileD} />
                                            </>
                                        )}
                                    </div>
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
                    ) : loadingProfileData ? (
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

function Experience({ loadingProfileData, statusDB, experiences, getProfileC, getProfileU, getProfileD }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    const isCompanyNameChanged = (eCompanyName, rCompanyName) => {
        if (eCompanyName !== rCompanyName) {
            return true;
        } else {
            return false;
        }
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    const calculateTimeDifference = (start, end) => {
        const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(diffInMonths / 12);
        const remainingMonths = (diffInMonths % 12) + 1;

        if (years < 1) {
            return remainingMonths === 1 ? "1 month" : `${remainingMonths} months`;
        } else if (years === 1) {
            return remainingMonths === 0 ? "1 year" : `1 year and ${remainingMonths} months`;
        } else {
            return remainingMonths === 0 ? `${years} years` : `${years} years and ${remainingMonths} months`;
        }
    };

    const getRoleTime = (r) => {
        let startDate = new Date(r.startDate);
        startDate = formatDate(startDate);
        let endDate;
        let time;

        const start = new Date(r.startDate);
        if (r.endDate === "") {
            endDate = "present";
            const current = new Date();
            time = calculateTimeDifference(start, current);
        } else {
            const end = new Date(r.endDate);
            endDate = formatDate(end);
            time = calculateTimeDifference(start, end);
        }

        return `${startDate} - ${endDate} (${time})`;
    };

    const getTotalExperience = (index) => {
        let totalMonths = 1;

        experiences[index].roles.map((r) => {
            if (r.time === 0) {
                const start = new Date(r.startDate);
                const end = new Date();
                const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                totalMonths += diffInMonths;
            } else {
                totalMonths += r.time;
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
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="createProfile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"experience"} getProfile={getProfileC} />}</div>
            <div className="experiencesContent">
                <AnimatePresence>
                    {experiences.length > 0 && !loadingProfileData ? (
                        experiences.map((experience, index) => (
                            <motion.div
                                className="experience"
                                style={{ "--experience-color": experience.color, backgroundColor: experience.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                            >
                                <motion.div
                                    className="experienceTitle"
                                    key={index}
                                    onClick={() => openOrCloseExperience(index)}
                                    whileHover={{
                                        scale: 1.01,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="experienceTitleContainer">
                                        <div className="eTC1">
                                            <h4>
                                                {experience.companyName}
                                                <span style={{ color: "gray", fontSize: "25px", fontStyle: "normal", position: "relative", bottom: "10px", left: "10px" }}>
                                                    {" " + getTotalExperience(index)}
                                                </span>
                                                <span
                                                    title="Currently employed"
                                                    style={{ color: "lightgreen", fontSize: "25px", fontStyle: "normal", position: "relative", bottom: "10px", left: "20px" }}
                                                >
                                                    {experience.current ? " (CURRENT JOB)" : ""}
                                                </span>
                                            </h4>
                                        </div>
                                        <div className="eTC2">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={experience.id} data={"experience"} getProfile={getProfileU} />
                                                    <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={experience.id} data={"experience"} getProfile={getProfileD} />
                                                </>
                                            )}
                                        </div>
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
                                </motion.div>
                                <div className="experienceContentContainer" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    <div className="createRole">
                                        <CRUDProfileButton loading={loadingProfileData} action={"Create"} id={experience.id} data={"role"} getProfile={getProfileC} />
                                    </div>
                                    {experience.roles.map((r, i) => (
                                        <div className="experienceContent">
                                            <>
                                                <div className="companyTitle">
                                                    <div className="cT1">
                                                        <p>
                                                            {r.workTitle + " at "}
                                                            <span style={{ color: experience.color }}>{r.companyName}</span>
                                                            {isCompanyNameChanged(experience.companyName, r.companyName) && !r.current && (
                                                                <span style={{ color: "gray", fontSize: "12px", position: "relative", left: "10px", bottom: "5px" }}>{" (Former company name)"}</span>
                                                            )}
                                                            {r.current && (
                                                                <span style={{ color: "lightgreen", fontSize: "20px", position: "relative", left: "5px", bottom: "1px" }}>{" (CURRENT ROLE)"}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="cT2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={experience.id}
                                                                    roleId={r.id}
                                                                    data={"role"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={experience.id}
                                                                    roleId={r.id}
                                                                    data={"role"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="workTitle">
                                                    <p>
                                                        Type: <span style={{ color: "white" }}>{r.workType}</span>
                                                    </p>
                                                    <p>
                                                        Time: <span style={{ color: "white" }}>{getRoleTime(r)}</span>
                                                    </p>
                                                    <p>
                                                        Place: <span style={{ color: "white" }}>{r.place}</span>
                                                    </p>
                                                </div>
                                                <div className="description">
                                                    <p>Description:</p>
                                                    <p style={{ color: "white" }}>{r.workDescription}</p>
                                                </div>
                                                <div className="technologiesUsed">
                                                    <p>Technologies used:</p>
                                                    <p style={{ color: "white" }}>{r.workTech}.</p>
                                                </div>
                                            </>
                                            ;
                                        </div>
                                    ))}
                                    <motion.div
                                        className="totalExperience"
                                        style={{ backgroundColor: experience.color }}
                                        key={index}
                                        onClick={() => openOrCloseExperience(index)}
                                        whileHover={{
                                            scale: 1.01,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h5>
                                            Total experience at {experience.companyName} {"(" + getTotalExperience(index) + ")"}
                                        </h5>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
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

function Skills({ loadingProfileData, statusDB, skills, getProfileC, getProfileU, getProfileD }) {
    const getSkillTitle = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "Limited knowledge on the skill.";
        } else if (skillLevel === "experienced") {
            return "Some experience using the skill.";
        } else if (skillLevel === "intermediate") {
            return "Comfortable using the skill.";
        } else if (skillLevel === "advanced") {
            return "At least 1 year of real work experience.";
        } else if (skillLevel === "professional") {
            return "At least 3 years of real work experience.";
        }
    };

    const getSkillColor = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "red";
        } else if (skillLevel === "experienced") {
            return "orange";
        } else if (skillLevel === "intermediate") {
            return "yellow";
        } else if (skillLevel === "advanced") {
            return "blue";
        } else if (skillLevel === "professional") {
            return "green";
        }
    };

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
                    <span style={{ color: "red" }}>*</span>****
                </div>
            );
        } else if (skillLevel === "experienced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "orange" }}>**</span>***
                </div>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "yellow" }}>***</span>**
                </div>
            );
        } else if (skillLevel === "advanced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "blue" }}>****</span>*
                </div>
            );
        } else if (skillLevel === "professional") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "green" }}>*****</span>
                </div>
            );
        }
    };

    return (
        <div className="skillsContainer">
            <div className="skillsTitle">
                <h3>
                    MY SKILLS
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="skillsExplained">
                <div className="skillExplanation1">
                    <p>
                        <span style={{ color: "red" }}>Beginner</span> = Limited knowledge
                    </p>
                </div>
                <div className="skillExplanation2">
                    <p>
                        <span style={{ color: "orange" }}>Experienced</span> = Some experience
                    </p>
                    <p>
                        <span style={{ color: "yellow" }}>Intermediate</span> = Comfortable
                    </p>
                </div>
                <div className="skillExplanation3">
                    <p>
                        <span style={{ color: "blue" }}>Advanced</span> = At least 1 year of real work experience
                    </p>
                    <p>
                        <span style={{ color: "green" }}>Professional</span> = At least 3 years of real work experience
                    </p>
                </div>
            </div>
            <div className="createProfile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"skill"} getProfile={getProfileC} />}</div>
            <div className="skillsContent">
                <div className="webDevelopmentSoftware">
                    <div className="wDSTitle">
                        <h4>{info.profile.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContent">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.deploymentSoftware?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="software">
                                        <h5>{info.profile.skills1SubTitle1}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"us"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"us"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.profile.skills1SubTitle2}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"clis"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"clis"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="software">
                                        <h5>{info.profile.skills1SubTitle3}</h5>
                                        {skills.webDevelopmentSoftware.deploymentSoftware.map((skill, index) => (
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cs"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cs"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
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
                        <h4>{info.profile.skillsTitle2}</h4>
                    </div>
                    <div className="fEDContent">
                        <AnimatePresence>
                            {skills.frontEndDevelopment?.frontEndProgrammingLanguages?.length > 0 &&
                            skills.frontEndDevelopment?.frontEndFrameworks?.length > 0 &&
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="frontEndSoftware">
                                        <h5>{info.profile.skills2SubTitle1}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fepl"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fepl"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.profile.skills2SubTitle2}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fef"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fef"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftware">
                                        <h5>{info.profile.skills2SubTitle3}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cssf"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cssf"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
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
                        <h4>{info.profile.skillsTitle3}</h4>
                    </div>
                    <div className="bEDContent">
                        <AnimatePresence>
                            {skills.backEndDevelopment?.backEndProgrammingLanguages?.length > 0 &&
                            skills.backEndDevelopment?.backEndFrameworks?.length > 0 &&
                            skills.backEndDevelopment?.databases?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="backEndSoftware">
                                        <h5>{info.profile.skills3SubTitle1}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bepl"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bepl"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.profile.skills3SubTitle2}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bef"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bef"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftware">
                                        <h5>{info.profile.skills3SubTitle3}</h5>
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
                                                    <div className="sC1">
                                                        <div className="sC1-1">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2">
                                                            <div className="sC1-2-1">
                                                                <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                    {getSkillLevelTitle(skill.skillLevel)}
                                                                </p>
                                                            </div>
                                                            <div className="sC1-2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"db"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"db"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
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
                        <h3>PHONE</h3>
                    </div>
                    <div className="phoneContainerContent">
                        <div className="phone1">
                            <h4>{info.profile.phoneNumber}</h4>
                        </div>
                        <div className="phone2"></div>
                    </div>
                </div>
                <div className="emailContainer">
                    <div className="emailContainerTitle">
                        <h3>EMAIL</h3>
                    </div>
                    <div className="emailContainerContent">
                        <div className="email1">
                            <h4>{info.profile.emailAddress}</h4>
                        </div>
                        <div className="email2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Mobile:
function ProfileAdminPageTitleMobile() {
    return (
        <div className="profilePageTitleContainerMobile">
            <h2>MY PROFILE</h2>
        </div>
    );
}

function AboutMeMobile({ loadingProfessionData, loadingJobData, professionData, jobData, getJobU, getProfessionU }) {
    let description1 =
        "Hello, I'm Manu Partanen, a passionate software developer specializing in " +
        (professionData?.professionStatus?.professionTech === "Front-end Developer" ? "front-end" : "") +
        (professionData?.professionStatus?.professionTech === "Back-end Developer" ? "back-end" : "") +
        (professionData?.professionStatus?.professionTech === "Full-stack Developer" ? "full-stack" : "") +
        " web development.";
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
        <div className="aboutMeContainerMobile">
            <div className="aboutMeTitleMobile">
                <h3>ABOUT ME</h3>
            </div>
            <div className="aboutMeContentMobile">
                <AnimatePresence>
                    <motion.a
                        className="aboutMePhotoMobile"
                        title={"My " + info.profile.siteName}
                        href={info.profile.link}
                        target="_blank"
                        key="aboutmephotomobileA"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <div className="aboutMeTextContainerMobile">
                        <div className="aboutMeTextTitleMobile">
                            <div className="aboutMeTextTitleLogoMobile" />
                            <div className="aboutMeTextTitle1Mobile">
                                <h4 className="h4_1M">{info.profile.name}</h4>
                                {info.api.enabled ? (
                                    (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                        <motion.h4 className="h4_2M" key="h4_2successmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                                ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                                : professionData?.professionStatus?.profession}
                                        </motion.h4>
                                    ) : loadingProfessionData || loadingJobData ? (
                                        <motion.h4 className="h4_2M" style={{ color: "#0072b1" }} key="h4_2loadermobileA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            LOADING...
                                        </motion.h4>
                                    ) : (
                                        <motion.h4
                                            className="h4_2M"
                                            style={{ color: "red", textShadow: "none" }}
                                            key="h4_2failmobileA"
                                            initial={{ opacity: 0, x: -100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            NO DATA!
                                        </motion.h4>
                                    )
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.h4 className="h4_2M" style={{ color: "#0072b1" }} key="h4_2loadermobileA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        LOADING...
                                    </motion.h4>
                                ) : (
                                    <motion.h4 className="h4_2M" key="h4_2successmobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {dataFe.jobStatus.employed && info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " + info.profile.company : info.profile.profession}
                                    </motion.h4>
                                )}
                            </div>
                            <div className="aboutMeTextTitle2Mobile">
                                {info.api.enabled && professionData?.professionStatus && (
                                    <>
                                        <CRUDProfessionButton loading={loadingProfessionData} getProfession={getProfessionU} />
                                        <CRUDJobButton loading={loadingJobData} getJob={getJobU} />
                                        <CRUDTechnologiesButton loading={loadingJobData} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="aboutMeTextMobile">
                            {info.api.enabled ? (
                                (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                    <motion.p key="aboutmedescriptionsuccessmobileA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {description1}
                                        <br />
                                        <br />
                                        {description2}
                                        <br />
                                        <br />
                                        {description3}
                                    </motion.p>
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.div className="loadingProfileDataAboutMeMobile" key="loadinglangprofiledataaboutmemobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfileAboutMeMobile" />
                                    </motion.div>
                                ) : (
                                    <motion.p style={{ color: "red", textShadow: "none" }} key="aboutmedescriptionfailmobileA" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfileDataAboutMeMobile" key="loadinglangprofiledataaboutmemobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileAboutMeMobile" />
                                </motion.div>
                            ) : (
                                <motion.p key="aboutmedescriptionsuccessmobileA" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                    {info.profile.description1}
                                    <br />
                                    <br />
                                    {info.profile.description2}
                                    <br />
                                    <br />
                                    {info.profile.description3}
                                </motion.p>
                            )}
                        </div>
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function LanguagesMobile({ loadingProfileData, statusDB, languages, getProfileC, getProfileU, getProfileD }) {
    return (
        <div className="languagesContainerMobile">
            <div className="languagesTitleMobile">
                <h3>
                    MY LANGUAGES
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            {info.api.enabled && (
                <div className="createProfileMobile">
                    <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"language"} getProfile={getProfileC} />
                </div>
            )}
            <div className="languagesContentMobile">
                <AnimatePresence>
                    {languages.length > 0 && !loadingProfileData ? (
                        languages.map((language, index) => (
                            <motion.div
                                className="languageMobile"
                                style={{ backgroundColor: language.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                            >
                                <div className="languageLogoMobile" style={{ backgroundImage: `url(${language.image})` }} />
                                <div className="languageContentMobile">
                                    <div className="lC1M">
                                        <h4>{language.name}</h4>
                                        <p>{language.proficiency}</p>
                                    </div>
                                    <div className="lC2M">
                                        {info.api.enabled && (
                                            <>
                                                <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={language.id} data={"language"} getProfile={getProfileU} />
                                                <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={language.id} data={"language"} getProfile={getProfileD} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileDataMobile" key="loadinglangprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="nolangprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function EducationMobile({ loadingProfileData, statusDB, educations, getProfileC, getProfileU, getProfileD }) {
    const [isVisibleEd, setIsVisibleEd] = useState(Array(educations.length).fill(false));

    const openOrCloseEducation = (index) => {
        const updatedVisibility = [...isVisibleEd];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEd(updatedVisibility);
    };

    return (
        <div className="educationsContainerMobile">
            <div className="educationsTitleMobile">
                <h3>
                    MY EDUCATION
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="createProfileMobile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"education"} getProfile={getProfileC} />}</div>
            <div className="educationsContentMobile">
                <AnimatePresence>
                    {educations.length > 0 && !loadingProfileData ? (
                        educations.map((education, index) => (
                            <motion.div
                                className="educationMobile"
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
                                <div className="educationTitleMobile">
                                    <h4>{education.schoolName}</h4>
                                </div>
                                <div className="educationContent1Mobile" style={{ backgroundColor: education.color }}>
                                    <div className="eC1M">
                                        <p>{education.degreeName}</p>
                                        <p>{education.timeAndPlace}</p>
                                    </div>
                                    <div className="eC2M">
                                        {info.api.enabled && (
                                            <>
                                                <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={education.id} data={"education"} getProfile={getProfileU} />
                                                <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={education.id} data={"education"} getProfile={getProfileD} />
                                            </>
                                        )}
                                    </div>
                                    <div
                                        className="schoolLogoMobile"
                                        style={{
                                            backgroundImage: `url(${education.image})`,
                                            backgroundColor: !education.image && education.color,
                                            backgroundPosition: education.backgroundPosition,
                                            backgroundSize: education.backgroundSize,
                                        }}
                                    />
                                </div>
                                <div className="educationContent2Mobile" style={{ display: isVisibleEd[index] ? "block" : "none" }}>
                                    <p>{education.educationDescription}</p>
                                    <p>{education.extra}</p>
                                    <p className="subjectsMobile">
                                        Education subjects: <span style={{ color: "white" }}>{education.educationSubjects}.</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileDataMobile" key="loadingedprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="noedprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ExperienceMobile({ loadingProfileData, statusDB, experiences, getProfileC, getProfileU, getProfileD }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    const isCompanyNameChanged = (eCompanyName, rCompanyName) => {
        if (eCompanyName !== rCompanyName) {
            return true;
        } else {
            return false;
        }
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`;
    };

    const calculateTimeDifference = (start, end) => {
        const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(diffInMonths / 12);
        const remainingMonths = (diffInMonths % 12) + 1;

        if (years < 1) {
            return remainingMonths === 1 ? "1 month" : `${remainingMonths} months`;
        } else if (years === 1) {
            return remainingMonths === 0 ? "1 year" : `1 year and ${remainingMonths} months`;
        } else {
            return remainingMonths === 0 ? `${years} years` : `${years} years and ${remainingMonths} months`;
        }
    };

    const getRoleTime = (r) => {
        let startDate = new Date(r.startDate);
        startDate = formatDate(startDate);
        let endDate;
        let time;

        const start = new Date(r.startDate);
        if (r.endDate === "") {
            endDate = "present";
            const current = new Date();
            time = calculateTimeDifference(start, current);
        } else {
            const end = new Date(r.endDate);
            endDate = formatDate(end);
            time = calculateTimeDifference(start, end);
        }

        return `${startDate} - ${endDate} (${time})`;
    };

    const getTotalExperience = (index) => {
        let totalMonths = 1;

        experiences[index].roles.map((r) => {
            if (r.time === 0) {
                const start = new Date(r.startDate);
                const end = new Date();
                const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                totalMonths += diffInMonths;
            } else {
                totalMonths += r.time;
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
        <div className="experiencesContainerMobile">
            <div className="experiencesTitleMobile">
                <h3>
                    EXPERIENCE
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="createProfileMobile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"experience"} getProfile={getProfileC} />}</div>
            <div className="experiencesContentMobile">
                <AnimatePresence>
                    {experiences.length > 0 && !loadingProfileData ? (
                        experiences.map((experience, index) => (
                            <motion.div
                                className="experienceMobile"
                                style={{ "--experience-color": experience.color, backgroundColor: experience.color }}
                                key={index}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                            >
                                <motion.div
                                    className="experienceTitleMobile"
                                    key={index}
                                    onClick={() => openOrCloseExperience(index)}
                                    whileHover={{
                                        scale: 1.01,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="experienceTitleContainerMobile">
                                        <div className="eTC1M">
                                            <h4>
                                                {experience.companyName}
                                                <span style={{ color: "gray", fontSize: "8px", fontStyle: "normal", position: "relative", bottom: "4px", left: "10px" }}>
                                                    {" " + getTotalExperience(index)}
                                                </span>
                                                <span
                                                    title="Currently employed"
                                                    style={{ color: "lightgreen", fontSize: "8px", fontStyle: "normal", position: "relative", bottom: "4px", left: "20px" }}
                                                >
                                                    {experience.current ? " (CURRENT JOB)" : ""}
                                                </span>
                                            </h4>
                                        </div>
                                        <div className="eTC2M">
                                            {info.api.enabled && (
                                                <>
                                                    <CRUDProfileButton loading={loadingProfileData} action={"Update"} id={experience.id} data={"experience"} getProfile={getProfileU} />
                                                    <CRUDProfileButton loading={loadingProfileData} action={"Delete"} id={experience.id} data={"experience"} getProfile={getProfileD} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="companyLogoMobile"
                                        style={{
                                            backgroundImage: `url(${experience.image})`,
                                            backgroundPosition: experience.backgroundPosition,
                                            backgroundSize: experience.backgroundSize,
                                            backgroundColor: !experience.image && experience.color,
                                        }}
                                    />
                                </motion.div>
                                <div className="experienceContentContainerMobile" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    {experience.roles.map((r, i) => (
                                        <div className="experienceContentMobile">
                                            <>
                                                <div className="companyTitleMobile">
                                                    <p>
                                                        {r.workTitle + " at "}
                                                        <span style={{ color: experience.color }}>{r.companyName}</span>
                                                        {isCompanyNameChanged(experience.companyName, r.companyName) && !r.current && (
                                                            <span style={{ color: "gray", fontSize: "4px", position: "relative", left: "5px", bottom: "2.5px" }}>{" (Former company name)"}</span>
                                                        )}
                                                        {r.current && (
                                                            <span style={{ color: "lightgreen", fontSize: "10px", position: "relative", left: "5px", bottom: "1px" }}>{" (CURRENT ROLE)"}</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="workTitleMobile">
                                                    <p>
                                                        Type: <span style={{ color: "white" }}>{r.workType}</span>
                                                    </p>
                                                    <p>
                                                        Time: <span style={{ color: "white" }}>{getRoleTime(r)}</span>
                                                    </p>
                                                    <p>
                                                        Place: <span style={{ color: "white" }}>{r.place}</span>
                                                    </p>
                                                </div>
                                                <div className="descriptionMobile">
                                                    <p>Description:</p>
                                                    <p style={{ color: "white" }}>{r.workDescription}</p>
                                                </div>
                                                <div className="technologiesUsedMobile">
                                                    <p>Technologies used:</p>
                                                    <p style={{ color: "white" }}>{r.workTech}.</p>
                                                </div>
                                            </>
                                            ;
                                        </div>
                                    ))}
                                    <motion.div
                                        className="totalExperienceMobile"
                                        style={{ backgroundColor: experience.color }}
                                        key={index}
                                        onClick={() => openOrCloseExperience(index)}
                                        whileHover={{
                                            scale: 1.01,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h5>
                                            Total experience at {experience.companyName} {"(" + getTotalExperience(index) + ")"}
                                        </h5>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileDataMobile" key="loadingexpprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="noutilexpprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SkillsMobile({ loadingProfileData, statusDB, skills, getProfileC, getProfileU, getProfileD }) {
    const getSkillColor = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "red";
        } else if (skillLevel === "experienced") {
            return "orange";
        } else if (skillLevel === "intermediate") {
            return "yellow";
        } else if (skillLevel === "advanced") {
            return "blue";
        } else if (skillLevel === "professional") {
            return "green";
        }
    };

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
                    <span style={{ color: "red" }}>*</span>****
                </div>
            );
        } else if (skillLevel === "experienced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "orange" }}>**</span>***
                </div>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "yellow" }}>***</span>**
                </div>
            );
        } else if (skillLevel === "advanced") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "blue" }}>****</span>*
                </div>
            );
        } else if (skillLevel === "professional") {
            return (
                <div style={{ position: "relative", right: "25px" }}>
                    <span style={{ color: "green" }}>*****</span>
                </div>
            );
        }
    };

    return (
        <div className="skillsContainerMobile">
            <div className="skillsTitleMobile">
                <h3>
                    MY SKILLS
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="skillsExplainedMobile">
                <div className="skillExplanation1Mobile">
                    <p>
                        <span style={{ color: "red" }}>Beginner</span> = Limited knowledge
                    </p>
                </div>
                <div className="skillExplanation2Mobile">
                    <p>
                        <span style={{ color: "orange" }}>Experienced</span> = Some experience
                    </p>
                    <p>
                        <span style={{ color: "yellow" }}>Intermediate</span> = Comfortable
                    </p>
                </div>
                <div className="skillExplanation3Mobile">
                    <p>
                        <span style={{ color: "blue" }}>Advanced</span> = At least 1 year of real work experience
                    </p>
                    <p>
                        <span style={{ color: "green" }}>Professional</span> = At least 3 years of real work experience
                    </p>
                </div>
            </div>
            <div className="createProfileMobile">{info.api.enabled && <CRUDProfileButton loading={loadingProfileData} action={"Create"} data={"skill"} getProfile={getProfileC} />}</div>
            <div className="skillsContentMobile">
                <div className="webDevelopmentSoftwareMobile">
                    <div className="wDSTitleMobile">
                        <h4>{info.profile.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContentMobile">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.deploymentSoftware?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="softwareMobile">
                                        <h5>{info.profile.skills1SubTitle1}</h5>
                                        {skills.webDevelopmentSoftware.utilitySoftware.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"us"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"us"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="softwareMobile">
                                        <h5>{info.profile.skills1SubTitle2}</h5>
                                        {skills.webDevelopmentSoftware.cLISoftware.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"clis"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"clis"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="softwareMobile">
                                        <h5>{info.profile.skills1SubTitle3}</h5>
                                        {skills.webDevelopmentSoftware.deploymentSoftware.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cs"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cs"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingwdsprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nowdsprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="front-endDevelopmentMobile">
                    <div className="fEDTitleMobile">
                        <h4>{info.profile.skillsTitle2}</h4>
                    </div>
                    <div className="fEDContentMobile">
                        <AnimatePresence>
                            {skills.frontEndDevelopment?.frontEndProgrammingLanguages?.length > 0 &&
                            skills.frontEndDevelopment?.frontEndFrameworks?.length > 0 &&
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="frontEndSoftwareMobile">
                                        <h5>{info.profile.skills2SubTitle1}</h5>
                                        {skills.frontEndDevelopment.frontEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fepl"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fepl"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftwareMobile">
                                        <h5>{info.profile.skills2SubTitle2}</h5>
                                        {skills.frontEndDevelopment.frontEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fef"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"fef"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="frontEndSoftwareMobile">
                                        <h5>{info.profile.skills2SubTitle3}</h5>
                                        {skills.frontEndDevelopment.cSSFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cssf"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"cssf"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingfedprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nofedprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="back-endDevelopmentMobile">
                    <div className="bEDTitleMobile">
                        <h4>{info.profile.skillsTitle3}</h4>
                    </div>
                    <div className="bEDContentMobile">
                        <AnimatePresence>
                            {skills.backEndDevelopment?.backEndProgrammingLanguages?.length > 0 &&
                            skills.backEndDevelopment?.backEndFrameworks?.length > 0 &&
                            skills.backEndDevelopment?.databases?.length > 0 &&
                            !loadingProfileData ? (
                                <>
                                    <div className="backEndSoftwareMobile">
                                        <h5>{info.profile.skills3SubTitle1}</h5>
                                        {skills.backEndDevelopment.backEndProgrammingLanguages.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bepl"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bepl"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftwareMobile">
                                        <h5>{info.profile.skills3SubTitle2}</h5>
                                        {skills.backEndDevelopment.backEndFrameworks.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bef"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"bef"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="backEndSoftwareMobile">
                                        <h5>{info.profile.skills3SubTitle3}</h5>
                                        {skills.backEndDevelopment.databases.map((skill, index) => (
                                            <motion.div
                                                className="skillMobile"
                                                style={{ backgroundColor: skill.color }}
                                                key={index}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                            >
                                                <div
                                                    className="skillLogoMobile"
                                                    style={{
                                                        backgroundImage: `url(${skill.image})`,
                                                        backgroundSize: skill.backgroundSize,
                                                    }}
                                                />
                                                <div className="skillContentMobile">
                                                    <div className="sC1M">
                                                        <div className="sC1-1M">
                                                            <h4>{skill.name}</h4>
                                                        </div>
                                                        <div className="sC1-2M">
                                                            <div className="sC1-2-1M">
                                                                <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                            </div>
                                                            <div className="sC1-2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="sC2M">
                                                        {info.api.enabled && (
                                                            <>
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Update"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"db"}
                                                                    getProfile={getProfileU}
                                                                />
                                                                <CRUDProfileButton
                                                                    loading={loadingProfileData}
                                                                    action={"Delete"}
                                                                    id={skill.id}
                                                                    data={"skill"}
                                                                    dataSkillType={"db"}
                                                                    getProfile={getProfileD}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingbedprofiledatamobileA" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nobedprofiledatamobileA" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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

function InterestsMobile() {
    return (
        <div className="interestsContainerMobile">
            <div className="interestsTitleMobile">
                <h3>MY INTERESTS</h3>
            </div>
            <div className="interestsContentMobile">
                <div className="interest1Mobile">
                    <div className="interest1TitleMobile">
                        <h4>IT infrastructure</h4>
                    </div>
                    <div className="interest1ContentMobile">
                        <div className="interest1ContentCoverMobile">
                            <div className="interest1ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
                <div className="interest2Mobile">
                    <div className="interest2TitleMobile">
                        <h4>Software Development</h4>
                    </div>
                    <div className="interest2ContentMobile">
                        <div className="interest2ContentCoverMobile">
                            <div className="interest2ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
                <div className="interest3Mobile">
                    <div className="interest3TitleMobile">
                        <h4>Robotics</h4>
                    </div>
                    <div className="interest3ContentMobile">
                        <div className="interest3ContentCoverMobile">
                            <div className="interest3ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HobbiesMobile() {
    return (
        <div className="hobbiesContainerMobile">
            <div className="hobbiesTitleMobile">
                <h3>MY HOBBIES</h3>
            </div>
            <div className="hobbiesContentMobile">
                <div className="hobby1Mobile">
                    <div className="hobby1TitleMobile">
                        <h4>Gaming</h4>
                    </div>
                    <div className="hobby1ContentMobile">
                        <div className="hobby1ContentCoverMobile">
                            <div className="hobby1ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby2Mobile">
                    <div className="hobby2TitleMobile">
                        <h4>Web development</h4>
                    </div>
                    <div className="hobby2ContentMobile">
                        <div className="hobby2ContentCoverMobile">
                            <div className="hobby2ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
                <div className="hobby3Mobile">
                    <div className="hobby3TitleMobile">
                        <h4>Camping</h4>
                    </div>
                    <div className="hobby3ContentMobile">
                        <div className="hobby3ContentCoverMobile">
                            <div className="hobby3ContentCoverLogoMobile"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMeMobile() {
    return (
        <div className="contactContainerMobile">
            <div className="contactTitleMobile">
                <h3>MY CONTACT INFO</h3>
            </div>
            <div className="contactContentMobile">
                <div className="phoneContainerMobile">
                    <div className="phoneContainerTitleMobile">
                        <h3>PHONE</h3>
                    </div>
                    <div className="phoneContainerContentMobile">
                        <div className="phone1Mobile">
                            <h4>{info.profile.phoneNumber}</h4>
                        </div>
                        <div className="phone2Mobile"></div>
                    </div>
                </div>
                <div className="emailContainerMobile">
                    <div className="emailContainerTitleMobile">
                        <h3>EMAIL</h3>
                    </div>
                    <div className="emailContainerContentMobile">
                        <div className="email1Mobile">
                            <h4>{info.profile.emailAddress}</h4>
                        </div>
                        <div className="email2Mobile"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePageAdmin;
