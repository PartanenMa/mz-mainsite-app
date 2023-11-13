import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./homePage.scss";

function HomePage() {
    return (
        <div className="hP">
            <div className="homePageContainer">
                <HomePageTitle />
                <FirstSection />
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

function FirstSection() {
    const ref = useRef();
    const navigate = useNavigate();

    const contentStyle = {
        height: "600px",
        lineHeight: "160px",
        textAlign: "center",
        overflow: "hidden",
    };

    return (
        <div className="firstSectionContainer">
            <section className="homeFirstSectionCarousel">
                <div className="carouselContainer">
                    <Carousel autoplay dots={false} effect="scroll" ref={ref}>
                        <div>
                            <div className="carouselSlide1" style={contentStyle}>
                                <div className="carouselItem1">
                                    <div className="nameAndJob">
                                        <h2 className="name">{info.LinkedIn.name}</h2>
                                        <h2 className="jobTitle">{info.LinkedIn.profession}</h2>
                                    </div>
                                    <div className="personalPhoto" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="carouselSlide2" style={contentStyle}>
                                <div className="carouselItem2" />
                            </div>
                        </div>
                        <div>
                            <div className="carouselSlide3" style={contentStyle}>
                                <div className="carouselItem3" />
                            </div>
                        </div>
                    </Carousel>
                </div>
                <AnimatePresence>
                    <motion.button
                        className="carouselButtonLeft"
                        onClick={() => {
                            ref.current.prev();
                        }}
                        key="carouselbuttonleft"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <p title="Previous" style={{ color: "#03A062", fontSize: 60, position: "relative", bottom: "45px" }}>
                            {"<"}
                        </p>
                    </motion.button>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.button
                        className="carouselButtonRight"
                        onClick={() => {
                            ref.current.next();
                        }}
                        key="carouselbuttonright"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <p title="Next" style={{ color: "#03A062", fontSize: 60, position: "relative", bottom: "45px" }}>
                            {">"}
                        </p>
                    </motion.button>
                </AnimatePresence>
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
                        <p>{info.LinkedIn.jobTitle && info.LinkedIn.company ? info.LinkedIn.jobTitle : info.LinkedIn.profession}</p>
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
        </div>
    );
}

export default HomePage;
