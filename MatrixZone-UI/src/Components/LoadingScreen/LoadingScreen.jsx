import reactLogo from "/src/Assets/Images/React.svg";
import "./LoadingScreen.css";

function LoadingScreen() {
    return (
        <div className="LoadingScreenContainer">
            <LoadingLogo />
            <LoadingTitleContainer />
            <LoadingSection />
        </div>
    );
}

function LoadingLogo() {
    return (
        <div className="LoadingLogoContainer">
            <div className="MatrixLogo"></div>
        </div>
    );
}

function LoadingTitleContainer() {
    return (
        <div className="LoadingTitleContainer">
            <h1>MatrixZone</h1>
        </div>
    );
}

function LoadingSection() {
    return (
        <div className="LoadingContainer">
            <h2>LOADING...</h2>
            <img src={reactLogo} className="Logo_reactL" alt="React logo L" />
        </div>
    );
}

export default LoadingScreen;
