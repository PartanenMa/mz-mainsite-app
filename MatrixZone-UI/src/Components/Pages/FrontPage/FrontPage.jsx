import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./FrontPage.css";

function FrontPage() {
  return (
    <div className="FP">
      <Header />
      <div className="FrontPageContainer">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="Header">
      <div className="HeaderTitle">
        <div className="HeaderLogo"></div>
        <h1>MatrixZone</h1>
      </div>
      {isSmallScreen ? (
        <div className="Menu-icon">
          <div className="Bar"></div>
          <div className="Bar"></div>
          <div className="Bar"></div>
        </div>
      ) : (
        <div className="NavOptions">
          <button className="LoginButtonFP" onClick={() => navigate(info.routes.loginPage)}>Log in</button>
        </div>
      )}
    </header>
  );
}

function Main() {
  return (
    <div className="Main">
      
    </div>
  );
}

function Footer() {
  return (
    <div className="Footer">

    </div>
  );
}

export default FrontPage;