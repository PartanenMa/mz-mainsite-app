import { useState, useEffect } from "react";
import DBstate from "/src/Components/DBstate/DBstate.jsx";
import { info } from "/src/Constants/Info.jsx";
import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoPage.scss";

function VideoPage() {
    const [loadingData, setLoadingData] = useState(true);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            //setVideoData(data.videosData);
            setLoadingData(false);
        }, [1000]);
    }, []);

    return (
        <div className="vPV">
            <div className="videoPageContainer">
                <VideoPageTitle />
                <Description loadingData={loadingData} />
                <Video loadingData={loadingData} />
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

function Description({ loadingData }) {
    return (
        <div className="videoDescriptionContainer">
            <div className="videoDescriptionTitle">
                <h3>
                    DESCRIPTION
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="videoDescriptionContent"></div>
        </div>
    );
}

function Video({ loadingData }) {
    return (
        <div className="videoContainer">
            <div className="videoTitle">
                <h3>
                    VIDEO
                    <DBstate loading={loadingData} />
                </h3>
            </div>
            <div className="videoContent"></div>
        </div>
    );
}

export default VideoPage;
