import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalFP from "/src/Components/ModalFP/ModalFP.jsx";
import Terminal from "/src/Components/Terminal/Terminal.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "/src/Components/Nav/Nav.jsx";
import "./Header.scss";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogoClick = () => {
        if (location.pathname === info.routes.frontPage) {
            setIsModalOpen(true);
        } else {
            navigate(info.routes.frontPage);
        }
    };

    const handleTerminalClick = () => {
        if (!location.pathname.includes("admin") && !isModalOpen) {
            setIsTerminalOpen(true);
        }
    };

    return (
        <>
            {windowWidth >= 1280 && (
                <header className="header">
                    <AnimatePresence>
                        <motion.div className="headerTitle" key="headertitle" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                            <motion.div
                                className="headerLogo"
                                title={location.pathname === info.routes.frontPage ? "Info" : "Go to front page"}
                                onClick={() => handleLogoClick()}
                                key="headerlogo"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <h1>MatrixZone</h1>
                            <div className="version">
                                <AnimatePresence>
                                    <motion.div
                                        className="terminalLogo"
                                        title="Open terminal"
                                        onClick={() => handleTerminalClick()}
                                        key="headerterminal"
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                </AnimatePresence>
                                <p>{info.version}</p>
                            </div>
                        </motion.div>
                        <Nav />
                    </AnimatePresence>
                    <ModalFP isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    <Terminal isTerminalOpen={isTerminalOpen} setIsTerminalOpen={setIsTerminalOpen} />
                </header>
            )}
            {windowWidth < 1280 && <HeaderMobile />}
        </>
    );
}

//Mobile:
function HeaderMobile() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(info.routes.frontPage);
    };

    return (
        <header className="headerMobile">
            <AnimatePresence>
                <motion.div className="headerTitleMobile" key="headertitlemobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
                    <motion.div className="headerLogoMobile" onClick={() => handleLogoClick()} key="headerlogomobile" whileTap={{ scale: 0.9 }} />
                    <div className="headerTitleContainerMobile">
                        <h1>MatrixZone</h1>
                        <p>{info.version}</p>
                    </div>
                </motion.div>
                <Nav />
            </AnimatePresence>
        </header>
    );
}

export default Header;
