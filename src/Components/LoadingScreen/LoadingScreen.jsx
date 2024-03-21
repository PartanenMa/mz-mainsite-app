import { useState, useEffect } from "react";
import "./LoadingScreen.scss";

function LoadingScreen() {
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
                <div className="loadingScreenContainer">
                    <LoadingLogo />
                    <LoadingTitleContainer />
                    <LoadingSection />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="loadingScreenContainerMobile">
                    <LoadingLogoMobile />
                    <LoadingTitleContainerMobile />
                    <LoadingSectionMobile />
                </div>
            )}
        </>
    );
}

function LoadingLogo() {
    return (
        <div className="loadingLogoContainer">
            <div className="matrixLogo" />
        </div>
    );
}

function LoadingTitleContainer() {
    return (
        <div className="loadingTitleContainer">
            <h1>MatrixZone</h1>
        </div>
    );
}

function LoadingSection() {
    return (
        <div className="loadingContainer">
            <h2>LOADING...</h2>
            <div className="logo_reactL" />
        </div>
    );
}

//Mobile:
function LoadingLogoMobile() {
    return (
        <div className="loadingLogoContainerMobile">
            <div className="matrixLogoMobile" />
        </div>
    );
}

function LoadingTitleContainerMobile() {
    return (
        <div className="loadingTitleContainerMobile">
            <h1>MatrixZone</h1>
        </div>
    );
}

function LoadingSectionMobile() {
    return (
        <div className="loadingContainerMobile">
            <h2>LOADING...</h2>
            <div className="logo_reactLMobile" />
        </div>
    );
}

export default LoadingScreen;
