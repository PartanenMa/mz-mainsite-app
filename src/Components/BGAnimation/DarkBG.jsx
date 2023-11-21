import "./DarkBG.scss";

const DarkBG = () => {
    const AnimatedBGStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
    };

    const AnimationLayerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(-45deg, #333, #111, #222, #000)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 10s linear infinite",
    };

    return (
        <div style={AnimatedBGStyle}>
            <div style={AnimationLayerStyle}></div>
        </div>
    );
};

export default DarkBG;
