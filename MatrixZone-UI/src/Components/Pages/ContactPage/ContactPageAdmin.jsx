import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstPage from "/src/Components/Pages/LoginFirstPage/LoginFirstPage.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ContactPage.css";

function ContactPageAdmin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return (
      <div>
      <HeaderAdmin />
      <NavAdmin />
      <div className="ContactPageContainer">
        <div className="Breadcrumb">
          <h2>Admin / contact</h2>
        </div>
        <ContactPageTitle />
        <ContactPageContent />
      </div>
      <FooterAdmin />
    </div>
    );
  } else {
    return (<LoginFirstPage />);
  }
}

function ContactPageTitle() {
  return (
    <div className="ContactPageTitleContainer">
      <h2>MY CONTACT</h2>
    </div>
  );
}

function ContactPageContent() {
  return (
    <div className="ContactPageContentContainer">

    </div>
  );
}

export default ContactPageAdmin;