import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./Header.css";

function HeaderGuest() {
    return (
        <div className="HeaderContainer">
            <Logo />
            <Title />
        </div>
    );
}

function Logo() {
    const navigate = useNavigate();
    return <div className="LogoContainer" onClick={() => navigate(info.routes.homePageGuest)}></div>;
}

function Title() {
    return (
        <div className="TitleContainer">
            <h1>MatrixZone</h1>
        </div>
    );
}

export default HeaderGuest;
