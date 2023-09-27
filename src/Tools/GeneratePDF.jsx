import { useState, useRef } from "react";
import jsPDF from "jspdf";
import PDF from "/src/Assets/Templates/PDF.jsx";
import { motion, AnimatePresence } from "framer-motion";

function GeneratePDF() {
    const [isHovered, setIsHovered] = useState(false);
    const pdfRef = useRef(null);

    const downloadPDF = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px",
        });

        doc.setFont("Inter-Regular", "normal");

        doc.html(pdfRef.current, {
            async callback(doc) {
                doc.save("CV Manu Partanen.pdf");
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
            <AnimatePresence>
                <motion.button
                    style={{
                        ...buttonStyles,
                        ...(isHovered && buttonHoverStyles),
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={downloadPDF}
                    key="pdfbtn"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
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
