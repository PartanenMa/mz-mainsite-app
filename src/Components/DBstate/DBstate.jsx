import { data } from "/src/Constants/Data.jsx";
import "./DBstate.scss";

function DBstate(props) {
    return data.statusDB !== "disabled" && <Status props={props} />;
}

function Status({ props }) {
    return props.loading ? <div className="loader"></div> : <span className={data?.statusDB ? "titleDBstateMain" : "titleDBstateBackup"}>FROM: {data?.statusDB ? "DB MAIN" : "DB BACKUP"}</span>;
}

export default DBstate;
