import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./Footer.css";

function FooterAdmin() {
    return (
        <div className="FooterContainer">
            <FooterInfoBox />
            <FooterTitle />
            <FooterBoxLeft />
            <FooterBoxMiddle />
            <FooterBoxRight />
            <FooterBoxNames />
        </div>
    );
}

function FooterInfoBox() {
    const navigate = useNavigate();

    return (
        <div className="FooterInfoBoxContainer">
            <div className="FooterInfoBoxTitle">
                <div className="FooterInfoBoxTitleLogo" onClick={() => navigate(info.routes.homePageAdmin)}></div>
                <h3>MatrixZone</h3>
            </div>
            <div className="FooterInfoBoxContent">
                <div className="FooterNav1">
                    <div className="FooterNav1">
                        <div className="FooterNav1-1">
                            <h3 onClick={() => navigate(info.routes.profilePageAdmin)}>Profile</h3>
                        </div>
                        <div className="FooterNav1-2">
                            <h3 onClick={() => navigate(info.routes.projectsPageAdmin)}>Projects</h3>
                        </div>
                        <div className="FooterNav1-3">
                            <h3 onClick={() => navigate(info.routes.videosPageAdmin)}>Videos</h3>
                        </div>
                        <div className="FooterNav1-4">
                            <h3 onClick={() => navigate(info.routes.experiencePageAdmin)}>Experience</h3>
                        </div>
                        <div className="FooterNav1-5">
                            <h3 onClick={() => navigate(info.routes.contactPageAdmin)}>Contact</h3>
                        </div>
                    </div>
                </div>
                <div className="FooterNav2">
                    <a href={info.LinkedIn.link} target="_blank">
                        <div className="FooterNav2-1">
                            <div className="LinkedInLogoContainer">
                                <div className="LinkedInLogo"></div>
                            </div>
                            <h3>LinkedIn</h3>
                        </div>
                    </a>
                    <a href={info.GitHub.link} target="_blank">
                        <div className="FooterNav2-2">
                            <div className="GitHubLogoContainer">
                                <div className="GitHubLogo"></div>
                            </div>
                            <h3>GitHub</h3>
                        </div>
                    </a>
                    <a href="" target="_blank">
                        <div className="FooterNav2-3">
                            <div className="YouTubeLogoContainer">
                                <div className="YouTubeLogo"></div>
                            </div>
                            <h3>YouTube</h3>
                        </div>
                    </a>
                </div>
                <div className="FooterNav3">
                    <div className="FooterNav3-1">
                        <h3></h3>
                    </div>
                    <div className="FooterNav3-2">
                        <h3></h3>
                    </div>
                    <div className="FooterNav3-3">
                        <h3></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FooterTitle() {
    return (
        <div className="FooterTitleText">
            <h3>MADE USING:</h3>
        </div>
    );
}

function FooterBoxLeft() {
    return (
        <div className="LeftBox">
            <a href="https://react.dev" target="_blank">
                <div className="ReactLogo"></div>
            </a>
        </div>
    );
}

function FooterBoxMiddle() {
    return (
        <div className="MiddleBox">
            <a href="https://vitejs.dev" target="_blank">
                <div className="ViteLogo"></div>
            </a>
        </div>
    );
}

function FooterBoxRight() {
    return (
        <div className="RightBox">
            <a
                href="https://en.wikipedia.org/wiki/JavaScript#:~:text=JavaScript%20(%2F%CB%88d%CA%92%C9%91%CB%90v,often%20incorporating%20third-party%20librarie"
                target="_blank"
            >
                <div className="JSLogo"></div>
            </a>
        </div>
    );
}

function FooterBoxNames() {
    return (
        <div className="FooterNames">
            <h3 id="ReactText">React</h3>
            <h3 id="ViteText">Vite</h3>
            <h3 id="JSText">JavaScript</h3>
        </div>
    );
}

export default FooterAdmin;
