import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DarkBG from "./Components/BGAnimation/DarkBG.jsx";
import MatrixBG from "./Components/BGAnimation/MatrixBG.jsx";
import FrontPage from "./Components/Pages/FrontPage/FrontPage.jsx";
import LoginPage from "./Components/Pages/LoginPage/LoginPage.jsx";
import AboutPage from "./Components/Pages/AboutPage/AboutPage.jsx";
import HomePageGuest from "./Components/Pages/HomePage/HomePageGuest.jsx";
import HomePageAdmin from "./Components/Pages/HomePage/HomePageAdmin.jsx";
import ProfilePageGuest from "./Components/Pages/ProfilePage/ProfilePageGuest.jsx";
import ProfilePageAdmin from "./Components/Pages/ProfilePage/ProfilePageAdmin.jsx";
import ITInfraPageGuest from "./Components/Pages/InterestITInfraPage/ITInfraPageGuest.jsx";
import ITInfraPageAdmin from "./Components/Pages/InterestITInfraPage/ITInfraPageAdmin.jsx";
import ProgrammingPageGuest from "./Components/Pages/InterestProgrammingPage/ProgrammingPageGuest.jsx";
import ProgrammingPageAdmin from "./Components/Pages/InterestProgrammingPage/ProgrammingPageAdmin.jsx";
import RoboticsPageGuest from "./Components/Pages/InterestRoboticsPage/RoboticsPageGuest.jsx";
import RoboticsPageAdmin from "./Components/Pages/InterestRoboticsPage/RoboticsPageAdmin.jsx";
import GamingPageGuest from "./Components/Pages/HobbyGamingPage/GamingPageGuest.jsx";
import GamingPageAdmin from "./Components/Pages/HobbyGamingPage/GamingPageAdmin.jsx";
import WebDevPageGuest from "./Components/Pages/HobbyWebDevPage/WebDevPageGuest.jsx";
import WebDevPageAdmin from "./Components/Pages/HobbyWebDevPage/WebDevPageAdmin.jsx";
import CampingPageGuest from "./Components/Pages/HobbyCampingPage/CampingPageGuest.jsx";
import CampingPageAdmin from "./Components/Pages/HobbyCampingPage/CampingPageAdmin.jsx";
import ProjectsPageGuest from "./Components/Pages/ProjectsPage/ProjectsPageGuest.jsx";
import ProjectsPageAdmin from "./Components/Pages/ProjectsPage/ProjectsPageAdmin.jsx";
import VideosPageGuest from "./Components/Pages/VideosPage/VideosPageGuest.jsx";
import VideosPageAdmin from "./Components/Pages/VideosPage/VideosPageAdmin.jsx";
import ExperiencePageGuest from "./Components/Pages/ExperiencePage/ExperiencePageGuest.jsx";
import ExperiencePageAdmin from "./Components/Pages/ExperiencePage/ExperiencePageAdmin.jsx";
import ContactPageGuest from "./Components/Pages/ContactPage/ContactPageGuest.jsx";
import ContactPageAdmin from "./Components/Pages/ContactPage/ContactPageAdmin.jsx";
import { info } from "./Constants/Info.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate])

  return (
    <>
      {location.pathname === info.routes.frontPage ? <DarkBG /> : <MatrixBG />}
      {
        <div className="AppContainer">
          <Routes>
            <Route path={info.routes.frontPage} element={<FrontPage />} />
            <Route path={info.routes.loginPage} element={<LoginPage />} />
            <Route path={info.routes.aboutPage} element={<AboutPage />} />
            <Route path={info.routes.homePageGuest} element={<HomePageGuest />} />
            <Route path={info.routes.homePageAdmin} element={<HomePageAdmin />} />
            <Route path={info.routes.profilePageGuest} element={<ProfilePageGuest />} />
            <Route path={info.routes.profilePageAdmin} element={<ProfilePageAdmin />} />
            <Route path={info.routes.iTInfraPageGuest} element={<ITInfraPageGuest />} />
            <Route path={info.routes.iTInfraPageAdmin} element={<ITInfraPageAdmin />} />
            <Route path={info.routes.programmingPageGuest} element={<ProgrammingPageGuest />} />
            <Route path={info.routes.programmingPageAdmin} element={<ProgrammingPageAdmin />} />
            <Route path={info.routes.roboticsPageGuest} element={<RoboticsPageGuest />} />
            <Route path={info.routes.roboticsPageAdmin} element={<RoboticsPageAdmin />} />
            <Route path={info.routes.gamingPageGuest} element={<GamingPageGuest />} />
            <Route path={info.routes.gamingPageAdmin} element={<GamingPageAdmin />} />
            <Route path={info.routes.webDevPageGuest} element={<WebDevPageGuest />} />
            <Route path={info.routes.webDevPageAdmin} element={<WebDevPageAdmin />} />
            <Route path={info.routes.campingPageGuest} element={<CampingPageGuest />} />
            <Route path={info.routes.campingPageAdmin} element={<CampingPageAdmin />} />
            <Route path={info.routes.projectsPageGuest} element={<ProjectsPageGuest />} />
            <Route path={info.routes.projectsPageAdmin} element={<ProjectsPageAdmin />} />
            <Route path={info.routes.videosPageGuest} element={<VideosPageGuest />} />
            <Route path={info.routes.videosPageAdmin} element={<VideosPageAdmin />} />
            <Route path={info.routes.experiencePageGuest} element={<ExperiencePageGuest />} />
            <Route path={info.routes.experiencePageAdmin} element={<ExperiencePageAdmin />} />
            <Route path={info.routes.contactPageGuest} element={<ContactPageGuest />} />
            <Route path={info.routes.contactPageAdmin} element={<ContactPageAdmin />} />
          </Routes>
        </div>
      }
    </>
  );
}

export default App;