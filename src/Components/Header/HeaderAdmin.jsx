import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./Header.css";

function HeaderAdmin() {
    return (
        <header className="HeaderContainer">
            <Logo />
            <Title />
            <Matrix />
        </header>
    );
}

function Logo() {
    const navigate = useNavigate();
    return (
        <div
            className="LogoContainer"
            title="Go to home page"
            onClick={() => navigate(info.routes.homePageAdmin)}
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

function Matrix() {
    return <div className="MatrixContainer"></div>;
}

export default HeaderAdmin;
