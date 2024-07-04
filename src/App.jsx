import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DarkBG from "./Components/BGAnimation/DarkBG.jsx";
import MatrixBG from "./Components/BGAnimation/MatrixBG.jsx";
import AdminMatrixBG from "./Components/BGAnimation/AdminMatrixBG.jsx";
import IntroScreen from "./Components/IntroScreen/IntroScreen.jsx";
import IntroLoadingScreen from "./Components/IntroLoadingScreen/IntroLoadingScreen.jsx";
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import FrontPage from "./Pages/FrontPage/FrontPage.jsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import HomePageAdmin from "./Pages/HomePage/HomePageAdmin.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import ProfilePageAdmin from "./Pages/ProfilePage/ProfilePageAdmin.jsx";
import ProjectsPage from "./Pages/ProjectsPage/ProjectsPage.jsx";
import ProjectsPageAdmin from "./Pages/ProjectsPage/ProjectsPageAdmin.jsx";
import ProjectPage from "./Pages/ProjectPage/ProjectPage.jsx";
import ProjectPageAdmin from "./Pages/ProjectPage/ProjectPageAdmin.jsx";
import VideosPage from "./Pages/VideosPage/VideosPage.jsx";
import VideosPageAdmin from "./Pages/VideosPage/VideosPageAdmin.jsx";
import VideoPage from "./Pages/VideoPage/VideoPage.jsx";
import VideoPageAdmin from "./Pages/VideoPage/VideoPageAdmin.jsx";
import GoalsPage from "./Pages/GoalsPage/GoalsPage.jsx";
import GoalsPageAdmin from "./Pages/GoalsPage/GoalsPageAdmin.jsx";
import CVPage from "./Pages/CVPage/CVPage.jsx";
import CVPageAdmin from "./Pages/CVPage/CVPageAdmin.jsx";
import { info } from "./Constants/Info.jsx";
import "./App.scss";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    const afterIntroLoad = sessionStorage.getItem("afterIntroLoading");
    const [isIntroScreenOpen, setIsIntroScreenOpen] = useState(!hasSeenIntro);
    const [isAfterIntroLoad, setIsAfterIntroLoad] = useState(!afterIntroLoad);

    useEffect(() => {
        if (!hasSeenIntro) {
            //If the intro screen hasn't been seen, keep it open:
            setIsIntroScreenOpen(true);
            navigate(info.routes.frontPage);
        } else {
            //Intro screen has been seen, start the loading process:
            const timer = setTimeout(() => {
                setIsAfterIntroLoad(false);
                sessionStorage.setItem("afterIntroLoading", "false");
                navigate(info.routes.frontPage);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [hasSeenIntro]);

    useEffect(() => {
        if (location.pathname === info.routes.loginPage || location.pathname.includes("admin")) {
            document.body.style.display = "flex";
            document.body.style.justifyContent = "center";
        } else {
            document.body.style.display = "";
            document.body.style.justifyContent = "";
        }
        window.scrollTo(0, 0);
    }, [navigate]);

    return (
        <>
            {location.pathname !== info.routes.loginPage && !location.pathname.includes("admin") && <DarkBG />}
            {location.pathname === info.routes.loginPage && <MatrixBG />}
            {location.pathname.includes("admin") && <AdminMatrixBG />}
            {
                <div className="appContainer">
                    {isIntroScreenOpen ? (
                        <IntroScreen isIntroScreenOpen={isIntroScreenOpen} setIsIntroScreenOpen={setIsIntroScreenOpen} />
                    ) : isAfterIntroLoad ? (
                        <IntroLoadingScreen />
                    ) : (
                        <>
                            {location.pathname !== info.routes.loginPage && !location.pathname.includes("admin") && <Header />}
                            <Routes>
                                <Route path={info.routes.frontPage} element={<FrontPage />} />
                                <Route path={info.routes.dashboardPage} element={<DashboardPage />} />
                                <Route path={info.routes.loginPage} element={<LoginPage />} />
                                <Route path={info.routes.homePage} element={<HomePage />} />
                                <Route path={info.routes.homePageAdmin} element={<HomePageAdmin />} />
                                <Route path={info.routes.profilePage} element={<ProfilePage />} />
                                <Route path={info.routes.profilePageAdmin} element={<ProfilePageAdmin />} />
                                <Route path={info.routes.projectsPage} element={<ProjectsPage />} />
                                <Route path={info.routes.projectsPageAdmin} element={<ProjectsPageAdmin />} />
                                <Route path={info.routes.projectPage} element={<ProjectPage />} />
                                <Route path={info.routes.projectPageAdmin} element={<ProjectPageAdmin />} />
                                <Route path={info.routes.videosPage} element={<VideosPage />} />
                                <Route path={info.routes.videosPageAdmin} element={<VideosPageAdmin />} />
                                <Route path={info.routes.videoPage} element={<VideoPage />} />
                                <Route path={info.routes.videoPageAdmin} element={<VideoPageAdmin />} />
                                <Route path={info.routes.goalsPage} element={<GoalsPage />} />
                                <Route path={info.routes.goalsPageAdmin} element={<GoalsPageAdmin />} />
                                <Route path={info.routes.cvPage} element={<CVPage />} />
                                <Route path={info.routes.cvPageAdmin} element={<CVPageAdmin />} />
                            </Routes>
                            {location.pathname !== info.routes.loginPage && !location.pathname.includes("admin") && <Footer />}
                        </>
                    )}
                </div>
            }
        </>
    );
}

export default App;
