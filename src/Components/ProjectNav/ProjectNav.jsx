import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectNav.scss";

function ProjectNav({ isProjectNavOpen, setIsProjectNavOpen }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const controlLinks = info.controlLinks;
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
                                    <div className="block1">
                                        <div className="b1Title">
                                            <p>Control:</p>
                                        </div>
                                        <div className="b1Content">
                                            {controlLinks.length > 0 &&
                                                controlLinks.map((controlLink, index) =>
                                                    controlLink.disabled ? (
                                                        <div className="controlLinkD" title={"Currently not available"} key={index}>
                                                            <div className="cLImg" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                            <div className="cLTitle">
                                                                <p>{controlLink.label}</p>
                                                            </div>
                                                        </div>
                                                    ) : controlLink.current ? (
                                                        <div className="controlLinkC" title={`Currently at ${controlLink.label}`} key={index}>
                                                            <div className="cLImg" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                            <div className="cLTitle">
                                                                <p>{controlLink.label}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <motion.a
                                                            className="controlLink"
                                                            key={index}
                                                            href={controlLink.link}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                transition: { duration: 0.1 },
                                                            }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <div className="cLImg" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                            <div className="cLTitle">
                                                                <p>{controlLink.label}</p>
                                                            </div>
                                                        </motion.a>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    <div className="block2">
                                        <div className="b2Title">
                                            <p>Applications:</p>
                                        </div>
                                        <div className="b2Content">
                                            {appLinks.length > 0 ? (
                                                appLinks.map((appLink, index) =>
                                                    appLink.disabled ? (
                                                        <div className="appLinkD" title={"Currently not available"} key={index}>
                                                            <div className="aImg" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                            <div className="aTitle">
                                                                <p>{appLink.label}</p>
                                                            </div>
                                                        </div>
                                                    ) : appLink.current ? (
                                                        <div className="appLinkC" title={`Currently at ${appLink.label}`} key={index}>
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
                                    <div className="block3">
                                        <div className="b3Title">
                                            <p></p>
                                        </div>
                                        <div className="b3Content"></div>
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
    const controlLinks = info.controlLinks;
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
                            <div className="block1Mobile">
                                <div className="b1TitleMobile">
                                    <p>Control:</p>
                                </div>
                                <div className="b1ContentMobile">
                                    {controlLinks.length > 0 &&
                                        controlLinks.map((controlLink, index) =>
                                            controlLink.disabled ? (
                                                <div className="controlLinkDMobile" title={"Currently not available"} key={index}>
                                                    <div className="cLImgMobile" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                    <div className="cLTitleMobile">
                                                        <p>{controlLink.label}</p>
                                                    </div>
                                                </div>
                                            ) : controlLink.current ? (
                                                <div className="controlLinkCMobile" title={`Currently at ${controlLink.label}`} key={index}>
                                                    <div className="cLImgMobile" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                    <div className="cLTitleMobile">
                                                        <p>{controlLink.label}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <motion.a
                                                    className="controlLinkMobile"
                                                    key={index}
                                                    href={controlLink.link}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.1 },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <div className="cLImgMobile" style={{ backgroundImage: `url(${controlLink.image})` }} />
                                                    <div className="cLTitleMobile">
                                                        <p>{controlLink.label}</p>
                                                    </div>
                                                </motion.a>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className="block2Mobile">
                                <div className="b2TitleMobile">
                                    <p>Applications:</p>
                                </div>
                                <div className="b2ContentMobile">
                                    {appLinks.length > 0 ? (
                                        appLinks.map((appLink, index) =>
                                            appLink.disabled ? (
                                                <div className="appLinkDMobile" title={"Currently not available"} key={index}>
                                                    <div className="aImgMobile" style={{ backgroundImage: `url(${appLink.image})` }} />
                                                    <div className="aTitleMobile">
                                                        <p>{appLink.label}</p>
                                                    </div>
                                                </div>
                                            ) : appLink.current ? (
                                                <div className="appLinkCMobile" title={`Currently at ${appLink.label}`} key={index}>
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
                            <div className="block3Mobile">
                                <div className="b3TitleMobile">
                                    <p></p>
                                </div>
                                <div className="b3ContentMobile"></div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </>
    );
}
export default ProjectNav;
