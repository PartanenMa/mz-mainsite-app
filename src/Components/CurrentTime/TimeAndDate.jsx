import { useState, useEffect } from "react";
import "./TimeAndDate.css";

function TimeAndDate() {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setClock(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    return (
        <div className="TimeAndDateContainer">
            <h2 className="Time">
                Time: <span style={{ color: "lightgreen" }}>{clock.toLocaleTimeString()}</span>
            </h2>
            <h2 className="Date">
                Date: <span style={{ color: "green" }}>{clock.toLocaleDateString()}</span>
            </h2>
        </div>
    );
}

export default TimeAndDate;
