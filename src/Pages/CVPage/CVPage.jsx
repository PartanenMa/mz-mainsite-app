import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.css";

function CVPage() {
    return (
        <div className="CVP">
            <div className="CVPageContainer">
                <CVPageTitle />
                <CVPageContent />
            </div>
        </div>
    );
}

function CVPageTitle() {
    return (
        <div className="CVPageTitleContainer">
            <h2>CV</h2>
        </div>
    );
}

function CVPageContent() {
    return (
        <div className="CVPageContentContainer">
            <div className="CVContent">
                <h1>{info.LinkedIn.name}</h1>
                <h2>{info.LinkedIn.profession}</h2>
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
