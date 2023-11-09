import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.css";

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
        <div className="PFP">
            <div className="ProfilePageContainer">
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
        <div className="ProfilePageTitleContainer">
            <h2>PROFILE</h2>
        </div>
    );
}

function AboutMe() {
    return (
        <div className="AboutMeContainer">
            <div className="AboutMeTitle">
                <h3>ABOUT ME</h3>
            </div>
            <div className="AboutMeContent">
                <AnimatePresence>
                    <motion.a
                        className="AboutMePhoto"
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
                <div className="AboutMeTextContainer">
                    <div className="AboutMeTextTitle">
                        <h4 className="h4_1">{info.LinkedIn.name}</h4>
                        <h4 className="h4_2">{info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle + " at " + info.LinkedIn.company : info.LinkedIn.profession}</h4>
                    </div>
                    <div className="AboutMeText">
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
        <div className="LanguagesContainer">
            <div className="LanguagesTitle">
                <h3>LANGUAGES</h3>
            </div>
            <div className="LanguagesContent">
                {languages.length > 0 ? (
                    languages.map((language, index) => (
                        <div className="Language" key={index} style={{ backgroundColor: language.color }}>
                            <div className="LanguageLogo" style={{ backgroundImage: `url(${language.image})` }} />
                            <div className="LanguageContent">
                                <h4>{language.name}</h4>
                                <p>{language.proficiency}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="NoProfileData">
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
        <div className="EducationsContainer">
            <div className="EducationsTitle">
                <h3>EDUCATION</h3>
            </div>
            <div className="EducationsContent">
                {educations.length > 0 ? (
                    educations.map((education, index) => (
                        <AnimatePresence>
                            <motion.div
                                className="Education"
                                key={index}
                                style={{ "--education-color": education.color }}
                                onClick={() => openOrCloseEducation(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="EducationTitle">
                                    <h4>{education.schoolName}</h4>
                                </div>
                                <div className="EducationContent1" style={{ backgroundColor: education.color }}>
                                    <p>{education.degreeName}</p>
                                    <p>{education.timeAndPlace}</p>
                                    <div
                                        className="SchoolLogo"
                                        style={{
                                            backgroundImage: `url(${education.image})`,
                                            backgroundColor: !education.image && education.color,
                                            backgroundPosition: index === 1 && "45% 50%",
                                            backgroundSize: index === 1 && "40%",
                                        }}
                                    />
                                </div>
                                <div className="EducationContent2" style={{ display: isVisibleEd[index] ? "block" : "none" }}>
                                    <p>{education.educationDescription}</p>
                                    <p className="Subjects">
                                        Education subjects: <span style={{ color: "white" }}>{education.educationSubjects}</span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))
                ) : (
                    <div className="NoProfileData">
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
        <div className="SkillsContainer">
            <div className="SkillsTitle">
                <h3>SKILLS</h3>
            </div>
            <div className="SkillsContent">
                <div className="UtilitySoftware">
                    <div className="USTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="USContent">
                        {skills.utilitySoftware?.length > 0 ? (
                            skills.utilitySoftware.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Scripting">
                    <div className="STitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="SContent">
                        {skills.scripting?.length > 0 ? (
                            skills.scripting.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="ProgrammingLanguages">
                    <div className="PLTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="PLContent">
                        {skills.programmingLanguages?.length > 0 ? (
                            skills.programmingLanguages.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    {index === 10 && (
                                        <div className="PL11LogoBG">
                                            <div className="PL11LogoL" style={{ backgroundImage: `url(${skill.image})` }} />
                                        </div>
                                    )}
                                    {index === 11 && (
                                        <div className="PL12LogoBG">
                                            <div className="PL12LogoL" style={{ backgroundImage: `url(${skill.image})` }} />
                                        </div>
                                    )}
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Front-endDevelopment">
                    <div className="FEDTitle">
                        <h4>{info.LinkedIn.skillsTitle4}</h4>
                    </div>
                    <div className="FEDContent">
                        {skills.frontEndDevelopment?.length > 0 ? (
                            skills.frontEndDevelopment.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Back-endDevelopment">
                    <div className="BEDTitle">
                        <h4>{info.LinkedIn.skillsTitle5}</h4>
                    </div>
                    <div className="BEDContent">
                        {skills.backEndDevelopment?.length > 0 ? (
                            skills.backEndDevelopment.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
                                <h4>NO DATA!</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Full-stackDevelopment">
                    <div className="FSDTitle">
                        <h4>{info.LinkedIn.skillsTitle6}</h4>
                    </div>
                    <div className="FSDContent">
                        {skills.fullStackDevelopment?.length > 0 ? (
                            skills.fullStackDevelopment.map((skill, index) => (
                                <div className="Skill" key={index} style={{ backgroundColor: skill.color }}>
                                    <div
                                        className="SkillLogo"
                                        style={{
                                            backgroundImage: `url(${skill.image})`,
                                            backgroundSize: skill.backgroundSize,
                                        }}
                                    />
                                    <div className="SkillContent">
                                        <h4>{skill.name}</h4>
                                        <p>{getSkillLevelTitle(skill.skillLevel)}</p>
                                        {getSkillLevel(skill.skillLevel)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NoProfileData">
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
        <div className="ExperiencesContainer">
            <div className="ExperiencesTitle">
                <h3>EXPERIENCE</h3>
            </div>
            <div className="ExperiencesContent">
                {experiences.length > 0 ? (
                    experiences.map((experience, index) => (
                        <AnimatePresence>
                            <motion.div
                                className="Experience"
                                key={index}
                                style={{ "--experience-color": experience.color }}
                                onClick={() => openOrCloseExperience(index)}
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="ExperienceTitle">
                                    <h4>{experience.companyName}</h4>
                                </div>
                                <div className="ExperienceContent1" style={{ backgroundColor: experience.color }}>
                                    <p>{experience.workTitle}</p>
                                    <p>{experience.workTimeAndPlace}</p>
                                    <div className="CompanyLogo" style={{ backgroundImage: `url(${experience.image})` }} />
                                </div>
                                <div className="ExperienceContent2" style={{ display: isVisibleEx[index] ? "block" : "none" }}>
                                    <p>{experience.workDescription}</p>
                                    <p className="UsedTech">
                                        Technologies used: <span style={{ color: "white" }}>{experience.workTech}</span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))
                ) : (
                    <div className="NoProfileData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

function Interests() {
    return (
        <div className="InterestsContainer">
            <div className="InterestsTitle">
                <h3>INTERESTS</h3>
            </div>
            <div className="InterestsContent">
                <div className="Interest1">
                    <div className="Interest1Title">
                        <h4>IT infrastructure</h4>
                    </div>
                    <div className="Interest1Content">
                        <div className="Interest1ContentCover">
                            <div className="Interest1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Interest2">
                    <div className="Interest2Title">
                        <h4>Software Development</h4>
                    </div>
                    <div className="Interest2Content">
                        <div className="Interest2ContentCover">
                            <div className="Interest2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Interest3">
                    <div className="Interest3Title">
                        <h4>Robotics</h4>
                    </div>
                    <div className="Interest3Content">
                        <div className="Interest3ContentCover">
                            <div className="Interest3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Hobbies() {
    return (
        <div className="HobbiesContainer">
            <div className="HobbiesTitle">
                <h3>HOBBIES</h3>
            </div>
            <div className="HobbiesContent">
                <div className="Hobby1">
                    <div className="Hobby1Title">
                        <h4>Gaming</h4>
                    </div>
                    <div className="Hobby1Content">
                        <div className="Hobby1ContentCover">
                            <div className="Hobby1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Hobby2">
                    <div className="Hobby2Title">
                        <h4>Web development</h4>
                    </div>
                    <div className="Hobby2Content">
                        <div className="Hobby2ContentCover">
                            <div className="Hobby2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Hobby3">
                    <div className="Hobby3Title">
                        <h4>Camping</h4>
                    </div>
                    <div className="Hobby3Content">
                        <div className="Hobby3ContentCover">
                            <div className="Hobby3ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMe() {
    return (
        <div className="ContactContainer">
            <div className="ContactTitle">
                <h3>CONTACT INFO</h3>
            </div>
            <div className="ContactContent">
                <div className="PhoneContainer">
                    <div className="PhoneContainerTitle">
                        <h3>
                            PHONE<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>☎️</span>
                        </h3>
                    </div>
                    <div className="PhoneContainerContent">
                        <div className="Phone1">
                            <h4>{info.LinkedIn.phoneNumber}</h4>
                        </div>
                        <div className="Phone2"></div>
                    </div>
                </div>
                <div className="EmailContainer">
                    <div className="EmailContainerTitle">
                        <h3>
                            EMAIL<span style={{ fontStyle: "normal", textShadow: "none", paddingLeft: "5px" }}>📧</span>
                        </h3>
                    </div>
                    <div className="EmailContainerContent">
                        <div className="Email1">
                            <h4>{info.LinkedIn.emailAddress}</h4>
                        </div>
                        <div className="Email2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
