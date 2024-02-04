import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.scss";

function ProfilePage() {
    const [loadingData, setLoadingData] = useState(true);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLanguages(data.profileData.languages);
            setEducations(data.profileData.educations);
            setSkills(data.profileData.skills);
            setExperiences(data.profileData.experiences);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="pFP">
            <div className="profilePageContainer">
                <ProfilePageTitle />
                <AboutMe loadingData={loadingData} />
                <Languages loadingData={loadingData} languages={languages} />
                <Education loadingData={loadingData} educations={educations} />
                <Skills loadingData={loadingData} skills={skills} />
                <Experience loadingData={loadingData} experiences={experiences} />
                <Interests />
                <Hobbies />
                <ContactMe />
            </div>
        </div>
    );
}

function ProfilePageTitle() {
    return (
        <div className="profilePageTitleContainer">
            <h2>PROFILE</h2>
        </div>
    );
}

function AboutMe({ loadingData }) {
    return (
        <div className="aboutMeContainer">
            <div className="aboutMeTitle">
                <h3>
                    ABOUT ME
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="aboutMeContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMePhoto"
                        title="My LinkedIn"
                        href={info.LinkedIn.link}
                        target="_blank"
                        key="aboutmephoto"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMeTextContainer">
                    <div className="aboutMeTextTitle">
                        <h4 className="h4_1">{info.LinkedIn.name}</h4>
                        <h4 className="h4_2">{info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle + " at " + info.LinkedIn.company : info.LinkedIn.profession}</h4>
                    </div>
                    <div className="aboutMeText">
                        <p>
                            {info.LinkedIn.description1}
                            <br />
                            <br />
                            {info.LinkedIn.description2}
                            <br />
                            <br />
                            {info.LinkedIn.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Languages({ loadingData, languages }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>
                    LANGUAGES
                    <DBstate loading={loadingData} />
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
                                transition={{ delay: 0.5 }}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="languageLogo" style={{ backgroundImage: `url(${language.image})` }} />
                                <div className="languageContent">
                                    <h4>{language.name}</h4>
                                    <p>{language.proficiency}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingData ? (
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

function Education({ loadingData, educations }) {
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
                    <DBstate loading={loadingData} />
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
                                transition={{ delay: 0.5 }}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
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
                                            backgroundPosition: index === 1 && "45% 50%",
                                            backgroundSize: index === 1 && "40%",
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
                    ) : loadingData ? (
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

function Skills({ loadingData, skills }) {
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
                    SKILLS
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="skillsContent">
                <div className="programmingLanguages">
                    <div className="pLTitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="pLContent">
                        <AnimatePresence>
                            {skills.basicProgrammingLanguages?.length > 0 ? (
                                skills.basicProgrammingLanguages.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingbplprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="nobplprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="scripting">
                    <div className="sTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="sContent">
                        <AnimatePresence>
                            {skills.scripting?.length > 0 ? (
                                skills.scripting.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingscrprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="noscrprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="utilitySoftware">
                    <div className="uSTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="uSContent">
                        <AnimatePresence>
                            {skills.utilitySoftware?.length > 0 ? (
                                skills.utilitySoftware.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingutilsofprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="noutilsofprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="front-endDevelopment">
                    <div className="fEDTitle">
                        <h4>{info.LinkedIn.skillsTitle4}</h4>
                    </div>
                    <div className="fEDContent">
                        <AnimatePresence>
                            {skills.frontEndDevelopment?.length > 0 ? (
                                skills.frontEndDevelopment.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingfedprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="noutilfedprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="back-endDevelopment">
                    <div className="bEDTitle">
                        <h4>{info.LinkedIn.skillsTitle5}</h4>
                    </div>
                    <div className="bEDContent">
                        <AnimatePresence>
                            {skills.backEndDevelopment?.length > 0 ? (
                                skills.backEndDevelopment.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingbedprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="noutilbedprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4>NO DATA!</h4>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="webDevelopmentSoftware">
                    <div className="wDSTitle">
                        <h4>{info.LinkedIn.skillsTitle6}</h4>
                    </div>
                    <div className="wDSContent">
                        <AnimatePresence>
                            {skills.webDevelopmentSoftware?.length > 0 ? (
                                skills.webDevelopmentSoftware.map((skill, index) => (
                                    <motion.div
                                        className="skill"
                                        style={{ backgroundColor: skill.color }}
                                        key={index}
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                ))
                            ) : loadingData ? (
                                <motion.div className="loadingProfileData" key="loadingwdsprofiledata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfile" />
                                </motion.div>
                            ) : (
                                <motion.div className="noProfileData" key="noutilwdsprofiledata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
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

function Experience({ loadingData, experiences }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    return (
        <div className="experiencesContainer">
            <div className="experiencesTitle">
                <h3>
                    EXPERIENCE
                    <DBstate loading={loadingData} />
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
                                transition={{ delay: 0.5 }}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => openOrCloseExperience(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="experienceTitle">
                                    <h4>{experience.companyName}</h4>
                                </div>
                                <div className="experienceContent1" style={{ backgroundColor: experience.color }}>
                                    <p>{experience.workTitle}</p>
                                    <p>{experience.workTimeAndPlace}</p>
                                    <div className="companyLogo" style={{ backgroundImage: `url(${experience.image})` }} />
                                </div>
                                <div className="experienceContent2" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    <p>{experience.workDescription}</p>
                                    <p className="usedTech">
                                        Technologies used: <span style={{ color: "white" }}>{experience.workTech}.</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : loadingData ? (
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

export default ProfilePage;
