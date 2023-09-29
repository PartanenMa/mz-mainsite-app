import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DarkBG from "./Components/BGAnimation/DarkBG.jsx";
import MatrixBG from "./Components/BGAnimation/MatrixBG.jsx";
import AdminMatrixBG from "./Components/BGAnimation/AdminMatrixBG.jsx";
import FrontPage from "./Pages/FrontPage/FrontPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import HomePageAdmin from "./Pages/HomePage/HomePageAdmin.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import ProfilePageAdmin from "./Pages/ProfilePage/ProfilePageAdmin.jsx";
import ProjectsPage from "./Pages/ProjectsPage/ProjectsPage.jsx";
import ProjectsPageAdmin from "./Pages/ProjectsPage/ProjectsPageAdmin.jsx";
import VideosPage from "./Pages/VideosPage/VideosPage.jsx";
import VideosPageAdmin from "./Pages/VideosPage/VideosPageAdmin.jsx";
import GoalsPage from "./Pages/GoalsPage/GoalsPage.jsx";
import GoalsPageAdmin from "./Pages/GoalsPage/GoalsPageAdmin.jsx";
import CVPage from "./Pages/CVPage/CVPage.jsx";
import CVPageAdmin from "./Pages/CVPage/CVPageAdmin.jsx";
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
            {location.pathname !== info.routes.loginPage && !location.pathname.includes("admin") && <DarkBG />}
            {location.pathname === info.routes.loginPage && <MatrixBG />}
            {location.pathname.includes("admin") && <AdminMatrixBG />}
            {
                <div className="AppContainer">
                    <Routes>
                        <Route path={info.routes.frontPage} element={<FrontPage />} />
                        <Route path={info.routes.loginPage} element={<LoginPage />} />
                        <Route path={info.routes.homePage} element={<HomePage />} />
                        <Route path={info.routes.homePageAdmin} element={<HomePageAdmin />} />
                        <Route path={info.routes.profilePage} element={<ProfilePage />} />
                        <Route path={info.routes.profilePageAdmin} element={<ProfilePageAdmin />} />
                        <Route path={info.routes.projectsPage} element={<ProjectsPage />} />
                        <Route path={info.routes.projectsPageAdmin} element={<ProjectsPageAdmin />} />
                        <Route path={info.routes.videosPage} element={<VideosPage />} />
                        <Route path={info.routes.videosPageAdmin} element={<VideosPageAdmin />} />
                        <Route path={info.routes.goalsPage} element={<GoalsPage />} />
                        <Route path={info.routes.goalsPageAdmin} element={<GoalsPageAdmin />} />
                        <Route path={info.routes.cvPage} element={<CVPage />} />
                        <Route path={info.routes.cvPageAdmin} element={<CVPageAdmin />} />
                    </Routes>
                </div>
            }
        </>
    );
}

export default App;
