import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

function HeaderGuest() {
    return (
        <header className="HeaderContainer">
            <Logo />
            <Title />
        </header>
    );
}

function Logo() {
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <motion.div
                className="LogoContainer"
                title="Go to home page"
                onClick={() => navigate(info.routes.homePageGuest)}
                key="logocontainer"
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
            />
        </AnimatePresence>
    );
}

function Title() {
    return (
        <div className="TitleContainer">
            <h1>MatrixZone</h1>
        </div>
    );
}

export default HeaderGuest;
