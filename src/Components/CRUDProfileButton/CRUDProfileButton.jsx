import { motion, AnimatePresence } from "framer-motion";
import "./CRUDProfileButton.scss";

function CRUDProfileButton(props) {
    const CRUD = (action, item, data) => {
        if (item === "languages") {
            if (action === "create") {
                createLanguage(data);
            } else if (action === "read") {
                getLanguages();
            } else if (action === "update") {
                modifyLanguage(data);
            } else if (action === "delete") {
                deleteLanguage(data);
            }
        } else if (item === "education") {
            if (action === "create") {
                createEducation(data);
            } else if (action === "read") {
                getEducations();
            } else if (action === "update") {
                modifyEducation(data);
            } else if (action === "delete") {
                deleteEducation(data);
            }
        } else if (item === "experience") {
            if (action === "create") {
                createExperience(data);
            } else if (action === "read") {
                getExperiences();
            } else if (action === "update") {
                modifyExperience(data);
            } else if (action === "delete") {
                deleteExperience(data);
            }
        } else if (item === "skills") {
            if (action === "create") {
                createSkill(data);
            } else if (action === "read") {
                getSkills();
            } else if (action === "update") {
                modifySkill(data);
            } else if (action === "delete") {
                deleteSkill(data);
            }
        }
    };

    //Languages:
    const createLanguage = (data) => {
        console.log(data);
    };

    const getLanguages = () => {
        console.log(data);
    };

    const modifyLanguage = (data) => {
        console.log(data);
    };

    const deleteLanguage = (data) => {
        console.log(data);
    };

    //Education:
    const createEducation = (data) => {
        console.log(data);
    };

    const getEducations = () => {
        console.log(data);
    };

    const modifyEducation = (data) => {
        console.log(data);
    };

    const deleteEducation = (data) => {
        console.log(data);
    };

    //Experience:
    const createExperience = (data) => {
        console.log(data);
    };

    const getExperiences = () => {
        console.log(data);
    };

    const modifyExperience = (data) => {
        console.log(data);
    };

    const deleteExperience = (data) => {
        console.log(data);
    };

    //Skills:
    const createSkill = (data) => {
        console.log(data);
    };

    const getSkills = () => {
        console.log(data);
    };

    const modifySkill = (data) => {
        console.log(data);
    };

    const deleteSkill = (data) => {
        console.log(data);
    };

    return props.loading ? (
        <AnimatePresence>
            <motion.p className="CRUDProfileBtnLoading" key="crudprofilebtnloading" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
                LOADING...
            </motion.p>
        </AnimatePresence>
    ) : (
        <AnimatePresence>
            <motion.button
                className="profileBtn"
                onClick={() => CRUD(props.action, props.item, props.data)}
                key="profilebtn"
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
            >
                {props.action.toUpperCase()}
            </motion.button>
        </AnimatePresence>
    );
}

export default CRUDProfileButton;
