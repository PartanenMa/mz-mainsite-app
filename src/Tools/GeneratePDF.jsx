import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PDF from "/src/Assets/Templates/PDF.jsx";

function GeneratePDF() {
    const [isHovered, setIsHovered] = useState(false);
    const pdfRef = useRef();

    const downloadPDF = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px",
        });

        doc.setFont("Inter-Regular", "normal");

        doc.html(pdfRef.current, {
            async callback(doc) {
                try {
                    await doc.save("CV Manu Partanen");
                } catch (error) {
                    console.error("Error saving PDF:", error);
                }
            },
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const componentStyles = {
        height: "68px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    const buttonStyles = {
        backgroundColor: "green",
        color: "white",
        height: "48px",
        width: "207px",
        cursor: "pointer",
        float: "left",
        borderRadius: "10px",
        border: "1px solid white",
        fontSize: "28px",
        fontStyle: "italic",
        fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
        transition: "filter 300ms",
        position: "relative",
    };

    const buttonHoverStyles = {
        backgroundColor: "lightgreen",
        color: "green",
        border: "1px solid green",
        transition: "background-color 500ms ease-in-out",
        filter: "drop-shadow(0 0 2em #03a062)",
    };

    return (
        <div style={componentStyles}>
            <div style={{ display: "none" }} ref={pdfRef}>
                <PDF />
            </div>
            <button
                style={{
                    ...buttonStyles,
                    ...(isHovered && buttonHoverStyles),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={downloadPDF}
            >
                Download CV
            </button>
        </div>
    );
}

export default GeneratePDF;
