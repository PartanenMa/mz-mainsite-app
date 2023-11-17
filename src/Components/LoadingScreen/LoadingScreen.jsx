import "./LoadingScreen.scss";

function LoadingScreen() {
    return (
        <div className="loadingScreenContainer">
            <LoadingLogo />
            <LoadingTitleContainer />
            <LoadingSection />
        </div>
    );
}

function LoadingLogo() {
    return (
        <div className="loadingLogoContainer">
            <div className="matrixLogo"></div>
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
            <div className="logo_reactL" alt="React logo L" />
        </div>
    );
}

export default LoadingScreen;
