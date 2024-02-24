import { info } from "/src/Constants/Info.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./DBstate.scss";

function DBstate(props) {
    return info.api.enabled && <Status props={props} />;
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

export default DBstate;
