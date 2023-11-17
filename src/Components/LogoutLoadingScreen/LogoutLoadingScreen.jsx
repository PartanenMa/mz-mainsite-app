import "./LogoutLoadingScreen.scss";

function LogoutLoadingScreen() {
    return (
        <div className="logoutLoadingScreenContainer">
            <LoadingLogo />
            <LoadingTitleContainer />
            <LoadingSection />
        </div>
    );
}

function LoadingLogo() {
    return (
        <div className="logoutLoadingLogoContainer">
            <div className="logoutMatrixLogo"></div>
        </div>
    );
}

function LoadingTitleContainer() {
    return (
        <svg className="logoutLoadingTitleContainer" viewBox="0 0 74 14">
            <g id="page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="artboard" transform="translate(-9.000000, -7.000000)">
                    <g id="group-2" transform="translate(9.000000, 7.000000)">
                        <rect id="rectangle" x="0" y="0" width="74" height="14" rx="4"></rect>
                        <g id="group" transform="translate(4.000000, 3.500000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <polyline
                                className="path"
                                id="m"
                                stroke="green"
                                transform="translate(3.000000, 3.500000) scale(-1, 1) translate(-3.000000, -3.500000) "
                                points="6 6.5 6 0.5 3 3.5 3.66373598e-15 0.5 3.66373598e-15 6.5"
                            ></polyline>
                            <path
                                className="path"
                                d="M10,6.5 L10,2.5 C10,1.3954305 10.8954305,0.5 12,0.5 C13.1045695,0.5 14,1.3954305 14,2.5 L14,6.5 L14,6.5 L14,4.5 L10,4.5"
                                id="a"
                                stroke="lightgreen"
                            ></path>
                            <polyline className="path" id="t" stroke="#03a062" points="22 0.5 18 0.5 20 0.5 20 6.5"></polyline>
                            <path
                                className="path"
                                d="M26,6.5 L26,0.5 L28,0.5 C29.1045695,0.5 30,1.3954305 30,2.5 C30,3.6045695 29.1045695,4.5 28,4.5 L26,4.5 L26,4.5 L28,4.5 L30,6.5"
                                id="r"
                                stroke="green"
                            ></path>
                            <polyline className="path" id="i" stroke="lightgreen" points="34 0.5 34 6.5"></polyline>
                            <path className="path" d="M38,6.5 L42,0.5" id="x2" stroke="#03a062"></path>
                            <path className="path" d="M38,0.5 L42,6.5" id="x1" stroke="#03a062"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

function LoadingSection() {
    return (
        <div className="logoutLoadingContainer">
            <h2>LOADING...</h2>
            <div className="logoutLogo_reactL" alt="React logo L" />
        </div>
    );
}

export default LogoutLoadingScreen;
