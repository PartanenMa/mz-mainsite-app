import { useState, useEffect } from "react";
import "./TimeAndDate.scss";

function TimeAndDate() {
    const [clock, setClock] = useState(new Date());
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        var timer = setInterval(() => setClock(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 1280 && (
                <div className="timeAndDateContainer">
                    <h2 className="time">
                        ⌚ <span style={{ color: "lightgreen", fontStyle: "italic" }}>{clock.toLocaleTimeString()}</span>
                    </h2>
                    <h2 className="date">
                        📅 <span style={{ color: "green", fontStyle: "italic" }}>{clock.toLocaleDateString()}</span>
                    </h2>
                </div>
            )}
            {windowWidth < 1280 && (
                <div className="timeAndDateContainerMobile">
                    <h2 className="timeMobile">
                        ⌚ <span style={{ color: "lightgreen", fontStyle: "italic" }}>{clock.toLocaleTimeString()}</span>
                    </h2>
                    <h2 className="dateMobile">
                        📅 <span style={{ color: "green", fontStyle: "italic" }}>{clock.toLocaleDateString()}</span>
                    </h2>
                </div>
            )}
        </>
    );
}

export default TimeAndDate;
