// src/caseStudies.js

// Files must exist in /public with EXACT names (case-sensitive).

export const CASE_STUDIES = [
  {
    id: "cs1",
    heading: "DESIGN",
    title: "Designing a Cohesive Digital Presence",
    cardLabel: "UX / Product · Portfolio Web App",
    description:
      "A modern, responsive UX portfolio that behaves like a small product. I designed the information architecture, component system, and interactions to help hiring managers quickly understand my work while keeping the experience easy to extend with new case studies.",
    company: "Personal Project",
    services: "UX Design, UI Design, Design Systems, Front-End Development",
    websiteLink: null,
    githubLink: "https://github.com/pseasty/CreativeLead",
    thumbnail: "/CS1PreviewDesktop.png",
    mobileThumbnail: "/CS1PreviewMobile.png",
    images: {
      main: "/CS1PreviewDesktop.png",
      brand: "/PortGuides.png",
      components: "/PortComponentGuides.png",
      workPage: "/PortWorkPage.jpg",
      aboutPage: "/PortAboutPage.jpg",
      coding: "/Coding.png",
    },
  },

  {
    id: "cs2",
    heading: "PRODUCT",
    title: "Simplifying a Complex Registration Flow",
    cardLabel: "UX / Product · Web Site",
    description:
      "A complete rethink of a complex multi-enrollment flow for a global meditation organization. I aligned the experience with existing design standards, introduced an accessible visual system, and worked closely with DevOps to ship a pixel-perfect, maintainable build.",
    company: "Global Meditation Organization",
    services:
      "UX Design, Interaction Design, Design Systems, Cross-functional Collaboration",
    websiteLink: "#",
    thumbnail: "/CS2Preview.png",             // desktop card image
    mobileThumbnail: "/CS2PreviewMobile.png", // mobile card image
    images: {
      main: "/Desktop.jpg",
      before: "/BeforeDR.jpg",
      after: "/320px Multi-Enroll. Expanded.jpg",
      orgStandards: "/Dhammaorg Design Standards.jpg",
      guides: "/DRConfirmComponentGuide.png",
      grid: "/GridGuide.png",
      dev1: "/Working w Jeremy 1.png",
      dev2: "/Working w Jeremy 2.png",
    },
    prototypeUrl:
      "https://embed.figma.com/proto/NYZ9iuCMQWSwygezbhkX9W/Flow-for-Portfolio?page-id=0%3A1&node-id=1-190&p=f&viewport=40%2C218%2C0.13&scaling=scale-down&content-scaling=fixed&embed-host=share",
  },

{
  id: "cs3",
  heading: "PRODUCT",
  title: "Designing a Client Web App for PrizmPix",
  cardLabel: "UX / Product · Client Web App",
  description:
    "An end-to-end web experience designed to help potential clients understand PrizmPix services, browse case studies, and reach out for project inquiries. I mapped user goals, structured flows around real decision points, and designed a responsive interface system that translates cleanly from desktop to mobile.",
  company: "PrizmPix (Client Project)",
  services:
    "UX Design, Information Architecture, Interaction Design, Responsive UI, Design System",
  websiteLink: null,        // add a live link when deployed
  githubLink: null,         // optional if you host the code
  thumbnail: "/CS3PreviewDesktop.png",
  mobileThumbnail: "/CS3PreviewMobile.png",
  images: {
    main: "/CS3PreviewDesktop.png",

    // Core screens / flows
    screen1: "/PrizmPixWebsite1.jpg",
    screen2: "/PrizmPixWebsite2.jpg",
    screen3: "/PrizmPixWebsite3.jpg",
    screen4: "/PrizmPixWebsite4.jpg",
  },
  // optional, if you embed a prototype in the modal later
  // prototypeUrl: "",
},

];
