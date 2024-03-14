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
import GoLogo from "/src/Assets/Images/GoLogo.svg";
import ExpressjsLogo from "/src/Assets/Images/ExpressjsLogo.png";
import MongoDBLogo from "/src/Assets/Images/MongoDBLogo.png";
import MySQLLogo from "/src/Assets/Images/MySQLLogo.png";

export const dataFe = {
    professionStatus: {
        profession: "Software Developer",
        professionDetailed: "Web Developer",
        professionTech: "Front-end Developer",
        professionTechStack: "React, Sass, Express.js and MongoDB",
        professionTechStackFe: "React and Sass",
        professionTechStackBe: "Express.js and MongoDB",
        professionAdditionalTech: "Visual Studio Code, Node.js and Git",
    },
    jobStatus: {
        employed: true,
        jobTitle: "Junior Software Developer",
        company: "Visma Real Estate Oy",
        companyInfoLink: "https://vismarealestate.fi/",
        jobTechStack: "React, Sass and Go",
        jobTechStackFe: "React and Sass",
        jobTechStackBe: "Go",
        jobAdditionalTech: "Visual Studio Code, Node.js and Git",
        companyColor: "#b11226",
        companyLogo: VismaLogo,
        companyLogoH: "73px",
        companyLogoW: "420px",
    },
    technologiesData: {
        technologiesFe: [
            {
                name: "React",
                color: "#61DBFB",
                image: ReactLogo,
                size: "80%",
                infoLink: "https://react.dev/",
            },
            {
                name: "Sass",
                color: "#cc6699",
                image: SassLogo,
                size: "80%",
                infoLink: "https://sass-lang.com/",
            },
        ],
        technologiesBe: [
            {
                name: "Express.js",
                color: "#808080",
                image: ExpressjsLogo,
                size: "70%",
                infoLink: "https://expressjs.com/",
            },
            {
                name: "MongoDB",
                color: "#4DB33D",
                image: MongoDBLogo,
                size: "60%",
                infoLink: "https://www.mongodb.com/",
            },
        ],
    },
    profileData: {
        languages: [
            {
                name: "Finnish",
                proficiency: "Native proficiency",
                color: "white",
                image: FinnishFlag,
            },
            {
                name: "English",
                proficiency: "Professional working proficiency - C1",
                color: "#012169",
                image: UKFlag,
            },
            {
                name: "Swedish",
                proficiency: "Limited working proficiency - B1",
                color: "#006aa7",
                image: SwedishFlag,
            },
        ],
        educations: [
            {
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
                schoolName: "Satakunta University of Applied Sciences",
                degreeName: "Bachelor of Engineering - BE, Electrical and Automation Engineering - IT automation",
                timeAndPlace: "16.08.2021 - present, Pori, Finland",
                educationDescription:
                    "Studied information technology, automation technology and some electrical engineering, in addition to finnish, english and swedish languages, and the basics of entrepreneurship. My studies included a minimum of 240 credits worth of courses, mandatory internships, and a thesis.",
                extra: "Total credits earned: 285",
                educationSubjects: "IT infrastructure, software development, data science, automation, 3D technology, robotics, math, finnish, english, swedish, entrepreneurship",
                color: "#00a5cd",
                image: SAMKLogo,
                backgroundPosition: "",
                backgroundSize: "",
            },
        ],
        experiences: [
            {
                companyName: "Visma Real Estate Oy",
                color: "#b11226",
                image: VismaLogo,
                backgroundPosition: "20% 50%",
                backgroundSize: "90%",
                current: true,
                experiences: [
                    {
                        companyName: "Visma Real Estate Oy",
                        color: "#b11226",
                        current: false,
                        workTitle: "Intern",
                        workType: "Internship",
                        startDate: "2023-05-11",
                        endDate: "2023-08-31",
                        time: 4,
                        place: "Pori, Finland",
                        workDescription: "4-month front-end developer internship. My tasks included developing the UI of the Hausvise housing management system using React and Sass.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass",
                    },
                    {
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
                            "My part-time front-end developer job after my internship. I worked (4 days / 30 hours per week). My tasks once again included developing the UI of the Hausvise housing management system using React and Sass.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass",
                    },
                    {
                        companyName: "Visma Real Estate Oy",
                        color: "#b11226",
                        current: true,
                        workTitle: "Junior Software Developer",
                        workType: "Full-time",
                        startDate: "2024-01-01",
                        endDate: "",
                        time: 0,
                        place: "Pori, Finland",
                        workDescription:
                            "My full-stack developer job after my internship and part-time jobs. My tasks included developing the UI, and the API of the Hausvise housing management system using React, Sass and Go.",
                        workTech: "Visual Studio Code, Node.js, Git, Bash, Docker, HTML, CSS, JavaScript, React, Sass, Go",
                    },
                ],
            },
        ],
        skills: {
            webDevelopmentSoftware: {
                utilitySoftware: [
                    {
                        name: "Visual Studio Code",
                        skillLevel: "advanced",
                        color: "#0078d7",
                        image: VisualStudioCodeLogo,
                        backgroundSize: "70%",
                    },
                    {
                        name: "Node.js",
                        skillLevel: "advanced",
                        color: "#3c873a",
                        image: NodejsLogo,
                        backgroundSize: "80%",
                    },
                    {
                        name: "Git",
                        skillLevel: "advanced",
                        color: "#F1502F",
                        image: GitLogo,
                        backgroundSize: "70%",
                    },
                ],
                cLISoftware: [
                    {
                        name: "Bash",
                        skillLevel: "advanced",
                        color: "darkgreen",
                        image: BashLogo,
                        backgroundSize: "80%",
                    },
                    {
                        name: "PowerShell",
                        skillLevel: "intermediate",
                        color: "#012456",
                        image: PowerShellLogo,
                        backgroundSize: "80%",
                    },
                ],
                containerizationSoftware: [
                    {
                        name: "Docker",
                        skillLevel: "advanced",
                        color: "#0db7ed",
                        image: DockerLogo,
                        backgroundSize: "80%",
                    },
                    {
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
                        name: "HTML",
                        skillLevel: "advanced",
                        color: "#e34c26",
                        image: HTMLLogo,
                        backgroundSize: "75%",
                    },
                    {
                        name: "CSS",
                        skillLevel: "advanced",
                        color: "#264de4",
                        image: CSSLogo,
                        backgroundSize: "55%",
                    },
                    {
                        name: "JavaScript",
                        skillLevel: "advanced",
                        color: "#f0db4f",
                        image: JavaScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        name: "TypeScript",
                        skillLevel: "beginner",
                        color: "#007acc",
                        image: TypeScriptLogo,
                        backgroundSize: "65%",
                    },
                ],
                frontEndFrameworks: [
                    {
                        name: "React",
                        skillLevel: "advanced",
                        color: "#61dbfb",
                        image: ReactLogo,
                        backgroundSize: "65%",
                    },
                ],
                cSSFrameworks: [
                    {
                        name: "Sass",
                        skillLevel: "advanced",
                        color: "#cc6699",
                        image: SassLogo,
                        backgroundSize: "70%",
                    },
                    {
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
                        name: "JavaScript",
                        skillLevel: "experienced",
                        color: "#f0db4f",
                        image: JavaScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        name: "TypeScript",
                        skillLevel: "beginner",
                        color: "#007acc",
                        image: TypeScriptLogo,
                        backgroundSize: "65%",
                    },
                    {
                        name: "Go",
                        skillLevel: "beginner",
                        color: "#00add8",
                        image: GoLogo,
                        backgroundSize: "90%",
                    },
                ],
                backEndFrameworks: [
                    {
                        name: "Express.js",
                        skillLevel: "experienced",
                        color: "#808080",
                        image: ExpressjsLogo,
                        backgroundSize: "70%",
                    },
                ],
                databases: [
                    {
                        name: "MongoDB",
                        skillLevel: "beginner",
                        color: "#4DB33D",
                        image: MongoDBLogo,
                        backgroundSize: "60%",
                    },
                    {
                        name: "MySQL",
                        skillLevel: "beginner",
                        color: "#00758F",
                        image: MySQLLogo,
                        backgroundSize: "70%",
                    },
                ],
            },
        },
    },
    projectsData: [
        {
            title: 0,
            type: "",
            description: "",
            tech: "",
            image: "",
            link: "",
        },
        /*{
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
            title: 0,
            category: "",
            description: "",
            tags: "",
            image: "",
            link: "",
        },
        /*{
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
            title: "Learn back-end development",
            status: "inprogress",
            step1: {
                step: "Learn back-end programming languages such as JavaScript, TypeScript, and Go.",
                status: "inprogress",
            },
            step2: {
                step: "Learn a back-end framework.",
                status: "inprogress",
            },
            step3: {
                step: "Learn to use non-relational (NoSQL) - and relational (SQL) databases.",
                status: "inprogress",
            },
        },
    ],
};
