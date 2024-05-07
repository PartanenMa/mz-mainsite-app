import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import Carousel from "/src/Components/Carousel/Carousel.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Carousel1 from "/src/Assets/Images/Carousel1.jpg";
import Carousel2 from "/src/Assets/Images/Carousel2.jpg";
import Carousel3 from "/src/Assets/Images/Carousel3.jpg";
import "./HomePage.scss";

function HomePage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getProfession();
            getJob();
        } else {
            setTimeout(() => {
                setLoadingProfessionData(false);
                setLoadingJobData(false);
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

    return (
        <div className="hP">
            <>
                {windowWidth >= 1280 && (
                    <div className="homePageContainer">
                        <HomePageTitle />
                        {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                        <FirstSection loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                    </div>
                )}
                {windowWidth < 1280 && (
                    <div className="homePageContainerMobile">
                        <HomePageTitleMobile />
                        {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                        <FirstSectionMobile loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                    </div>
                )}
            </>
        </div>
    );
}

function HomePageTitle() {
    return (
        <div className="homePageTitleContainer">
            <h2>HOME</h2>
        </div>
    );
}

function FirstSection({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

    return (
        <div className="firstSectionContainer">
            <section className="homeFirstSectionCarousel">
                <div className="carouselIntro">
                    <div className="cIC">
                        <h1 className="text-shadow"> -- MatrixZone -- </h1>
                        <div className="tags">
                            <p className="text-shadow">
                                <small>My personal website.</small>
                            </p>
                        </div>
                    </div>
                </div>
                <Carousel images={carouselImages} height={"550px"} width={"900px"} />
            </section>
            <section className="homeFirstSection1">
                <div className="checkMyProfile">
                    <h2>CHECK OUT MY PROFILE!</h2>
                </div>
                <div className="goToMyProfile">
                    <AnimatePresence>
                        <motion.a
                            className="photo"
                            title="My LinkedIn"
                            href={info.LinkedIn.link}
                            target="_blank"
                            key="photo"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="profileTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My LinkedIn"
                                href={info.LinkedIn.link}
                                target="_blank"
                                key="linkedinlogo"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>LinkedIn</h3>
                        <p>{info.LinkedIn.user}</p>
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.p key="professionorjobdatasuccess" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionData" key="loadingprofessiondata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionData" />
                                </motion.div>
                            ) : (
                                <motion.p style={{ color: "red" }} key="professionorjobdatafail" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    NO DATA!{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionData" key="loadingprofessiondata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionData" />
                            </motion.div>
                        ) : (
                            <motion.p key="professionorjobdatasuccess" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.LinkedIn.employed ? info.LinkedIn.jobTitle : info.LinkedIn.profession}
                            </motion.p>
                        )}
                        <AnimatePresence>
                            <motion.button
                                className="goToProfile"
                                onClick={() => navigate(info.routes.profilePage)}
                                key="gotoprofile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Profile
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box1" />
                </div>
            </section>
            <section className="homeFirstSection2">
                <div className="checkMyProjects">
                    <h2>CHECK OUT MY PROJECTS!</h2>
                </div>
                <div className="goToMyProjects">
                    <AnimatePresence>
                        <motion.a
                            className="gHLogo"
                            title="My GitHub"
                            href={info.GitHub.link}
                            target="_blank"
                            key="ghlogo1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="projectsTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My GitHub"
                                href={info.GitHub.link}
                                target="_blank"
                                key="ghlogo2"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>GitHub</h3>
                        <p>{info.GitHub.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToProjects"
                                onClick={() => navigate(info.routes.projectsPage)}
                                key="gotoprojects"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Projects
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box2" />
                </div>
            </section>
            <section className="homeFirstSection3">
                <div className="checkMyVideos">
                    <h2>CHECK OUT MY VIDEOS!</h2>
                </div>
                <div className="goToMyVideos">
                    <AnimatePresence>
                        <motion.a
                            className="yTLogo"
                            title="My YouTube"
                            href={info.YouTube.link}
                            target="_blank"
                            key="ytlogo1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="videosTextBox">
                        <AnimatePresence>
                            <motion.a
                                title="My YouTube"
                                href={info.YouTube.link}
                                target="_blank"
                                key="ytlogo2"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>YouTube</h3>
                        <p>{info.YouTube.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToVideos"
                                onClick={() => navigate(info.routes.videosPage)}
                                key="gotovideos"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Videos
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box3" />
                </div>
            </section>
            <section className="homeFirstSection4">
                <div className="checkMyGoals">
                    <h2>CHECK OUT MY GOALS!</h2>
                </div>
                <div className="goToMyGoals">
                    <AnimatePresence>
                        <motion.div
                            className="goalsLogo"
                            title="My goals"
                            onClick={() => navigate(info.routes.goalsPage)}
                            key="goalslogo1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="goalsTextBox">
                        <AnimatePresence>
                            <motion.div
                                className="myGoalsLogo"
                                title="My goals"
                                onClick={() => navigate(info.routes.goalsPage)}
                                key="goalslogo2"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My goals</h3>
                        <p>All of my goals.</p>
                        <p>Can be viewed.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToGoals"
                                onClick={() => navigate(info.routes.goalsPage)}
                                key="gotogoals"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Goals
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box4" />
                </div>
            </section>
            <section className="homeFirstSection5">
                <div className="checkMyCV">
                    <h2>CHECK OUT MY CV!</h2>
                </div>
                <div className="goToMyCV">
                    <AnimatePresence>
                        <motion.div
                            className="cvLogo"
                            title="My CV"
                            onClick={() => navigate(info.routes.cvPage)}
                            key="cvlogo1"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="cvTextBox">
                        <AnimatePresence>
                            <motion.div
                                className="myCVLogo"
                                title="My CV"
                                onClick={() => navigate(info.routes.cvPage)}
                                key="cvlogo2"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My CV</h3>
                        <p>My experience summed up.</p>
                        <p>Can be downloaded.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToCV"
                                onClick={() => navigate(info.routes.cvPage)}
                                key="gotocv"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                CV
                            </motion.button>
                        </AnimatePresence>
                    </div>
                    <div className="box5" />
                </div>
            </section>
        </div>
    );
}

//Mobile:
function HomePageTitleMobile() {
    return (
        <div className="homePageTitleContainerMobile">
            <h2>HOME</h2>
        </div>
    );
}

function FirstSectionMobile({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

    return (
        <div className="firstSectionContainerMobile">
            <section className="homeFirstSectionCarouselMobile">
                <Carousel images={carouselImages} height={"90%"} width={"90%"} />
            </section>
            <section className="homeFirstSection1Mobile">
                <div className="checkMyProfileMobile">
                    <h2>CHECK OUT MY PROFILE!</h2>
                </div>
                <div className="goToMyProfileMobile">
                    <AnimatePresence>
                        <motion.a
                            className="photoMobile"
                            title="My LinkedIn"
                            href={info.LinkedIn.link}
                            target="_blank"
                            key="photomobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="profileTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title="My LinkedIn"
                                href={info.LinkedIn.link}
                                target="_blank"
                                key="linkedinlogomobile"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>LinkedIn</h3>
                        <p>{info.LinkedIn.user}</p>
                        {info.api.enabled ? (
                            (professionData?.professionStatus && !loadingProfessionData) || (jobData?.jobStatus && !loadingJobData) ? (
                                <motion.p key="professionorjobdatasuccessmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    {jobData?.jobStatus?.employed ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            ) : loadingProfessionData ? (
                                <motion.div className="loadingProfessionDataMobile" key="loadingprofessiondatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="loaderProfessionDataMobile" />
                                </motion.div>
                            ) : (
                                <motion.p style={{ color: "red" }} key="professionorjobdatafailmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                    NO DATA!{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </motion.p>
                            )
                        ) : loadingProfessionData ? (
                            <motion.div className="loadingProfessionDataMobile" key="loadingprofessiondatamobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="loaderProfessionDataMobile" />
                            </motion.div>
                        ) : (
                            <motion.p key="professionorjobdatasuccessmobile" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                                {info.LinkedIn.employed ? info.LinkedIn.jobTitle : info.LinkedIn.profession}
                            </motion.p>
                        )}
                        <AnimatePresence>
                            <motion.button
                                className="goToProfileMobile"
                                onClick={() => navigate(info.routes.profilePage)}
                                key="gotoprofilemobile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Profile
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <section className="homeFirstSection2Mobile">
                <div className="checkMyProjectsMobile">
                    <h2>CHECK OUT MY PROJECTS!</h2>
                </div>
                <div className="goToMyProjectsMobile">
                    <AnimatePresence>
                        <motion.a
                            className="gHLogoMobile"
                            title="My GitHub"
                            href={info.GitHub.link}
                            target="_blank"
                            key="ghlogo1mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="projectsTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title="My GitHub"
                                href={info.GitHub.link}
                                target="_blank"
                                key="ghlogo2mobile"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>GitHub</h3>
                        <p>{info.GitHub.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToProjectsMobile"
                                onClick={() => navigate(info.routes.projectsPage)}
                                key="gotoprojectsmobile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Projects
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <section className="homeFirstSection3Mobile">
                <div className="checkMyVideosMobile">
                    <h2>CHECK OUT MY VIDEOS!</h2>
                </div>
                <div className="goToMyVideosMobile">
                    <AnimatePresence>
                        <motion.a
                            className="yTLogoMobile"
                            title="My YouTube"
                            href={info.YouTube.link}
                            target="_blank"
                            key="ytlogo1mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="videosTextBoxMobile">
                        <AnimatePresence>
                            <motion.a
                                title="My YouTube"
                                href={info.YouTube.link}
                                target="_blank"
                                key="ytlogo2mobile"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>YouTube</h3>
                        <p>{info.YouTube.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToVideosMobile"
                                onClick={() => navigate(info.routes.videosPage)}
                                key="gotovideosmobile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Videos
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <section className="homeFirstSection4Mobile">
                <div className="checkMyGoalsMobile">
                    <h2>CHECK OUT MY GOALS!</h2>
                </div>
                <div className="goToMyGoalsMobile">
                    <AnimatePresence>
                        <motion.div
                            className="goalsLogoMobile"
                            title="My goals"
                            onClick={() => navigate(info.routes.goalsPage)}
                            key="goalslogo1mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="goalsTextBoxMobile">
                        <AnimatePresence>
                            <motion.div
                                className="myGoalsLogoMobile"
                                title="My goals"
                                onClick={() => navigate(info.routes.goalsPage)}
                                key="goalslogo2mobile"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My goals</h3>
                        <p>All of my goals.</p>
                        <p>Can be viewed.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToGoalsMobile"
                                onClick={() => navigate(info.routes.goalsPage)}
                                key="gotogoalsmobile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Goals
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <section className="homeFirstSection5Mobile">
                <div className="checkMyCVMobile">
                    <h2>CHECK OUT MY CV!</h2>
                </div>
                <div className="goToMyCVMobile">
                    <AnimatePresence>
                        <motion.div
                            className="cvLogoMobile"
                            title="My CV"
                            onClick={() => navigate(info.routes.cvPage)}
                            key="cvlogo1mobile"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </AnimatePresence>
                    <div className="cvTextBoxMobile">
                        <AnimatePresence>
                            <motion.div
                                className="myCVLogoMobile"
                                title="My CV"
                                onClick={() => navigate(info.routes.cvPage)}
                                key="cvlogo2mobile"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </AnimatePresence>
                        <h3>My CV</h3>
                        <p>My experience summed up.</p>
                        <p>Can be downloaded.</p>
                        <AnimatePresence>
                            <motion.button
                                className="goToCVMobile"
                                onClick={() => navigate(info.routes.cvPage)}
                                key="gotocvmobile"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                CV
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
