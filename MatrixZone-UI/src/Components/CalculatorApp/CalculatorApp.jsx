import { useState } from "react";
import "./CalculatorApp.css";

function CalculatorApp() {
    const [number, setNumber] = useState(0.0);

    return (
        <div className="CalculatorAppContainer">
            <h3>CalculatorApp</h3>
            <div className="CalcScreen"><h4>{number}</h4></div>
            <div className="CalcButtons">

            </div>
        </div>
    );
}

export default CalculatorApp;