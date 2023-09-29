import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="HP">
            <Header />
            <div className="HomePageContainer">
                <FirstSection />
            </div>
            <Footer />
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
        <div className="FirstSectionContainer">
            <section className="HomeFirstSectionCarousel">
                <div className="CarouselContainer">
                    <Carousel autoplay dots={false} effect="scroll" ref={ref}>
                        <div>
                            <div className="CarouselSlide1" style={contentStyle}>
                                <div className="CarouselItem1">
                                    <div className="NameAndJob">
                                        <h2 className="Name">{info.LinkedIn.name}</h2>
                                        <h2 className="JobTitle">{info.LinkedIn.profession}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="CarouselSlide2" style={contentStyle}>
                                <div className="CarouselItem2"></div>
                            </div>
                        </div>
                        <div>
                            <div className="CarouselSlide3" style={contentStyle}>
                                <div className="CarouselItem3"></div>
                            </div>
                        </div>
                    </Carousel>
                </div>
                <button
                    className="CarouselButtonLeft"
                    onClick={() => {
                        ref.current.prev();
                    }}
                >
                    <p
                        title="Previous"
                        style={{ color: "#03A062", fontSize: 60, position: "relative", bottom: "45px" }}
                    >
                        {"<"}
                    </p>
                </button>
                <button
                    className="CarouselButtonRight"
                    onClick={() => {
                        ref.current.next();
                    }}
                >
                    <p title="Next" style={{ color: "#03A062", fontSize: 60, position: "relative", bottom: "45px" }}>
                        {">"}
                    </p>
                </button>
            </section>
            <section className="HomeFirstSection1">
                <div className="CheckMyProfile">
                    <h2>CHECK OUT MY PROFILE!</h2>
                </div>
                <div className="GoToMyProfile">
                    <AnimatePresence>
                        <motion.a
                            className="Photo"
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
                    <div className="ProfileTextBox">
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
                            <h3>LinkedIn</h3>
                            <p>{info.LinkedIn.user}</p>
                            <p>{info.LinkedIn.jobTitle}</p>
                            <motion.button
                                className="GoToProfile"
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
                    <div className="Box1"></div>
                </div>
            </section>
            <section className="HomeFirstSection2">
                <div className="CheckMyProjects">
                    <h2>CHECK OUT MY PROJECTS!</h2>
                </div>
                <div className="GoToMyProjects">
                    <AnimatePresence>
                        <motion.a
                            className="GHLogo"
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
                    <div className="ProjectsTextBox">
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
                            <h3>GitHub</h3>
                            <p>{info.GitHub.user}</p>
                            <p>{info.LinkedIn.name}</p>
                            <motion.button
                                className="GoToProjects"
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
                    <div className="Box2"></div>
                </div>
            </section>
            <section className="HomeFirstSection3">
                <div className="CheckMyVideos">
                    <h2>CHECK OUT MY VIDEOS!</h2>
                </div>
                <div className="GoToMyVideos">
                    <AnimatePresence>
                        <motion.a
                            className="YTLogo"
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
                    <div className="VideosTextBox">
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
                            <h3>YouTube</h3>
                            <p>{info.YouTube.user}</p>
                            <p>{info.LinkedIn.name}</p>
                            <motion.button
                                className="GoToVideos"
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
                    <div className="Box3"></div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
