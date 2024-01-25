import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./FrontPage.scss";

function FrontPage() {
    const [showFrontEnd, setShowFrontEnd] = useState(false);
    const [showBackEnd, setShowBackEnd] = useState(false);
    const [technologiesFe, setTechnologiesFe] = useState([]);
    const [technologiesBe, setTechnologiesBe] = useState([]);

    useEffect(() => {
        setTechnologiesFe(data.technologiesData.technologiesFe);
        setTechnologiesBe(data.technologiesData.technologiesBe);
        if (info.LinkedIn.professionTech.includes("Front-end")) {
            setShowFrontEnd(true);
            setShowBackEnd(false);
        } else if (info.LinkedIn.professionTech.includes("Back-end")) {
            setShowFrontEnd(false);
            setShowBackEnd(true);
        } else if (info.LinkedIn.professionTech.includes("Full-stack")) {
            setShowFrontEnd(true);
            setShowBackEnd(true);
        }
    }, []);

    return (
        <div className="fP">
            <div className="frontPageContainer">
                <Main showFrontEnd={showFrontEnd} showBackEnd={showBackEnd} techFe={technologiesFe} techBe={technologiesBe} />
            </div>
        </div>
    );
}

function Main({ showFrontEnd, showBackEnd, techFe, techBe }) {
    const navigate = useNavigate();

    const getProfessionTech = () => {
        let professionT;

        if (showFrontEnd && showBackEnd) {
            professionT = " 🖥️+🖥";
        } else if (showFrontEnd) {
            professionT = " 🖥️";
        } else if (showBackEnd) {
            professionT = " 🖥";
        }

        return professionT;
    };

    const handleNavigation = (page) => {
        if (page === "profile") {
            navigate(info.routes.profilePage);
        } else if (page === "projects") {
            navigate(info.routes.projectsPage);
        } else if (page === "videos") {
            navigate(info.routes.videosPage);
        }
    };

    return (
        <main className="main">
            <section className="heroSection">
                <AnimatePresence>
                    <motion.div className="heroTitle" key="heroT" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <div className="hTWelcome1">
                            <h3 className="hTW1text">
                                Hi, 👋 I'm <span style={{ color: "green" }}>{info.LinkedIn.name}</span>
                            </h3>
                        </div>
                        <div className="hTWelcome2">
                            <p className="hTW2text">
                                I'm a <span style={{ color: "green" }}>{info.LinkedIn.profession + " 👨‍💻"}</span>
                            </p>
                        </div>
                        <div className="hTWelcome3">
                            <h3>Welcome to the MatrixZone</h3>
                        </div>
                    </motion.div>
                    <motion.div className="heroContent" key="heroC" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                        <motion.div
                            className="heroContent1"
                            onClick={() => handleNavigation("profile")}
                            key="heroC1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-1T">PROFILE</h2>
                            <div className="hC1-1">
                                <div className="titleProfile">
                                    <h3>View my profile</h3>
                                    <div className="logoProfile" />
                                </div>
                                <div className="contentProfile">
                                    <p>- About me.</p>
                                    <p>- My educational background.</p>
                                    <p>- My programming skills.</p>
                                    <p>
                                        - My experience as a <br />
                                        software developer.
                                    </p>
                                </div>
                            </div>
                            <div className="hC1-2" />
                        </motion.div>
                        <motion.div
                            className="heroContent2"
                            onClick={() => handleNavigation("projects")}
                            key="heroC2"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-2T">PROJECTS</h2>
                            <div className="hC2-1">
                                <div className="titleProjects">
                                    <h3>View my projects</h3>
                                    <div className="logoProjects" />
                                </div>
                                <div className="contentProjects">
                                    <p>- About my projects.</p>
                                    <p>- My projects.</p>
                                </div>
                            </div>
                            <div className="hC2-2" />
                        </motion.div>
                        <motion.div
                            className="heroContent3"
                            onClick={() => handleNavigation("videos")}
                            key="heroC3"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-3T">VIDEOS</h2>
                            <div className="hC3-1">
                                <div className="titleVideos">
                                    <h3>View my videos</h3>
                                    <div className="logoVideos" />
                                </div>
                                <div className="contentVideos">
                                    <p>- About my videos.</p>
                                    <p>- My videos.</p>
                                </div>
                            </div>
                            <div className="hC3-2" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </section>
            <section className="technologySection">
                <div className="technology">
                    <div className="technologyTitle">
                        <h3>
                            {info.LinkedIn.professionTech}
                            {info.LinkedIn.professionDetailed && (
                                <>
                                    <span style={{ color: "green", fontStyle: "normal" }}>{" ("}</span>
                                    <span style={{ color: "green" }}>{info.LinkedIn.professionDetailed}</span>
                                    <span style={{ color: "green", fontStyle: "normal" }}>{") "}</span>
                                </>
                            )}
                        </h3>
                    </div>
                    <div className="technologyContent">
                        {showFrontEnd && (
                            <div className="technologyContentBox1">
                                <div className="tCB1Title">
                                    <h4>Front-end tech stack</h4>
                                </div>
                                <div className="tCB1Content">
                                    {techFe.length > 0 ? (
                                        <AnimatePresence>
                                            {techFe.map((tech, index) => (
                                                <motion.a
                                                    className="tech"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="techTitle">
                                                        <h5 style={{ color: tech.color }}>{tech.name}</h5>
                                                    </div>
                                                    <div className="techLogo" style={{ backgroundImage: `url(${tech.image})`, backgroundSize: tech.size }} />
                                                </motion.a>
                                            ))}
                                        </AnimatePresence>
                                    ) : (
                                        <div className="noTechData">
                                            <h4>NO DATA!</h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {showBackEnd && (
                            <div className="technologyContentBox2" style={showFrontEnd && showBackEnd ? { bottom: "308px", left: "600px" } : { top: "30px" }}>
                                <div className="tCB2Title">
                                    <h4>Back-end tech stack</h4>
                                </div>
                                <div className="tCB2Content">
                                    {techBe.length > 0 ? (
                                        <AnimatePresence>
                                            {techBe.map((tech, index) => (
                                                <motion.a
                                                    className="tech"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="techTitle">
                                                        <h5 style={{ color: tech.color }}>{tech.name}</h5>
                                                    </div>
                                                    <div className="techLogo" style={{ backgroundImage: `url(${tech.image})`, backgroundSize: tech.size }} />
                                                </motion.a>
                                            ))}
                                        </AnimatePresence>
                                    ) : (
                                        <div className="noTechData">
                                            <h4>NO DATA!</h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="professionSection">
                <div className="profession">
                    <div className="professionTitle">
                        <h3>
                            {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle + " at " : info.LinkedIn.profession}
                            <span
                                style={{
                                    color: info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.companyColor : "green",
                                }}
                            >
                                {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.company : ""}
                            </span>
                            {!info.LinkedIn.jobTitle || !info.LinkedIn.company ? (
                                <>
                                    <span style={{ color: "green", fontStyle: "norman" }}>{" ("}</span>
                                    <span style={{ color: "green" }}>{"Looking for work"}</span>
                                    <span style={{ color: "green", fontStyle: "norman" }}>{") "}</span>
                                </>
                            ) : (
                                ""
                            )}
                            <span
                                title={info.LinkedIn.jobTitle && info.LinkedIn.company ? "Currently employed" : "Currently unemployed"}
                                style={{ fontStyle: "normal", cursor: "default", textShadow: "none" }}
                            >
                                {info.LinkedIn.jobTitle && info.LinkedIn.company ? " 💼" : " 📋"}
                            </span>
                        </h3>
                    </div>
                    <div className="professionContent">
                        <div className="professionContentBox1">
                            <p>
                                {info.LinkedIn.jobTitle && info.LinkedIn.company ? "Currently working as a " + info.LinkedIn.jobTitle + " at " : "Currently looking for work as a "}
                                <span
                                    style={{
                                        color: info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.companyColor : "green",
                                    }}
                                >
                                    {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.company : info.LinkedIn.profession}
                                </span>
                                .
                                <br />
                                <br />I use technologies such as{" "}
                                <span
                                    style={{
                                        color: info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.companyColor : "green",
                                    }}
                                >
                                    {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTechStack : info.LinkedIn.professionTechStack}
                                </span>
                                .
                                <br />
                                <br />I also use tools such as{" "}
                                <span
                                    style={{
                                        color: info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.companyColor : "green",
                                    }}
                                >
                                    {info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobAdditionalTech : info.LinkedIn.professionAdditionalTech}
                                </span>
                                .
                            </p>
                        </div>
                        {info.LinkedIn.jobTitle && info.LinkedIn.company && (
                            <div
                                className="professionContentBox2"
                                style={{
                                    "--company-color": info.LinkedIn.companyColor,
                                    backgroundImage: `url(${info.LinkedIn.companyLogo})`,
                                    height: info.LinkedIn.companyLogoH,
                                    width: info.LinkedIn.companyLogoW,
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open(info.LinkedIn.companyInfoLink, "_blank")}
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default FrontPage;
