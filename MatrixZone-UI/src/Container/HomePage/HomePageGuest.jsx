import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import LoadingScreen from "/src/Components/LoadingScreen/LoadingScreen.jsx";
import HeaderGuest from "/src/Components/Header/HeaderGuest.jsx";
import NavGuest from "/src/Components/Nav/NavGuest.jsx";
import FooterGuest from "/src/Components/Footer/FooterGuest.jsx";
import TimeAndDate from "/src/Components/CurrentTime/TimeAndDate.jsx";
import { info } from "/src/Constants/Info.jsx";
import reactLogo from "/src/Assets/Images/React.svg";
import user from "/src/Assets/Images/User.png";
import "./HomePage.css";

function HomePageGuest() {
    const load = sessionStorage.getItem("load");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Simulate loading for 1 second:
        const timer = setTimeout(() => {
            setLoading(false);
            if (load === "true") {
                notification.success({
                    message: "LOGGED IN AS GUEST",
                    description: "Welcome to the MatrixZone!",
                    placement: "bottomLeft",
                    style: {
                        backgroundColor: "lightgreen",
                        border: "3px solid green",
                    },
                });
            }
            sessionStorage.setItem("load", "false");
        }, 1000);

        //Clean up the timer to prevent memory leaks:
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading && load === "true" ? (
                //Loading component here:
                <LoadingScreen />
            ) : (
                <div>
                    <HeaderGuest />
                    <NavGuest />
                    <div className="HomePageContainer">
                        <FirstSection />
                    </div>
                    <FooterGuest />
                </div>
            )}
        </div>
    );
}

function FirstSection() {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisibleW, setIsVisibleW] = useState(true);
    const [BGoption, setBGoption] = useState("OFF");
    const [isGIFVisible, setIsGIFVisible] = useState(true);
    const ref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        let option = document.getElementsByClassName("OptionBall")[0];
        let bg = document.getElementsByClassName("OptionBG")[0];
        const GIF = sessionStorage.getItem("isGuestGIF");
        if (GIF === "true") {
            setBGoption("ON");
            option.style.left = "60px";
            bg.style.backgroundColor = "lightgreen";
        } else {
            setBGoption("OFF");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        }
    }, []);

    useEffect(() => {
        setIsGIFVisible(BGoption === "ON");
    }, [BGoption]);

    function option() {
        let option = document.getElementsByClassName("OptionBall")[0];
        let bg = document.getElementsByClassName("OptionBG")[0];
        if (BGoption === "ON") {
            setBGoption("OFF");
            sessionStorage.setItem("isGuestGIF", "false");
            option.style.left = "0px";
            bg.style.backgroundColor = "#111";
        } else if (BGoption === "OFF") {
            setBGoption("ON");
            sessionStorage.setItem("isGuestGIF", "true");
            option.style.left = "60px";
            bg.style.backgroundColor = "lightgreen";
        }
    }

    function displayUser1() {
        setIsVisibleW(true);
        setIsVisible3(false);
        setIsVisible2(false);
        setIsVisible1(true);
    }

    function displayUser2() {
        setIsVisibleW(false);
        setIsVisible3(false);
        setIsVisible2(true);
        setIsVisible1(false);
    }

    function displayUser3() {
        setIsVisible2(false);
        setIsVisible3(true);
    }

    function logOut() {
        let option = document.getElementsByClassName("OptionBall")[0];
        setBGoption("OFF");
        option.style.left = "0px";
        sessionStorage.setItem("isGuestGIF", "false");
        setIsVisible2(false);
        setIsVisible1(true);
        navigate(info.routes.loginPage);
        notification.warning({
            message: "LOGGED OUT!",
            description: "You've logged out of the MatrixZone.",
            placement: "bottomLeft",
            style: {
                backgroundColor: "yellow",
                border: "3px solid orange",
            },
        });
    }

    const contentStyle = {
        height: "600px",
        lineHeight: "160px",
        textAlign: "center",
        overflow: "hidden",
    };

    return (
        <div className="FirstSectionContainer">
            <div className="Breadcrumb">
                <h2>Guest / home</h2>
            </div>
            <div className={`LogOutSectionGuest ${isGIFVisible ? "ShowGIF" : ""}`}>
                <div
                    className="LogOutContainer1"
                    style={{ display: isVisible1 ? "block" : "none" }}
                    onClick={() => displayUser2()}
                >
                    <img src={reactLogo} className="logo_react" alt="React logo" />
                    <img src={user} className="LogoGuest1" alt="User logo" />
                    <h3 className="NameGuest">Guest</h3>
                </div>
                <div className="LogOutContainer2Guest" style={{ display: isVisible2 ? "block" : "none" }}>
                    <h3>Guest</h3>
                    <button className="X-buttonGuest" onClick={() => displayUser1()}>
                        X
                    </button>
                    <img src={user} className="LogoGuest2" alt="User logo" />
                    <button className="SettingsButtonGuest" onClick={() => displayUser3()}>
                        Settings
                    </button>
                    <button className="LogOutButtonGuest" onClick={() => logOut()}>
                        Log out
                    </button>
                </div>
                <div className="LogOutContainer3" style={{ display: isVisible3 ? "block" : "none" }}>
                    <h3>Settings</h3>
                    <button className="Settings_X-button" onClick={() => displayUser1()}>
                        X
                    </button>
                    <p className="OptionText">BG GIF: {BGoption}</p>
                    <div className="OptionBG" onClick={() => option()}>
                        <div className="OptionBall"></div>
                    </div>
                    <button className="SettingsBackButton" onClick={() => displayUser2()}>
                        Back
                    </button>
                </div>
                <div className="Clock" style={{ display: isVisibleW ? "block" : "none" }}>
                    <TimeAndDate />
                </div>
                <h2 className="Welcome" style={{ display: isVisibleW ? "block" : "none" }}>
                    WELCOME GUEST
                </h2>
            </div>
            <section className="HomeFirstSectionCarousel">
                <div className="CarouselContainer">
                    <Carousel autoplay dots={false} effect="scroll" ref={ref}>
                        <div>
                            <div className="CarouselSlide1" style={contentStyle}>
                                <div className="CarouselItem1">
                                    <div className="NameAndJob">
                                        <h2 className="Name">{info.LinkedIn.name}</h2>
                                        <h2 className="JobTitle">{info.LinkedIn.profession}</h2>
                                    </div>
                                    <div className="Photo"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="CarouselSlide2" style={contentStyle}>
                                <div className="CarouselItem2"></div>
                            </div>
                        </div>
                        <div>
                            <div className="CarouselSlide3" style={contentStyle}>
                                <div className="CarouselItem3"></div>
                            </div>
                        </div>
                    </Carousel>
                </div>
                <button
                    className="CarouselButtonLeft"
                    onClick={() => {
                        ref.current.prev();
                    }}
                >
                    <CaretLeftFilled style={{ color: "#03A062", fontSize: 40 }} />
                </button>
                <button
                    className="CarouselButtonRight"
                    onClick={() => {
                        ref.current.next();
                    }}
                >
                    <CaretRightFilled style={{ color: "#03A062", fontSize: 40 }} />
                </button>
            </section>
            <section className="HomeFirstSection1">
                <div className="CheckMyProfile">
                    <h2>CHECK OUT MY PROFILE!</h2>
                </div>
                <div className="GoToMyProfile">
                    <a className="Photo" href={info.LinkedIn.link} target="_blank"></a>
                    <div className="ProfileTextBox">
                        <a href={info.LinkedIn.link} title="My LinkedIn" target="_blank"></a>
                        <h3>LinkedIn</h3>
                        <p>{info.LinkedIn.user}</p>
                        <p>{info.LinkedIn.jobTitle}</p>
                        <button className="GoToProfile" onClick={() => navigate(info.routes.profilePageGuest)}>
                            Profile
                        </button>
                    </div>
                    <div className="Box1"></div>
                </div>
            </section>
            <section className="HomeFirstSection2">
                <div className="CheckMyProjects">
                    <h2>CHECK OUT MY PROJECTS!</h2>
                </div>
                <div className="GoToMyProjects">
                    <a className="GHLogo" href={info.GitHub.link} target="_blank"></a>
                    <div className="ProjectsTextBox">
                        <a href={info.GitHub.link} title="My GitHub" target="_blank"></a>
                        <h3>GitHub</h3>
                        <p>{info.GitHub.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <button className="GoToProjects" onClick={() => navigate(info.routes.projectsPageGuest)}>
                            Projects
                        </button>
                    </div>
                    <div className="Box2"></div>
                </div>
            </section>
            <section className="HomeFirstSection3">
                <div className="CheckMyVideos">
                    <h2>CHECK OUT MY VIDEOS!</h2>
                </div>
                <div className="GoToMyVideos">
                    <a className="YTLogo" href={info.YouTube.link} target="_blank"></a>
                    <div className="VideosTextBox">
                        <a href={info.YouTube.link} title="My YouTube" target="_blank"></a>
                        <h3>YouTube</h3>
                        <p>{info.YouTube.user}</p>
                        <p>{info.LinkedIn.name}</p>
                        <button className="GoToVideos" onClick={() => navigate(info.routes.videosPageGuest)}>
                            Videos
                        </button>
                    </div>
                    <div className="Box3"></div>
                </div>
            </section>
        </div>
    );
}

export default HomePageGuest;
