import { useState, useEffect } from "react";
import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./DBstate.scss";

function DBstate(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        info.api.enabled && (
            <>
                {windowWidth >= 1280 && <Status props={props} />}
                {windowWidth < 1280 && <StatusMobile props={props} />}
            </>
        )
    );
}

function Status({ props }) {
    return props.loading ? (
        <AnimatePresence>
            <motion.span className="titleDBloading" key="titledbloading" transition={{ delay: 0.3 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                LOADING...
            </motion.span>
        </AnimatePresence>
    ) : (
        <AnimatePresence>
            <motion.span className={props.statusDB ? "titleDBstateMain" : "titleDBstateBackup"} key="titledb" transition={{ delay: 0.3 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                DATA FETCH {props.statusDB ? "SUCCESS" : "FAILED"}
            </motion.span>
        </AnimatePresence>
    );
}

//Mobile:
function StatusMobile({ props }) {
    return props.loading ? (
        <AnimatePresence>
            <motion.span className="titleDBloadingMobile" key="titledbloadingMobile" transition={{ delay: 0.3 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                LOADING...
            </motion.span>
        </AnimatePresence>
    ) : (
        <AnimatePresence>
            <motion.span
                className={props.statusDB ? "titleDBstateMainMobile" : "titleDBstateBackupMobile"}
                key="titledbmobile"
                transition={{ delay: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                DATA FETCH {props.statusDB ? "SUCCESS" : "FAILED"}
            </motion.span>
        </AnimatePresence>
    );
}

export default DBstate;
