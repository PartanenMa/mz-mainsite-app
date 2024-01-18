import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.scss";

function ProfilePage() {
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        setLanguages(data.profileData.languages);
        setEducations(data.profileData.educations);
        setSkills(data.profileData.skills);
        setExperiences(data.profileData.experiences);
    }, []);

    return (
        <div className="pFP">
            <div className="profilePageContainer">
                <ProfilePageTitle />
                <AboutMe />
                <Languages languages={languages} />
                <Education educations={educations} />
                <Skills skills={skills} />
                <Experience experiences={experiences} />
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

function AboutMe() {
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

function Languages({ languages }) {
    return (
        <div className="languagesContainer">
            <div className="languagesTitle">
                <h3>LANGUAGES</h3>
            </div>
            <div className="languagesContent">
                {languages.length > 0 ? (
                    languages.map((language, index) => (
                        <div className="language" key={index} style={{ backgroundColor: language.color }}>
                            <div className="languageLogo" style={{ backgroundImage: `url(${language.image})` }} />
                            <div className="languageContent">
                                <h4>{language.name}</h4>
                                <p>{language.proficiency}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="noProfileData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

function Education({ educations }) {
    const [isVisibleEd, setIsVisibleEd] = useState(Array(educations.length).fill(false));

    const openOrCloseEducation = (index) => {
        const updatedVisibility = [...isVisibleEd];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEd(updatedVisibility);
    };

    return (
        <div className="educationsContainer">
            <div className="educationsTitle">
                <h3>EDUCATION</h3>
            </div>
            <div className="educationsContent">
                {educations.length > 0 ? (
                    <AnimatePresence>
                        {educations.map((education, index) => (
                            <motion.div
                                className="education"
                                key={index}
                                style={{ "--education-color": education.color }}
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
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="noProfileData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

function Skills({ skills }) {
    const getSkillLevelTitle = (skillLevel) => {
        if (skillLevel === "beginner") {
            return "Beginner";
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
                <div>
                    <span style={{ color: "lightgreen" }}>*</span>***
                </div>
            );
        } else if (skillLevel === "intermediate") {
            return (
                <div>
                    <span style={{ color: "lightgreen" }}>**</span>**
                </div>
            );
        } else if (skillLevel === "advanced") {
            return (
                <div>
                    <span style={{ color: "lightgreen" }}>***</span>*
                </div>
            );
        } else if (skillLevel === "professional") {
            return (
                <div>
                    <span style={{ color: "lightgreen" }}>****</span>
                </div>
            );
        }
    };

    return (
        <div className="skillsContainer">
            <div className="skillsTitle">
                <h3>SKILLS</h3>
            </div>
            <div className="skillsContent">
                <div className="utilitySoftware">
                    <div className="uSTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="uSContent">
                        {skills.utilitySoftware?.length > 0 ? (
                            skills.utilitySoftware.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
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
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="scripting">
                    <div className="sTitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="sContent">
                        {skills.scripting?.length > 0 ? (
                            skills.scripting.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
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
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="programmingLanguages">
                    <div className="pLTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="pLContent">
                        {skills.programmingLanguages?.length > 0 ? (
                            skills.programmingLanguages.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="skillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    {index === 10 && (
                                        <div className="pL11LogoBG">
                                            <div className="pL11LogoL" style={{ backgroundImage: `url(${skill.image})` }} />
                                        </div>
                                    )}
                                    {index === 11 && (
                                        <div className="pL12LogoBG">
                                            <div className="pL12LogoL" style={{ backgroundImage: `url(${skill.image})` }} />
                                        </div>
                                    )}
                                    <div className="skillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="front-endDevelopment">
                    <div className="fEDTitle">
                        <h4>{info.LinkedIn.skillsTitle4}</h4>
                    </div>
                    <div className="fEDContent">
                        {skills.frontEndDevelopment?.length > 0 ? (
                            skills.frontEndDevelopment.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
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
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="back-endDevelopment">
                    <div className="bEDTitle">
                        <h4>{info.LinkedIn.skillsTitle5}</h4>
                    </div>
                    <div className="bEDContent">
                        {skills.backEndDevelopment?.length > 0 ? (
                            skills.backEndDevelopment.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
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
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="full-stackDevelopment">
                    <div className="fSDTitle">
                        <h4>{info.LinkedIn.skillsTitle6}</h4>
                    </div>
                    <div className="fSDContent">
                        {skills.fullStackDevelopment?.length > 0 ? (
                            skills.fullStackDevelopment.map((skill, index) => (
                                <div className="skill" key={index} style={{ backgroundColor: skill.color }}>
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
                                </div>
                            ))
                        ) : (
                            <div className="noProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Experience({ experiences }) {
    const [isVisibleEx, setIsVisibleEx] = useState(Array(experiences.length).fill(false));

    const openOrCloseExperience = (index) => {
        const updatedVisibility = [...isVisibleEx];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisibleEx(updatedVisibility);
    };

    return (
        <div className="experiencesContainer">
            <div className="experiencesTitle">
                <h3>EXPERIENCE</h3>
            </div>
            <div className="experiencesContent">
                {experiences.length > 0 ? (
                    <AnimatePresence>
                        {experiences.map((experience, index) => (
                            <motion.div
                                className="experience"
                                key={index}
                                style={{ "--experience-color": experience.color }}
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
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="noProfileData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
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
