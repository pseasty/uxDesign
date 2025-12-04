// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ProjectModal from "./ProjectModal";
import { CASE_STUDIES } from "./caseStudies";

// =================================================================================
// DATA – OTHER WORK, TESTIMONIALS (unchanged)
// =================================================================================

const OTHER_WORK_GALLERY = [
  {
    id: "ow1",
    title: "Product 3D & Packaging Explorations",
    role: "Industrial / Visual Design",
    thumbnail: "/3DProduct.png",
    expandable: true,
  },
  {
    id: "ow2",
    title: "Motion Graphics & Title Sequences",
    role: "After Effects / Video",
    thumbnail: "/gallery-motion.jpg",
    videoId: "NhL4v8RF-FY",
  },
  {
    id: "ow3",
    title: "Print Collateral",
    role: "Print / Package Design",
    thumbnail: "/package.png",
    expandable: true,
  },
];

const testimonialsData = [
  {
    name: "Maitreya Meshram",
    title: "Senior Software Engineer, LTI - Larsen & Toubro Infotech",
    quote:
      "Having worked with Patrick on web projects at Linkup and on newsletter production, I’ve seen him grow into an exceptional leader, creative problem solver, and team player. As a software engineer, I especially valued his clear communication of complex ideas and his creative, thoughtful approach to technical challenges.",
    photo: "/Testimonials/Maitreya.png",
  },
  {
    name: "Anson Liao",
    title: "President, Linkup Technologies Inc.",
    quote:
      "Because we are a small company, he wore many hats and with every project proved highly capable, dedicated, and quick to grasp technical requirements. He is a self-directed team player who helped pilot projects in line with the company’s vision, and his artistic vision was integral in growing our brand recognition.",
    photo: "/Testimonials/Anson.png",
  },
  {
    name: "Arabellas Barkow",
    title: "Project Manager, Bespoke Boheme",
    quote:
      "Patrick's attention to detail is unmatched. He has a unique ability to translate complex business requirements into elegant and intuitive user experiences.",
    photo: "/Testimonials/Arabella.png",
  },
  {
    name: "Lin Cano",
    title: "Graphic Designer, Linkup Technologies Inc.",
    quote:
      "One of Patrick’s standout qualities is his commitment to team development. He supports the professional growth of his colleagues, offering guidance and mentorship as they stretch into new responsibilities. His calm, focused leadership helps the team navigate tight timelines without losing the quality of the work.",
    photo: "/Testimonials/Lin.png",
  },
  {
    name: "Aaron Weishar",
    title: "Owner, Aaron Tree Services",
    quote:
      "He was responsible for day-to-day problem solving and worked closely with others to navigate the unique challenges that arose. As kitchen operations manager and later president of the board, Patrick chaired numerous meetings—listening actively, asking thoughtful questions, and helping shape dynamic collaboration between many people.",
    photo: "/Testimonials/Aaron.png",
  },
];

// =================================================================================
// APP ROOT – with introPhase (exactly like last known version)
// =================================================================================

function App() {
  const [currentPage, setCurrentPage] = useState("work");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // introPhase: "start" -> "overshoot" -> "settled"
  const [introPhase, setIntroPhase] = useState("start");

  const isWork = currentPage === "work";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProjectId]);

  // Scroll to top when switching pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Drive the intro timeline (copied from last known intro version)
  useEffect(() => {
    if (!isWork) {
      setIntroPhase("settled");
      return;
    }

    setIntroPhase("start");

    const t1 = setTimeout(() => setIntroPhase("overshoot"), 150);
    const t2 = setTimeout(() => setIntroPhase("settled"), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isWork]);

    return (
      <motion.div
        className="relative min-h-screen overflow-x-hidden"
        initial={{ backgroundColor: "#262626" }}
        animate={{
          backgroundColor:
            introPhase === "start" || introPhase === "overshoot"
              ? "#262626"
              : isWork
              ? "#FFFFFF"
              : "#262626",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
      {/* Header fades in only when intro is finished */}
      <Header hidden={introPhase !== "settled"} />

      {/* Main content hidden when case study modal is open */}
      {!selectedProjectId && (
        <>
          <main>
            {isWork ? (
              <WorkPage
                introPhase={introPhase}
                onProjectSelect={(id) => setSelectedProjectId(id)}
              />
            ) : (
              <AboutPage setCurrentPage={setCurrentPage} />
            )}
          </main>

          <div className="bg-dark-background pt-1 pb-24">
            <ContactSection />
            <Footer setCurrentPage={setCurrentPage} />
          </div>

          <BottomToggle
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {/* Case study modal (uses id + CASE_STUDIES in ProjectModal.jsx) */}
      {selectedProjectId && (
        <ProjectModal
          id={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </motion.div>
  );
}

// =================================================================================
// SHARED COMPONENTS – HEADER, CONTACT, FOOTER, BOTTOM TOGGLE
// =================================================================================

const Header = ({ hidden = false }) => (
  <header
    className={`
      bg-dark-background flex items-center h-[88px]
      max-mobile:h-auto max-mobile:py-4
      transition-opacity duration-500
      ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
    `}
  >
    <div className="max-w-container w-full mx-auto px-4 lg:px-[110px] flex justify-between items-center max-mobile:flex-col max-mobile:justify-center max-mobile:gap-4">
      <p className="font-body text-base lg:text-lg text-white text-center">
        Patrick East <span className="text-primary-button">|</span>{" "}
        <span className="text-accent">UX & Product Designer</span>
      </p>

      <a href="#contact-section" className="hidden tablet:inline-block">
        <button className="px-6 py-2 rounded-md font-nav font-bold bg-white text-primary-button border-4 border-primary-button transition-all duration-300 hover:bg-primary-button hover:text-white">
          Get In Touch
        </button>
      </a>
    </div>
  </header>
);

const ContactSection = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "f1e833d4-3caf-4ecc-a5ac-4e2cb5781408");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      event.target.reset();
      setTimeout(() => setResult(""), 5000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.section
      id="contact-section"
      className="bg-dark-background py-20 text-text-light"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-container mx-auto px-4 lg:px-[110px]">
        <h2 className="text-h2 font-heading text-center font-bold">
          Get in Touch
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

        <div className="max-w-[576px] mx-auto">
          <p className="text-gray-400 mb-16 text-xl text-left">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form below and I'll get back to you as soon
            as possible.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 max-tablet:grid-cols-1 max-tablet:gap-8">
          {/* Contact details */}
          <div className="bg-med-background p-10 rounded-card text-text-dark max-lg:p-6 max-w-[576px] mx-auto w-full">
            <h3 className="font-heading font-bold text-h3 mb-4">
              Contact Information
            </h3>
            <p className="text-text-secondary mb-8">
              Feel free to reach out using any of the following methods.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Mail className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-text-secondary">plurals_kiwi7i@icloud.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Phone className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-text-secondary">4377786388</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-text-secondary">Calgary, ALB. Canada</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-top border-gray-300 border-t">
              <p className="font-bold mb-4">Connect with me</p>
              <div className="flex space-x-4">
                <Instagram className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
                <Facebook className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
                <Linkedin className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-med-background p-10 rounded-card text-text-dark flex flex-col justify-center max-lg:p-6 max-w-[576px] mx-auto w-full">
            <h3 className="font-heading font-bold text-h3 mb-4">
              Contact Form
            </h3>

            <form onSubmit={onSubmit} className="w-full mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-button text-white font-bold py-3 rounded-md hover:bg-opacity-75"
              >
                Submit Form
              </button>
            </form>

            <span className="mt-4 text-center text-text-dark font-bold">
              {result}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = ({ setCurrentPage, onNav }) => {
  const handleNav = onNav || setCurrentPage;

  return (
    <footer className="bg-dark-background text-text-light border-t border-gray-700">
      <div className="max-w-container mx-auto px-4 lg:px-[110px] py-16 grid grid-cols-1 tablet:grid-cols-3 gap-8 items-start text-center tablet:text-left">
        {/* Left column */}
        <div>
          <h4 className="font-heading font-bold text-2xl mb-4">Patrick East</h4>
          <p className="text-gray-400 max-w-md mx-auto tablet:mx-0">
            A passionate and results-driven product designer with a deep
            understanding of form, composition, and user-centric design.
          </p>
        </div>

        {/* Middle column */}
        <div>
          <h4 className="font-heading font-bold text-2xl mb-4">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <button
                onClick={() => handleNav("work")}
                className="hover:text-primary-button"
              >
                My Work
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("about")}
                className="hover:text-primary-button"
              >
                About Me
              </button>
            </li>
            <li>
              <a href="#contact-section" className="hover:text-primary-button">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right column */}
        <div className="tablet:text-right flex flex-col justify-center tablet:items-end items-center">
          <p className="text-gray-400">All right reserved 2025</p>
        </div>
      </div>
    </footer>
  );
};

const BottomToggle = ({ currentPage, setCurrentPage, introPhase = "settled" }) => {
  const [hovered, setHovered] = useState(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const visualTarget = hovered || currentPage;

  // Delay the animation in after intro settles
  useEffect(() => {
    if (currentPage === "about") {
      setHasAnimatedIn(true);
      return;
    }

    if (introPhase === "settled") {
      const timer = setTimeout(() => {
        setHasAnimatedIn(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setHasAnimatedIn(false);
    }
  }, [introPhase, currentPage]);

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50"
      style={{
        transform: `translateX(-50%) translateY(${hasAnimatedIn ? "0" : "100px"})`,
        opacity: hasAnimatedIn ? 1 : 0,
        pointerEvents: hasAnimatedIn ? "auto" : "none",
        transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.6s ease",
      }}
    >
      <div className="relative flex items-center bg-primary-button p-1 rounded-lg border border-primary-button shadow-lg overflow-hidden">
        {/* Sliding highlight pill */}
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-md border border-primary-button"
          initial={false}
          animate={{ 
            x: visualTarget === "work" ? 4 : "100%",
            marginLeft: visualTarget === "work" ? 0 : 4
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            mass: 0.8
          }}
          style={{ left: 0 }}
        />

        <button
          onClick={() => setCurrentPage("work")}
          onMouseEnter={() => setHovered("work")}
          onMouseLeave={() => setHovered(null)}
          className={`relative z-10 px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${
            visualTarget === "work" ? "text-primary-button" : "text-white"
          }`}
        >
          Work
        </button>

        <button
          onClick={() => setCurrentPage("about")}
          onMouseEnter={() => setHovered("about")}
          onMouseLeave={() => setHovered(null)}
          className={`relative z-10 px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${
            visualTarget === "about" ? "text-primary-button" : "text-white"
          }`}
        >
          About
        </button>
      </div>
    </div>
  );
};

// =================================================================================
// WORK PAGE – introPhase animation + blinds, like last-known version
// =================================================================================

const WorkPage = ({ onProjectSelect, introPhase }) => {
  return (
    <div className="max-w-container mx-auto px-4 lg:px-[110px] py-12 text-text-dark">
      {/* Row 1 – DEFINE · Case Study 1 */}
      <WorkSection
        index={0}
        title="DEFINE"
        introPhase={introPhase}
        project={CASE_STUDIES[0]}
        onProjectSelect={onProjectSelect}
      />

      {/* Row 2 – DESIGN · Case Study 2 */}
      <WorkSection
        index={1}
        title="DESIGN"
        textAlign="right"
        introPhase={introPhase}
        project={CASE_STUDIES[1]}
        onProjectSelect={onProjectSelect}
      />

      {/* Row 3 – DELIVER · Case Study 3 */}
      <WorkSection
        index={2}
        title="DELIVER"
        introPhase={introPhase}
        project={CASE_STUDIES[2]}
        onProjectSelect={onProjectSelect}
      />

      {/* Bio block below case studies - hidden until intro complete */}
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: introPhase === "settled" ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="max-w-[576px] mx-auto text-center">
          <h3 className="text-h3 font-bold font-heading">Patrick East</h3>
          <p className="mt-4 text-text-secondary text-xl text-left">
            My passion for design and typography started when I was 15, doing
            large-scale mural and typographic art. It gave me a deep, hands-on
            understanding of form, composition, and letter structure that I
            didn't have a name for back then. It's where I first learned to
            master the craft and earn respect. I've spent my entire professional
            career, from graphic design to UX, refining that same passion.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const WorkSection = ({
  title,
  index,
  textAlign = "left",
  introPhase,
  project,
  onProjectSelect,
}) => {
  const isFirstRow = index === 0;

  // Without cards, headings are roughly 200px apart (section padding + heading height)
  // To stack them at the same spot during overshoot:
  // - DEFINE (index 0): move DOWN to meet the others
  // - DESIGN (index 1): stay roughly in place (this is our anchor point)
  // - DELIVER (index 2): move UP to meet the others
  const overshootOffsets = [50, 0, -50]; // Positive = down, Negative = up

  const headingVariants = {
    start: (i) => ({
      opacity: 0,
      scale: 0.45,
      y: overshootOffsets[i],
      color: "#FFFFFF",
    }),
    overshoot: (i) => ({
      opacity: 1,
      scale: 1.4,
      y: overshootOffsets[i],
      color: "#FFFFFF",
    }),
    settled: {
      opacity: 1,
      scale: 1,
      y: 0,
      color: "#262626",
    },
  };

  const currentHeadingState =
    introPhase === "start" || introPhase === "overshoot"
      ? introPhase
      : "settled";

  const headingAnimate =
    currentHeadingState === "settled"
      ? headingVariants.settled
      : headingVariants[currentHeadingState](index);

  const isIntroActive = introPhase !== "settled";

  const gridClasses = `
    grid grid-cols-1
    mt-3
    max-tablet:mt-4
  `;

  return (
    <section
      className={`
        pt-4 mb-12
        ${textAlign === "right" ? "text-right" : "text-left"}
        max-tablet:text-center
      `}
    >
      {/* Headings */}
      <motion.h1
        className={`
          text-h1-huge font-heading font-bold leading-none
          max-xl:text-[150px]
          max-tablet:text-[120px]
          max-mobile:text-[80px]
          tracking-[-0.06em]
        `}
        style={{ 
          transformOrigin: "center center",
          position: "relative",
          zIndex: isIntroActive ? 100 : 1,
        }}
        custom={index}
        initial={headingVariants.start(index)}
        animate={headingAnimate}
        transition={{
          duration: introPhase === "overshoot" ? 1.0 : 0.8,
          ease: [0.2, 0.8, 0.3, 1],
        }}
      >
        {title}
      </motion.h1>

      {/* Card grid */}
      <div className={gridClasses}>
        <ProjectCard
          project={project}
          onSelect={onProjectSelect}
          revealType={isFirstRow ? "intro" : "scroll"}
          introReady={introPhase === "settled"}
        />
      </div>
    </section>
  );
};

const ProjectCard = ({ project, onSelect, revealType, introReady }) => {
  const desktopThumb = project.thumbnailDesktop || project.thumbnail;
  const mobileThumb = project.mobileThumbnail || desktopThumb;

  const isIntroCard = revealType === "intro";
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [canTriggerReveal, setCanTriggerReveal] = useState(false);

  const isRevealed = hasRevealed;
  const isCS2 = project.id === "cs2";

  // For non-intro cards, delay the ability to trigger reveal
  // This prevents cards already in viewport from revealing during intro
  useEffect(() => {
    if (!isIntroCard && introReady) {
      const timer = setTimeout(() => {
        setCanTriggerReveal(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isIntroCard, introReady]);

  // For non-intro cards, don't render until intro is complete
  if (!isIntroCard && !introReady) {
    return null;
  }

  // INTRO CARD: Height animation reveal
  if (isIntroCard) {
    return (
      <motion.div
        className={`group relative cursor-pointer w-full max-w-[1200px] mx-auto overflow-hidden ${
          !isRevealed ? "pointer-events-none" : ""
        }`}
        style={{ zIndex: 1 }}
        initial={{ height: 0, opacity: 0 }}
        animate={
          introReady
            ? { height: 520, opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{
          height: {
            duration: 0.8,
            delay: 0,
            ease: [0.2, 0.8, 0.3, 1],
          },
          opacity: {
            duration: 0.4,
            delay: 0,
          },
        }}
        whileHover={isRevealed ? { y: -6 } : {}}
        onClick={() => isRevealed && onSelect && onSelect(project.id || project)}
      >
        <div
          className={`relative w-full h-[520px] rounded-3xl overflow-hidden transition-all duration-300`}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={mobileThumb} />
            <img
              src={desktopThumb}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </picture>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isRevealed) {
                onSelect && onSelect(project.id || project);
              }
            }}
            className={`
              absolute left-6 right-6 bottom-6 z-20
              bg-primary-button text-white rounded-card
              flex items-center justify-between gap-4
              px-6 py-3 shadow-lg
              transition-all duration-300
              ${isRevealed 
                ? "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" 
                : "translate-y-full opacity-0 pointer-events-none"
              }
            `}
          >
            <div className="text-left">
              <p className="font-nav font-bold text-lg leading-tight">
                {project.title}
              </p>
              {project.cardLabel && (
                <p className="text-sm opacity-80 mt-0.5">{project.cardLabel}</p>
              )}
            </div>
            <ArrowUpRight size={28} />
          </button>
        </div>

        {/* Track when reveal is complete */}
        {introReady && !hasRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.9 }}
            onAnimationComplete={() => setHasRevealed(true)}
            style={{ position: 'absolute', pointerEvents: 'none' }}
          />
        )}
      </motion.div>
    );
  }

  // NON-INTRO CARDS: Overlay slide down on scroll (Chrome compatible)
  return (
    <motion.div
      className={`group relative cursor-pointer w-full max-w-[1200px] mx-auto ${
        !isRevealed ? "pointer-events-none" : ""
      }`}
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, y: 40 }}
      animate={canTriggerReveal && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        ease: [0.2, 0.8, 0.3, 1],
      }}
      whileHover={isRevealed ? { y: -6 } : {}}
      onClick={() => isRevealed && onSelect && onSelect(project.id || project)}
      onViewportEnter={() => {
        if (canTriggerReveal) {
          setIsInView(true);
        }
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className={`relative w-full h-[520px] rounded-3xl overflow-hidden transition-all duration-300 ${
          isCS2 && isRevealed ? "border border-gray-300" : ""
        }`}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileThumb} />
          <img
            src={desktopThumb}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </picture>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isRevealed) {
              onSelect && onSelect(project.id || project);
            }
          }}
          className={`
            absolute left-6 right-6 bottom-6 z-20
            bg-primary-button text-white rounded-card
            flex items-center justify-between gap-4
            px-6 py-3 shadow-lg
            transition-all duration-300
            ${isRevealed 
              ? "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" 
              : "translate-y-full opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="text-left">
            <p className="font-nav font-bold text-lg leading-tight">
              {project.title}
            </p>
            {project.cardLabel && (
              <p className="text-sm opacity-80 mt-0.5">{project.cardLabel}</p>
            )}
          </div>
          <ArrowUpRight size={28} />
        </button>

        {/* OVERLAY - slides down to reveal */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none z-10 rounded-3xl"
          initial={{ y: "0%" }}
          animate={canTriggerReveal && isInView ? { y: "100%" } : { y: "0%" }}
          transition={{
            y: {
              duration: 0.8,
              delay: 0.2,
              ease: [0.2, 0.8, 0.3, 1],
            },
          }}
          onAnimationComplete={() => {
            if (canTriggerReveal && isInView) {
              setHasRevealed(true);
            }
          }}
        />
      </div>
    </motion.div>
  );
};

// =================================================================================
// ABOUT PAGE – unchanged
// =================================================================================

const AboutPage = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [expandedWorkImage, setExpandedWorkImage] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 2 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonialsData.length - 2 ? 0 : prev + 1
    );
  };

  const sectionAnimation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="text-text-light">
      {/* HERO */}
      <motion.section
        className="relative max-w-container mx-auto px-4 lg:px-[110px] py-12 tablet:py-24 grid grid-cols-2 gap-16 items-center max-tablet:grid-cols-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* TEXT COLUMN */}
        <div className="max-tablet:order-last">
          <p className="font-nav text-primary-button bg-primary-button/50 px-4 py-2 rounded-full inline-block mb-4 max-tablet:hidden">
            UX/UI Design
          </p>

          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading font-bold leading-tight text-left">
              <span className="block text-h2 max-sm:text-h3">
                I'm{" "}
                <span className="text-h1 max-sm:text-h2">Patrick East</span>
              </span>
              <span className="block text-h2 max-sm:text-h3">
                UX & Product Designer
              </span>
            </h1>

            <p className="text-gray-400 mt-6 text-xl text-left">
              UX and product designer with a focus on clarity, usability, and impact.
              I design experiences grounded in research, refined through iteration, 
              and built in close collaboration with engineering to ship solutions that work for real users.
            </p>
          </div>

          {/* Desktop / tablet CTA */}
          <button
            onClick={() => setCurrentPage("work")}
            className="mt-8 bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105 hidden tablet:inline-block"
          >
            View My Work
          </button>
        </div>

        {/* HERO IMAGE WITH MOBILE GET IN TOUCH OVERLAY */}
        <div
          className="
            relative w-full max-w-[500px] h-[500px] mx-auto
            tablet:max-w-[680px] tablet:h-[520px]
            lg:max-w-[720px] lg:h-[540px]
            max-tablet:-mt-8
            max-mobile:max-w-[360px] max-mobile:h-[420px]
          "
        >
          <img
            src="/hero.png"
            alt="Patrick East"
            className="w-full h-full object-cover object-[60%_center] rounded-card"
          />

          <div
            className="
              absolute inset-0 rounded-card
              bg-gradient-to-t from-dark-background/40 via-dark-background/15 to-transparent
              tablet:bg-gradient-to-r tablet:from-dark-background/40 tablet:via-dark-background/15 tablet:to-transparent
              pointer-events-none
            "
          />

          {/* Mobile Get In Touch pinned to bottom of hero image */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex items-center justify-center tablet:hidden">
            <a
              href="#contact-section"
              className="bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </motion.section>

      {/* SKILLS */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">
              I've cultivated a diverse set of skills throughout my career.
              Here's an overview of some of my technical expertise and
              competencies.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-x-16 gap-y-8 max-tablet:grid-cols-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SkillBar skill="User Experience Design (UX)" percentage={90} />
            <SkillBar skill="User Interface Design (UI)" percentage={90} />
            <SkillBar skill="Product Design / Strategy" percentage={85} />
            <SkillBar skill="Design Systems & Component Libraries" percentage={85} />
            <SkillBar skill="User Flows & Journey Mapping" percentage={85} />
            <SkillBar skill="Wireframing & Prototyping" percentage={90} />
            <SkillBar skill="Usability Testing & Iteration" percentage={80} />
            <SkillBar skill="Information Architecture" percentage={80} />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <motion.section className="py-16" {...sectionAnimation}>
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">
            What Clients and Colleagues Say
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">
              Don't just take my word for it. Here's what clients have to say
              about working with me on their projects.
            </p>
          </div>

          <div className="relative">
            {/* Desktop arrows */}
            <button
              onClick={handlePrev}
              className="hidden xl:flex absolute left-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft size={36} strokeWidth={6} />
            </button>

            <div className="grid grid-cols-2 gap-16 w-full max-tablet:grid-cols-1 max-tablet:gap-8 max-w-[576px] tablet:max-w-none mx-auto">
              <TestimonialCard
                name={testimonialsData[currentIndex].name}
                title={testimonialsData[currentIndex].title}
                quote={testimonialsData[currentIndex].quote}
                photo={testimonialsData[currentIndex].photo}
              />
              <div className="max-tablet:hidden">
                {testimonialsData[currentIndex + 1] && (
                  <TestimonialCard
                    name={testimonialsData[currentIndex + 1].name}
                    title={testimonialsData[currentIndex + 1].title}
                    quote={testimonialsData[currentIndex + 1].quote}
                    photo={testimonialsData[currentIndex + 1].photo}
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="hidden xl:flex absolute right-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight size={36} strokeWidth={6} />
            </button>
          </div>

          {/* Arrows below cards for < xl */}
          <div className="mt-6 flex justify-center gap-10 xl:hidden">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft size={32} strokeWidth={6} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight size={32} strokeWidth={6} />
            </button>
          </div>
        </div>
      </motion.section>


    </div>
  );
};

// =================================================================================
// SMALL SHARED PIECES
// =================================================================================

const SkillBar = ({ skill, percentage }) => (
  <div>
    <div className="flex justify-between items-center mb-1 font-bold text-h5">
      <span>{skill}</span>
      <span className="text-accent">{percentage}%</span>
    </div>

    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-accent h-2.5 rounded-full"
        initial={{ width: "0%" }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

const TestimonialCard = ({ name, title, quote, photo }) => (
<div className="bg-med-background text-text-dark p-8 rounded-card min-h-[360px] flex flex-col">
    <div className="flex items-center mb-4">
      <img
        src={photo || "https://i.imgur.com/5N2gL11.png"}
        alt={name}
        className="w-16 h-16 rounded-full mr-4 object-cover"
      />
      <div>
        <h4 className="font-bold font-heading text-xl">{name}</h4>
        <p className="text-text-secondary">{title}</p>
      </div>
    </div>
    <p className="text-text-secondary text-xl">"{quote}"</p>
  </div>
);

export default App;
