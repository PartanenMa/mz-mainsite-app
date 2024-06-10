import { dataFe } from "./Data.jsx";
import ReactLogo from "/src/Assets/Images/ReactLogo.svg";
import SassLogo from "/src/Assets/Images/SassLogo.svg";
import ExpressjsLogo from "/src/Assets/Images/ExpressjsLogo.png";
import MongoDBLogo from "/src/Assets/Images/MongoDBLogo.png";

const deployToGitHubPages = false;

export const info = {
    version: "Release 1.4.1",
    routes: {
        frontPage: deployToGitHubPages ? "/MatrixZone-APP/" : "/",
        dashboardPage: deployToGitHubPages ? "/MatrixZone-APP/admin/dashboard" : "/admin/dashboard",
        loginPage: deployToGitHubPages ? "/MatrixZone-APP/login" : "/login",
        homePage: deployToGitHubPages ? "/MatrixZone-APP/home" : "/home",
        homePageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/home" : "/admin/home",
        profilePage: deployToGitHubPages ? "/MatrixZone-APP/profile" : "/profile",
        profilePageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/profile" : "/admin/profile",
        projectsPage: deployToGitHubPages ? "/MatrixZone-APP/projects" : "/projects",
        projectsPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/projects" : "/admin/projects",
        projectPage: deployToGitHubPages ? "/MatrixZone-APP/projects/view/:id" : "/projects/view/:id",
        projectPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/projects/view/:id" : "/admin/projects/view/:id",
        videosPage: deployToGitHubPages ? "/MatrixZone-APP/videos" : "/videos",
        videosPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/videos" : "/admin/videos",
        videoPage: deployToGitHubPages ? "/MatrixZone-APP/videos/watch/:id" : "/videos/watch/:id",
        videoPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/videos/watch/:id" : "/admin/videos/watch/:id",
        goalsPage: deployToGitHubPages ? "/MatrixZone-APP/goals" : "/goals",
        goalsPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/goals" : "/admin/goals",
        cvPage: deployToGitHubPages ? "/MatrixZone-APP/cv" : "/cv",
        cvPageAdmin: deployToGitHubPages ? "/MatrixZone-APP/admin/cv" : "/admin/cv",
    },
    testLoginFe: {
        enabled: false,
        adminUserName: "AdminTest",
        adminPassword: "admintest",
    },
    api: {
        enabled: false,
    },
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
        {
            name: "Express.js",
            color: "#808080",
            image: ExpressjsLogo,
            size: "70%",
        },
        {
            name: "MongoDB",
            color: "#4DB33D",
            image: MongoDBLogo,
            size: "60%",
        },
    ],
    fpModalText: {
        introduction:
            "Welcome to the MatrixZone, my personal website, and your gateway to discovering the world of software development through my unique perspective. Whether you're a potential client, collaborator, or simply curious about the possibilities of programming, MatrixZone is your one-stop destination to discover the power of my expertise.",
        profile:
            "As someone who deeply values innovation in software development, I welcome you to take a glimpse at my profile to see the skills and experiences I've acquired over time. I've had the opportunity to work on various software solutions, and to improve my programming skills while doing so.",
        projects:
            "MatrixZone is not just a showcase of my skills; it's a testament to my dedication and commitment to excellence. Through a carefully curated collection of projects, you'll gain insight into my problem-solving abilities, attention to detail, and ability to tackle complex challenges head-on.",
        //videos: "But that's not all. MatrixZone also offers a glimpse into my journey as a software developer through captivating videos. From behind-the-scenes looks at my projects to thought-provoking discussions on industry trends, these videos provide a window into my world and the passion that drives me.",
    },
    profile: {
        //Site data:
        siteName: "LinkedIn",
        //Account data:
        user: "Manu Partanen",
        name: "Manu Partanen",
        phoneNumber: "0440602810",
        emailAddress: "manu111.partanen@gmail.com",
        link: "https://www.linkedin.com/in/manu-partanen-7864b4265/",
        //Profile description:
        description1: "Hello, I'm Manu Partanen, a passionate software developer specializing in web development.",
        description2:
            "With a strong foundation in HTML, CSS, and JavaScript, I enjoy creating dynamic and responsive websites using modern front-end technologies like " +
            (dataFe.jobStatus.employed ? dataFe.jobStatus.jobTechStackFe : dataFe.professionStatus.professionTechStackFe) +
            ". On the back-end, I'm currently working with " +
            (dataFe.jobStatus.employed ? dataFe.jobStatus.jobTechStackBe : dataFe.professionStatus.professionTechStackBe) +
            ". " +
            (dataFe.jobStatus.employed ? "Besides my job, " : "") +
            "I love working on my own projects during my free time using the skills that I've gained, and enjoy learning new tools and technologies while doing so.",
        description3:
            "In addition to my technical skills, I am a strong collaborator and enjoy working in agile development environments. I believe in continuous learning and staying up-to-date with the latest tech and best practices.",
        //Skills titles:
        skillsTitle1: "Web development software",
        skillsTitle2: "Front-end development",
        skillsTitle3: "Back-end development",
        skills1SubTitle1: "Utility software",
        skills1SubTitle2: "CLI software",
        skills1SubTitle3: "Containerization software",
        skills2SubTitle1: "Front-end programming languages",
        skills2SubTitle2: "Front-end frameworks",
        skills2SubTitle3: "CSS frameworks",
        skills3SubTitle1: "Back-end programming languages",
        skills3SubTitle2: "Back-end frameworks",
        skills3SubTitle3: "Databases",
        //Profession:
        profession: dataFe.professionStatus.profession,
        professionDetailed: dataFe.professionStatus.professionDetailed,
        professionTech: dataFe.professionStatus.professionTech,
        professionTechStack: dataFe.professionStatus.professionTechStack,
        professionAdditionalTech: dataFe.professionStatus.professionAdditionalTech,
        //Job:
        employed: dataFe.jobStatus.employed ? dataFe.jobStatus.employed : false,
        job: dataFe.jobStatus.employed ? dataFe.jobStatus.job : "",
        jobDetailed: dataFe.jobStatus.employed ? dataFe.jobStatus.jobDetailed : "",
        jobTech: dataFe.jobStatus.employed ? dataFe.jobStatus.jobTech : "",
        jobTitle: dataFe.jobStatus.employed ? dataFe.jobStatus.jobTitle : "",
        company: dataFe.jobStatus.employed ? dataFe.jobStatus.company : "",
        companyInfoLink: dataFe.jobStatus.employed ? dataFe.jobStatus.companyInfoLink : "",
        jobTechStack: dataFe.jobStatus.employed ? dataFe.jobStatus.jobTechStack : "",
        jobAdditionalTech: dataFe.jobStatus.employed ? dataFe.jobStatus.jobAdditionalTech : "",
        companyColor: dataFe.jobStatus.employed ? dataFe.jobStatus.companyColor : "",
        companyLogo: dataFe.jobStatus.employed ? dataFe.jobStatus.companyLogo : "",
        companyLogoH: dataFe.jobStatus.employed ? dataFe.jobStatus.companyLogoH : "",
        companyLogoW: dataFe.jobStatus.employed ? dataFe.jobStatus.companyLogoW : "",
    },
    projects: {
        //Site data:
        siteName: "GitHub",
        //Account data:
        user: "PartanenMa",
        link: "https://github.com/PartanenMa",
        //Profile description:
        description1: "Hello, I'm Manu Partanen, a passionate software developer specializing in web development. Feel free to explore my projects.",
        description2: "",
        description3: "",
    },
    videos: {
        //Site data:
        siteName: "YouTube",
        //Account data:
        user: "Manunaama",
        link: "https://www.youtube.com/channel/UCsEePl0jBNlnqYYnyjdQW5g",
        //Profile description:
        description1: "NOT YET AVAILABLE",
        description2: "",
        description3: "",
    },
    CV: {
        isDisabled: true,
    },
};
