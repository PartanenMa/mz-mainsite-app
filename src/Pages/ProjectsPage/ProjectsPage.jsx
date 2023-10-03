import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.css";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(info.projectsData);
    }, []);

    return (
        <div className="ProjectsPageContainer">
            <ProjectsPageTitle />
            <AboutMyProjects />
            <Projects projects={projects} />
        </div>
    );
}

function ProjectsPageTitle() {
    return (
        <div className="ProjectsPageTitleContainer">
            <h2>PROJECTS</h2>
        </div>
    );
}

function AboutMyProjects() {
    return (
        <div className="AboutMyProjectsContainer">
            <div className="AboutMyProjectsTitle">
                <h3>ABOUT MY PROJECTS</h3>
            </div>
            <div className="AboutMyProjectsContent">
                <AnimatePresence>
                    <motion.a
                        className="AboutMyProjectsPhoto"
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
                <div className="AboutMyProjectsTextContainer">
                    <div className="AboutMyProjectsTextTitle">
                        <h4 className="h4_1">{info.GitHub.user}</h4>
                        <h4 className="h4_2">{info.LinkedIn.name}</h4>
                    </div>
                    <div className="AboutMyProjectsText">
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

function Projects({ projects }) {
    return (
        <div className="ProjectsContainer">
            <div className="ProjectsTitle">
                <h3>PROJECTS</h3>
            </div>
            <div className="ProjectsContent">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div className="Project" key={index}>
                            <div className="ProjectTitle">
                                <h4>{project.title}</h4>
                            </div>
                            <div className="ProjectContent">
                                <div className="ProjectContentDescription">
                                    <div className="PCDBox1">
                                        <p>
                                            Project type:{" "}
                                            <span style={{ color: "green", fontSize: "15px" }}>{project.type}</span>
                                        </p>
                                    </div>
                                    <div className="PCDBox2">
                                        <div className="PCDBox2Title">
                                            <p>Project description:</p>
                                        </div>
                                        <div className="PCDBox2Content">
                                            <p>{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="PCDBox3">
                                        <p>
                                            Technologies used:{" "}
                                            <span style={{ color: "green", fontSize: "15px" }}>{project.tech}</span>
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="ProjectContentPhoto"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="NoProjectsData">
                        <h4>NO DATA!</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectsPage;
