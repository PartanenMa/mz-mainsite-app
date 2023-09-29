import { useState, useEffect } from "react";
import { notification } from "antd";
import LoginFirstScreen from "/src/Components/LoginFirstScreen/LoginFirstScreen.jsx";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.css";

function AboutMePageAdmin() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn === "true") {
            //Simulate loading for 1 second:
            const timer = setTimeout(() => {
                setLoading(false);
                if (load === "true") {
                    sessionStorage.setItem("load", "false");
                    notification.success({
                        message: "LOGGED IN AS ADMIN",
                        description: "Welcome back!",
                        placement: "bottomLeft",
                        style: {
                            backgroundColor: "lightgreen",
                            border: "3px solid green",
                        },
                    });
                }
            }, 1000);

            //Clean up the timer to prevent memory leaks:
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, load]);

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
                        <div className="ProfilePageContainerAdmin">
                            <div className="Breadcrumb">
                                <h2>Admin / profile</h2>
                            </div>
                            <ProfileAdminPageTitle />
                            <AboutMe />
                            <Languages />
                            <Education />
                            <Skills />
                            <Experience />
                            <Interests />
                            <Hobbies />
                            <ContactMe />
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
        <div className="ProfilePageTitleContainer">
            <h2>MY PROFILE</h2>
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
                        key="aboutmephotoA"
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
                        <h4 className="h4_2">{info.LinkedIn.jobTitle + " " + info.LinkedIn.company}</h4>
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

function Languages() {
    return (
        <div className="LanguagesContainer">
            <div className="LanguagesTitle">
                <h3>MY LANGUAGES</h3>
            </div>
            <div className="LanguagesContent">
                <div className="Lang1">
                    <div className="Lang1Logo"></div>
                    <div className="Lang1Content">
                        <h4>Finnish</h4>
                        <p>{info.LinkedIn.language1}</p>
                    </div>
                </div>
                <div className="Lang2">
                    <div className="Lang2Logo"></div>
                    <div className="Lang2Content">
                        <h4>English</h4>
                        <p>{info.LinkedIn.language2}</p>
                    </div>
                </div>
                <div className="Lang3">
                    <div className="Lang3Logo"></div>
                    <div className="Lang3Content">
                        <h4>Swedish</h4>
                        <p>{info.LinkedIn.language3}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Education() {
    const [isVisible1e, setIsVisible1e] = useState(false);
    const [isVisible2e, setIsVisible2e] = useState(false);
    const [isVisible3e, setIsVisible3e] = useState(false);

    const showEducationDescription1 = () => {
        if (isVisible1e === false) {
            setIsVisible1e(true);
        } else {
            setIsVisible1e(false);
        }
    };

    const showEducationDescription2 = () => {
        if (isVisible2e === false) {
            setIsVisible2e(true);
        } else {
            setIsVisible2e(false);
        }
    };

    const showEducationDescription3 = () => {
        if (isVisible3e === false) {
            setIsVisible3e(true);
        } else {
            setIsVisible3e(false);
        }
    };

    return (
        <div className="EducationContainer">
            <div className="EducationTitle">
                <h3>MY EDUCATION</h3>
            </div>
            <div className="EducationContent">
                <AnimatePresence>
                    <motion.div
                        className="EducationHighSchool"
                        onClick={() => showEducationDescription1()}
                        key="educationhighschoolA"
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="EHSTitle">
                            <h4>{info.LinkedIn.schoolName1}</h4>
                        </div>
                        <div className="EHSContent1">
                            <p>{info.LinkedIn.degreeName1}</p>
                            <p>{info.LinkedIn.timeAndPlace1}</p>
                        </div>
                        <div className="EHSContent2" style={{ display: isVisible1e ? "block" : "none" }}>
                            <p>{info.LinkedIn.educationDescription1}</p>
                            <p className="Tech">Education subjects: {info.LinkedIn.educationSubjects1}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="EducationMilitaryService"
                        onClick={() => showEducationDescription2()}
                        key="educationmilitaryserviceA"
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="EMSTitle">
                            <h4>{info.LinkedIn.schoolName2}</h4>
                        </div>
                        <div className="EMSContent1">
                            <p>{info.LinkedIn.degreeName2}</p>
                            <p>{info.LinkedIn.timeAndPlace2}</p>
                            <div className="MilitaryLogo"></div>
                        </div>
                        <div className="EMSContent2" style={{ display: isVisible2e ? "block" : "none" }}>
                            <p>{info.LinkedIn.educationDescription2}</p>
                            <p className="Tech">Education subjects: {info.LinkedIn.educationSubjects2}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="EducationUniversityOfAppliedSciences"
                        onClick={() => showEducationDescription3()}
                        key="educationuniversityofappliedsciencesA"
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="EUOASTitle">
                            <h4>{info.LinkedIn.schoolName3}</h4>
                        </div>
                        <div className="EUOASContent1">
                            <p>{info.LinkedIn.degreeName3}</p>
                            <p>{info.LinkedIn.timeAndPlace3}</p>
                            <div className="SchoolLogo"></div>
                        </div>
                        <div className="EUOASContent2" style={{ display: isVisible3e ? "block" : "none" }}>
                            <p>{info.LinkedIn.educationDescription3}</p>
                            <p className="Tech">Education subjects: {info.LinkedIn.educationSubjects3}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function Skills() {
    return (
        <div className="SkillsContainer">
            <div className="SkillsTitle">
                <h3>MY SKILLS</h3>
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
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL2">
                            <div className="PL2Logo"></div>
                            <div className="PL2Content">
                                <h4>Java</h4>
                                <p>{info.LinkedIn.skillsLevel2}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>**</span>**
                                </div>
                            </div>
                        </div>
                        <div className="PL3">
                            <div className="PL3Logo"></div>
                            <div className="PL3Content">
                                <h4>C#</h4>
                                <p>{info.LinkedIn.skillsLevel2}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>**</span>**
                                </div>
                            </div>
                        </div>
                        <div className="PL4">
                            <div className="PL4Logo"></div>
                            <div className="PL4Content">
                                <h4>HTML</h4>
                                <p>{info.LinkedIn.skillsLevel3}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>***</span>*
                                </div>
                            </div>
                        </div>
                        <div className="PL5">
                            <div className="PL5Logo"></div>
                            <div className="PL5Content">
                                <h4>CSS</h4>
                                <p>{info.LinkedIn.skillsLevel3}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>***</span>*
                                </div>
                            </div>
                        </div>
                        <div className="PL6">
                            <div className="PL6Logo"></div>
                            <div className="PL6Content">
                                <h4>JavaScript</h4>
                                <p>{info.LinkedIn.skillsLevel3}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>***</span>*
                                </div>
                            </div>
                        </div>
                        <div className="PL7">
                            <div className="PL7Logo"></div>
                            <div className="PL7Content">
                                <h4>TypeScript</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL8">
                            <div className="PL8Logo"></div>
                            <div className="PL8Content">
                                <h4>Go</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL9">
                            <div className="PL9Logo"></div>
                            <div className="PL9Content">
                                <h4>PHP</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL10">
                            <div className="PL10Logo"></div>
                            <div className="PL10LogoBG">
                                <div className="PL10LogoL"></div>
                            </div>
                            <div className="PL10Content">
                                <h4>SQL</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL11">
                            <div className="PL11Logo"></div>
                            <div className="PL11LogoBG">
                                <div className="PL11LogoL"></div>
                            </div>
                            <div className="PL11Content">
                                <h4>NoSQL</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="PL12">
                            <div className="PL12Logo"></div>
                            <div className="PL12Content">
                                <h4>Python</h4>
                                <p>{info.LinkedIn.skillsLevel2}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>**</span>**
                                </div>
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
                                <p>{info.LinkedIn.skillsLevel3}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>***</span>*
                                </div>
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
                                <h4>Node.js</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                        <div className="BED2">
                            <div className="BED2Logo"></div>
                            <div className="BED2Content">
                                <h4>Express.js</h4>
                                <p>{info.LinkedIn.skillsLevel1}</p>
                                <div>
                                    <span style={{ color: "lightgreen" }}>*</span>***
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Experience() {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const showWorkDescription1 = () => {
        if (isVisible1 === false) {
            setIsVisible1(true);
        } else {
            setIsVisible1(false);
        }
    };

    const showWorkDescription2 = () => {
        if (isVisible2 === false) {
            setIsVisible2(true);
        } else {
            setIsVisible2(false);
        }
    };

    return (
        <div className="ExperienceContainer">
            <div className="ExperienceTitle">
                <h3>MY EXPERIENCE</h3>
            </div>
            <div className="ExperienceContent">
                <AnimatePresence>
                    <motion.div
                        className="ExperienceInternship"
                        onClick={() => showWorkDescription1()}
                        key="experienceinternshipA"
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="EITitle">
                            <h4>{info.LinkedIn.companyName1}</h4>
                        </div>
                        <div className="EIContent1">
                            <p>{info.LinkedIn.workTitle1}</p>
                            <p>{info.LinkedIn.workTimeAndPlace1}</p>
                            <div className="CompanyLogo1"></div>
                        </div>
                        <div className="EIContent2" style={{ display: isVisible1 ? "block" : "none" }}>
                            <p>{info.LinkedIn.workDescription1}</p>
                            <p className="Tech">Technologies used: {info.LinkedIn.workTech1}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="ExperienceJob1"
                        onClick={() => showWorkDescription2()}
                        key="experiencejob1A"
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="EJ1Title">
                            <h4>{info.LinkedIn.companyName1}</h4>
                        </div>
                        <div className="EJ1Content1">
                            <p>{info.LinkedIn.workTitle2}</p>
                            <p>{info.LinkedIn.workTimeAndPlace2}</p>
                            <div className="CompanyLogo2"></div>
                        </div>
                        <div className="EJ1Content2" style={{ display: isVisible2 ? "block" : "none" }}>
                            <p>{info.LinkedIn.workDescription2}</p>
                            <p className="Tech">Technologies used: {info.LinkedIn.workTech2}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function Interests() {
    return (
        <div className="InterestsContainer">
            <div className="InterestsTitle">
                <h3>MY INTERESTS</h3>
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
                <h3>MY HOBBIES</h3>
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
                <h3>MY CONTACT INFO</h3>
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

export default AboutMePageAdmin;
