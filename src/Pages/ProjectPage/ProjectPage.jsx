import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectPage.scss";

function ProjectPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            //setProjectData(data.projectsData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="pJPV">
            <div className="projectPageContainer">
                <ProjectPageTitle />
                <Description loadingData={loadingData} />
                <Project loadingData={loadingData} />
            </div>
        </div>
    );
}

function ProjectPageTitle() {
    return (
        <div className="projectPageTitleContainer">
            <h2>PROJECT NAME</h2>
        </div>
    );
}

function Description({ loadingData }) {
    return (
        <div className="projectDescriptionContainer">
            <div className="projectDescriptionTitle">
                <h3>
                    DESCRIPTION
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="projectDescriptionContent"></div>
        </div>
    );
}

function Project({ loadingData }) {
    return (
        <div className="projectContainer">
            <div className="projectTitle">
                <h3>
                    PROJECT
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="projectContent"></div>
        </div>
    );
}

export default ProjectPage;
