import { useState, useEffect } from "react";
import { notification } from "antd";
import HeaderAdmin from "/src/Components/Header/HeaderAdmin.jsx";
import NavAdmin from "/src/Components/Nav/NavAdmin.jsx";
import FooterAdmin from "/src/Components/Footer/FooterAdmin.jsx";
import LoginFirstPage from "/src/Container/LoginFirstPage/LoginFirstPage.jsx";
import LoadingPage from "/src/Container/LoadingPage/LoadingPage.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./ExperiencePage.css";

function ExperiencePageAdmin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const load = sessionStorage.getItem("load");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn === "true") {
      //Simulate loading for 1 second:
      const timer = setTimeout(() => {
        setLoading(false);
        if (load === "true") {
          sessionStorage.setItem("load", "false");
          notification.success({
            message: "LOGGED IN!",
            description: "Welcome back Admin.",
            placement: "bottomLeft",
            style: {
              backgroundColor: "lightgreen",
              border: "3px solid green",
            },
          });
        }
      }, 1000);

      //Clean up the timer to prevent memory leaks:
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, load]);

  if (isLoggedIn === "true") {
    return (
      <div>
        {loading && load === "true" ? (
          //Loading component here:
          <LoadingPage />
        ) : (
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
        )}
      </div>
    );
  } else {
    return <LoginFirstPage />;
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