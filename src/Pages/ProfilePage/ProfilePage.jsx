import { useState, useEffect } from "react";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.scss";

function ProfilePage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
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

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
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

    const checkConnection = () => {
        fetch("/connection", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            const statusCode = res.status;

            if (statusCode === 200) {
                setConnection(true);
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
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

    const getJob = () => {
        fetch("/job", {
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
                    setLanguages(data.profileData.languages);
                    setEducations(data.profileData.educations);
                    setSkills(data.profileData.skills);
                    setExperiences(data.profileData.experiences);
                    setStatusDB(true);
                    setLoadingProfileData(false);
                }, 1000);
            });
    };

    return (
        <div className="pFP">
            {windowWidth >= 1280 && (
                <div className="profilePageContainer">
                    <ProfilePageTitle />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <Breadcrumb />
                    <AboutMe loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                    <Languages loadingProfileData={loadingProfileData} statusDB={statusDB} languages={languages} />
                    <Education loadingProfileData={loadingProfileData} statusDB={statusDB} educations={educations} />
                    <Experience loadingProfileData={loadingProfileData} statusDB={statusDB} experiences={experiences} />
                    <Skills loadingProfileData={loadingProfileData} statusDB={statusDB} skills={skills} />
                    <Interests />
                    <Hobbies />
                    <ContactMe />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="profilePageContainerMobile">
                    <ProfilePageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <BreadcrumbMobile />
                    <AboutMeMobile loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                    <LanguagesMobile loadingProfileData={loadingProfileData} statusDB={statusDB} languages={languages} />
                    <EducationMobile loadingProfileData={loadingProfileData} statusDB={statusDB} educations={educations} />
                    <ExperienceMobile loadingProfileData={loadingProfileData} statusDB={statusDB} experiences={experiences} />
                    <SkillsMobile loadingProfileData={loadingProfileData} statusDB={statusDB} skills={skills} />
                    <InterestsMobile />
                    <HobbiesMobile />
                    <ContactMeMobile />
                </div>
            )}
        </div>
    );
}

function ProfilePageTitle() {
    return (
        <div className="profilePageTitleContainer">
            <AnimatePresence>
                <motion.h2 key="profpt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    PROFILE
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function Breadcrumb() {
    return (
        <div className="breadcrumb">
            <div className="breadcrumbLogo" />
            <div className="breadcrumbText">
                <h2>{info.routes.profilePage}</h2>
            </div>
        </div>
    );
}

function AboutMe({ loadingProfessionData, loadingJobData, professionData, jobData }) {
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
                        key="aboutmephoto"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <div className="aboutMeTextContainer">
                        <div className="aboutMeTextTitle">
                            <div className="aboutMeTextTitleLogo" />
                            <div className="aboutMeTextTitleText">
                                <h4 className="h4_1">{info.profile.name}</h4>
                                {info.api.enabled ? (
                                    (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                        <motion.h4 className="h4_2" key="h4_2success" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                                ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                                : professionData?.professionStatus?.profession}
                                        </motion.h4>
                                    ) : loadingProfessionData || loadingJobData ? (
                                        <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loader" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            LOADING...
                                        </motion.h4>
                                    ) : (
                                        <motion.h4 className="h4_2" style={{ color: "red", textShadow: "none" }} key="h4_2fail" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            NO DATA!
                                        </motion.h4>
                                    )
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.h4 className="h4_2" style={{ color: "#0072b1" }} key="h4_2loader" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        LOADING...
                                    </motion.h4>
                                ) : (
                                    <motion.h4 className="h4_2" key="h4_2success" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {dataFe.jobStatus.employed && info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " + info.profile.company : info.profile.profession}
                                    </motion.h4>
                                )}
                            </div>
                        </div>
                        <div className="aboutMeText">
                            {info.api.enabled ? (
                                (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                    <motion.p key="aboutmedescriptionsuccess" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {description1}
                                        <br />
                                        <br />
                                        {description2}
                                        <br />
                                        <br />
                                        {description3}
                                    </motion.p>
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutme" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfileAboutMe" />
                                    </motion.div>
                                ) : (
                                    <motion.p style={{ color: "red", textShadow: "none" }} key="aboutmedescriptionfail" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfileDataAboutMe" key="loadinglangprofiledataaboutme" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileAboutMe" />
                                </motion.div>
                            ) : (
                                <motion.p key="aboutmedescriptionsuccess" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
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

function Languages({ loadingProfileData, statusDB, languages }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>
                    LANGUAGES
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
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
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileData" key="loadinglangprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="nolangprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Education({ loadingProfileData, statusDB, educations }) {
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
                    EDUCATION
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="educationsContent">
                <AnimatePresence>
                    {educations.length > 0 ? (
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
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileData" key="loadingedprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noedprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Experience({ loadingProfileData, statusDB, experiences }) {
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
            <div className="experiencesContent">
                <AnimatePresence>
                    {experiences.length > 0 ? (
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
                                        <h4>
                                            {experience.companyName}
                                            <span style={{ color: "gray", fontSize: "25px", fontStyle: "normal", position: "relative", bottom: "10px", left: "10px" }}>
                                                {" " + getTotalExperience(index)}
                                            </span>
                                            <span title="Currently employed" style={{ color: "lightgreen", fontSize: "25px", fontStyle: "normal", position: "relative", bottom: "10px", left: "20px" }}>
                                                {experience.current ? " (CURRENT JOB)" : ""}
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
                                </motion.div>
                                <div className="experienceContentContainer" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    {experience.roles.map((r, i) => (
                                        <div className="experienceContent">
                                            <>
                                                <div className="companyTitle">
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
                        <motion.div className="loadingProfileData" key="loadingexpprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileData" key="noutilexpprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Skills({ loadingProfileData, statusDB, skills }) {
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
                <p>
                    <span style={{ color: "red" }}>*</span>****
                </p>
            );
        } else if (skillLevel === "experienced") {
            return (
                <p>
                    <span style={{ color: "orange" }}>**</span>***
                </p>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <p>
                    <span style={{ color: "yellow" }}>***</span>**
                </p>
            );
        } else if (skillLevel === "advanced") {
            return (
                <p>
                    <span style={{ color: "blue" }}>****</span>*
                </p>
            );
        } else if (skillLevel === "professional") {
            return (
                <p>
                    <span style={{ color: "green" }}>*****</span>
                </p>
            );
        }
    };

    return (
        <div className="skillsContainer">
            <div className="skillsTitle">
                <h3>
                    SKILLS
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
            <div className="skillsContent">
                <div className="webDevelopmentSoftware">
                    <div className="wDSTitle">
                        <h4>{info.profile.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContent">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.deploymentSoftware?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileData" key="loadingwdsprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nowdsprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileData" key="loadingfedprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nofedprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                            skills.backEndDevelopment?.databases?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2">
                                                        <div className="sC2-1">
                                                            <p title={getSkillTitle(skill.skillLevel)} style={{ color: getSkillColor(skill.skillLevel) }}>
                                                                {getSkillLevelTitle(skill.skillLevel)}
                                                            </p>
                                                        </div>
                                                        <div className="sC2-2">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileData" key="loadingbedprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nobedprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                <h3>INTERESTS</h3>
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
                <h3>HOBBIES</h3>
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
                <h3>CONTACT INFO</h3>
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
function ProfilePageTitleMobile() {
    return (
        <div className="profilePageTitleContainerMobile">
            <AnimatePresence>
                <motion.h2 key="profptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    PROFILE
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function BreadcrumbMobile() {
    return (
        <div className="breadcrumbMobile">
            <div className="breadcrumbLogoMobile" />
            <div className="breadcrumbTextMobile">
                <h2>{info.routes.profilePage}</h2>
            </div>
        </div>
    );
}

function AboutMeMobile({ loadingProfessionData, loadingJobData, professionData, jobData }) {
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
                        key="aboutmephotomobile"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <div className="aboutMeTextContainerMobile">
                        <div className="aboutMeTextTitleMobile">
                            <div className="aboutMeTextTitleLogoMobile" />
                            <div className="aboutMeTextTitleTextMobile">
                                <h4 className="h4_1M">{info.profile.name}</h4>
                                {info.api.enabled ? (
                                    (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                        <motion.h4 className="h4_2M" key="h4_2successmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company
                                                ? jobData?.jobStatus?.jobTitle + " at " + jobData?.jobStatus?.company
                                                : professionData?.professionStatus?.profession}
                                        </motion.h4>
                                    ) : loadingProfessionData || loadingJobData ? (
                                        <motion.h4 className="h4_2M" style={{ color: "#0072b1" }} key="h4_2loadermobile" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            LOADING...
                                        </motion.h4>
                                    ) : (
                                        <motion.h4 className="h4_2M" style={{ color: "red", textShadow: "none" }} key="h4_2failmobile" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                            NO DATA!
                                        </motion.h4>
                                    )
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.h4 className="h4_2M" style={{ color: "#0072b1" }} key="h4_2loadermobile" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        LOADING...
                                    </motion.h4>
                                ) : (
                                    <motion.h4 className="h4_2M" key="h4_2successmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {dataFe.jobStatus.employed && info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " + info.profile.company : info.profile.profession}
                                    </motion.h4>
                                )}
                            </div>
                        </div>
                        <div className="aboutMeTextMobile">
                            {info.api.enabled ? (
                                (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                    <motion.p key="aboutmedescriptionsuccessmobile" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        {description1}
                                        <br />
                                        <br />
                                        {description2}
                                        <br />
                                        <br />
                                        {description3}
                                    </motion.p>
                                ) : loadingProfessionData || loadingJobData ? (
                                    <motion.div className="loadingProfileDataAboutMeMobile" key="loadinglangprofiledataaboutmemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfileAboutMeMobile" />
                                    </motion.div>
                                ) : (
                                    <motion.p style={{ color: "red", textShadow: "none" }} key="aboutmedescriptionfailmobile" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfileDataAboutMeMobile" key="loadinglangprofiledataaboutmemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileAboutMeMobile" />
                                </motion.div>
                            ) : (
                                <motion.p key="aboutmedescriptionsuccessmobile" transition={{ delay: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
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

function LanguagesMobile({ loadingProfileData, statusDB, languages }) {
    return (
        <div className="languagesContainerMobile">
            <div className="languagesTitleMobile">
                <h3>
                    LANGUAGES
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="languagesContentMobile">
                <AnimatePresence>
                    {languages.length > 0 ? (
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
                                    <h4>{language.name}</h4>
                                    <p>{language.proficiency}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingProfileData ? (
                        <motion.div className="loadingProfileDataMobile" key="loadinglangprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="nolangprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function EducationMobile({ loadingProfileData, statusDB, educations }) {
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
                    EDUCATION
                    <DBstate loading={loadingProfileData} statusDB={statusDB} />
                </h3>
            </div>
            <div className="educationsContentMobile">
                <AnimatePresence>
                    {educations.length > 0 ? (
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
                                    <p>{education.degreeName}</p>
                                    <p>{education.timeAndPlace}</p>
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
                        <motion.div className="loadingProfileDataMobile" key="loadingedprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="noedprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ExperienceMobile({ loadingProfileData, statusDB, experiences }) {
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
            <div className="experiencesContentMobile">
                <AnimatePresence>
                    {experiences.length > 0 ? (
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
                                        <h4>
                                            {experience.companyName}
                                            <span style={{ color: "gray", fontSize: "8px", fontStyle: "normal", position: "relative", bottom: "4px", left: "10px" }}>
                                                {" " + getTotalExperience(index)}
                                            </span>
                                            <span title="Currently employed" style={{ color: "lightgreen", fontSize: "8px", fontStyle: "normal", position: "relative", bottom: "4px", left: "20px" }}>
                                                {experience.current ? " (CURRENT JOB)" : ""}
                                            </span>
                                        </h4>
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
                        <motion.div className="loadingProfileDataMobile" key="loadingexpprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProfileMobile" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProfileDataMobile" key="noutilexpprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SkillsMobile({ loadingProfileData, statusDB, skills }) {
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
                <p>
                    <span style={{ color: "red" }}>*</span>****
                </p>
            );
        } else if (skillLevel === "experienced") {
            return (
                <p>
                    <span style={{ color: "orange" }}>**</span>***
                </p>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <p>
                    <span style={{ color: "yellow" }}>***</span>**
                </p>
            );
        } else if (skillLevel === "advanced") {
            return (
                <p>
                    <span style={{ color: "blue" }}>****</span>*
                </p>
            );
        } else if (skillLevel === "professional") {
            return (
                <p>
                    <span style={{ color: "green" }}>*****</span>
                </p>
            );
        }
    };

    return (
        <div className="skillsContainerMobile">
            <div className="skillsTitleMobile">
                <h3>
                    SKILLS
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
            <div className="skillsContentMobile">
                <div className="webDevelopmentSoftwareMobile">
                    <div className="wDSTitleMobile">
                        <h4>{info.profile.skillsTitle1}</h4>
                    </div>
                    <div className="wDSContentMobile">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.utilitySoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.cLISoftware?.length > 0 &&
                            skills.webDevelopmentSoftware?.deploymentSoftware?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingwdsprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nowdsprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                            skills.frontEndDevelopment?.cSSFrameworks?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingfedprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nofedprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                            skills.backEndDevelopment?.databases?.length > 0 ? (
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
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
                                                        <h4>{skill.name}</h4>
                                                    </div>
                                                    <div className="sC2M">
                                                        <div className="sC2-1M">
                                                            <p style={{ color: getSkillColor(skill.skillLevel) }}>{getSkillLevelTitle(skill.skillLevel)}</p>
                                                        </div>
                                                        <div className="sC2-2M">{getSkillLevel(skill.skillLevel)}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : loadingProfileData ? (
                                <motion.div className="loadingProfileDataMobile" key="loadingbedprofiledatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfileMobile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileDataMobile" key="nobedprofiledatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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
                <h3>INTERESTS</h3>
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
                <h3>HOBBIES</h3>
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
                <h3>CONTACT INFO</h3>
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

export default ProfilePage;
