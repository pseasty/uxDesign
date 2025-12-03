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
                          Design System Foundations
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I started by defining the core system: typography scales, colour roles,
                          spacing tokens, and interaction states. The goal was to create a visual
                          language that feels bold but minimal while staying flexible enough to
                          support new pages, case studies, and future experiments without
                          redesigning everything from scratch.
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
                          The site is built from a reusable component set—hero modules, project
                          cards, content rows, and CTAs—mapped to real content patterns in the
                          portfolio. This keeps the experience consistent across pages, makes it
                          easy to add new work, and mirrors how I think about design systems in
                          product teams: shared components, predictable behavior, and clear
                          constraints.
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
                          From Figma Concepts to Production UI
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I designed the experience in Figma, then implemented it in React with
                          Framer Motion handling key transitions and scroll reveals. Building
                          the portfolio as a real product forced me to make practical decisions
                          about performance, responsiveness, and animation detail—the same
                          trade-offs I navigate when working with engineering teams on live
                          features.
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
                      How This Reflects My UX & Product Practice
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This portfolio behaves like a small product: it has users, flows,
                      constraints, and a roadmap. I use it as a sandbox to practice the
                      same UX and product thinking I bring to client work.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I shaped the narrative and information architecture so hiring
                        managers can quickly understand who I am, what I do, and where to
                        go next.
                      </li>
                      <li>
                        I treated the interface as a design system, with reusable patterns
                        and motion primitives that make the experience scalable and easy to
                        evolve.
                      </li>
                      <li>
                        I built the UI myself, which helps me communicate clearly with
                        engineers, prototype ideas quickly, and spot implementation issues
                        early.
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
                          The legacy confirmation and enrollment screen was dense and hard to
                          scan. Primary tasks were buried among secondary controls, the visual
                          hierarchy didn&apos;t match real user goals, and there was little
                          guidance around what would happen next. People had to slow down,
                          reread, and double-check details just to feel confident that their
                          enrollment was correct.
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
                            The redesigned flow surfaces the primary task first—confirming or
                            updating enrollment—then supports secondary actions like cancellations
                            or adjustments. Clear sectioning, consistent labels, and obvious
                            affordances reduce cognitive load, while the mobile and desktop
                            layouts share the same underlying structure so users don&apos;t have
                            to relearn the experience across devices.
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
                          The organization already had a mature visual identity and
                          non-negotiable guidelines. My role was to translate that system into a
                          complex registration flow without introducing one-off patterns. I
                          mapped existing typography, colour, and component conventions to the
                          new screens so the experience felt native to the broader ecosystem
                          instead of like an exception.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          In focused working sessions with the design standards team and
                          DevOps, I walked through key decisions—why components were grouped,
                          which states we needed to support, and how success and error states
                          should behave—so everyone understood the rationale behind the final
                          UI.
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
                           Detailed Specs for Confident Handoff
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I delivered a set of annotated screens with grid overlays, spacing
                          rules, and component usage notes, along with examples of different
                          states (empty, partial, full, error). This gave the DevOps team a
                          clear reference for implementation and reduced back-and-forth around
                          layout, responsiveness, and edge cases as the flow evolved.
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
                          I partnered closely with the registration DevOps lead to keep design
                          and implementation aligned. We reviewed builds against the Figma
                          specs in short working sessions, resolving questions on the spot and
                          updating designs when constraints surfaced. This pairing reduced
                          rework and helped us move from concept to usable experience quickly.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          These conversations weren&apos;t just about pixels—they ensured that
                          the UI reflected real operational constraints while still honoring
                          the design system and improving the user journey.
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
                        I used an interactive Figma prototype to walk stakeholders through
                        realistic scenarios—confirming multiple enrollments, updating details,
                        and cancelling participation. This made it easier to gather feedback
                        on task flows and copy, not just static screens, and gave the DevOps
                        team a concrete reference for expected behavior.
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
                      How I Led the UX Work
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This project sits at the intersection of UX, systems thinking, and
                      delivery. My focus was to improve the experience without breaking the
                      operational and branding constraints around it.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I reframed a legacy, business-critical screen around real user
                        tasks, then redesigned the flow to be easier to scan and act on.
                      </li>
                      <li>
                        I bridged between design standards, stakeholders, and DevOps so the
                        solution stayed on brand, feasible to build, and aligned with the
                        broader product ecosystem.
                      </li>
                      <li>
                        I documented layout, states, and rationale so future designers and
                        engineers can extend the pattern instead of reinventing it.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              </>
            )}

            {/* ============================================================
                CS3 – PrizmPix client web app
              ============================================================ */}
            {project.id === "cs3" && (
              <>
                {/* Problem & goals + key screen */}
                {project.images?.screen1 && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Context & Goals
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          PrizmPix needed a web experience that clearly explained the
                          services, showcased selected work, and made it easy for potential
                          clients to reach out. My first step was to clarify the primary
                          user journeys: explore what PrizmPix does, see proof of work, and
                          decide whether to contact for a project.
                        </p>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          That led to a focused structure: a concise value proposition,
                          scannable service overview, and clear paths into case studies and
                          contact—designed for people who are evaluating multiple options
                          and don&apos;t have time to dig.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedImage(project.images.screen1)}
                        className="bg-white rounded-card p-4 border border-gray-200 text-left"
                      >
                        <img
                          src={project.images.screen1}
                          alt={`${project.title} – key overview screen`}
                          className="w-full h-auto block rounded-md"
                        />
                      </button>
                    </div>
                  </RowReveal>
                )}

                {/* Information architecture & navigation */}
                {(project.images?.screen2 || project.images?.screen3) && (
                  <RowReveal delay={0.1}>
                    <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Information Architecture & Flows
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I organized the site around the decisions a prospective client
                          actually makes: “What do you offer?”, “Is your work relevant to
                          my needs?”, and “Do I trust you enough to get in touch?” The
                          navigation reflects these questions, with clear entry points into
                          services, case studies, and about content instead of a long menu
                          of pages.
                        </p>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          Each page is structured as a flow rather than a gallery of
                          visuals—headlines, supporting copy, and interaction points guide
                          users toward the next meaningful step instead of leaving them to
                          guess where to go.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {project.images?.screen2 && (
                          <button
                            type="button"
                            onClick={() => setExpandedImage(project.images.screen2)}
                            className="bg-white rounded-card p-4 border border-gray-200 w-full text-left"
                          >
                            <img
                              src={project.images.screen2}
                              alt={`${project.title} – content / case study screen`}
                              className="w-full h-auto block rounded-md"
                            />
                          </button>
                        )}
                        {project.images?.screen3 && (
                          <button
                            type="button"
                            onClick={() => setExpandedImage(project.images.screen3)}
                            className="bg-white rounded-card p-4 border border-gray-200 w-full text-left"
                          >
                            <img
                              src={project.images.screen3}
                              alt={`${project.title} – supporting screen`}
                              className="w-full h-auto block rounded-md"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Responsive layout & contact path */}
                {project.images?.screen4 && (
                  <RowReveal delay={0.18}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Responsive Layout & Contact Experience
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The interface is designed mobile-first, with key actions—viewing
                          work and getting in touch—remaining visible and easy to reach on
                          smaller screens. Components reuse the same spacing, type scales,
                          and button treatments across breakpoints so the experience feels
                          consistent whether someone discovers PrizmPix on a phone or a
                          desktop.
                        </p>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The contact path is intentionally simple: short copy that frames
                          the type of projects that are a good fit, followed by a clear,
                          low-friction way to start a conversation.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedImage(project.images.screen4)}
                        className="bg-white rounded-card p-4 border border-gray-200 text-left"
                      >
                        <img
                          src={project.images.screen4}
                          alt={`${project.title} – responsive / contact screen`}
                          className="w-full h-auto block rounded-md"
                        />
                      </button>
                    </div>
                  </RowReveal>
                )}

                {/* Optional prototype embed if you add project.prototypeUrl later */}
                {project.prototypeUrl && (
                  <RowReveal delay={0.22}>
                    <div className="bg-med-background p-8 rounded-card text-text-dark">
                      <h3 className="text-h3 font-heading font-bold text-text-dark">
                        Interactive Prototype
                      </h3>
                      <p className="font-body text-xl text-text-secondary mt-4">
                        An interactive Figma prototype made it easier to review the end-to-end
                        experience with the client, focusing on how users move between
                        services, case studies, and contact rather than just isolated screens.
                      </p>

                      <div className="w-full mt-4">
                        <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-white rounded-card overflow-hidden border border-gray-200">
                          <iframe
                            title="PrizmPix web app prototype"
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

                {/* UX/Product takeaway */}
                <RowReveal delay={0.26}>
                  <div className="bg-med-background p-8 rounded-card text-text-dark">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      What This Shows About My UX & Product Work
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This project brings together information architecture, interface design,
                      and practical delivery for a real client. It reflects how I approach
                      end-to-end UX and product work, even on a relatively small surface area.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I clarified user goals and structured the site around the actual
                        decisions prospects need to make, instead of just listing pages.
                      </li>
                      <li>
                        I designed a reusable set of layouts and components that can scale as
                        PrizmPix adds more services or case studies, without fragmenting the
                        experience.
                      </li>
                      <li>
                        I collaborated closely around implementation so that the built product
                        matches the intended flow and interaction details, not just the static
                        mocks.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              </>
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
