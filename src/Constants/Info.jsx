import { data } from "./Data.jsx";

export const info = {
    version: "Alpha 0.7.5",
    routes: {
        frontPage: "/",
        loginPage: "/login",
        homePage: "/home",
        homePageAdmin: "/admin/home",
        profilePage: "/profile",
        profilePageAdmin: "/admin/profile",
        projectsPage: "/projects",
        projectsPageAdmin: "/admin/projects",
        videosPage: "/videos",
        videosPageAdmin: "/admin/videos",
        goalsPage: "/goals",
        goalsPageAdmin: "/admin/goals",
        cvPage: "/cv",
        cvPageAdmin: "/admin/cv",
    },
    fpModalText: {
        introduction:
            "Welcome to the MatrixZone, my personal website, and your gateway to discovering the world of software development through my unique perspective. Whether you're a potential client, collaborator, or simply curious about the possibilities of programming, MatrixZone is your one-stop destination to discover the power of my expertise.",
        profile:
            "As a seasoned developer with a passion for innovation, I invite you to explore my profile and witness my skills and experience in the software development field. From developing cutting-edge software solutions to architecting robust systems, I have a proven track record of delivering exceptional results.",
        projects:
            "MatrixZone is not just a showcase of my skills; it's a testament to my dedication and commitment to excellence. Through a carefully curated collection of projects, you'll gain insight into my problem-solving abilities, attention to detail, and ability to tackle complex challenges head-on.",
        videos: "But that's not all. MatrixZone also offers a glimpse into my journey as a software developer through captivating videos. From behind-the-scenes looks at my projects to thought-provoking discussions on industry trends, these videos provide a window into my world and the passion that drives me.",
    },
    loginInfo: {
        enabled: true,
        adminUserName: "Admin",
        adminPassword: "ManuAdminReact123",
    },
    LinkedIn: {
        //Account data:
        user: "Manu Partanen",
        name: "Manu Partanen",
        phoneNumber: "0440602810",
        emailAddress: "manu111.partanen@gmail.com",
        link: "https://www.linkedin.com/in/manu-partanen-7864b4265/",
        //Profile description:
        description1:
            "As a web developer, I have a strong foundation in HTML, CSS, and JavaScript. I'm also comfortable with C++, Java, C# and python, which I've been working with in several of my school and personal projects.",
        description2:
            "My expertise lies in front-end web development, where I enjoy creating visually appealing and user-friendly interfaces. I have a passion for using tools like React to create high-quality web applications, and have some experience working with Node.js and FastAPI on the backend. I've also used Figma for UI design, Git for version control and WordPress for creation of some websites.",
        description3:
            "While my knowledge of databases is basic, I have studied SQL and NoSQL, which gives me a solid foundation for working with data. I've also studied some data analysis using Python.",
        //Skills titles:
        skillsTitle1: "Scripting",
        skillsTitle2: "Utility software",
        skillsTitle3: "Programming languages",
        skillsTitle4: "Front-end development",
        skillsTitle5: "Back-end development",
        skillsTitle6: "Full-stack development",
        //Profession:
        profession: data.professionStatus.profession,
        professionDetailed: data.professionStatus.professionDetailed,
        professionTech: data.professionStatus.professionTech,
        professionTechStack: data.professionStatus.professionTechStack,
        professionAdditionalTech: data.professionStatus.professionAdditionalTech,
        //Job:
        jobTitle: data.jobStatus.jobTitle,
        company: data.jobStatus.company,
        companyInfoLink: data.jobStatus.companyInfoLink,
        jobTechStack: data.jobStatus.jobTechStack,
        jobAdditionalTech: data.jobStatus.jobAdditionalTech,
        companyColor: data.jobStatus.companyColor,
        companyLogo: data.jobStatus.companyLogo,
        companyLogoH: data.jobStatus.companyLogoH,
        companyLogoW: data.jobStatus.companyLogoW,
    },
    GitHub: {
        //Account data:
        user: "PartanenMa",
        link: "https://github.com/PartanenMa",
        //Profile description:
        description1: "NOT YET AVAILABLE",
        description2: "",
        description3: "",
    },
    YouTube: {
        //Account data:
        user: "YTUser",
        link: "https://github.com/PartanenMa",
        //Profile description:
        description1: "NOT YET AVAILABLE",
        description2: "",
        description3: "",
    },
    CV: {
        isDisabled: true,
    },
};
