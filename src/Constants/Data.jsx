//Languages:
import FinnishFlag from "/src/Assets/Images/FinnishFlag.svg";
import UKFlag from "/src/Assets/Images/UKFlag.svg";
import SwedishFlag from "/src/Assets/Images/SwedishFlag.svg";
//Education:
import FDFLogo from "/src/Assets/Images/FDFLogo.svg";
import SAMKLogo from "/src/Assets/Images/SAMKLogo.png";
//Skills (utility software):
import VisualStudioCodeLogo from "/src/Assets/Images/VisualStudioCodeLogo.svg";
import DockerLogo from "/src/Assets/Images/DockerLogo.svg";
import GitLogo from "/src/Assets/Images/GitLogo.svg";
//Skills (scripting):
import BashLogo from "/src/Assets/Images/BashLogo.svg";
import PowerShellLogo from "/src/Assets/Images/PowerShellLogo.png";
import MacTerminalLogo from "/src/Assets/Images/MacTerminalLogo.png";
//Skills (basic programming languages):
import CppLogo from "/src/Assets/Images/CppLogo.svg";
import JavaLogo from "/src/Assets/Images/JavaLogo.svg";
import CsLogo from "/src/Assets/Images/CsLogo.svg";
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
import PHPLogo from "/src/Assets/Images/PHPLogo.svg";
import SQLLogo from "/src/Assets/Images/SQLLogo.svg";
import NoSQLLogo from "/src/Assets/Images/NoSQLLogo.png";
import NodejsLogo from "/src/Assets/Images/NodejsLogo.svg";
//Experience:
import VismaLogo from "/src/Assets/Images/VismaLogo.svg";

export const data = {
    technologiesUsed: [
        {
            name: "React",
            color: "#61DBFB",
            image: ReactLogo,
            size: "80%",
        },
        {
            name: "Sass",
            color: "#cc6699",
            image: SassLogo,
            size: "80%",
        },
        /*{
            name: "Node.js",
            color: "#3c873a",
            image: NodejsLogo,
            size: "80%",
        },
        {
            name: "DB",
            color: "#3c873a",
            image: NodejsLogo,
            size: "80%",
        },*/
    ],
    professionStatus: {
        profession: "Software Developer",
        professionDetailed: "Web Developer",
        professionTech: "Front-end Developer",
        professionTechStack: "React",
        professionAdditionalTech: "Visual Studio Code, Docker and Git",
    },
    jobStatus: {
        jobTitle: "Junior Software Developer",
        company: "Visma Real Estate Oy",
        companyInfoLink: "https://vismarealestate.fi/",
        jobTechStack: "React and Sass",
        jobAdditionalTech: "Visual Studio Code, Docker and Git",
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
                name: "Node.js",
                color: "#3c873a",
                image: NodejsLogo,
                size: "80%",
                infoLink: "https://nodejs.org/en/",
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
            basicProgrammingLanguages: [
                {
                    name: "C++",
                    skillLevel: "beginner",
                    color: "#044f88",
                    image: CppLogo,
                    backgroundSize: "65%",
                },
                {
                    name: "Java",
                    skillLevel: "experienced",
                    color: "#f89820",
                    image: JavaLogo,
                    backgroundSize: "100%",
                },
                {
                    name: "C#",
                    skillLevel: "experienced",
                    color: "#682876",
                    image: CsLogo,
                    backgroundSize: "65%",
                },
            ],
            utilitySoftware: [
                {
                    name: "Visual Studio Code",
                    skillLevel: "advanced",
                    color: "#0078d7",
                    image: VisualStudioCodeLogo,
                    backgroundSize: "70%",
                },
                {
                    name: "Docker",
                    skillLevel: "advanced",
                    color: "#0db7ed",
                    image: DockerLogo,
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
            scripting: [
                {
                    name: "Bash (Linux)",
                    skillLevel: "experienced",
                    color: "darkgreen",
                    image: BashLogo,
                    backgroundSize: "80%",
                },
                {
                    name: "PowerShell (Windows)",
                    skillLevel: "experienced",
                    color: "#012456",
                    image: PowerShellLogo,
                    backgroundSize: "80%",
                },
                /*{
                    name: "Mac Terminal (macOS)",
                    skillLevel: "beginner",
                    color: "#222",
                    image: MacTerminalLogo,
                    backgroundSize: "80%",
                },*/
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
                    skillLevel: "intermediate",
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
                    name: "PHP",
                    skillLevel: "beginner",
                    color: "#8993be",
                    image: PHPLogo,
                    backgroundSize: "90%",
                },
                {
                    name: "SQL",
                    skillLevel: "beginner",
                    color: "#00a5cd",
                    image: SQLLogo,
                    backgroundSize: "60%",
                },
                {
                    name: "NoSQL",
                    skillLevel: "beginner",
                    color: "#0072b1",
                    image: NoSQLLogo,
                    backgroundSize: "60%",
                },
                {
                    name: "Node.js (with Express.js)",
                    skillLevel: "intermediate",
                    color: "#3c873a",
                    image: NodejsLogo,
                    backgroundSize: "90%",
                },
            ],
        },
        experiences: [
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Intern - Internship",
                workTimeAndPlace: "11.5.2023 - 31.8.2023 (4 months), Pori, Finland",
                workDescription: "4-month front-end developer internship at Visma Real Estate Oy. My tasks included developing the UI of the Hausvise housing management system using React and Sass.",
                workTech: "Git, HTML, CSS, JavaScript, React, Sass, Node.js, Docker",
                color: "#b11226",
                image: VismaLogo,
            },
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Junior Software Developer - Part-time (4 days / 30 hours per week)",
                workTimeAndPlace: "1.9.2023 - 31.12.2023 (4 months), Pori, Finland",
                workDescription:
                    "My first real front-end developer job at Visma Real Estate Oy after my internship there. I worked part-time (4 days / 30 hours per week). My tasks once again included developing the UI of the Hausvise housing management system using React and Sass.",
                workTech: "Git, HTML, CSS, JavaScript, React, Sass, Node.js, Docker",
                color: "#b11226",
                image: VismaLogo,
            },
            {
                companyName: "Visma Real Estate Oy",
                workTitle: "Junior Software Developer - Full-time",
                workTimeAndPlace: "1.1.2024 - present, Pori, Finland",
                workDescription:
                    "My full-stack developer job at Visma Real Estate Oy after my internship and part-time job there. My tasks now include developing the UI, and the API of the Hausvise housing management system using React, Sass and Go.",
                workTech: "Git, HTML, CSS, JavaScript, React, Sass, Go, Node.js, Docker",
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
                step: "Learn programming languages such as C++, Java, and C#.",
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
            title: "Learn utility software",
            status: "completed",
            step1: {
                step: "Learn to use code editing software.",
                status: "completed",
            },
            step2: {
                step: "Learn to use app containerization software.",
                status: "completed",
            },
            step3: {
                step: "Learn to use version control software.",
                status: "completed",
            },
        },
        {
            title: "Learn scripting",
            status: "completed",
            step1: {
                step: "Learn Bash scripting.",
                status: "completed",
            },
            step2: {
                step: "Learn PowerShell scripting.",
                status: "completed",
            },
            step3: {
                step: "Learn Mac Terminal scripting.",
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
                step: "Learn back-end programming languages such as Python, Go, PHP, SQL and NoSQL.",
                status: "inprogress",
            },
            step2: {
                step: "Learn a back-end framework.",
                status: "inprogress",
            },
            step3: {
                step: "Learn to use relational (SQL) - and non-relational (NoSQL) databases.",
                status: "inprogress",
            },
        },
        {
            title: "Learn full-stack development",
            status: "inprogress",
            step1: {
                step: "Learn networking.",
                status: "inprogress",
            },
            step2: {
                step: "Learn system security principles.",
                status: "inprogress",
            },
            step3: {
                step: "Pick and learn a tech stack.",
                status: "inprogress",
            },
        },
    ],
};
