import { useNavigate } from "react-router-dom";
import { info } from "/src/Constants/Info.jsx";
import "./AboutPage.css";

function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="AboutPageContent">
            <div className="AboutContainer">
                <div className="AboutTitle">
                    <h2>What is the MatrixZone?</h2>
                </div>
                <div className="About">
                    <p>
                        Welcome to the MatrixZone! Here, I invite you to delve into my
                        <br />world of passion and creativity. As an enthusiast in the realm of software development, this platform serves as a window into my
                        <br />programming journey.
                        <br />
                        <br />Explore my profile to discover the mind behind the projects that
                        <br />blend imagination with ingenuity, and immerse yourself in my
                        <br />diverse project portfolio, where innovation meets determination.
                        <br />
                        <br />From coding marvels to ingenious experiments, MatrixZone is a
                        <br />testament to my journey of growth and exploration as a fellow
                        <br />software developer.
                    </p>
                </div>
                <div className="Back">
                    <button className="BackButton" onClick={() => navigate(info.routes.loginPage)}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;