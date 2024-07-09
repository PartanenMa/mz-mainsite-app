import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectNav.scss";

function ModalFP({ isProjectNavOpen, setIsProjectNavOpen }) {
    const projectLinks = info.projectLinks;

    return (
        <>
            <button className="projectNavBtn" onClick={() => setIsProjectNavOpen(!isProjectNavOpen)}>
                <p style={{ bottom: isProjectNavOpen ? "-3px" : "7px" }}>{isProjectNavOpen ? "^" : "⌄"}</p>
            </button>
            {isProjectNavOpen && (
                <>
                    <AnimatePresence>
                        <motion.div className="projectNav" key="projectnav">
                            <div className="block1"></div>
                            <div className="block2">
                                {projectLinks.length > 0 ? (
                                    projectLinks.map((projectLink, index) => (
                                        <motion.a
                                            className="projectLink"
                                            key={index}
                                            href={projectLink.link}
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.1 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="pLImg" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                            <div className="pLTitle">
                                                <p>{projectLink.label}</p>
                                            </div>
                                        </motion.a>
                                    ))
                                ) : (
                                    <p className="noProjectLinks">NO OTHER SITES YET!</p>
                                )}
                            </div>
                            <div className="block3"></div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>
    );
}

export default ModalFP;
