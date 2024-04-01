import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.scss";

function HeaderAdmin() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                <header className="headerContainer">
                    <Logo />
                    <Title />
                    <Matrix />
                </header>
            )}
            {windowWidth < 1280 && (
                <header className="headerContainerMobile">
                    <LogoMobile />
                    <TitleMobile />
                    <MatrixMobile />
                </header>
            )}
        </>
    );
}

function Logo() {
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <motion.div
                className="logoContainer"
                title="Go to home page"
                onClick={() => navigate(info.routes.dashboardPage)}
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
            <h1>
                MatrixZone<span style={{ fontSize: "20px", textShadow: "none" }}> Admin panel</span>
            </h1>
        </div>
    );
}

function Matrix() {
    return <div className="matrixContainer" />;
}

//Mobile:
function LogoMobile() {
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <motion.div
                className="logoContainerMobile"
                title="Go to home page"
                onClick={() => navigate(info.routes.dashboardPage)}
                key="logocontainermobileA"
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
            />
        </AnimatePresence>
    );
}

function TitleMobile() {
    return (
        <div className="titleContainerMobile">
            <h1>
                MatrixZone<span style={{ fontSize: "5px", textShadow: "none" }}> Admin panel</span>
            </h1>
        </div>
    );
}

function MatrixMobile() {
    return <div className="matrixContainerMobile" />;
}

export default HeaderAdmin;
