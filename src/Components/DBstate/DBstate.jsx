import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./DBstate.scss";

function DBstate(props) {
    return info.api.enabled && <Status props={props} />;
}

function Status({ props }) {
    return props.loading ? (
        <div className="loader"></div>
    ) : (
        <AnimatePresence>
            <motion.span className={props.statusDB ? "titleDBstateMain" : "titleDBstateBackup"} key="titledb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                DATA FETCH {props.statusDB ? "SUCCESS" : "FAILED"}
            </motion.span>
        </AnimatePresence>
    );
}

export default DBstate;
