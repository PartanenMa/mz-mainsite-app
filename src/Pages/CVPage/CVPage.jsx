import { useState, useEffect } from "react";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.scss";

function CVPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
        }
    }, []);

    const checkConnection = () => {
        fetch("/connection", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            const statusCode = res.status;

            if (statusCode === 200) {
                setConnection(true);
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setConnectionLoading(false);
                }, 300);
            }
        });
    };

    return (
        <div className="cvP">
            <div className="cvPageContainer">
                <CVPageTitle />
                {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
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
