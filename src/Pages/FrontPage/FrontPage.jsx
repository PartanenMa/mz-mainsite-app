import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./FrontPage.scss";

function FrontPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [loadingTechnologiesData, setLoadingTechnologiesData] = useState(true);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [technologiesFe, setTechnologiesFe] = useState([]);
    const [technologiesBe, setTechnologiesBe] = useState([]);
    const [showFrontEnd, setShowFrontEnd] = useState(false);
    const [showBackEnd, setShowBackEnd] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getProfession();
            getJob();
            getTechnologies();
        } else {
            if (info.profile.employed) {
                if (info.profile.jobTech.includes("Front-end")) {
                    setShowFrontEnd(true);
                    setShowBackEnd(false);
                } else if (info.profile.jobTech.includes("Back-end")) {
                    setShowFrontEnd(false);
                    setShowBackEnd(true);
                } else if (info.profile.jobTech.includes("Full-stack")) {
                    setShowFrontEnd(true);
                    setShowBackEnd(true);
                }

                setTechnologiesFe(dataFe.technologiesDataJ.technologiesFe);
                setTechnologiesBe(dataFe.technologiesDataJ.technologiesBe);
            } else {
                if (info.profile.professionTech.includes("Front-end")) {
                    setShowFrontEnd(true);
                    setShowBackEnd(false);
                } else if (info.profile.professionTech.includes("Back-end")) {
                    setShowFrontEnd(false);
                    setShowBackEnd(true);
                } else if (info.profile.professionTech.includes("Full-stack")) {
                    setShowFrontEnd(true);
                    setShowBackEnd(true);
                }

                setTechnologiesFe(dataFe.technologiesDataP.technologiesFe);
                setTechnologiesBe(dataFe.technologiesDataP.technologiesBe);
            }
            setTimeout(() => {
                setLoadingProfessionData(false);
                setLoadingJobData(false);
                setLoadingTechnologiesData(false);
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
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setProfessionData(data);
                setTimeout(() => {
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
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setJobData(data);
                    setLoadingJobData(false);
                }, 1000);
            });
    };

    const getTechnologies = () => {
        fetch("/technologies", {
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
                setTimeout(() => {
                    setTechnologiesFe(data.technologiesData.technologiesFe);
                    setTechnologiesBe(data.technologiesData.technologiesBe);
                    setLoadingTechnologiesData(false);
                }, 1000);
            });
    };

    useEffect(() => {
        if (jobData?.jobStatus?.employed) {
            if (jobData?.jobStatus?.jobTech.includes("Front-end")) {
                setShowFrontEnd(true);
                setShowBackEnd(false);
            } else if (jobData?.jobStatus?.jobTech.includes("Back-end")) {
                setShowFrontEnd(false);
                setShowBackEnd(true);
            } else if (jobData?.jobStatus?.jobTech.includes("Full-stack")) {
                setShowFrontEnd(true);
                setShowBackEnd(true);
            }
        } else {
            if (professionData?.professionStatus?.professionTech.includes("Front-end")) {
                setShowFrontEnd(true);
                setShowBackEnd(false);
            } else if (professionData?.professionStatus?.professionTech.includes("Back-end")) {
                setShowFrontEnd(false);
                setShowBackEnd(true);
            } else if (professionData?.professionStatus?.professionTech.includes("Full-stack")) {
                setShowFrontEnd(true);
                setShowBackEnd(true);
            }
        }
    }, [jobData]);

    return (
        <div className="fP">
            {windowWidth >= 1280 && (
                <div className="frontPageContainer">
                    <Main
                        connectionLoading={connectionLoading}
                        connection={connection}
                        loadingProfessionData={loadingProfessionData}
                        loadingJobData={loadingJobData}
                        loadingTechnologiesData={loadingTechnologiesData}
                        showFrontEnd={showFrontEnd}
                        showBackEnd={showBackEnd}
                        professionData={professionData}
                        jobData={jobData}
                        techFe={technologiesFe}
                        techBe={technologiesBe}
                    />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="frontPageContainerMobile">
                    <MainMobile
                        connectionLoading={connectionLoading}
                        connection={connection}
                        loadingProfessionData={loadingProfessionData}
                        loadingJobData={loadingJobData}
                        loadingTechnologiesData={loadingTechnologiesData}
                        showFrontEnd={showFrontEnd}
                        showBackEnd={showBackEnd}
                        professionData={professionData}
                        jobData={jobData}
                        techFe={technologiesFe}
                        techBe={technologiesBe}
                    />
                </div>
            )}
        </div>
    );
}

function Main({ connectionLoading, connection, loadingProfessionData, loadingJobData, loadingTechnologiesData, showFrontEnd, showBackEnd, professionData, jobData, techFe, techBe }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const navigate = useNavigate();

    const words = ["videos", "profile", "projects"];
    const colors = ["videosColor", "profileColor", "projectsColor"];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const words = document.querySelectorAll(".word");

        const rotateText = () => {
            const maxWordIndex = words.length - 1;
            const currentWord = words[currentWordIndex];
            const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

            //Rotate out letters of current word:
            Array.from(currentWord.children).forEach((letter, i) => {
                setTimeout(() => {
                    letter.className = "letter out";
                }, i * 80);
            });

            //Reveal and rotate in letters of next word:
            nextWord.style.opacity = "1";
            Array.from(nextWord.children).forEach((letter, i) => {
                letter.className = "letter behind";
                setTimeout(
                    () => {
                        letter.className = "letter in";
                    },
                    340 + i * 80
                );
            });
        };

        rotateText();
    }, [currentWordIndex]);

    useEffect(() => {
        //Set the CSS variable for profile color:
        document.documentElement.style.setProperty("--profile-color", info.profile.color);
    }, [info.profile.color]);

    useEffect(() => {
        //Set the CSS variable for projects color:
        document.documentElement.style.setProperty("--projects-color", info.projects.color);
    }, [info.projects.color]);

    useEffect(() => {
        //Set the CSS variable for videos color:
        document.documentElement.style.setProperty("--videos-color", info.videos.color);
    }, [info.videos.color]);

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
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
            <section className="heroSection">
                <AnimatePresence>
                    <motion.div className="heroTitle" key="heroT" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <div className="hTWelcome1">
                            <h3 className="hTW1text">
                                Hi, 👋 I'm <span style={{ color: "green" }}>{info.profile.name}</span>
                            </h3>
                        </div>
                        <div className="hTWelcome2">
                            {info.api.enabled ? (
                                (professionData?.professionStatus?.profession && !loadingProfessionData) || (jobData?.jobStatus?.job && !loadingJobData) ? (
                                    <p className="hTW2text">
                                        I'm a{" "}
                                        <span style={{ color: "green" }}>{jobData?.jobStatus?.employed ? jobData?.jobStatus?.job + " 👨‍💻" : professionData?.professionStatus?.profession + " 👨‍💻"}</span>
                                    </p>
                                ) : loadingProfessionData ? (
                                    <motion.div className="loadingProfessionTitle" key="loadingprofessiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfessionTitle" />
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        className="hTW2text"
                                        style={{
                                            backgroundColor: "transparent",
                                            backdropFilter: "blur(15px)",
                                            color: "red",
                                            height: "fit-content",
                                            width: "fit-content",
                                            border: "1px solid red",
                                            borderRadius: "5px",
                                            padding: "5px",
                                            animation: "none",
                                        }}
                                        key="htw2textfail"
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : !loadingProfessionData || !loadingJobData ? (
                                <p className="hTW2text">
                                    I'm a <span style={{ color: "green" }}>{info.profile.employed ? info.profile.job + " 👨‍💻" : info.profile.profession + " 👨‍💻"}</span>
                                </p>
                            ) : (
                                <motion.div className="loadingProfessionTitle" key="loadingprofessiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionTitle" />
                                </motion.div>
                            )}
                        </div>
                        <div className="hTWelcome3">
                            <h3>Welcome to the MatrixZone</h3>
                        </div>
                    </motion.div>
                    <div className="heroRotatingTextContainer">
                        <div className="rotating-text">
                            <p>Check out my</p>
                            <p>
                                {words.map((word, index) => (
                                    <span key={index} className={`word ${index === 0 ? "active" : ""} ${colors[index]}`}>
                                        {word.split("").map((letter, i) => (
                                            <span key={i} className="letter">
                                                {letter}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <motion.div className="heroContent" key="heroC" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                        <motion.div
                            className="heroContent1"
                            style={{ "--profile-color": info.profile.color, backgroundColor: info.profile.color }}
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
                                    <h3 style={{ color: info.profile.color }}>View my profile</h3>
                                    <div className="logoProfile" />
                                </div>
                                <div className="contentProfile" style={{ backgroundColor: info.profile.color }}>
                                    <p>- About me.</p>
                                    <p>- My educational background.</p>
                                    <p>- My experience.</p>
                                    <p>- My skills.</p>
                                </div>
                            </div>
                            <div className="hC1-2" />
                        </motion.div>
                        <motion.div
                            className="heroContent2"
                            style={{ "--projects-color": info.projects.color, backgroundColor: info.projects.color }}
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
                                    <h3 style={{ color: info.projects.color }}>View my projects</h3>
                                    <div className="logoProjects" />
                                </div>
                                <div className="contentProjects" style={{ backgroundColor: info.projects.color }}>
                                    <p>- About my projects.</p>
                                    <p>- My portfolio.</p>
                                    <p>- My pinned projects.</p>
                                    <p>- My projects.</p>
                                </div>
                            </div>
                            <div className="hC2-2" />
                        </motion.div>
                        <motion.div
                            className="heroContent3"
                            style={{ "--videos-color": info.videos.color, backgroundColor: info.videos.color }}
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
                                    <h3 style={{ color: info.videos.color }}>View my videos</h3>
                                    <div className="logoVideos" />
                                </div>
                                <div className="contentVideos" style={{ backgroundColor: info.videos.color }}>
                                    <p>- About my videos.</p>
                                    <p>- My videos.</p>
                                </div>
                            </div>
                            <div className="hC3-2" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </section>
            <section className="professionSection">
                <div className="profession">
                    <div className="professionTitle">
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.h3 key="professionsectiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle + " at " : professionData?.professionStatus?.profession}
                                    <span
                                        style={{
                                            color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                        }}
                                    >
                                        {jobData?.jobStatus?.employed ? jobData?.jobStatus?.company : ""}
                                    </span>
                                    {!jobData?.jobStatus?.employed ? (
                                        <>
                                            <span style={{ color: "green", fontStyle: "norman" }}>{" ("}</span>
                                            <span style={{ color: "green" }}>{"Looking for work"}</span>
                                            <span style={{ color: "green", fontStyle: "norman" }}>{") "}</span>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <span title={jobData?.jobStatus?.employed ? "Currently employed" : "Currently unemployed"} style={{ fontStyle: "normal", cursor: "default", textShadow: "none" }}>
                                        {jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? " 💼" : " 📋"}
                                    </span>
                                </motion.h3>
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfessionOrJobTitle" key="loadingprofessionorjobtitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionOrJobTitle" />
                                </motion.div>
                            ) : (
                                <motion.h3
                                    style={{
                                        backgroundColor: "transparent",
                                        backdropFilter: "blur(15px)",
                                        color: "red",
                                        height: "fit-content",
                                        width: "fit-content",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        animation: "none",
                                    }}
                                    key="professionorjobdatafail"
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    NO DATA!
                                </motion.h3>
                            )
                        ) : loadingProfessionData || loadingJobData ? (
                            <motion.div className="loadingProfessionOrJobTitle" key="loadingprofessionorjobtitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionOrJobTitle" />
                            </motion.div>
                        ) : (
                            <motion.h3 key="professionsectiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " : info.profile.profession}
                                <span
                                    style={{
                                        color: info.profile.jobTitle && info.profile.company ? info.profile.companyColor : "green",
                                    }}
                                >
                                    {info.profile.jobTitle && info.profile.company ? info.profile.company : ""}
                                </span>
                                {!info.profile.jobTitle || !info.profile.company ? (
                                    <>
                                        <span style={{ color: "green", fontStyle: "norman" }}>{" ("}</span>
                                        <span style={{ color: "green" }}>{"Looking for work"}</span>
                                        <span style={{ color: "green", fontStyle: "norman" }}>{") "}</span>
                                    </>
                                ) : (
                                    ""
                                )}
                                <span
                                    title={info.profile.jobTitle && info.profile.company ? "Currently employed" : "Currently unemployed"}
                                    style={{ fontStyle: "normal", cursor: "default", textShadow: "none" }}
                                >
                                    {info.profile.jobTitle && info.profile.company ? " 💼" : " 📋"}
                                </span>
                            </motion.h3>
                        )}
                    </div>
                    <div className="professionContent">
                        {professionData && !loadingProfessionData && (
                            <>
                                <motion.div
                                    className="professionContentBox1"
                                    style={{ display: info.api.enabled && !professionData?.professionStatus && "none" }}
                                    key="professioncontentbox1"
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {info.api.enabled ? (
                                        <p>
                                            {jobData?.jobStatus?.employed ? "Currently working as a " + jobData?.jobStatus?.jobTitle + " at " : "Currently looking for work as a "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.company : professionData?.professionStatus?.profession}
                                            </span>
                                            .
                                            <br />
                                            <br />I use technologies such as{" "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStack : professionData?.professionStatus?.professionTechStack}
                                            </span>
                                            .
                                            <br />
                                            <br />I also use tools such as{" "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobAdditionalTech : professionData?.professionStatus?.professionAdditionalTech}
                                            </span>
                                            .
                                        </p>
                                    ) : (
                                        <p>
                                            {info.profile.employed ? "Currently working as a " + info.profile.jobTitle + " at " : "Currently looking for work as a "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.company : info.profile.profession}
                                            </span>
                                            .
                                            <br />
                                            <br />I use technologies such as{" "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.jobTechStack : info.profile.professionTechStack}
                                            </span>
                                            .
                                            <br />
                                            <br />I also use tools such as{" "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.jobAdditionalTech : info.profile.professionAdditionalTech}
                                            </span>
                                            .
                                        </p>
                                    )}
                                </motion.div>
                                {info.api.enabled
                                    ? jobData?.jobStatus?.employed && (
                                          <div
                                              className="professionContentBox2"
                                              style={{
                                                  "--company-color": jobData?.jobStatus?.companyColor,
                                                  backgroundImage: `url(${jobData?.jobStatus?.companyLogo})`,
                                                  height: jobData?.jobStatus?.companyLogoH,
                                                  width: jobData?.jobStatus?.companyLogoW,
                                                  cursor: "pointer",
                                              }}
                                              onClick={() => window.open(jobData?.jobStatus?.companyInfoLink, "_blank")}
                                          />
                                      )
                                    : info.profile.employed && (
                                          <div
                                              className="professionContentBox2"
                                              style={{
                                                  "--company-color": info.profile.companyColor,
                                                  backgroundImage: `url(${info.profile.companyLogo})`,
                                                  height: info.profile.companyLogoH,
                                                  width: info.profile.companyLogoW,
                                                  cursor: "pointer",
                                              }}
                                              onClick={() => window.open(info.profile.companyInfoLink, "_blank")}
                                          />
                                      )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <section className="technologySection">
                <div className="technology">
                    <div className="technologyTitle">
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.h3 key="technologysectiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTech : professionData?.professionStatus?.professionTech}
                                    {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobDetailed ? (
                                        <>
                                            <span style={{ color: jobData?.jobStatus?.companyColor, fontStyle: "normal" }}>{" ("}</span>
                                            <span style={{ color: jobData?.jobStatus?.companyColor }}>{jobData.jobStatus.jobDetailed}</span>
                                            <span style={{ color: jobData?.jobStatus?.companyColor, fontStyle: "normal" }}>{") "}</span>
                                        </>
                                    ) : (
                                        !jobData?.jobStatus?.employed &&
                                        professionData?.professionStatus?.professionDetailed && (
                                            <>
                                                <span style={{ color: "green", fontStyle: "normal" }}>{" ("}</span>
                                                <span style={{ color: "green" }}>{professionData.professionStatus.professionDetailed}</span>
                                                <span style={{ color: "green", fontStyle: "normal" }}>{") "}</span>
                                            </>
                                        )
                                    )}
                                </motion.h3>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionTitleTech" key="loadingprofessiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionTitleTech" />
                                </motion.div>
                            ) : (
                                <motion.h3
                                    style={{
                                        backgroundColor: "transparent",
                                        backdropFilter: "blur(15px)",
                                        color: "red",
                                        height: "fit-content",
                                        width: "fit-content",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        animation: "none",
                                    }}
                                    key="professiondatafail"
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    NO DATA!
                                </motion.h3>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionTitleTech" key="loadingprofessiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionTitleTech" />
                            </motion.div>
                        ) : (
                            <motion.h3 key="technologysectiontitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.profile.employed ? info.profile.jobTech : info.profile.professionTech}
                                {info.profile.employed && info.profile.jobDetailed ? (
                                    <>
                                        <span style={{ color: info.profile.companyColor, fontStyle: "normal" }}>{" ("}</span>
                                        <span style={{ color: info.profile.companyColor }}>{info.profile.jobDetailed}</span>
                                        <span style={{ color: info.profile.companyColor, fontStyle: "normal" }}>{") "}</span>
                                    </>
                                ) : (
                                    !info.profile.employed &&
                                    info.profile.professionDetailed && (
                                        <>
                                            <span style={{ color: "green", fontStyle: "normal" }}>{" ("}</span>
                                            <span style={{ color: "green" }}>{info.profile.professionDetailed}</span>
                                            <span style={{ color: "green", fontStyle: "normal" }}>{") "}</span>
                                        </>
                                    )
                                )}
                            </motion.h3>
                        )}
                    </div>
                    <div className="technologyContent">
                        {showFrontEnd && (
                            <div
                                className="technologyContentBox1"
                                style={
                                    info.api.enabled
                                        ? { border: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                        : { border: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                }
                            >
                                <div
                                    className="tCB1Title"
                                    style={
                                        info.api.enabled
                                            ? { borderBottom: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                            : { borderBottom: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                    }
                                >
                                    <div className="tCB1T1">
                                        <h4
                                            style={
                                                info.api.enabled
                                                    ? { color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "#03a062" }
                                                    : { color: info.profile.employed ? info.profile.companyColor : "#03a062" }
                                            }
                                        >
                                            Front-end tech stack
                                        </h4>
                                    </div>
                                    {info.api.enabled ? (
                                        <div className="tCB1T2" style={{ backgroundImage: jobData?.jobStatus?.employed && `url(${jobData?.jobStatus?.companyLogo})` }} />
                                    ) : (
                                        <div className="tCB1T2" style={{ backgroundImage: info.profile.employed && `url(${info.profile.companyLogo})` }} />
                                    )}
                                </div>
                                <div className="tCB1Content">
                                    <AnimatePresence>
                                        {techFe.length > 0 && !loadingTechnologiesData ? (
                                            techFe.map((tech, index) => (
                                                <motion.a
                                                    className="tech"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
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
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechData" key="loadingtechdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div
                                                    className="loaderTech"
                                                    style={
                                                        info.api.enabled
                                                            ? { borderTop: jobData?.jobStatus?.employed ? `16px solid ${jobData?.jobStatus?.companyColor}` : "16px solid #03a062" }
                                                            : { borderTop: info.profile.employed ? `16px solid ${info.profile.companyColor}` : "16px solid #03a062" }
                                                    }
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechData" key="notechdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                        {showBackEnd && (
                            <div
                                className="technologyContentBox2"
                                style={
                                    info.api.enabled
                                        ? showFrontEnd && showBackEnd
                                            ? loadingTechnologiesData
                                                ? { border: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062", bottom: "332px", left: "600px" }
                                                : { border: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062", bottom: "308px", left: "600px" }
                                            : { top: "30px" }
                                        : showFrontEnd && showBackEnd
                                        ? loadingTechnologiesData
                                            ? { border: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062", bottom: "332px", left: "600px" }
                                            : { border: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062", bottom: "308px", left: "600px" }
                                        : { top: "30px" }
                                }
                            >
                                <div
                                    className="tCB2Title"
                                    style={
                                        info.api.enabled
                                            ? { borderBottom: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                            : { borderBottom: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                    }
                                >
                                    <div className="tCB2T1">
                                        <h4
                                            style={
                                                info.api.enabled
                                                    ? { color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "#03a062" }
                                                    : { color: info.profile.employed ? info.profile.companyColor : "#03a062" }
                                            }
                                        >
                                            Back-end tech stack
                                        </h4>
                                    </div>
                                    {info.api.enabled ? (
                                        <div className="tCB2T2" style={{ backgroundImage: jobData?.jobStatus?.employed && `url(${jobData?.jobStatus?.companyLogo})` }} />
                                    ) : (
                                        <div className="tCB2T2" style={{ backgroundImage: info.profile.employed && `url(${info.profile.companyLogo})` }} />
                                    )}
                                </div>
                                <div className="tCB2Content">
                                    <AnimatePresence>
                                        {techBe.length > 0 && !loadingTechnologiesData ? (
                                            techBe.map((tech, index) => (
                                                <motion.a
                                                    className="tech"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
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
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechData" key="loadingtechdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div
                                                    className="loaderTech"
                                                    style={
                                                        info.api.enabled
                                                            ? { borderTop: jobData?.jobStatus?.employed ? `16px solid ${jobData?.jobStatus?.companyColor}` : "16px solid #03a062" }
                                                            : { borderTop: info.profile.employed ? `16px solid ${info.profile.companyColor}` : "16px solid #03a062" }
                                                    }
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechData" key="notechdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

//Mobile:
function MainMobile({ connectionLoading, connection, loadingProfessionData, loadingJobData, loadingTechnologiesData, showFrontEnd, showBackEnd, professionData, jobData, techFe, techBe }) {
    const navigate = useNavigate();

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
        <main className="mainMobile">
            {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
            <section className="heroSectionMobile">
                <AnimatePresence>
                    <motion.div className="heroTitleMobile" key="herotitlemobile" initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 1000 }}>
                        <div className="hTWelcome1Mobile">
                            <h3 className="hTW1textMobile">
                                Hi, 👋 I'm <span style={{ color: "green" }}>{info.profile.name}</span>
                            </h3>
                        </div>
                        <div className="hTWelcome2Mobile">
                            {info.api.enabled ? (
                                (professionData?.professionStatus?.profession && !loadingProfessionData) || (jobData?.jobStatus?.job && !loadingJobData) ? (
                                    <p className="hTW2textMobile">
                                        I'm a{" "}
                                        <span style={{ color: "green" }}>{jobData?.jobStatus?.employed ? jobData?.jobStatus?.job + " 👨‍💻" : professionData?.professionStatus?.profession + " 👨‍💻"}</span>
                                    </p>
                                ) : loadingProfessionData ? (
                                    <motion.div className="loadingProfessionTitleMobile" key="loadingprofessiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="loaderProfessionTitleMobile" />
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        className="hTW2textMobile"
                                        style={{
                                            backgroundColor: "transparent",
                                            backdropFilter: "blur(15px)",
                                            color: "red",
                                            height: "fit-content",
                                            width: "fit-content",
                                            border: "1px solid red",
                                            borderRadius: "5px",
                                            padding: "5px",
                                            animation: "none",
                                        }}
                                        key="htw2textfailmobile"
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        NO DATA!
                                    </motion.p>
                                )
                            ) : !loadingProfessionData || !loadingJobData ? (
                                <p className="hTW2textMobile">
                                    I'm a <span style={{ color: "green" }}>{info.profile.employed ? info.profile.job + " 👨‍💻" : info.profile.profession + " 👨‍💻"}</span>
                                </p>
                            ) : (
                                <motion.div className="loadingProfessionTitleMobile" key="loadingprofessiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionTitleMobile" />
                                </motion.div>
                            )}
                        </div>
                        <div className="hTWelcome3Mobile">
                            <h3>Welcome to the MatrixZone</h3>
                        </div>
                    </motion.div>
                    <motion.div className="heroContentMobile" key="herocontentmobile" initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -1000 }}>
                        <motion.div
                            className="heroContent1Mobile"
                            style={{ "--profile-color": info.profile.color, backgroundColor: info.profile.color }}
                            onClick={() => handleNavigation("profile")}
                            key="herocontent1mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-1TM">PROFILE</h2>
                            <div className="hC1-1M">
                                <div className="titleProfileMobile">
                                    <h3 style={{ color: info.profile.color }}>View my profile</h3>
                                    <div className="logoProfileMobile" />
                                </div>
                                <div className="contentProfileMobile" style={{ backgroundColor: info.profile.color }}>
                                    <p>- About me.</p>
                                    <p>- My educational background.</p>
                                    <p>- My experience.</p>
                                    <p>- My skills.</p>
                                </div>
                            </div>
                            <div className="hC1-2M" />
                        </motion.div>
                        <motion.div
                            className="heroContent2Mobile"
                            style={{ "--projects-color": info.projects.color, backgroundColor: info.projects.color }}
                            onClick={() => handleNavigation("projects")}
                            key="herocontent2mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-2TM">PROJECTS</h2>
                            <div className="hC2-1M">
                                <div className="titleProjectsMobile">
                                    <h3 style={{ color: info.projects.color }}>View my projects</h3>
                                    <div className="logoProjectsMobile" />
                                </div>
                                <div className="contentProjectsMobile" style={{ backgroundColor: info.projects.color }}>
                                    <p>- About my projects.</p>
                                    <p>- My portfolio.</p>
                                    <p>- My pinned projects.</p>
                                    <p>- My projects.</p>
                                </div>
                            </div>
                            <div className="hC2-2M" />
                        </motion.div>
                        <motion.div
                            className="heroContent3Mobile"
                            style={{ "--videos-color": info.videos.color, backgroundColor: info.videos.color }}
                            onClick={() => handleNavigation("videos")}
                            key="herocontent3mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <h2 className="hC-3TM">VIDEOS</h2>
                            <div className="hC3-1M">
                                <div className="titleVideosMobile">
                                    <h3 style={{ color: info.videos.color }}>View my videos</h3>
                                    <div className="logoVideosMobile" />
                                </div>
                                <div className="contentVideosMobile" style={{ backgroundColor: info.videos.color }}>
                                    <p>- About my videos.</p>
                                    <p>- My videos.</p>
                                </div>
                            </div>
                            <div className="hC3-2M" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </section>
            <section className="professionSectionMobile">
                <div className="professionMobile">
                    <div className="professionTitleMobile">
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.h3 key="professionsectiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle + " at " : professionData?.professionStatus?.profession}
                                    <span
                                        style={{
                                            color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                        }}
                                    >
                                        {jobData?.jobStatus?.employed ? jobData?.jobStatus?.company : ""}
                                    </span>
                                    {!jobData?.jobStatus?.employed ? (
                                        <>
                                            <span style={{ color: "green", fontStyle: "norman" }}>{" ("}</span>
                                            <span style={{ color: "green" }}>{"Looking for work"}</span>
                                            <span style={{ color: "green", fontStyle: "norman" }}>{") "}</span>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <span title={jobData?.jobStatus?.employed ? "Currently employed" : "Currently unemployed"} style={{ fontStyle: "normal", cursor: "default", textShadow: "none" }}>
                                        {jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? " 💼" : " 📋"}
                                    </span>
                                </motion.h3>
                            ) : loadingProfessionData || loadingJobData ? (
                                <motion.div className="loadingProfessionOrJobTitleMobile" key="loadingprofessionorjobtitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionOrJobTitleMobile" />
                                </motion.div>
                            ) : (
                                <motion.h3
                                    style={{
                                        backgroundColor: "transparent",
                                        backdropFilter: "blur(15px)",
                                        color: "red",
                                        height: "fit-content",
                                        width: "fit-content",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        animation: "none",
                                    }}
                                    key="professionorjobdatafailmobile"
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    NO DATA!
                                </motion.h3>
                            )
                        ) : loadingProfessionData || loadingJobData ? (
                            <motion.div className="loadingProfessionOrJobTitleMobile" key="loadingprofessionorjobtitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionOrJobTitleMobile" />
                            </motion.div>
                        ) : (
                            <motion.h3 key="professionsectiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.profile.jobTitle && info.profile.company ? info.profile.jobTitle + " at " : info.profile.profession}
                                <span
                                    style={{
                                        color: info.profile.jobTitle && info.profile.company ? info.profile.companyColor : "green",
                                    }}
                                >
                                    {info.profile.jobTitle && info.profile.company ? info.profile.company : ""}
                                </span>
                                {!info.profile.jobTitle || !info.profile.company ? (
                                    <>
                                        <span style={{ color: "green", fontStyle: "norman" }}>{" ("}</span>
                                        <span style={{ color: "green" }}>{"Looking for work"}</span>
                                        <span style={{ color: "green", fontStyle: "norman" }}>{") "}</span>
                                    </>
                                ) : (
                                    ""
                                )}
                                <span
                                    title={info.profile.jobTitle && info.profile.company ? "Currently employed" : "Currently unemployed"}
                                    style={{ fontStyle: "normal", cursor: "default", textShadow: "none" }}
                                >
                                    {info.profile.jobTitle && info.profile.company ? " 💼" : " 📋"}
                                </span>
                            </motion.h3>
                        )}
                    </div>
                    <div className="professionContentMobile">
                        {professionData && !loadingProfessionData && (
                            <>
                                <motion.div
                                    className="professionContentBox1Mobile"
                                    style={{ display: info.api.enabled && !professionData?.professionStatus && "none" }}
                                    key="professioncontentbox1mobile"
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {info.api.enabled ? (
                                        <p>
                                            {jobData?.jobStatus?.employed ? "Currently working as a " + jobData?.jobStatus?.jobTitle + " at " : "Currently looking for work as a "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.company : professionData?.professionStatus?.profession}
                                            </span>
                                            .
                                            <br />
                                            <br />I use technologies such as{" "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTechStack : professionData?.professionStatus?.professionTechStack}
                                            </span>
                                            .
                                            <br />
                                            <br />I also use tools such as{" "}
                                            <span
                                                style={{
                                                    color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "green",
                                                }}
                                            >
                                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobAdditionalTech : professionData?.professionStatus?.professionAdditionalTech}
                                            </span>
                                            .
                                        </p>
                                    ) : (
                                        <p>
                                            {info.profile.employed ? "Currently working as a " + info.profile.jobTitle + " at " : "Currently looking for work as a "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.company : info.profile.profession}
                                            </span>
                                            .
                                            <br />
                                            <br />I use technologies such as{" "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.jobTechStack : info.profile.professionTechStack}
                                            </span>
                                            .
                                            <br />
                                            <br />I also use tools such as{" "}
                                            <span
                                                style={{
                                                    color: info.profile.employed ? info.profile.companyColor : "green",
                                                }}
                                            >
                                                {info.profile.employed ? info.profile.jobAdditionalTech : info.profile.professionAdditionalTech}
                                            </span>
                                            .
                                        </p>
                                    )}
                                </motion.div>
                                {info.api.enabled
                                    ? jobData?.jobStatus?.employed && (
                                          <div
                                              className="professionContentBox2Mobile"
                                              style={{
                                                  "--company-color": jobData?.jobStatus?.companyColor,
                                                  backgroundImage: `url(${jobData?.jobStatus?.companyLogo})`,
                                                  height: jobData?.jobStatus?.companyLogoH / 2,
                                                  width: jobData?.jobStatus?.companyLogoW / 2,
                                                  cursor: "pointer",
                                              }}
                                              onClick={() => window.open(jobData?.jobStatus?.companyInfoLink, "_blank")}
                                          />
                                      )
                                    : info.profile.employed && (
                                          <div
                                              className="professionContentBox2Mobile"
                                              style={{
                                                  "--company-color": info.profile.companyColor,
                                                  backgroundImage: `url(${info.profile.companyLogo})`,
                                                  cursor: "pointer",
                                              }}
                                              onClick={() => window.open(info.profile.companyInfoLink, "_blank")}
                                          />
                                      )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <section className="technologySectionMobile">
                <div className="technologyMobile">
                    <div className="technologyTitleMobile">
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.h3 key="technologysectiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTech : professionData?.professionStatus?.professionTech}
                                    {jobData?.jobStatus?.employed && jobData?.jobStatus?.jobDetailed ? (
                                        <>
                                            <span style={{ color: jobData?.jobStatus?.companyColor, fontStyle: "normal" }}>{" ("}</span>
                                            <span style={{ color: jobData?.jobStatus?.companyColor }}>{jobData.jobStatus.jobDetailed}</span>
                                            <span style={{ color: jobData?.jobStatus?.companyColor, fontStyle: "normal" }}>{") "}</span>
                                        </>
                                    ) : (
                                        !jobData?.jobStatus?.employed &&
                                        professionData?.professionStatus?.professionDetailed && (
                                            <>
                                                <span style={{ color: "green", fontStyle: "normal" }}>{" ("}</span>
                                                <span style={{ color: "green" }}>{professionData.professionStatus.professionDetailed}</span>
                                                <span style={{ color: "green", fontStyle: "normal" }}>{") "}</span>
                                            </>
                                        )
                                    )}
                                </motion.h3>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionTitleTechMobile" key="loadingprofessiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionTitleTechMobile" />
                                </motion.div>
                            ) : (
                                <motion.h3
                                    style={{
                                        backgroundColor: "transparent",
                                        backdropFilter: "blur(15px)",
                                        color: "red",
                                        height: "fit-content",
                                        width: "fit-content",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        animation: "none",
                                    }}
                                    key="professiondatafailmobile"
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    NO DATA!
                                </motion.h3>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionTitleTechMobile" key="loadingprofessiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionTitleTechMobile" />
                            </motion.div>
                        ) : (
                            <motion.h3 key="technologysectiontitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.profile.employed ? info.profile.jobTech : info.profile.professionTech}
                                {info.profile.employed && info.profile.jobDetailed ? (
                                    <>
                                        <span style={{ color: info.profile.companyColor, fontStyle: "normal" }}>{" ("}</span>
                                        <span style={{ color: info.profile.companyColor }}>{info.profile.jobDetailed}</span>
                                        <span style={{ color: info.profile.companyColor, fontStyle: "normal" }}>{") "}</span>
                                    </>
                                ) : (
                                    !info.profile.employed &&
                                    info.profile.professionDetailed && (
                                        <>
                                            <span style={{ color: "green", fontStyle: "normal" }}>{" ("}</span>
                                            <span style={{ color: "green" }}>{info.profile.professionDetailed}</span>
                                            <span style={{ color: "green", fontStyle: "normal" }}>{") "}</span>
                                        </>
                                    )
                                )}
                            </motion.h3>
                        )}
                    </div>
                    <div className="technologyContentMobile">
                        {showFrontEnd && (
                            <div
                                className="technologyContentBox1Mobile"
                                style={
                                    showFrontEnd && !showBackEnd
                                        ? {
                                              border: info.api.enabled
                                                  ? jobData?.jobStatus?.employed
                                                      ? `1px solid ${jobData?.jobStatus?.companyColor}`
                                                      : "1px solid #03a062"
                                                  : info.profile.employed
                                                  ? `1px solid ${info.profile.companyColor}`
                                                  : "1px solid #03a062",
                                              marginRight: "150px",
                                          }
                                        : { marginRight: "0px" }
                                }
                            >
                                <div
                                    className="tCB1TitleMobile"
                                    style={
                                        info.api.enabled
                                            ? { border: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                            : { border: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                    }
                                >
                                    <div className="tCB1T1M">
                                        <h4
                                            style={
                                                info.api.enabled
                                                    ? { color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "#03a062" }
                                                    : { color: info.profile.employed ? info.profile.companyColor : "#03a062" }
                                            }
                                        >
                                            Front-end tech stack
                                        </h4>
                                    </div>
                                    {info.api.enabled ? (
                                        <div className="tCB1T2M" style={{ backgroundImage: jobData?.jobStatus?.employed && `url(${jobData?.jobStatus?.companyLogo})` }} />
                                    ) : (
                                        <div className="tCB1T2M" style={{ backgroundImage: info.profile.employed && `url(${info.profile.companyLogo})` }} />
                                    )}
                                </div>
                                <div className="tCB1ContentMobile">
                                    <AnimatePresence>
                                        {techFe.length > 0 && !loadingTechnologiesData ? (
                                            techFe.map((tech, index) => (
                                                <motion.a
                                                    className="techMobile"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="techTitleMobile">
                                                        <h5 style={{ color: tech.color }}>{tech.name}</h5>
                                                    </div>
                                                    <div className="techLogoMobile" style={{ backgroundImage: `url(${tech.image})`, backgroundSize: tech.size }} />
                                                </motion.a>
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechDataMobile" key="loadingtechdatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div
                                                    className="loaderTechMobile"
                                                    style={
                                                        info.api.enabled
                                                            ? { borderTop: jobData?.jobStatus?.employed ? `4px solid ${jobData?.jobStatus?.companyColor}` : "4px solid #03a062" }
                                                            : { borderTop: info.profile.employed ? `4px solid ${info.profile.companyColor}` : "4px solid #03a062" }
                                                    }
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechDataMobile" key="notechdatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                        {showBackEnd && (
                            <div
                                className="technologyContentBox2Mobile"
                                style={
                                    info.api.enabled
                                        ? { borderBottom: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                        : { borderBottom: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                }
                            >
                                <div
                                    className="tCB2TitleMobile"
                                    style={
                                        info.api.enabled
                                            ? { border: jobData?.jobStatus?.employed ? `1px solid ${jobData?.jobStatus?.companyColor}` : "1px solid #03a062" }
                                            : { border: info.profile.employed ? `1px solid ${info.profile.companyColor}` : "1px solid #03a062" }
                                    }
                                >
                                    <div className="tCB2T1M">
                                        <h4
                                            style={
                                                info.api.enabled
                                                    ? { color: jobData?.jobStatus?.employed ? jobData?.jobStatus?.companyColor : "#03a062" }
                                                    : { color: info.profile.employed ? info.profile.companyColor : "#03a062" }
                                            }
                                        >
                                            Back-end tech stack
                                        </h4>
                                    </div>
                                    {info.api.enabled ? (
                                        <div className="tCB2T2M" style={{ backgroundImage: jobData?.jobStatus?.employed && `url(${jobData?.jobStatus?.companyLogo})` }} />
                                    ) : (
                                        <div className="tCB2T2M" style={{ backgroundImage: info.profile.employed && `url(${info.profile.companyLogo})` }} />
                                    )}
                                </div>
                                <div className="tCB2ContentMobile">
                                    <AnimatePresence>
                                        {techBe.length > 0 && !loadingTechnologiesData ? (
                                            techBe.map((tech, index) => (
                                                <motion.a
                                                    className="techMobile"
                                                    key={index}
                                                    style={{ "--tech-color": tech.color, textDecoration: "none" }}
                                                    href={tech.infoLink}
                                                    target="_blank"
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="techTitleMobile">
                                                        <h5 style={{ color: tech.color }}>{tech.name}</h5>
                                                    </div>
                                                    <div className="techLogoMobile" style={{ backgroundImage: `url(${tech.image})`, backgroundSize: tech.size }} />
                                                </motion.a>
                                            ))
                                        ) : loadingTechnologiesData ? (
                                            <motion.div className="loadingTechDataMobile" key="loadingtechdatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                                <div
                                                    className="loaderTechMobile"
                                                    style={
                                                        info.api.enabled
                                                            ? { borderTop: jobData?.jobStatus?.employed ? `4px solid ${jobData?.jobStatus?.companyColor}` : "4px solid #03a062" }
                                                            : { borderTop: info.profile.employed ? `4px solid ${info.profile.companyColor}` : "4px solid #03a062" }
                                                    }
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div className="noTechDataMobile" key="notechdatamobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                                <h4>NO DATA!</h4>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default FrontPage;
