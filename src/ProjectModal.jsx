// src/ProjectModal.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "./caseStudies";

// Turn a normal YouTube URL (youtu.be or youtube.com/watch) into an embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // Short youtu.be link: https://youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // Normal YouTube link: https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    // Fallback – just return original
    return url;
  } catch {
    return url;
  }
}

// Simple reveal on mount – no whileInView
const RowReveal = ({ children, delay = 0 }) => {
  const [hasRevealed, setHasRevealed] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      onAnimationComplete={() => setHasRevealed(true)}
    >
      {children}
      
      {/* Reveal overlay - slides down when in view */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ y: "0%" }}
        whileInView={{ y: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.7,
          delay: delay,
          ease: [0.8, 1.0, 0.3, 1],
        }}
      />
    </motion.div>
  );
};

const ProjectModal = ({ id, onClose }) => {
  const project = CASE_STUDIES.find((p) => p.id === id);
  const [expandedImage, setExpandedImage] = useState(null);

  if (!project) return null;

  const overviewAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div
  className="fixed left-0 right-0 bottom-0 z-40 bg-black/40 flex justify-center items-stretch" style={{ top: "88px" }} >
      <motion.div
        className="relative bg-white w-full max-h-full overflow-y-auto"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* Sticky close strip – X stays visible while scrolling */}
        <div className="sticky top-0 z-[60] flex justify-end bg-white/90 backdrop-blur-sm px-4 lg:px-[110px] pt-4 pb-2 border-b border-black/5">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-300 bg-opacity-60 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-80 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* ============================================================
            Shared wrapper
           ============================================================ */}
        <div className="max-w-container mx-auto px-4 lg:px-[110px] pt-8 pb-24">
          {/* Overview (hero copy) */}
          <motion.section
            className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8"
            {...overviewAnimation}
          >
            <div>
              <p className="font-nav text-xs tracking-[0.3em] uppercase text-text-secondary mb-2">
                {project.heading}
              </p>
              <h1 className="text-h1 font-heading font-bold text-text-dark max-lg:text-h2">
                {project.title}
              </h1>
              {project.cardLabel && (
                <p className="mt-3 text-sm font-nav uppercase tracking-[0.25em] text-text-secondary">
                  {project.cardLabel}
                </p>
              )}
            </div>
            <p className="font-body text-xl text-text-secondary">
              {project.description}
            </p>
          </motion.section>

          <div className="mt-20 space-y-10">
            {/* Main splash image */}
            {project.images?.main && (
              <div className="rounded-card overflow-hidden">
                <img
                  src={project.images.main}
                  alt={`${project.title} main visual`}
                  className="w-full h-auto block"
                />
              </div>
            )}

            {/* ============================================================
                CS1 – Portfolio / UX Website
               ============================================================ */}
            {project.id === "cs1" && (
              <>
                {/* Brand / style guides */}
                {project.images?.brand && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.brand}
                          alt={`${project.title} brand / style guides`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Brand Development & Style Guides
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I started by defining the visual language—type
                          hierarchy, spacing, and colour rules designed to feel
                          bold but minimal. These guides keep the experience
                          consistent as new pages and case studies are added
                          over time.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Component library */}
                {project.images?.components && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Component Library & Layout System
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The UI is built from a small, reusable component
                          system: hero layouts, project cards, testimonials, and
                          call-to-actions. That makes it easy to scale the site
                          without redesigning every screen and keeps the codebase
                          clean and predictable.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.components}
                          alt={`${project.title} component library`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Coding / implementation */}
                {project.images?.coding && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.coding}
                          alt={`${project.title} code in VS Code`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Designed in Figma, Built in Code
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The portfolio was designed in Figma and then
                          hand-built in React, with Framer Motion driving the
                          hero animations and project transitions. I treated the
                          codebase like a design system—clean file structure,
                          reusable helpers, and animation primitives—so it’s easy
                          to extend for new work and experiments.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Work / About page tall mocks */}
                {(project.images?.workPage || project.images?.aboutPage) && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                      {project.images?.workPage && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.workPage}
                            alt={`${project.title} work page`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      {project.images?.aboutPage && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.aboutPage}
                            alt={`${project.title} about page`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </RowReveal>
                )}

                {/* Creative Lead takeaway */}
                <RowReveal delay={0.2}>
                  <div className="bg-med-background p-8 rounded-card text-text-dark">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      Why This Matters in a Creative Lead Role
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This portfolio project isn’t just a personal site—it’s a
                      sandbox for how I think about leading digital work end to
                      end.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I defined the visual direction, interaction patterns,
                        and narrative so the experience feels cohesive from hero
                        to footer.
                      </li>
                      <li>
                        I treated the front-end like a design system—
                        components, tokens, and motion primitives that can be
                        reused and extended by a team.
                      </li>
                      <li>
                        I did the hands-on implementation in React and Framer
                        Motion, which helps me give grounded feedback to
                        engineers and move faster together.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              </>
            )}

            {/* ============================================================
                CS2 – regsitration software design and brand standards
               ============================================================ */}
            {project.id === "cs2" && (
              <>
                {/* Two-column layout with alternating image/text */}
                <RowReveal>
                  <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-10">
                    {/* LEFT COLUMN */}
                    <div className="space-y-10">
                      {/* Before – legacy screen image */}
                      {project.images?.before && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.before}
                            alt={`${project.title} – legacy confirmation and enrollment screen`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      {/* Before – text */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Before
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The original confirmation and enrollment management
                          screen was dense, visually dated, and only loosely
                          aligned with the organization&apos;s design standards.
                          Core actions were hard to spot, forcing users to hunt
                          through multiple controls just to confirm or update
                          their enrollment.
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-10">
                      {/* After – redesigned 320px screen image */}
                      {project.images?.after && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.after}
                            alt={`${project.title} – redesigned multi-enrollment flow (mobile)`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      {/* After – text */}
                      {project.images?.after && (
                        <div className="bg-med-background p-8 rounded-card text-text-dark">
                          <h3 className="text-h3 font-heading font-bold text-text-dark">
                            After (Mobile & Desktop)
                          </h3>
                          <p className="text-xl text-text-secondary mt-4">
                            The updated 320px multi-enroll screen introduces a
                            clear primary CTA, calmer hierarchy, and obvious
                            affordances so users can confirm, cancel, or adjust
                            their enrollment without digging through hidden
                            controls. The desktop version mirrors the same
                            structure and lives in the hero image at the top of
                            this case study.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </RowReveal>

                {/* Design standards & Working within design system */}
                <RowReveal delay={0.1}>
                  <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-10">
                    {/* LEFT COLUMN */}
                    <div className="space-y-10">
                      {/* Design standards PDF – image */}
                      {project.images?.orgStandards && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.orgStandards}
                            alt={`${project.title} – organization design standards`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      {/* Working within design system – text */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Working Within a Global Design System
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The organization already had a strong visual identity.
                          My job wasn&apos;t to reinvent it, but to apply it
                          correctly to a complex registration context. That meant
                          respecting locked trademarks, typography rules, and
                          colour usage while still making the interface feel
                          clearer and more modern.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          In fast-paced working sessions with the design standards
                          team and DevOps, I walked stakeholders through why
                          certain conventions mattered—so the new flow stayed
                          fully aligned with the broader dhamma.org ecosystem.
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-10">
                      {/* Component & grid guides – both images together */}
                      {(project.images?.guides || project.images?.grid) && (
                        <div className="bg-white rounded-card p-4 border border-gray-200 space-y-4">
                          {project.images?.guides && (
                            <img
                              src={project.images.guides}
                              alt={`${project.title} – component guide`}
                              className="w-full h-auto block rounded-md"
                            />
                          )}
                          {project.images?.grid && (
                            <img
                              src={project.images.grid}
                              alt={`${project.title} – grid & spacing guide`}
                              className="w-full h-auto block rounded-md"
                            />
                          )}
                        </div>
                      )}

                      {/* Granularity paragraph about hand-off */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Granular Specs for Confident Hand-off
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The grid overlays, typography scales, colour tokens and
                          component guides gave the DevOps team pixel-level
                          clarity. Every heading, label, and control had a defined
                          size, weight, and spacing, making it much easier to
                          implement the layout faithfully and keep future states
                          consistent as the product evolves.
                        </p>
                      </div>
                    </div>
                  </div>
                </RowReveal>

                {/* Jeremy images LEFT, Fast, Cross-functional Delivery RIGHT */}
                {(project.images?.dev1 || project.images?.dev2) && (
                  <RowReveal delay={0.15}>
                    <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-10">
                      {/* LEFT: Jeremy working sessions */}
                      <div className="bg-white rounded-card p-4 border border-gray-200 space-y-4">
                        {project.images?.dev1 && (
                          <img
                            src={project.images.dev1}
                            alt={`${project.title} – collaborating with DevOps (1)`}
                            className="w-full h-auto block rounded-md"
                          />
                        )}
                        {project.images?.dev2 && (
                          <img
                            src={project.images.dev2}
                            alt={`${project.title} – collaborating with DevOps (2)`}
                            className="w-full h-auto block rounded-md"
                          />
                        )}
                      </div>

                      {/* RIGHT: text card */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Fast, Cross-functional Delivery
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I partnered closely with the registration DevOps team
                          to make sure the design was technically feasible and
                          easy to maintain. We iterated in short working
                          sessions, reviewing builds against the specs until the
                          implementation matched the design one-to-one.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          These sessions weren&apos;t just about pixels—they
                          were about aligning on why each convention existed, so
                          engineers and designers were making the same tradeoffs
                          for the same reasons.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Prototype */}
                {project.prototypeUrl && (
                  <RowReveal delay={0.2}>
                    <div className="bg-med-background p-8 rounded-card text-text-dark">
                      <h3 className="text-h3 font-heading font-bold text-text-dark">
                        Interactive Prototype
                      </h3>
                      <p className="text-xl text-text-secondary mt-4">
                        An interactive Figma prototype made it easy to walk
                        stakeholders through the new flow in short, high-impact
                        review sessions.
                      </p>

                      <div className="w-full mt-4">
                        <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-white rounded-card overflow-hidden border border-gray-200">
                          <iframe
                            title="Registration flow prototype"
                            src={project.prototypeUrl}
                            className="w-full h-full"
                            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  </RowReveal>
                )}

                <RowReveal delay={0.25}>
                  <div className="bg-med-background p-8 rounded-card text-text-dark">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      How This Reflects My Leadership Style
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This project sits at the intersection of UX, visual design,
                      and cross-functional delivery—and represents the kind of
                      work I lead best.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I took a legacy, business-critical flow and turned it into
                        something clearer and more humane without breaking
                        existing constraints.
                      </li>
                      <li>
                        I bridged between design standards, stakeholders, and
                        DevOps—keeping the brand intact while moving quickly
                        toward a shippable solution.
                      </li>
                      <li>
                        I documented decisions so future designers and engineers
                        can extend the system instead of reinventing it page by
                        page.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              </>
            )}

            {/* ============================================================
                CS3 – Linkup / brand & marketing
               ============================================================ */}
            {project.id === "cs3" && (
              <>
                {/* Product photography */}
                {project.images?.image4 && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.image4}
                          alt={`${project.title} product photography`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Art Direction & Product Photography
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I led the visual direction for the braided power cable
                          line—planning the shots, lighting, and compositions to
                          make a technical product feel aspirational for PC
                          builders.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Brand system */}
                {project.images?.brand && (
                  <RowReveal delay={0.19}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Brand System for the PC Builder Audience
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I helped define a consistent visual language for
                          Linkup in the PC gaming space: colour palette, tone,
                          and layout patterns that could flex across Amazon
                          listings, the website, social, and video.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.brand}
                          alt={`${project.title} brand system visuals`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Graphic templates */}
                {project.images?.components && (
                  <RowReveal delay={0.19}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.components}
                          alt={`${project.title} detail product imagery`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Graphic Templates & Brand System
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I created Illustrator templates and a flexible brand
                          system built around consistent typography, colour
                          palettes, and layout patterns, making it easier to
                          produce campaign-ready collateral.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Extra campaign visual */}
                {project.images?.image5 && (
                  <RowReveal delay={0.24}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Campaign-Ready Visual Variations
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          To support different platforms and formats, I built
                          out alternate crops and compositions that kept the
                          core look intact while adapting to thumbnails,
                          banners, and marketplace image requirements.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.image5}
                          alt={`${project.title} additional campaign visual`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Video */}
                {project.videoUrl && (
                  <RowReveal delay={0.28}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-dark-background rounded-card overflow-hidden">
                        <div className="w-full aspect-video">
                          <iframe
                            title="Linkup product video"
                            src={getYouTubeEmbedUrl(project.videoUrl)}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Product Video & Logo Animation
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I partnered with a motion designer to develop the
                          Linkup logo animation and then directed and shot the
                          flagship product video.
                        </p>
                        <p className="font-body text-sm text-text-secondary mt-4">
                          Watch the product spot directly in this case study.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Marketing & performance */}
                {project.marketingImages &&
                  project.marketingImages.length > 0 && (
                    <RowReveal delay={0.32}>
                      <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                        <div className="bg-med-background p-8 rounded-card text-text-dark">
                          <h3 className="text-h3 font-heading font-bold text-text-dark">
                            Marketing & Performance
                          </h3>
                          <p className="font-body text-xl text-text-secondary mt-4">
                            Beyond the visuals, I managed day-to-day marketing
                            activity around the product line—YouTube, Facebook,
                            Instagram content, analytics reporting, and Amazon
                            PPC campaigns.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <p className="font-body text-sm text-text-secondary">
                            Selected marketing stills – tap to expand:
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {project.marketingImages.map((src, index) => (
                              <button
                                key={`${project.id}-mkt-${index}`}
                                type="button"
                                onClick={() => setExpandedImage(src)}
                                className="group text-left"
                              >
                                <div className="rounded-card overflow-hidden border border-gray-200">
                                  <img
                                    src={src}
                                    alt={`${project.title} marketing visual ${
                                      index + 1
                                    }`}
                                    className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </RowReveal>
                  )}

                {/* Creative Lead takeaway */}
                <RowReveal delay={0.2}>
                  <div className="bg-med-background p-8 rounded-card text-text-dark">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      What This Shows About Me as a Creative Lead
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This case study brings together brand, product
                      storytelling, and performance marketing over several years
                      of work.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I owned the visual system for a flagship product line,
                        from product photography direction to
                        marketplace-ready assets.
                      </li>
                      <li>
                        I worked closely with stakeholders across marketing and
                        leadership to keep the creative consistent while we
                        experimented with new formats.
                      </li>
                      <li>
                        I tracked performance via analytics and campaigns, using
                        results to refine the creative.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              </>
            )}

            {/* GitHub link card – optional */}
            {project.githubLink && (
              <RowReveal delay={0.19}>
                <div className="mt-10 bg-med-background p-6 rounded-card flex flex-col gap-4 items-start text-text-dark">
                  <div>
                    <h3 className="text-h4 font-heading font-bold">
                      View the Code on GitHub
                    </h3>
                    <p className="font-body text-text-secondary mt-1">
                      This project is also available as a live React codebase,
                      including the animation and layout system used in this
                      case study.
                    </p>
                  </div>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-primary-button text-white font-nav font-bold text-base hover:bg-opacity-90"
                  >
                    Open GitHub Repo
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </RowReveal>
            )}
          </div>
        </div>

        {/* Expanded image overlay for cs3 thumbnails */}
        {expandedImage && (
          <div
            className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center px-4"
            onClick={() => setExpandedImage(null)}
          >
            <div
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={expandedImage}
                alt="Expanded project visual"
                className="w-full h-auto rounded-card shadow-2xl"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectModal;
