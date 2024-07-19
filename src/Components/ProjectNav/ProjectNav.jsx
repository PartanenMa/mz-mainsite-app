import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectNav.scss";

function ProjectNav({ isProjectNavOpen, setIsProjectNavOpen }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const appLinks = info.appLinks;

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
                                    <div className="block">
                                        <div className="bTitle">
                                            <p>Applications:</p>
                                        </div>
                                        <div className="bContent">
                                            {appLinks.length > 0 ? (
                                                appLinks.map((appLink, index) =>
                                                    appLink.disabled ? (
                                                        <div className="appLinkD" title={"Currently not available"} key={index}>
                                                            <div className="aImg" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                            <div className="aTitle">
                                                                <p>{appLink.label}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <motion.a
                                                            className="appLink"
                                                            key={index}
                                                            href={appLink.link}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                transition: { duration: 0.1 },
                                                            }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <div className="aImg" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                            <div className="aTitle">
                                                                <p>{appLink.label}</p>
                                                            </div>
                                                        </motion.a>
                                                    )
                                                )
                                            ) : (
                                                <p className="noAppLinks">NO APPS YET!</p>
                                            )}
                                        </div>
                                    </div>
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
    const appLinks = info.appLinks;

    return (
        <>
            <button className="projectNavBtnMobile" onClick={() => setIsProjectNavOpen(!isProjectNavOpen)}>
                <p style={{ bottom: isProjectNavOpen ? "-2px" : "3px" }}>{isProjectNavOpen ? "^" : "⌄"}</p>
            </button>
            {isProjectNavOpen && (
                <>
                    <AnimatePresence>
                        <motion.div className="projectNavMobile" key="projectnavmobile">
                            <div className="blockMobile">
                                <div className="bTitleMobile">
                                    <p>Applications:</p>
                                </div>
                                <div className="bContentMobile">
                                    {appLinks.length > 0 ? (
                                        appLinks.map((appLink, index) =>
                                            appLink.disabled ? (
                                                <div className="appLinkDMobile" title={"Currently not available"} key={index}>
                                                    <div className="aImgMobile" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                    <div className="aTitleMobile">
                                                        <p>{appLink.label}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <motion.a
                                                    className="appLinkMobile"
                                                    key={index}
                                                    href={appLink.link}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="aImgMobile" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                    <div className="aTitleMobile">
                                                        <p>{appLink.label}</p>
                                                    </div>
                                                </motion.a>
                                            )
                                        )
                                    ) : (
                                        <p className="noAppLinksMobile">NO APPS YET!</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>
    );
}
export default ProjectNav;
