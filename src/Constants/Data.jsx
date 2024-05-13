//Languages:
import FinnishFlag from "/src/Assets/Images/FinnishFlag.svg";
import UKFlag from "/src/Assets/Images/UKFlag.svg";
import SwedishFlag from "/src/Assets/Images/SwedishFlag.svg";
//Education:
import SAMKLogo from "/src/Assets/Images/SAMKLogo.png";
//Experience:
import VismaLogo from "/src/Assets/Images/VismaLogo.svg";
//Skills (web development software):
import VisualStudioCodeLogo from "/src/Assets/Images/VisualStudioCodeLogo.svg";
import NodejsLogo from "/src/Assets/Images/NodejsLogo.svg";
import GitLogo from "/src/Assets/Images/GitLogo.svg";
import BashLogo from "/src/Assets/Images/BashLogo.svg";
import PowerShellLogo from "/src/Assets/Images/PowerShellLogo.png";
import DockerLogo from "/src/Assets/Images/DockerLogo.svg";
import KubernetesLogo from "/src/Assets/Images/KubernetesLogo.svg";
//Skills (front-end development):
import HTMLLogo from "/src/Assets/Images/HTMLLogo.svg";
import CSSLogo from "/src/Assets/Images/CSSLogo.svg";
import JavaScriptLogo from "/src/Assets/Images/JavaScriptLogo.svg";
import TypeScriptLogo from "/src/Assets/Images/TypeScriptLogo.svg";
import ReactLogo from "/src/Assets/Images/ReactLogo.svg";
import SassLogo from "/src/Assets/Images/SassLogo.svg";
import TailwindCSSLogo from "/src/Assets/Images/TailwindCSSLogo.svg";
//Skills (back-end development):
import CsLogo from "/src/Assets/Images/CsLogo.svg";
import GoLogo from "/src/Assets/Images/GoLogo.svg";
import ExpressjsLogo from "/src/Assets/Images/ExpressjsLogo.png";
import MongoDBLogo from "/src/Assets/Images/MongoDBLogo.png";
import MariaDBLogo from "/src/Assets/Images/MariaDBLogo.svg";
import PostgreSQLLogo from "/src/Assets/Images/PostgreSQLLogo.svg";
import MySQLLogo from "/src/Assets/Images/MySQLLogo.png";

export const dataFe = {
    professionStatus: {
        profession: "Software Developer",
        professionDetailed: "Web Developer",
        professionTech: "Full-stack Developer",
        professionTechStack: "React, Sass, Express.js and MongoDB",
        professionTechStackFe: "React and Sass",
        professionTechStackBe: "Express.js and MongoDB",
        professionAdditionalTech: "Visual Studio Code, Node.js and Git",
    },
    jobStatus: {
        employed: true,
        job: "Software Developer",
        jobDetailed: "Web Developer",
        jobTech: "Full-stack Developer",
        jobTitle: "Junior Software Developer",
        company: "Visma Sirius Oy",
        companyInfoLink: "https://vismarealestate.fi/",
        jobTechStack: "React, Sass, Go and MariaDB",
        jobTechStackFe: "React and Sass",
        jobTechStackBe: "Go and MariaDB",
        jobAdditionalTech: "Visual Studio Code, Node.js and Git",
        companyColor: "#b11226",
        companyLogo: VismaLogo,
        companyLogoH: "73px",
        companyLogoW: "420px",
    },
    technologiesDataP: {
        technologiesFe: [
            {
                id: 0,
                name: "React",
                color: "#61DBFB",
                image: ReactLogo,
                size: "80%",
                infoLink: "https://react.dev/",
            },
            {
                id: 1,
                name: "Sass",
                color: "#cc6699",
                image: SassLogo,
                size: "80%",
                infoLink: "https://sass-lang.com/",
            },
        ],
        technologiesBe: [
            {
                id: 0,
                name: "Express.js",
                color: "#808080",
                image: ExpressjsLogo,
                size: "70%",
                infoLink: "https://expressjs.com/",
            },
            {
                id: 1,
                name: "MongoDB",
                color: "#4DB33D",
                image: MongoDBLogo,
                size: "60%",
                infoLink: "https://www.mongodb.com/",
            },
        ],
    },
    technologiesDataJ: {
        technologiesFe: [
            {
                id: 0,
                name: "React",
                color: "#61DBFB",
                image: ReactLogo,
                size: "80%",
                infoLink: "https://react.dev/",
            },
            {
                id: 1,
                name: "Sass",
                color: "#cc6699",
                image: SassLogo,
                size: "80%",
                infoLink: "https://sass-lang.com/",
            },
        ],
        technologiesBe: [
            {
                id: 0,
                name: "Go",
                color: "#00add8",
                image: GoLogo,
                size: "90%",
                infoLink: "https://go.dev/",
            },
            {
                id: 1,
                name: "MariaDB",
                color: "darkblue",
                image: MariaDBLogo,
                size: "90%",
                infoLink: "https://mariadb.org/",
            },
        ],
    },
    profileData: {
        languages: [
            {
                id: 0,
                name: "Finnish",
                proficiency: "Native proficiency",
                color: "white",
                image: FinnishFlag,
            },
            {
                id: 1,
                name: "English",
                proficiency: "Professional working proficiency - C1",
                color: "#012169",
                image: UKFlag,
            },
            {
                id: 2,
                name: "Swedish",
                proficiency: "Limited working proficiency - B1",
                color: "#006aa7",
                image: SwedishFlag,
            },
        ],
        educations: [
            {
                id: 0,
                schoolName: "PSYL",
                degreeName: "High School Diploma",
                timeAndPlace: "11.08.2014 - 05.12.2017 (3 years and 4 months), Pori, Finland",
                educationDescription: "3 and a half year high school education. Studied regular school subjects in addition to psychology and philosophy.",
                educationSubjects: "Biology, psychology, philosophy, geography, history, math, physics, chemistry, finnish, english, swedish, arts, music, IT, PE",
                color: "gray",
                image: "",
                backgroundPosition: "",
                backgroundSize: "",
            },
            {
                id: 1,
                schoolName: "Satakunta University of Applied Sciences",
                degreeName: "Bachelor of Engineering - BE, Electrical and Automation Engineering - IT automation",
                timeAndPlace: "16.08.2021 - present, Pori, Finland",
                educationDescription:
                    "Studied information technology, automation technology and some electrical engineering, in addition to finnish, english and swedish languages, and the basics of entrepreneurship. My studies included a minimum of 240 credits worth of courses, mandatory internships, and a thesis.",
                extra: "Total credits earned: 290",
                educationSubjects: "IT infrastructure, data science, software development, automation, 3D technology, robotics, math, finnish, english, swedish, entrepreneurship",
                color: "#00a5cd",
                image: SAMKLogo,
                backgroundPosition: "",
                backgroundSize: "",
            },
        ],
        experiences: [
            {
                id: 0,
                companyName: "Visma Sirius Oy",
                color: "#b11226",
                image: VismaLogo,
                backgroundPosition: "20% 50%",
                backgroundSize: "90%",
                current: true,
                roles: [
                    {
                        id: 0,
                        companyName: "Visma Real Estate Oy",
                        color: "#b11226",
                        current: false,
                        workTitle: "Intern",
                        workType: "Internship",
                        startDate: "2023-05-11",
                        endDate: "2023-08-31",
                        time: 4,
                        place: "Pori, Finland",
                        workDescription: "4-month front-end developer internship. My tasks included developing the front-end of the Hausvise housing management system using React and Sass.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass",
                    },
                    {
                        id: 1,
                        companyName: "Visma Real Estate Oy",
                        color: "#b11226",
                        current: false,
                        workTitle: "Junior Software Developer",
                        workType: "Part-time (4 days / 30 hours per week)",
                        startDate: "2023-09-01",
                        endDate: "2023-12-31",
                        time: 4,
                        place: "Pori, Finland",
                        workDescription:
                            "My part-time front-end developer job after my internship. I worked (4 days / 30 hours per week). My tasks once again included developing the front-end of the Hausvise housing management system using React and Sass.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass",
                    },
                    {
                        id: 2,
                        companyName: "Visma Sirius Oy",
                        color: "#b11226",
                        current: true,
                        workTitle: "Junior Software Developer",
                        workType: "Full-time",
                        startDate: "2024-01-01",
                        endDate: "",
                        time: 0,
                        place: "Pori, Finland",
                        workDescription:
                            "My full-stack developer job after my internship and part-time jobs. My tasks included developing the front-end, and the back-end of the Hausvise housing management system using React, Sass, Go and MariaDB.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass, Go, MariaDB",
                    },
                ],
            },
        ],
        skills: {
            webDevelopmentSoftware: {
                utilitySoftware: [
                    {
                        id: 0,
                        name: "Visual Studio Code",
                        skillLevel: "advanced",
                        color: "#0078d7",
                        image: VisualStudioCodeLogo,
                        backgroundSize: "70%",
                    },
                    {
                        id: 1,
                        name: "Node.js",
                        skillLevel: "advanced",
                        color: "#3c873a",
                        image: NodejsLogo,
                        backgroundSize: "80%",
                    },
                    {
                        id: 2,
                        name: "Git",
                        skillLevel: "advanced",
                        color: "#F1502F",
                        image: GitLogo,
                        backgroundSize: "70%",
                    },
                ],
                cLISoftware: [
                    {
                        id: 0,
                        name: "Bash",
                        skillLevel: "advanced",
                        color: "darkgreen",
                        image: BashLogo,
                        backgroundSize: "80%",
                    },
                    {
                        id: 1,
                        name: "PowerShell",
                        skillLevel: "intermediate",
                        color: "#012456",
                        image: PowerShellLogo,
                        backgroundSize: "80%",
                    },
                ],
                containerizationSoftware: [
                    {
                        id: 0,
                        name: "Docker",
                        skillLevel: "advanced",
                        color: "#0db7ed",
                        image: DockerLogo,
                        backgroundSize: "80%",
                    },
                    {
                        id: 1,
                        name: "Kubernetes",
                        skillLevel: "beginner",
                        color: "#3970e4",
                        image: KubernetesLogo,
                        backgroundSize: "70%",
                    },
                ],
            },
            frontEndDevelopment: {
                frontEndProgrammingLanguages: [
                    {
                        id: 0,
                        name: "HTML",
                        skillLevel: "advanced",
                        color: "#e34c26",
                        image: HTMLLogo,
                        backgroundSize: "75%",
                    },
                    {
                        id: 1,
                        name: "CSS",
                        skillLevel: "advanced",
                        color: "#264de4",
                        image: CSSLogo,
                        backgroundSize: "55%",
                    },
                    {
                        id: 2,
                        name: "JavaScript",
                        skillLevel: "advanced",
                        color: "#f0db4f",
                        image: JavaScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        id: 3,
                        name: "TypeScript",
                        skillLevel: "beginner",
                        color: "#007acc",
                        image: TypeScriptLogo,
                        backgroundSize: "65%",
                    },
                ],
                frontEndFrameworks: [
                    {
                        id: 0,
                        name: "React",
                        skillLevel: "advanced",
                        color: "#61dbfb",
                        image: ReactLogo,
                        backgroundSize: "65%",
                    },
                ],
                cSSFrameworks: [
                    {
                        id: 0,
                        name: "Sass",
                        skillLevel: "advanced",
                        color: "#cc6699",
                        image: SassLogo,
                        backgroundSize: "70%",
                    },
                    {
                        id: 1,
                        name: "Tailwind CSS",
                        skillLevel: "beginner",
                        color: "#06b6d4",
                        image: TailwindCSSLogo,
                        backgroundSize: "80%",
                    },
                ],
            },
            backEndDevelopment: {
                backEndProgrammingLanguages: [
                    {
                        id: 0,
                        name: "JavaScript",
                        skillLevel: "intermediate",
                        color: "#f0db4f",
                        image: JavaScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        id: 1,
                        name: "TypeScript",
                        skillLevel: "beginner",
                        color: "#007acc",
                        image: TypeScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        id: 2,
                        name: "C#",
                        skillLevel: "intermediate",
                        color: "#684D95",
                        image: CsLogo,
                        backgroundSize: "60%",
                    },
                    {
                        id: 3,
                        name: "Go",
                        skillLevel: "beginner",
                        color: "#00add8",
                        image: GoLogo,
                        backgroundSize: "90%",
                    },
                ],
                backEndFrameworks: [
                    {
                        id: 0,
                        name: "Express.js",
                        skillLevel: "intermediate",
                        color: "#808080",
                        image: ExpressjsLogo,
                        backgroundSize: "70%",
                    },
                ],
                databases: [
                    {
                        id: 0,
                        name: "MongoDB",
                        skillLevel: "beginner",
                        color: "#4DB33D",
                        image: MongoDBLogo,
                        backgroundSize: "60%",
                    },
                    {
                        id: 1,
                        name: "MariaDB",
                        skillLevel: "beginner",
                        color: "darkblue",
                        image: MariaDBLogo,
                        backgroundSize: "90%",
                    },
                    /*{
                        id: 2,
                        name: "PostgreSQL",
                        skillLevel: "beginner",
                        color: "#336791",
                        image: PostgreSQLLogo,
                        backgroundSize: "70%",
                    },
                    {
                        id: 3,
                        name: "MySQL",
                        skillLevel: "beginner",
                        color: "#00758f",
                        image: MySQLLogo,
                        backgroundSize: "70%",
                    },*/
                ],
            },
        },
    },
    projectsData: [
        {
            id: 0,
            title: 0,
            type: "",
            description: "",
            tech: "",
            image: "",
            link: "",
        },
        /*{
            id: 0,
            title: "Example project",
            type: "Example type...",
            description: "blablabla...",
            tech: "Example tech...",
            image: "",
            link: "https://github.com/PartanenMa",
        },*/
    ],
    videosData: [
        {
            id: 0,
            title: 0,
            category: "",
            description: "",
            tags: "",
            image: "",
            link: "",
        },
        /*{
            id: 0,
            title: "Example video",
            category: "Example category...",
            description: "blablabla...",
            tags: "Example tags...",
            image: "",
            link: "https://github.com/PartanenMa",
        },*/
    ],
    goalsData: [
        {
            id: 0,
            title: "Learn web development software",
            status: "completed",
            step1: {
                step: "Learn to use utility software such as Visual Studio Code, Node.js and Git.",
                status: "completed",
            },
            step2: {
                step: "Learn to use CLI software such as Bash and PowerShell.",
                status: "completed",
            },
            step3: {
                step: "Learn to use containerization software such as Docker and Kubernetes.",
                status: "completed",
            },
        },
        {
            id: 1,
            title: "Learn front-end development",
            status: "completed",
            step1: {
                step: "Learn front-end programming languages such as HTML, CSS, JavaScript and TypeScript.",
                status: "completed",
            },
            step2: {
                step: "Learn a front-end framework",
                status: "completed",
            },
            step3: {
                step: "Learn a CSS framework.",
                status: "completed",
            },
        },
        {
            id: 2,
            title: "Learn back-end development",
            status: "completed",
            step1: {
                step: "Learn back-end programming languages such as JavaScript, TypeScript, C# and Go.",
                status: "completed",
            },
            step2: {
                step: "Learn a back-end framework.",
                status: "completed",
            },
            step3: {
                step: "Learn to use non-relational (NoSQL) - and relational (SQL) databases.",
                status: "completed",
            },
        },
    ],
};
