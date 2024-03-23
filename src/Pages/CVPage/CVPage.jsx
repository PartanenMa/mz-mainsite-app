import { useState, useEffect } from "react";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.scss";

function CVPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
            {windowWidth >= 1280 && (
                <div className="cvPageContainer">
                    <CVPageTitle />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <CVPageContent />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="cvPageContainer">
                    <CVPageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <CVPageContentMobile />
                </div>
            )}
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

//Mobile:
function CVPageTitleMobile() {
    return (
        <div className="cvPageTitleContainerMobile">
            <h2>CV</h2>
        </div>
    );
}

function CVPageContentMobile() {
    return (
        <div className="cvPageContentContainerMobile">
            <div className="cvContentMobile">
                <h1>{info.LinkedIn.name}</h1>
                <h2>{info.LinkedIn.profession}</h2>
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
