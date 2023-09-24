import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Nav.css";

function NavGuest() {
    return (
        <nav className="NavContainer">
            <Buttons />
        </nav>
    );
}

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className="ButtonContainer">
            <AnimatePresence>
                <motion.button
                    id="Btn1"
                    onClick={() => navigate(info.routes.homePageGuest)}
                    key="btn1"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="HomeIcon" />
                    <h3 className="HomeText">Home</h3>
                </motion.button>
                <motion.button
                    id="Btn2"
                    onClick={() => navigate(info.routes.profilePageGuest)}
                    key="btn2"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="ProfileIcon" />
                    <h3 className="ProfileText">Profile</h3>
                </motion.button>
                <motion.button
                    id="Btn3"
                    onClick={() => navigate(info.routes.projectsPageGuest)}
                    key="btn3"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="ProjectsIcon" />
                    <h3 className="ProjectsText">Projects</h3>
                </motion.button>
                <motion.button
                    id="Btn4"
                    onClick={() => navigate(info.routes.videosPageGuest)}
                    key="btn4"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="VideosIcon" />
                    <h3 className="VideosText">Videos</h3>
                </motion.button>
                <motion.button
                    id="Btn5"
                    onClick={() => navigate(info.routes.goalsPageGuest)}
                    key="btn5"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="GoalsIcon" />
                    <h3 className="GoalsText">Goals</h3>
                </motion.button>
                <motion.button
                    id="Btn6"
                    onClick={() => navigate(info.routes.cvPageGuest)}
                    key="btn6"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="CVIcon" />
                    <h3 className="CVText">CV</h3>
                </motion.button>
            </AnimatePresence>
        </div>
    );
}

export default NavGuest;
