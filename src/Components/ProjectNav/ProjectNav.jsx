import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectNav.scss";

function ProjectNav({ isProjectNavOpen, setIsProjectNavOpen }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mainSiteLink = info.mainSiteLink;
    const projectLinks = info.projectLinks;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 1280 && (
                <>
                    <button className="projectNavBtn" onClick={() => setIsProjectNavOpen(!isProjectNavOpen)}>
                        <p style={{ bottom: isProjectNavOpen ? "-3px" : "7px" }}>{isProjectNavOpen ? "^" : "⌄"}</p>
                    </button>
                    {isProjectNavOpen && (
                        <>
                            <AnimatePresence>
                                <motion.div className="projectNav" key="projectnav">
                                    <div className="block1">
                                        {mainSiteLink.length > 0 &&
                                            mainSiteLink.map((mSL, index) => (
                                                <div className="mainSiteLink" title={"Currently at Main site"} key={index}>
                                                    <div className="mSImg" style={{ backgroundImage: `url(${mSL.image})` }} />
                                                    <div className="mSTitle">
                                                        <p>{mSL.label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="block2">
                                        {projectLinks.length > 0 ? (
                                            projectLinks.map((projectLink, index) =>
                                                projectLink.disabled ? (
                                                    <div className="projectLinkD" title={"Currently not available"} key={index}>
                                                        <div className="pLImg" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                                        <div className="pLTitle">
                                                            <p>{projectLink.label}</p>
                                                        </div>
                                                    </div>
                                                ) : (
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
                                                )
                                            )
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
            )}
            {windowWidth < 1280 && <ProjectNavMobile isProjectNavOpen={isProjectNavOpen} setIsProjectNavOpen={setIsProjectNavOpen} />}
        </>
    );
}

//Mobile:
function ProjectNavMobile({ isProjectNavOpen, setIsProjectNavOpen }) {
    const mainSiteLink = info.mainSiteLink;
    const projectLinks = info.projectLinks;

    return (
        <>
            <button className="projectNavBtnMobile" onClick={() => setIsProjectNavOpen(!isProjectNavOpen)}>
                <p style={{ bottom: isProjectNavOpen ? "-2px" : "3px" }}>{isProjectNavOpen ? "^" : "⌄"}</p>
            </button>
            {isProjectNavOpen && (
                <>
                    <AnimatePresence>
                        <motion.div className="projectNavMobile" key="projectnavmobile">
                            <div className="block1Mobile">
                                {mainSiteLink.length > 0 &&
                                    mainSiteLink.map((mSL, index) => (
                                        <div className="mainSiteLinkMobile" title={"Currently at Main site"} key={index}>
                                            <div className="mSImgMobile" style={{ backgroundImage: `url(${mSL.image})` }} />
                                            <div className="mSTitleMobile">
                                                <p>{mSL.label}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="block2Mobile">
                                {projectLinks.length > 0 ? (
                                    projectLinks.map((projectLink, index) =>
                                        projectLink.disabled ? (
                                            <div className="projectLinkDMobile" title={"Currently not available"} key={index}>
                                                <div className="pLImgMobile" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                                <div className="pLTitleMobile">
                                                    <p>{projectLink.label}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <motion.a
                                                className="projectLinkMobile"
                                                key={index}
                                                href={projectLink.link}
                                                whileHover={{
                                                    scale: 1.05,
                                                    transition: { duration: 0.1 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <div className="pLImgMobile" style={{ backgroundImage: `url(${projectLink.image})` }} />
                                                <div className="pLTitleMobile">
                                                    <p>{projectLink.label}</p>
                                                </div>
                                            </motion.a>
                                        )
                                    )
                                ) : (
                                    <p className="noProjectLinksMobile">NO OTHER SITES YET!</p>
                                )}
                            </div>
                            <div className="block3Mobile"></div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>
    );
}
export default ProjectNav;
