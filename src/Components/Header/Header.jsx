import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalFP from "/src/Components/ModalFP/ModalFP.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "/src/Components/Nav/Nav.jsx";
import "./Header.css";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        if (location.pathname === info.routes.frontPage) {
            setIsModalOpen(true);
        } else {
            navigate(info.routes.frontPage);
        }
    };

    return (
        <header className="Header">
            <AnimatePresence>
                <motion.div
                    className="HeaderTitle"
                    key="headerT"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        className="HeaderLogo"
                        title={location.pathname === info.routes.frontPage ? "Info" : "Go to front page"}
                        onClick={() => handleLogoClick()}
                        key="headerL"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <h1>MatrixZone</h1>
                    <div className="Version">
                        <p>{info.version}</p>
                    </div>
                </motion.div>
                <Nav />
            </AnimatePresence>
            <ModalFP isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </header>
    );
}

export default Header;
