import "./LogoutLoadingScreen.css";

function LogoutLoadingScreen() {
    return (
        <div className="LogoutLoadingScreenContainer">
            <LoadingLogo />
            <LoadingTitleContainer />
            <LoadingSection />
        </div>
    );
}

function LoadingLogo() {
    return (
        <div className="LogoutLoadingLogoContainer">
            <div className="LogoutMatrixLogo"></div>
        </div>
    );
}

function LoadingTitleContainer() {
    return (
        <svg className="LogoutLoadingTitleContainer" viewBox="0 0 74 14">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard" transform="translate(-9.000000, -7.000000)">
                    <g id="Group-2" transform="translate(9.000000, 7.000000)">
                        <rect id="Rectangle" x="0" y="0" width="74" height="14" rx="4"></rect>
                        <g
                            id="Group"
                            transform="translate(4.000000, 3.500000)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        >
                            <polyline
                                className="Path"
                                id="m"
                                stroke="green"
                                transform="translate(3.000000, 3.500000) scale(-1, 1) translate(-3.000000, -3.500000) "
                                points="6 6.5 6 0.5 3 3.5 3.66373598e-15 0.5 3.66373598e-15 6.5"
                            ></polyline>
                            <path
                                className="Path"
                                d="M10,6.5 L10,2.5 C10,1.3954305 10.8954305,0.5 12,0.5 C13.1045695,0.5 14,1.3954305 14,2.5 L14,6.5 L14,6.5 L14,4.5 L10,4.5"
                                id="a"
                                stroke="lightgreen"
                            ></path>
                            <polyline
                                className="Path"
                                id="t"
                                stroke="#03a062"
                                points="22 0.5 18 0.5 20 0.5 20 6.5"
                            ></polyline>
                            <path
                                className="Path"
                                d="M26,6.5 L26,0.5 L28,0.5 C29.1045695,0.5 30,1.3954305 30,2.5 C30,3.6045695 29.1045695,4.5 28,4.5 L26,4.5 L26,4.5 L28,4.5 L30,6.5"
                                id="r"
                                stroke="green"
                            ></path>
                            <polyline className="Path" id="i" stroke="lightgreen" points="34 0.5 34 6.5"></polyline>
                            <path className="Path" d="M38,6.5 L42,0.5" id="x2" stroke="#03a062"></path>
                            <path className="Path" d="M38,0.5 L42,6.5" id="x1" stroke="#03a062"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

function LoadingSection() {
    return (
        <div className="LogoutLoadingContainer">
            <h2>LOADING...</h2>
            <div className="LogoutLogo_reactL" alt="React logo L" />
        </div>
    );
}

export default LogoutLoadingScreen;
