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
