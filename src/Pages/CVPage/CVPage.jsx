import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.scss";

function CVPage() {
    return (
        <div className="cvP">
            <div className="cvPageContainer">
                <CVPageTitle />
                <CVPageContent />
            </div>
        </div>
    );
}

function CVPageTitle() {
    return (
        <div className="cvPageTitleContainer">
            <h2>CV</h2>
        </div>
    );
}

function CVPageContent() {
    return (
        <div className="cvPageContentContainer">
            <div className="cvContent">
                <h1>{info.LinkedIn.name}</h1>
                <h2>{info.LinkedIn.profession}</h2>
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
