import { useState, useEffect } from "react";
import GeneratePDF from "/src/Tools/GeneratePDF.jsx";
import ServerState from "/src/Components/ServerState/ServerState.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
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
        } else {
            setTimeout(() => {
                setLoadingProfessionData(false);
                setLoadingJobData(false);
            }, 1000);
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
                    <CVPageContent loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="cvPageContainer">
                    <CVPageTitleMobile />
                    {info.api.enabled && <ServerState loading={connectionLoading} connected={connection} />}
                    <CVPageContentMobile loadingProfessionData={loadingProfessionData} loadingJobData={loadingJobData} professionData={professionData} jobData={jobData} />
                </div>
            )}
        </div>
    );
}

function CVPageTitle() {
    return (
        <div className="cvPageTitleContainer">
            <AnimatePresence>
                <motion.h2 key="cvpt" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    CV
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function CVPageContent({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    return (
        <div className="cvPageContentContainer">
            <AnimatePresence>
                <div className="cvContent">
                    <motion.h1 key="cvcn" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                        {info.LinkedIn.name}
                    </motion.h1>
                    {info.api.enabled ? (
                        !loadingProfessionData || !loadingJobData ? (
                            <motion.h2 key="porj" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}
                            </motion.h2>
                        ) : (
                            <motion.h2 style={{ fontStyle: "normal" }} key="porjloader" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                ...
                            </motion.h2>
                        )
                    ) : !loadingProfessionData || !loadingJobData ? (
                        <motion.h2 key="porj" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            {info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}
                        </motion.h2>
                    ) : (
                        <motion.h2 style={{ fontStyle: "normal" }} key="porjloader" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            ...
                        </motion.h2>
                    )}
                    <div />
                </div>
            </AnimatePresence>
            <GeneratePDF />
        </div>
    );
}

//Mobile:
function CVPageTitleMobile() {
    return (
        <div className="cvPageTitleContainerMobile">
            <AnimatePresence>
                <motion.h2 key="cvptm" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}>
                    CV
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

function CVPageContentMobile({ loadingProfessionData, loadingJobData, professionData, jobData }) {
    return (
        <div className="cvPageContentContainerMobile">
            <AnimatePresence>
                <div className="cvContentMobile">
                    <motion.h1 key="cvcnm" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }}>
                        {info.LinkedIn.name}
                    </motion.h1>
                    {info.api.enabled ? (
                        !loadingProfessionData || !loadingJobData ? (
                            <motion.h2 key="porjmobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                {jobData?.jobStatus?.employed ? jobData?.jobStatus?.job : professionData?.professionStatus?.profession}
                            </motion.h2>
                        ) : (
                            <motion.h2 style={{ fontStyle: "normal" }} key="porjloadermobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                                ...
                            </motion.h2>
                        )
                    ) : !loadingProfessionData || !loadingJobData ? (
                        <motion.h2 key="porj" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            {info.LinkedIn.employed ? info.LinkedIn.job : info.LinkedIn.profession}
                        </motion.h2>
                    ) : (
                        <motion.h2 style={{ fontStyle: "normal" }} key="porjloadermobile" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>
                            ...
                        </motion.h2>
                    )}
                    <div />
                </div>
            </AnimatePresence>
            <GeneratePDF />
        </div>
    );
}

export default CVPage;
