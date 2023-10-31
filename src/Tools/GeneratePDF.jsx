import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import PDF from "/src/Assets/Templates/PDF.jsx";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";

function GeneratePDF() {
    const [isDisabled, setIsDisabled] = useState(info.CV.isDisabled);
    const [isHovered, setIsHovered] = useState(false);
    const pdfRef = useRef(null);

    useEffect(() => {
        setIsDisabled(info.CV.isDisabled);
    }, []);

    const downloadPDF = () => {
        const pdf = new jsPDF({
            format: "a4",
            unit: "px",
        });

        pdf.setFont("Inter-Regular", "normal");

        pdf.html(pdfRef.current, {
            async callback(pdf) {
                pdf.save("CV_Manu_Partanen.pdf");
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

    const buttonDisabledStyles = {
        backgroundColor: "lightgray",
        color: "gray",
        border: "1px solid gray",
        cursor: "not-allowed",
    };

    return (
        <div style={componentStyles}>
            <AnimatePresence>
                <motion.button
                    title={isDisabled ? "Currently not available" : ""}
                    style={{
                        ...buttonStyles,
                        ...(isHovered && buttonHoverStyles),
                        ...(isDisabled && buttonDisabledStyles),
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={downloadPDF}
                    key="pdfbtn"
                    whileHover={
                        !isDisabled
                            ? {
                                  scale: 1.05,
                                  transition: { duration: 0.1 },
                              }
                            : ""
                    }
                    whileTap={!isDisabled ? { scale: 0.9 } : ""}
                    disabled={isDisabled}
                >
                    Download CV
                </motion.button>
            </AnimatePresence>
            <div style={{ display: "none" }}>
                <div ref={pdfRef}>
                    <PDF />
                </div>
            </div>
        </div>
    );
}

export default GeneratePDF;
