import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectsPage.css";

function ProjectsPage() {
    return (
        <div className="ProjectsPageContainer">
            <ProjectsPageTitle />
            <AboutMyProjects />
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

export default ProjectsPage;
