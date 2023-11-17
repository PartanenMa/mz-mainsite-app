import { useState, useEffect } from "react";
import "./TimeAndDate.scss";

function TimeAndDate() {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setClock(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    return (
        <div className="timeAndDateContainer">
            <h2 className="time">
                ⌚ <span style={{ color: "lightgreen", fontStyle: "italic" }}>{clock.toLocaleTimeString()}</span>
            </h2>
            <h2 className="date">
                📅 <span style={{ color: "green", fontStyle: "italic" }}>{clock.toLocaleDateString()}</span>
            </h2>
        </div>
    );
}

export default TimeAndDate;
