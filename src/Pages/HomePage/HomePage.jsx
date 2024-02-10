import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "/src/Components/Carousel/Carousel.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Carousel1 from "/src/Assets/Images/Carousel1.jpg";
import Carousel2 from "/src/Assets/Images/Carousel2.jpg";
import Carousel3 from "/src/Assets/Images/Carousel3.jpg";
import "./HomePage.scss";

function HomePage() {
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        if (info.api.enabled) {
            getProfession();
            getJob();
        }
    }, []);

    const getProfession = async () => {
        let statusCode;

        try {
            await fetch("/profession")
                .then((res) => {
                    statusCode = res.status;
                    return res.json();
                })
                .then((data) => {
                    setProfessionData(data);
                });
        } catch (error) {
            console.error("Error fetching profession data:", error);
            console.error("Status code:", statusCode);
        }
    };

    const getJob = async () => {
        let statusCode;

        try {
            await fetch("/job")
                .then((res) => {
                    statusCode = res.status;
                    return res.json();
                })
                .then((data) => {
                    setJobData(data);
                });
        } catch (error) {
            console.error("Error fetching job data:", error);
            console.error("Status code:", statusCode);
        }
    };

    return (
        <div className="hP">
            <div className="homePageContainer">
                <HomePageTitle />
                <FirstSection professionData={professionData} jobData={jobData} />
            </div>
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

function FirstSection({ professionData, jobData }) {
    const navigate = useNavigate();
    const carouselImages = [Carousel1, Carousel2, Carousel3];

    return (
        <div className="firstSectionContainer">
            <section className="homeFirstSectionCarousel">
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
                            professionData?.professionStatus || jobData?.jobStatus ? (
                                <p>{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}</p>
                            ) : (
                                <p style={{ color: "red" }}>
                                    API DISCONNECTED!{jobData?.jobStatus?.jobTitle && jobData?.jobStatus?.company ? jobData?.jobStatus?.jobTitle : professionData?.professionStatus?.profession}
                                </p>
                            )
                        ) : (
                            <p>{info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle : info.LinkedIn.profession}</p>
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

export default HomePage;
