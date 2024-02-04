import { data } from "/src/Constants/Data.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./DBstate.scss";

function DBstate(props) {
    return data.statusDB !== "disabled" && <Status props={props} />;
}

function Status({ props }) {
    return props.loading ? (
        <div className="loader"></div>
    ) : (
        <AnimatePresence>
            <motion.span className={data?.statusDB ? "titleDBstateMain" : "titleDBstateBackup"} key="titledb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                FROM: {data?.statusDB ? "DB MAIN" : "DB BACKUP"}
            </motion.span>
        </AnimatePresence>
    );
}

export default DBstate;
