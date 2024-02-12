//Languages:
import FinnishFlag from "/src/Assets/Images/FinnishFlag.svg";
import UKFlag from "/src/Assets/Images/UKFlag.svg";
import SwedishFlag from "/src/Assets/Images/SwedishFlag.svg";
//Education:
import FDFLogo from "/src/Assets/Images/FDFLogo.svg";
import SAMKLogo from "/src/Assets/Images/SAMKLogo.png";
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
import PythonLogo from "/src/Assets/Images/PythonLogo.svg";
import GoLogo from "/src/Assets/Images/GoLogo.svg";
import CsLogo from "/src/Assets/Images/CsLogo.svg";
import PHPLogo from "/src/Assets/Images/PHPLogo.svg";
import ExpressjsLogo from "/src/Assets/Images/ExpressjsLogo.png";
import MongoDBLogo from "/src/Assets/Images/MongoDBLogo.png";
import MySQLLogo from "/src/Assets/Images/MySQLLogo.png";
//Experience:
import VismaLogo from "/src/Assets/Images/VismaLogo.svg";

export const dataFe = {
    professionStatus: {
        profession: "Software Developer",
        professionDetailed: "Web Developer",
        professionTech: "Front-end Developer",
        professionTechStack: "React, Sass, Express.js and MongoDB",
        professionTechStackFe: "React and Sass",
        professionTechStackBe: "Express.js and MongoDB",
        professionAdditionalTech: "Visual Studio Code and Git",
    },
    jobStatus: {
        employed: true,
        jobTitle: "Junior Software Developer",
        company: "Visma Real Estate Oy",
        companyInfoLink: "https://vismarealestate.fi/",
        jobTechStack: "React, Sass and Go",
        jobTechStackFe: "React and Sass",
        jobTechStackBe: "Go",
        jobAdditionalTech: "Visual Studio Code and Git",
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
            },
            {
                schoolName: "Finnish Defence Forces",
                degreeName: "Military Service, Pori Brigade / Satakunta Artillery Regiment / Mortar Company - Mortar Squad Leader",
                timeAndPlace: "09.07.2018 - 20.06.2019 (1 year), Niinisalo, Finland",
                educationDescription:
                    "Learned basic infantryman skills and tactics in basic training, specialized mortar skills and tactics in specialized training, and leadership skills in NCO school.",
                extra: "Military rank: Corporal",
                educationSubjects: "Basic infantryman tactics and skills, mortar tactics and skills, leadership skills",
                color: "red",
                image: FDFLogo,
            },
            {
                schoolName: "Satakunta University of Applied Sciences",
                degreeName: "Bachelor of Engineering - BE, Electrical and Automation Engineering - IT automation",
                timeAndPlace: "16.08.2021 - present, Pori, Finland",
                educationDescription:
                    "Studied information technology, automation technology and some electrical engineering, in addition to finnish, english and swedish languages, and the basics of entrepreneurship. My studies included a minimum of 240 credits worth of courses, mandatory internships, and a thesis.",
                extra: "Total credits earned: 279",
                educationSubjects: "IT infrastructure, software development, automation, 3D technology, robotics",
                color: "#00a5cd",
                image: SAMKLogo,
            },
        ],
        skills: {
            webDevelopmentSoftware: [
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
                {
                    name: "Bash",
                    skillLevel: "experienced",
                    color: "darkgreen",
                    image: BashLogo,
                    backgroundSize: "80%",
                },
                {
                    name: "PowerShell",
                    skillLevel: "experienced",
                    color: "#012456",
                    image: PowerShellLogo,
                    backgroundSize: "80%",
                },
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
            frontEndDevelopment: [
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
                {
                    name: "React",
                    skillLevel: "advanced",
                    color: "#61dbfb",
                    image: ReactLogo,
                    backgroundSize: "65%",
                },
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
            backEndDevelopment: [
                {
                    name: "Python",
                    skillLevel: "experienced",
                    color: "#4b8bbe",
                    image: PythonLogo,
                    backgroundSize: "60%",
                },
                {
                    name: "Go",
                    skillLevel: "beginner",
                    color: "#00add8",
                    image: GoLogo,
                    backgroundSize: "90%",
                },
                {
                    name: "C#",
                    skillLevel: "experienced",
                    color: "#682876",
                    image: CsLogo,
                    backgroundSize: "65%",
                },
                {
                    name: "PHP",
                    skillLevel: "beginner",
                    color: "#8993be",
                    image: PHPLogo,
                    backgroundSize: "90%",
                },
                {
                    name: "Express.js",
                    skillLevel: "beginner",
                    color: "#808080",
                    image: ExpressjsLogo,
                    backgroundSize: "70%",
                },
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
        experiences: [
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Intern - Internship",
                workTimeAndPlace: "11.5.2023 - 31.8.2023 (4 months), Pori, Finland",
                workDescription: "4-month front-end developer internship at Visma Real Estate Oy. My tasks included developing the UI of the Hausvise housing management system using React and Sass.",
                workTech: "Bash, Visual Studio Code, Git, HTML, CSS, JavaScript, React, Sass, Node.js, Docker",
                color: "#b11226",
                image: VismaLogo,
            },
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Junior Software Developer - Part-time (4 days / 30 hours per week)",
                workTimeAndPlace: "1.9.2023 - 31.12.2023 (4 months), Pori, Finland",
                workDescription:
                    "My first real front-end developer job at Visma Real Estate Oy after my internship there. I worked part-time (4 days / 30 hours per week). My tasks once again included developing the UI of the Hausvise housing management system using React and Sass.",
                workTech: "Bash, Visual Studio Code, Git, HTML, CSS, JavaScript, React, Sass, Node.js, Docker",
                color: "#b11226",
                image: VismaLogo,
            },
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Junior Software Developer - Full-time",
                workTimeAndPlace: "1.1.2024 - present, Pori, Finland",
                workDescription:
                    "My full-stack developer job at Visma Real Estate Oy after my internship and part-time job there. My tasks now include developing the UI, and the API of the Hausvise housing management system using React, Sass and Go.",
                workTech: "Bash, Visual Studio Code, Git, HTML, CSS, JavaScript, React, Sass, Go, Node.js, Docker",
                color: "#b11226",
                image: VismaLogo,
            },
        ],
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
            title: "Learn basic programming",
            status: "completed",
            step1: {
                step: "Learn programming languages such as C++ and Java.",
                status: "completed",
            },
            step2: {
                step: "Learn data structures, algorithms and heuristics.",
                status: "completed",
            },
            step3: {
                step: "Learn to design, develop and test software.",
                status: "completed",
            },
        },
        {
            title: "Learn CLI software",
            status: "completed",
            step1: {
                step: "Learn basic commands.",
                status: "completed",
            },
            step2: {
                step: "Learn advanced commands.",
                status: "completed",
            },
            step3: {
                step: "Learn scripting.",
                status: "completed",
            },
        },
        {
            title: "Learn utility software",
            status: "completed",
            step1: {
                step: "Learn to use code editing - and version control software.",
                status: "completed",
            },
            step2: {
                step: "Learn to use notepad - and screenshot tools.",
                status: "completed",
            },
            step3: {
                step: "Learn to use browser dev tools.",
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
                step: "Learn back-end programming languages such as Python, Go, C# and PHP.",
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
        {
            title: "Learn web development software",
            status: "inprogress",
            step1: {
                step: "Learn to use JavaScript runtime environment software.",
                status: "completed",
            },
            step2: {
                step: "Learn to use app containerization software.",
                status: "completed",
            },
            step3: {
                step: "Learn to use container orchestration software.",
                status: "inprogress",
            },
        },
    ],
};
