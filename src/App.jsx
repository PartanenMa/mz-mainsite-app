import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DarkBG from "./Components/BGAnimation/DarkBG.jsx";
import MatrixBG from "./Components/BGAnimation/MatrixBG.jsx";
import AdminMatrixBG from "./Components/BGAnimation/AdminMatrixBG.jsx";
import FrontPage from "./Pages/FrontPage/FrontPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import HomePageGuest from "./Pages/HomePage/HomePageGuest.jsx";
import HomePageAdmin from "./Pages/HomePage/HomePageAdmin.jsx";
import ProfilePageGuest from "./Pages/ProfilePage/ProfilePageGuest.jsx";
import ProfilePageAdmin from "./Pages/ProfilePage/ProfilePageAdmin.jsx";
import ProjectsPageGuest from "./Pages/ProjectsPage/ProjectsPageGuest.jsx";
import ProjectsPageAdmin from "./Pages/ProjectsPage/ProjectsPageAdmin.jsx";
import VideosPageGuest from "./Pages/VideosPage/VideosPageGuest.jsx";
import VideosPageAdmin from "./Pages/VideosPage/VideosPageAdmin.jsx";
import GoalsPageGuest from "./Pages/GoalsPage/GoalsPageGuest.jsx";
import GoalsPageAdmin from "./Pages/GoalsPage/GoalsPageAdmin.jsx";
import CVPageGuest from "./Pages/CVPage/CVPageGuest.jsx";
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
            {location.pathname === info.routes.frontPage && <DarkBG />}
            {location.pathname === info.routes.loginPage && <MatrixBG />}
            {location.pathname.includes("admin") && <AdminMatrixBG />}
            {
                <div className="AppContainer">
                    <Routes>
                        <Route path={info.routes.frontPage} element={<FrontPage />} />
                        <Route path={info.routes.loginPage} element={<LoginPage />} />
                        <Route path={info.routes.homePage} element={<HomePageGuest />} />
                        <Route path={info.routes.homePageAdmin} element={<HomePageAdmin />} />
                        <Route path={info.routes.profilePage} element={<ProfilePageGuest />} />
                        <Route path={info.routes.profilePageAdmin} element={<ProfilePageAdmin />} />
                        <Route path={info.routes.projectsPage} element={<ProjectsPageGuest />} />
                        <Route path={info.routes.projectsPageAdmin} element={<ProjectsPageAdmin />} />
                        <Route path={info.routes.videosPage} element={<VideosPageGuest />} />
                        <Route path={info.routes.videosPageAdmin} element={<VideosPageAdmin />} />
                        <Route path={info.routes.goalsPage} element={<GoalsPageGuest />} />
                        <Route path={info.routes.goalsPageAdmin} element={<GoalsPageAdmin />} />
                        <Route path={info.routes.cvPage} element={<CVPageGuest />} />
                        <Route path={info.routes.cvPageAdmin} element={<CVPageAdmin />} />
                    </Routes>
                </div>
            }
        </>
    );
}

export default App;
