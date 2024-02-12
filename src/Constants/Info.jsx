import { dataFe } from "./Data.jsx";
import ReactLogo from "/src/Assets/Images/ReactLogo.svg";
import SassLogo from "/src/Assets/Images/SassLogo.svg";
import ExpressjsLogo from "/src/Assets/Images/ExpressjsLogo.png";
import MongoDBLogo from "/src/Assets/Images/MongoDBLogo.png";

export const info = {
    version: "Release 1.0.21",
    routes: {
        frontPage: "/MatrixZone-APP/",
        loginPage: "/MatrixZone-APP/login",
        homePage: "/MatrixZone-APP/home",
        homePageAdmin: "/MatrixZone-APP/admin/home",
        profilePage: "/MatrixZone-APP/profile",
        profilePageAdmin: "/MatrixZone-APP/admin/profile",
        projectsPage: "/MatrixZone-APP/projects",
        projectsPageAdmin: "/MatrixZone-APP/admin/projects",
        projectPage: "/MatrixZone-APP/projects/view",
        projectPageAdmin: "/MatrixZone-APP/admin/projects/view",
        videosPage: "/MatrixZone-APP/videos",
        videosPageAdmin: "/MatrixZone-APP/admin/videos",
        videoPage: "/MatrixZone-APP/videos/view",
        videoPageAdmin: "/MatrixZone-APP/admin/videos/view",
        goalsPage: "/MatrixZone-APP/goals",
        goalsPageAdmin: "/MatrixZone-APP/admin/goals",
        cvPage: "/MatrixZone-APP/cv",
        cvPageAdmin: "/MatrixZone-APP/admin/cv",
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
        /*{
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
        },*/
    ],
    fpModalText: {
        introduction:
            "Welcome to the MatrixZone, my personal website, and your gateway to discovering the world of software development through my unique perspective. Whether you're a potential client, collaborator, or simply curious about the possibilities of programming, MatrixZone is your one-stop destination to discover the power of my expertise.",
        profile:
            "As someone who deeply values innovation in software development, I welcome you to take a glimpse at my profile to see the skills and experiences I've acquired over time. I've had the opportunity to work on various software solutions, and to improve my programming skills doing so.",
        projects:
            "MatrixZone is not just a showcase of my skills; it's a testament to my dedication and commitment to excellence. Through a carefully curated collection of projects, you'll gain insight into my problem-solving abilities, attention to detail, and ability to tackle complex challenges head-on.",
        //videos: "But that's not all. MatrixZone also offers a glimpse into my journey as a software developer through captivating videos. From behind-the-scenes looks at my projects to thought-provoking discussions on industry trends, these videos provide a window into my world and the passion that drives me.",
    },
    LinkedIn: {
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
        skillsTitle1: "Basic programming languages",
        skillsTitle2: "CLI software",
        skillsTitle3: "Utility software",
        skillsTitle4: "Front-end development",
        skillsTitle5: "Back-end development",
        skillsTitle6: "Web development software",
        //Profession:
        profession: dataFe.professionStatus.profession,
        professionDetailed: dataFe.professionStatus.professionDetailed,
        professionTech: dataFe.professionStatus.professionTech,
        professionTechStack: dataFe.professionStatus.professionTechStack,
        professionAdditionalTech: dataFe.professionStatus.professionAdditionalTech,
        //Job:
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
    GitHub: {
        //Account data:
        user: "PartanenMa",
        link: "https://github.com/PartanenMa",
        //Profile description:
        description1: "Hello, I'm Manu Partanen, a passionate software developer specializing in web development. Feel free to explore my projects.",
        description2: "",
        description3: "",
    },
    YouTube: {
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
