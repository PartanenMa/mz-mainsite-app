import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.scss";

function ProjectsPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setProjects(data.projectsData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="pJP">
            <div className="projectsPageContainer">
                <ProjectsPageTitle />
                <AboutMyProjects loadingData={loadingData} />
                <Projects loadingData={loadingData} projects={projects} />
            </div>
        </div>
    );
}

function ProjectsPageTitle() {
    return (
        <div className="projectsPageTitleContainer">
            <h2>PROJECTS</h2>
        </div>
    );
}

function AboutMyProjects({ loadingData }) {
    return (
        <div className="aboutMyProjectsContainer">
            <div className="aboutMyProjectsTitle">
                <h3>
                    ABOUT MY PROJECTS
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="aboutMyProjectsContent">
                <AnimatePresence>
                    <motion.a
                        className="aboutMyProjectsPhoto"
                        title="My GitHub"
                        href={info.GitHub.link}
                        target="_blank"
                        key="aboutmyprojectsphoto"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                </AnimatePresence>
                <div className="aboutMyProjectsTextContainer">
                    <div className="aboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.GitHub.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="aboutMyProjectsText">
                        <p>
                            {info.GitHub.description1}
                            <br />
                            <br />
                            {info.GitHub.description2}
                            <br />
                            <br />
                            {info.GitHub.description3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects({ loadingData, projects }) {
    return (
        <div className="projectsContainer">
            <div className="projectsTitle">
                <h3>
                    PROJECTS
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="projectsContent">
                <AnimatePresence>
                    {projects.length > 0 ? (
                        projects[0].title !== 0 ? (
                            projects.map((project, index) => (
                                <motion.a
                                    className="project"
                                    href={project.link}
                                    target="_blank"
                                    key={index}
                                    transition={{ delay: 0.5 }}
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.1 },
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="projectTitle">
                                        <h4>{project.title}</h4>
                                    </div>
                                    <div className="projectContent">
                                        <div className="projectContentDescription">
                                            <div className="pCDBox1">
                                                <p>
                                                    Project type: <span style={{ color: "white", fontSize: "15px" }}>{project.type}</span>
                                                </p>
                                            </div>
                                            <div className="pCDBox2">
                                                <div className="pCDBox2Title">
                                                    <p>Project description:</p>
                                                </div>
                                                <div className="pCDBox2Content">
                                                    <p>{project.description}</p>
                                                </div>
                                            </div>
                                            <div className="pCDBox3">
                                                <p>
                                                    Technologies used: <span style={{ color: "white", fontSize: "15px" }}>{project.tech}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="projectContentPhoto" style={{ backgroundImage: `url(${project.image})` }} />
                                    </div>
                                </motion.a>
                            ))
                        ) : (
                            <motion.div className="noProjectsYet" key="noprojectsyet" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                                <h4>NO PROJECTS YET!</h4>
                            </motion.div>
                        )
                    ) : loadingData ? (
                        <motion.div className="loadingProjectsData" key="loadingprojectsdata" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="loaderProjects" />
                        </motion.div>
                    ) : (
                        <motion.div className="noProjectsData" key="noprojectsdata" transition={{ delay: 0.5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
                            <h4>NO DATA!</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProjectsPage;
