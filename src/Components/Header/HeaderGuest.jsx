import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
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
        <div
            className="LogoContainer"
            title="Go to home page"
            onClick={() => navigate(info.routes.homePageGuest)}
        ></div>
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
