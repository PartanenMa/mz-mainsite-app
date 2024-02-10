import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { dataFe } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoPage.scss";

function VideoPage() {
    const [loadingVideoData, setLoadingVideoData] = useState(true);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            //setVideoData(dataFe.videosData);
            setLoadingVideoData(false);
        }, [1000]);
    }, []);

    return (
        <div className="vPV">
            <div className="videoPageContainer">
                <VideoPageTitle />
                <Description loadingVideoData={loadingVideoData} />
                <Video loadingVideoData={loadingVideoData} />
            </div>
        </div>
    );
}

function VideoPageTitle() {
    return (
        <div className="videoPageTitleContainer">
            <h2>VIDEO NAME</h2>
        </div>
    );
}

function Description({ loadingVideoData }) {
    return (
        <div className="videoDescriptionContainer">
            <div className="videoDescriptionTitle">
                <h3>
                    DESCRIPTION
                    <DBstate loading={loadingVideoData} />
                </h3>
            </div>
            <div className="videoDescriptionContent"></div>
        </div>
    );
}

function Video({ loadingVideoData }) {
    return (
        <div className="videoContainer">
            <div className="videoTitle">
                <h3>
                    VIDEO
                    <DBstate loading={loadingVideoData} />
                </h3>
            </div>
            <div className="videoContent"></div>
        </div>
    );
}

export default VideoPage;
