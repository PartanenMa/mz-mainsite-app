import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstPage from "/src/Components/Pages/LoginFirstPage/LoginFirstPage.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ExperiencePage.css";

function ExperiencePageAdmin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return (
      <div>
        <HeaderAdmin />
        <NavAdmin />
        <div className="ExperiencePageContainer">
          <div className="Breadcrumb">
            <h2>Admin / experience</h2>
          </div>
          <ExperiencePageTitle />
          <ExperiencePageContent />
        </div>
        <FooterAdmin />
      </div>
    );
  } else {
    return (<LoginFirstPage />);
  }
}

function ExperiencePageTitle() {
  return (
    <div className="ExperiencePageTitleContainer">
      <h2>MY EXPERIENCE</h2>
    </div>
  );
}

function ExperiencePageContent() {
  return (
    <div className="ExperiencePageContentContainer">

    </div>
  );
}

export default ExperiencePageAdmin;