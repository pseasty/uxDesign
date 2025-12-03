// src/caseStudies.js

// Files must exist in /public with EXACT names (case-sensitive).

export const CASE_STUDIES = [
  {
    id: "cs1",
    heading: "DESIGN",
    title: "Designing a Cohesive Digital Presence",
    cardLabel: "Brand & Web · Portfolio Web App",
    description:
      "A modern, responsive portfolio experience built to showcase my work as a Creative Lead and UX/UI designer. The project focuses on clear information hierarchy, reusable components, and a cohesive visual system that ties together brand, layout, and interactions.",
    company: "Personal Project",
    services: "Brand, UX/UI Design, Front-End Development",
    websiteLink: null,
    githubLink: "https://github.com/pseasty/CreativeLead",
    thumbnail: "/PortThumb.png",
    images: {
      main: "/PortThumb.png",
      brand: "/PortGuides.png",
      components: "/PortComponentGuides.png",
      workPage: "/PortWorkPage.jpg",
      aboutPage: "/PortAboutPage.jpg",
      coding: "/Coding.png",
    },
  },
  
    {
    id: "cs2",
    heading: "BRAND",
    title: "Simplifying a Complex Registration Flow", // ← revert to the original title
    cardLabel: "UX / Product · Web App",
    description:
        "A complete rethink of a complex multi-enrollment flow for a global meditation organization. I aligned the experience with existing design standards, introduced an accessible visual system, and worked closely with DevOps to ship a pixel-perfect, maintainable build.",
    company: "Global Meditation Organization",
    services:
        "UX Design, Interaction Design, Design Systems, Cross-functional Collaboration",
    websiteLink: "#",
    thumbnail: "/CS2Preview.png",          // desktop card image
    mobileThumbnail: "/CS2PreviewMobile.png", // optional mobile card image
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
    heading: "MARKETING",
    title: "Launching a Flagship PC Power Cable Line",
    cardLabel: "Product / Campaign · Linkup Technologies Inc.",
    description:
      "I led the design and marketing for one of Linkup Technologies Inc.'s flagship products—a line of custom-colour braided power cables for PC builders. I defined the visual system, art directed the product photography, and supported the launch across video, social, and marketplace channels.",
    company: "Linkup Technologies Inc.",
    services:
      "Art Direction, Product Photography, Brand System, Video, Performance Marketing",
    websiteLink: null,
    githubLink: null,
    thumbnail: "/Linkup1.png",
     mobileThumbnail: "/CS3PreviewMobile.png",
    images: {
    main: "/Linkup1.png",
    brand: "/Linkup2.jpg",
    components: "/Linkup3.jpg",
    image4: "/Linkup4.png",
    image5: "/Linkup5.jpg",
    image6: "/Linkup6.jpg",
  },
  marketingImages: [
    "/FacbookMarketing.png",
    "/YoutubeAnalytics.png",
    "/GoogleAnalytics.png",
    "/AmazonPPC.png",
  ],
  videoUrl: "https://youtu.be/KM4oH3tTYPY",
}
];
