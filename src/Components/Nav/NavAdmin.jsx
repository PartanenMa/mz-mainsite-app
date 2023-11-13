import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./nav.scss";

function NavAdmin() {
    return (
        <nav className="navContainer">
            <Buttons />
        </nav>
    );
}

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className="buttonContainer">
            <AnimatePresence>
                <motion.button
                    id="btn1"
                    onClick={() => navigate(info.routes.homePageAdmin)}
                    key="btn1A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="homeIcon" />
                    <h3 className="homeText">Home</h3>
                </motion.button>
                <motion.button
                    id="btn2"
                    onClick={() => navigate(info.routes.profilePageAdmin)}
                    key="btn2A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="profileIcon" />
                    <h3 className="profileText">Profile</h3>
                </motion.button>
                <motion.button
                    id="btn3"
                    onClick={() => navigate(info.routes.projectsPageAdmin)}
                    key="btn3A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="projectsIcon" />
                    <h3 className="projectsText">Projects</h3>
                </motion.button>
                <motion.button
                    id="btn4"
                    onClick={() => navigate(info.routes.videosPageAdmin)}
                    key="btn4A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="videosIcon" />
                    <h3 className="videosText">Videos</h3>
                </motion.button>
                <motion.button
                    id="btn5"
                    onClick={() => navigate(info.routes.goalsPageAdmin)}
                    key="btn5A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="goalsIcon" />
                    <h3 className="goalsText">Goals</h3>
                </motion.button>
                <motion.button
                    id="btn6"
                    onClick={() => navigate(info.routes.cvPageAdmin)}
                    key="btn6A"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="cvIcon" />
                    <h3 className="cvText">CV</h3>
                </motion.button>
            </AnimatePresence>
        </div>
    );
}

export default NavAdmin;
