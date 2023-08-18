import { useNavigate } from "react-router-dom";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ProfilePage.css";

function ProfilePageGuest() {
    return (
        <div>
            <HeaderGuest />
            <NavGuest />
            <div className="ProfilePageContainer">
                <div className="Breadcrumb">
                    <h2>Guest / profile</h2>
                </div>
                <ProfileGuestPageTitle />
                <AboutMe />
                <Languages />
                <Education />
                <Skills />
                <Experience />
                <Interests />
                <Hobbies />
                <ContactMe />
            </div>
            <FooterGuest />
        </div>
    );
}

function ProfileGuestPageTitle() {
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
                <a className="AboutMePhoto" href={info.LinkedIn.link} target="_blank">
                    <div className="AboutMeLinkedInLogo"></div>
                </a>
                <div className="AboutMeTextContainer">
                    <div className="AboutMeTextTitle">
                        <h4 className="h4_1">{info.LinkedIn.name}</h4>
                        <h4 className="h4_2">{info.LinkedIn.jobTitle}</h4>
                    </div>
                    <div className="AboutMeText">
                        <p>
                            {info.LinkedIn.description1}
                            <br />
                            <br />{info.LinkedIn.description2}
                            <br />
                            <br />{info.LinkedIn.description3}
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
                <h3>LANGUAGES</h3>
            </div>
            <div className="LanguagesContent">
                <div className="Lang1">
                    <h4>Finnish</h4><p>{info.LinkedIn.language1}</p>
                </div>
                <div className="Lang2">
                    <h4>English</h4><p>{info.LinkedIn.language2}</p>
                </div>
                <div className="Lang3">
                    <h4>Swedish</h4><p>{info.LinkedIn.language3}</p>
                </div>
            </div>
        </div>
    );
}

function Education() {
    return (
        <div className="EducationContainer">
            <div className="EducationTitle">
                <h3>EDUCATION</h3>
            </div>
            <div className="EducationContent">
                <div className="EducationHighSchool">
                    <div className="EHSTitle">
                        <h4>{info.LinkedIn.schoolName1}</h4>
                    </div>
                    <div className="EHSContent">
                        <p>{info.LinkedIn.degreeName1}</p>
                        <p>{info.LinkedIn.timeAndPlace1}</p>
                    </div>
                </div>
                <div className="EducationMilitaryService">
                    <div className="EMSTitle">
                        <h4>{info.LinkedIn.schoolName2}</h4>
                    </div>
                    <div className="EMSContent">
                        <p>{info.LinkedIn.degreeName2}</p>
                        <p>{info.LinkedIn.timeAndPlace2}</p>
                        <div className="MilitaryLogo"></div>
                    </div>
                </div>
                <div className="EducationUniversityOfAppliedSciences">
                    <div className="EUOASTitle">
                        <h4>{info.LinkedIn.schoolName3}</h4>
                    </div>
                    <div className="EUOASContent">
                        <p>{info.LinkedIn.degreeName3}</p>
                        <p>{info.LinkedIn.timeAndPlace3}</p>
                        <div className="SchoolLogo"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Skills() {
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
                                <h4>C++</h4><p>{info.LinkedIn.skillsLevel1}</p>
                            </div>
                        </div>
                        <div className="PL2">
                            <div className="PL2Logo"></div>
                            <div className="PL2Content">
                                <h4>Java</h4><p>{info.LinkedIn.skillsLevel2}</p>
                            </div>
                        </div>
                        <div className="PL3">
                            <div className="PL3Logo"></div>
                            <div className="PL3Content">
                                <h4>C#</h4><p>{info.LinkedIn.skillsLevel2}</p>
                            </div>
                        </div>
                        <div className="PL4">
                            <div className="PL4Logo"></div>
                            <div className="PL4Content">
                                <h4>HTML</h4><p>{info.LinkedIn.skillsLevel3}</p>
                            </div>
                        </div>
                        <div className="PL5">
                            <div className="PL5Logo"></div>
                            <div className="PL5Content">
                                <h4>CSS</h4><p>{info.LinkedIn.skillsLevel3}</p>
                            </div>
                        </div>
                        <div className="PL6">
                            <div className="PL6Logo"></div>
                            <div className="PL6Content">
                                <h4>JavaScript</h4><p>{info.LinkedIn.skillsLevel3}</p>
                            </div>
                        </div>
                        <div className="PL7">
                            <div className="PL7Logo"></div>
                            <div className="PL7LogoBG">
                                <div className="PL7LogoL"></div>
                            </div>
                            <div className="PL7Content">
                                <h4>SQL</h4><p>{info.LinkedIn.skillsLevel1}</p>
                            </div>
                        </div>
                        <div className="PL8">
                            <div className="PL8Logo"></div>
                            <div className="PL8LogoBG">
                                <div className="PL8LogoL"></div>
                            </div>
                            <div className="PL8Content">
                                <h4>NoSQL</h4><p>{info.LinkedIn.skillsLevel1}</p>
                            </div>
                        </div>
                        <div className="PL9">
                            <div className="PL9Logo"></div>
                            <div className="PL9Content">
                                <h4>Python</h4><p>{info.LinkedIn.skillsLevel2}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Front-endFrameworks">
                    <div className="FEFTitle">
                        <h4>{info.LinkedIn.skillsTitle2}</h4>
                    </div>
                    <div className="FEFContent">
                        <div className="FEF1">
                            <div className="FEF1Logo"></div>
                            <div className="FEF1Content">
                                <h4>React</h4><p>{info.LinkedIn.skillsLevel3}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Back-endFrameworks">
                    <div className="BEFTitle">
                        <h4>{info.LinkedIn.skillsTitle3}</h4>
                    </div>
                    <div className="BEFContent">
                        <div className="BEF1">
                            <div className="BEF1Logo"></div>
                            <div className="BEF1Content">
                                <h4>Node.js</h4><p>{info.LinkedIn.skillsLevel1}</p>
                            </div>
                        </div>
                        <div className="BEF2">
                            <div className="BEF2Logo"></div>
                            <div className="BEF2Content">
                                <h4>FastAPI</h4><p>{info.LinkedIn.skillsLevel2}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Databases">
                    <div className="DBTitle">
                        <h4>{info.LinkedIn.skillsTitle4}</h4>
                    </div>
                    <div className="DBContent">

                    </div>
                </div>
            </div>
        </div>
    );
}

function Experience() {
    return (
        <div className="ExperienceContainer">
            <div className="ExperienceTitle">
                <h3>EXPERIENCE</h3>
            </div>
            <div className="ExperienceContent">
                <div className="ExperienceInternship1">
                    <div className="EI1Title">
                        <h4>{info.LinkedIn.companyName1}</h4>
                    </div>
                    <div className="EI1Content">
                        <p>{info.LinkedIn.workTitle1}</p>
                        <p>{info.LinkedIn.workTimeAndPlace1}</p>
                        <div className="CompanyLogo1"></div>
                    </div>
                </div>
                <div className="ExperienceInternship2">
                    <div className="EI2Title">
                        <h4>{info.LinkedIn.companyName1}</h4>
                    </div>
                    <div className="EI2Content">
                        <p>{info.LinkedIn.workTitle1}</p>
                        <p>{info.LinkedIn.workTimeAndPlace2}</p>
                        <div className="CompanyLogo2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Interests() {
    const navigate = useNavigate();

    return (
        <div className="InterestsContainer">
            <div className="InterestsTitle">
                <h3>INTERESTS</h3>
            </div>
            <div className="InterestsContent">
                <div className="Interest1" onClick={() => navigate(info.routes.iTInfraPageGuest)}>
                    <div className="Interest1Title">
                        <h4>IT infrastructure</h4>
                    </div>
                    <div className="Interest1Content">
                        <div className="Interest1ContentCover">
                            <div className="Interest1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Interest2" onClick={() => navigate(info.routes.programmingPageGuest)}>
                    <div className="Interest2Title">
                        <h4>Programming</h4>
                    </div>
                    <div className="Interest2Content">
                        <div className="Interest2ContentCover">
                            <div className="Interest2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Interest3" onClick={() => navigate(info.routes.roboticsPageGuest)}>
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
    const navigate = useNavigate();

    return (
        <div className="HobbiesContainer">
            <div className="HobbiesTitle">
                <h3>HOBBIES</h3>
            </div>
            <div className="HobbiesContent">
                <div className="Hobby1" onClick={() => navigate(info.routes.gamingPageGuest)}>
                    <div className="Hobby1Title">
                        <h4>Gaming</h4>
                    </div>
                    <div className="Hobby1Content">
                        <div className="Hobby1ContentCover">
                            <div className="Hobby1ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Hobby2" onClick={() => navigate(info.routes.webDevPageGuest)}>
                    <div className="Hobby2Title">
                        <h4>Web development</h4>
                    </div>
                    <div className="Hobby2Content">
                        <div className="Hobby2ContentCover">
                            <div className="Hobby2ContentCoverLogo"></div>
                        </div>
                    </div>
                </div>
                <div className="Hobby3" onClick={() => navigate(info.routes.campingPageGuest)}>
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

export default ProfilePageGuest;