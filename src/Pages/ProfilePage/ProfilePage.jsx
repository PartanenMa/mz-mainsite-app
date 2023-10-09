import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.css";

function ProfilePage() {
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        setLanguages(data.profileData.languages);
        setEducations(data.profileData.educations);
        setExperiences(data.profileData.experiences);
    }, []);

    return (
        <div className="ProfilePageContainer">
            <ProfilePageTitle />
            <AboutMe />
            <Languages languages={languages} />
            <Education educations={educations} />
            <Skills />
            <Experience experiences={experiences} />
            <Interests />
            <Hobbies />
            <ContactMe />
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
                        <h4 className="h4_2">
                            {info.LinkedIn.jobTitle && info.LinkedIn.company
                                ? info.LinkedIn.jobTitle + " at " + info.LinkedIn.company
                                : info.LinkedIn.profession}
                        </h4>
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
                                onClick={() => openOrCloseEducation(index)}
                                key={index}
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
                                <div
                                    className="EducationContent2"
                                    style={{ display: isVisibleEd[index] ? "block" : "none" }}
                                >
                                    <p>{education.educationDescription}</p>
                                    <p className="Subjects">
                                        Education subjects:{" "}
                                        <span style={{ color: "white" }}>{education.educationSubjects}</span>
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

function Skills() {
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
                <div className="ProgrammingLanguages">
                    <div className="PLTitle">
                        <h4>{info.LinkedIn.skillsTitle1}</h4>
                    </div>
                    <div className="PLContent">
                        <div className="PL1">
                            <div className="PL1Logo"></div>
                            <div className="PL1Content">
                                <h4>C++</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                        <div className="PL2">
                            <div className="PL2Logo"></div>
                            <div className="PL2Content">
                                <h4>Java</h4>
                                <p>{getSkillLevelTitle("intermediate")}</p>
                                {getSkillLevel("intermediate")}
                            </div>
                        </div>
                        <div className="PL3">
                            <div className="PL3Logo"></div>
                            <div className="PL3Content">
                                <h4>C#</h4>
                                <p>{getSkillLevelTitle("intermediate")}</p>
                                {getSkillLevel("intermediate")}
                            </div>
                        </div>
                        <div className="PL4">
                            <div className="PL4Logo"></div>
                            <div className="PL4Content">
                                <h4>HTML</h4>
                                <p>{getSkillLevelTitle("advanced")}</p>
                                {getSkillLevel("advanced")}
                            </div>
                        </div>
                        <div className="PL5">
                            <div className="PL5Logo"></div>
                            <div className="PL5Content">
                                <h4>CSS</h4>
                                <p>{getSkillLevelTitle("advanced")}</p>
                                {getSkillLevel("advanced")}
                            </div>
                        </div>
                        <div className="PL6">
                            <div className="PL6Logo"></div>
                            <div className="PL6Content">
                                <h4>JavaScript</h4>
                                <p>{getSkillLevelTitle("advanced")}</p>
                                {getSkillLevel("advanced")}
                            </div>
                        </div>
                        <div className="PL7">
                            <div className="PL7Logo"></div>
                            <div className="PL7Content">
                                <h4>TypeScript</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                        <div className="PL8">
                            <div className="PL8Logo"></div>
                            <div className="PL8Content">
                                <h4>Python</h4>
                                <p>{getSkillLevelTitle("intermediate")}</p>
                                {getSkillLevel("intermediate")}
                            </div>
                        </div>
                        <div className="PL9">
                            <div className="PL9Logo"></div>
                            <div className="PL9Content">
                                <h4>Go</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                        <div className="PL10">
                            <div className="PL10Logo"></div>
                            <div className="PL10Content">
                                <h4>PHP</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                        <div className="PL11">
                            <div className="PL11Logo"></div>
                            <div className="PL11LogoBG">
                                <div className="PL11LogoL"></div>
                            </div>
                            <div className="PL11Content">
                                <h4>SQL</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                        <div className="PL12">
                            <div className="PL12Logo"></div>
                            <div className="PL12LogoBG">
                                <div className="PL12LogoL"></div>
                            </div>
                            <div className="PL12Content">
                                <h4>NoSQL</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Front-endDevelopment">
                    <div className="FEDTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="FEDContent">
                        <div className="FED1">
                            <div className="FED1Logo"></div>
                            <div className="FED1Content">
                                <h4>React</h4>
                                <p>{getSkillLevelTitle("advanced")}</p>
                                {getSkillLevel("advanced")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Back-endDevelopment">
                    <div className="BEDTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="BEDContent">
                        <div className="BED1">
                            <div className="BED1Logo"></div>
                            <div className="BED1Content">
                                <h4>Node.js with Express.js</h4>
                                <p>{getSkillLevelTitle("beginner")}</p>
                                {getSkillLevel("beginner")}
                            </div>
                        </div>
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
                                onClick={() => openOrCloseExperience(index)}
                                key={index}
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
                                    <div
                                        className="CompanyLogo"
                                        style={{ backgroundImage: `url(${experience.image})` }}
                                    />
                                </div>
                                <div
                                    className="ExperienceContent2"
                                    style={{ display: isVisibleEx[index] ? "block" : "none" }}
                                >
                                    <p>{experience.workDescription}</p>
                                    <p className="Tech">
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
                        <h4>Programming</h4>
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
                        <h3>PHONE</h3>
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
                        <h3>EMAIL</h3>
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
