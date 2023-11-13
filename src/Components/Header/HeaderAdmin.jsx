import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./header.scss";

function HeaderAdmin() {
    return (
        <header className="headerContainer">
            <Logo />
            <Title />
            <Matrix />
        </header>
    );
}

function Logo() {
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <motion.div
                className="logoContainer"
                title="Go to home page"
                onClick={() => navigate(info.routes.homePageAdmin)}
                key="logocontainerA"
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
        <div className="titleContainer">
            <h1>MatrixZone</h1>
        </div>
    );
}

function Matrix() {
    return <div className="matrixContainer" />;
}

export default HeaderAdmin;
