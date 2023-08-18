import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ContactPage.css";

function ContactPageGuest() {
  return (
    <div>
      <HeaderGuest />
      <NavGuest />
      <div className="ContactPageContainer">
        <div className="Breadcrumb">
          <h2>Guest / contact</h2>
        </div>
        <ContactPageTitle />
        <ContactPageContent />
      </div>
      <FooterGuest />
    </div>
  );
}

function ContactPageTitle() {
  return (
    <div className="ContactPageTitleContainer">
      <h2>CONTACT</h2>
    </div>
  );
}

function ContactPageContent() {
  return (
    <div className="ContactPageContentContainer">

    </div>
  );
}

export default ContactPageGuest;