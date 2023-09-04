import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DarkBG from "./Components/BGAnimation/DarkBG.jsx";
import MatrixBG from "./Components/BGAnimation/MatrixBG.jsx";
import FrontPage from "./Container/FrontPage/FrontPage.jsx";
import LoginPage from "./Container/LoginPage/LoginPage.jsx";
import HomePageGuest from "./Container/HomePage/HomePageGuest.jsx";
import HomePageAdmin from "./Container/HomePage/HomePageAdmin.jsx";
import ProfilePageGuest from "./Container/ProfilePage/ProfilePageGuest.jsx";
import ProfilePageAdmin from "./Container/ProfilePage/ProfilePageAdmin.jsx";
import ITInfraPageGuest from "./Container/InterestITInfraPage/ITInfraPageGuest.jsx";
import ITInfraPageAdmin from "./Container/InterestITInfraPage/ITInfraPageAdmin.jsx";
import ProgrammingPageGuest from "./Container/InterestProgrammingPage/ProgrammingPageGuest.jsx";
import ProgrammingPageAdmin from "./Container/InterestProgrammingPage/ProgrammingPageAdmin.jsx";
import RoboticsPageGuest from "./Container/InterestRoboticsPage/RoboticsPageGuest.jsx";
import RoboticsPageAdmin from "./Container/InterestRoboticsPage/RoboticsPageAdmin.jsx";
import GamingPageGuest from "./Container/HobbyGamingPage/GamingPageGuest.jsx";
import GamingPageAdmin from "./Container/HobbyGamingPage/GamingPageAdmin.jsx";
import WebDevPageGuest from "./Container/HobbyWebDevPage/WebDevPageGuest.jsx";
import WebDevPageAdmin from "./Container/HobbyWebDevPage/WebDevPageAdmin.jsx";
import CampingPageGuest from "./Container/HobbyCampingPage/CampingPageGuest.jsx";
import CampingPageAdmin from "./Container/HobbyCampingPage/CampingPageAdmin.jsx";
import ProjectsPageGuest from "./Container/ProjectsPage/ProjectsPageGuest.jsx";
import ProjectsPageAdmin from "./Container/ProjectsPage/ProjectsPageAdmin.jsx";
import VideosPageGuest from "./Container/VideosPage/VideosPageGuest.jsx";
import VideosPageAdmin from "./Container/VideosPage/VideosPageAdmin.jsx";
import GoalsPageGuest from "./Container/GoalsPage/GoalsPageGuest.jsx";
import GoalsPageAdmin from "./Container/GoalsPage/GoalsPageAdmin.jsx";
import CVPageGuest from "./Container/CVPage/CVPageGuest.jsx";
import CVPageAdmin from "./Container/CVPage/CVPageAdmin.jsx";
import { info } from "./Constants/Info.jsx";
import "./App.css";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    return (
        <>
            {location.pathname === info.routes.frontPage ? <DarkBG /> : <MatrixBG />}
            {
                <div className="AppContainer">
                    <Routes>
                        <Route path={info.routes.frontPage} element={<FrontPage />} />
                        <Route path={info.routes.loginPage} element={<LoginPage />} />
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
                        <Route path={info.routes.goalsPageGuest} element={<GoalsPageGuest />} />
                        <Route path={info.routes.goalsPageAdmin} element={<GoalsPageAdmin />} />
                        <Route path={info.routes.cvPageGuest} element={<CVPageGuest />} />
                        <Route path={info.routes.cvPageAdmin} element={<CVPageAdmin />} />
                    </Routes>
                </div>
            }
        </>
    );
}

export default App;
