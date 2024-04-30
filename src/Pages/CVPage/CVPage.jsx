import { useState, useEffect } from "react";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import "./CVPage.scss";

function CVPage() {
    const [connectionLoading, setConnectionLoading] = useState(true);
    const [connection, setConnection] = useState(false);
    const [loadingProfessionData, setLoadingProfessionData] = useState(true);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [professionData, setProfessionData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (info.api.enabled) {
            checkConnection();
            getProfession();
            getJob();
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

    const getProfession = () => {
        fetch("/profession", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setProfessionData(data);
                setTimeout(() => {
                    setLoadingProfessionData(false);
                }, 1000);
            });
    };

    const getJob = () => {
        fetch("/job", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (res) => {
                const statusCode = res.status;

                if (statusCode < 400) {
                    const statusCode = res.status;
                    const data = res.json();
                    return data;
                } else {
                    return;
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setJobData(data);
                    setLoadingJobData(false);
                }, 1000);
            });
    };

    return (
        <div className="cvP">
            {windowWidth >= 1280 && (
                <div className="cvPageContainer">
                    <CVPageTitle />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <CVPageContent jobData={jobData} professionData={professionData} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="cvPageContainer">
                    <CVPageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <CVPageContentMobile jobData={jobData} professionData={professionData} />
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

function CVPageContent({ jobData, professionData }) {
    return (
        <div className="cvPageContentContainer">
            <div className="cvContent">
                <h1>{info.LinkedIn.name}</h1>
                {info.api.enabled ? (
                    <h2>{jobData?.jobStatus.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}</h2>
                ) : (
                    <h2>{info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}</h2>
                )}
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

function CVPageContentMobile({ jobData, professionData }) {
    return (
        <div className="cvPageContentContainerMobile">
            <div className="cvContentMobile">
                <h1>{info.LinkedIn.name}</h1>
                {info.api.enabled ? (
                    <h2>{jobData?.jobStatus.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}</h2>
                ) : (
                    <h2>{info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}</h2>
                )}
                <div />
            </div>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
