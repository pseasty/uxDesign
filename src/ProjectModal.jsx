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

          {/* Links Section - ADD THIS HERE */}
          {(project.websiteLink || project.githubLink) && (
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.websiteLink && project.websiteLink !== "#" && (
                <a
                  href={project.websiteLink.startsWith("http") ? project.websiteLink : `https://${project.websiteLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-button text-white font-nav font-bold hover:bg-opacity-80 transition-colors"
                >
                  View Live Site
                  <ArrowUpRight size={18} />
                </a>
              )}
              
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white font-nav font-bold hover:bg-gray-700 transition-colors"
                >
                  View on GitHub
                  <ArrowUpRight size={18} />
                </a>
              )}
            </motion.div>
          )}


          <div className="mt-20 space-y-10">
            {/* Main splash image – skip CS2 so we can place it lower in the flow */}
              {project.images?.main && project.id !== "cs2" && (
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
                CS2 – registration software design and brand standards
              ============================================================ */}
              {project.id === "cs2" && (
                <>
                  {/* Cluster 1: Before / After columns, then desktop view */}
                  <RowReveal>
                    <div className="space-y-10 lg:space-y-12">
                      {/* TWO-COLUMN LAYOUT: Each column has image + text stacked */}
                      <div className="grid gap-8 lg:grid-cols-2 items-center">
                        {/* LEFT COLUMN: BEFORE */}
                        <div className="space-y-6">
                          {/* BEFORE image */}
                          {project.images?.before && (
                            <div className="bg-white rounded-card p-4 border border-gray-200">
                              <img
                                src={project.images.before}
                                alt={`${project.title} – legacy confirmation and enrollment screen`}
                                className="w-full h-auto block rounded-md"
                              />
                            </div>
                          )}

                          {/* BEFORE text card */}
                          <div className="bg-med-background p-7 rounded-card text-text-dark">
                            <h3 className="text-h3 font-heading font-bold text-text-dark">
                              Before – cognitive load &amp; drop-offs
                            </h3>
                            <p className="text-xl text-text-secondary mt-3">
                              The legacy confirmation and enrollment screen tried to show
                              everything at once: academic details, session options, payment
                              expectations, and fine print. Parents had to slow down, reread,
                              and double-check details just to feel confident their enrollment
                              was correct. Multi-student enrollments amplified the problem and
                              increased the chance of errors and cancellations.
                            </p>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: AFTER */}
                        <div className="space-y-6">
                          {/* AFTER image */}
                          {project.images?.after && (
                            <div className="bg-white rounded-card p-4 border border-gray-200">
                              <img
                                src={project.images.after}
                                alt={`${project.title} – redesigned multi-enrollment flow (mobile)`}
                                className="w-full h-auto block rounded-md"
                              />
                            </div>
                          )}

                          {/* AFTER text card */}
                          <div className="bg-med-background p-7 rounded-card text-text-dark">
                            <h3 className="text-h3 font-heading font-bold text-text-dark">
                              After – guided, mobile-first progression
                            </h3>
                            <p className="text-xl text-text-secondary mt-3">
                              I reframed the flow around the parent's mental model: one clear
                              task at a time, predictable progression, and obvious next steps.
                              Actions are grouped by intent, copy is more direct, and
                              multi-enrollment is supported through repeatable patterns instead
                              of more clutter. The mobile-first layout became the foundation
                              for tablet and desktop.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* DESKTOP HERO + CAPTION CARD (full width) */}
                      {project.images?.main && (
                        <div className="space-y-6">
                          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <img
                              src={project.images.main}
                              alt="Desktop layout of the redesigned registration confirmation and enrollment flow"
                              className="w-full h-auto object-cover"
                            />
                          </div>

                          <div className="bg-med-background p-8 rounded-card text-text-dark">
                            <h3 className="text-h3 font-heading font-bold text-text-dark">
                              Desktop view for wider breakpoints
                            </h3>
                            <p className="text-xl text-text-secondary mt-3">
                              The experience was designed mobile-first, then scaled up for
                              wider breakpoints using the same component structure, spacing
                              system, and visual hierarchy. On desktop, the grid opens up, but
                              the core behaviors and states stay consistent so parents
                              don&apos;t have to relearn the flow when they switch devices.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </RowReveal>

                {/* Design standards & Working within design system */}
                <RowReveal delay={0.1}>
                  <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-10">
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
                          non-negotiable guidelines. My role was to translate that system
                          into a complex registration flow without introducing one-off
                          patterns. I mapped existing typography, colour, and component
                          conventions to the new screens so the experience felt native to
                          the broader ecosystem instead of like an exception.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          In focused working sessions with the design standards team and
                          DevOps, I walked through key decisions—why components were
                          grouped, which states we needed to support, and how success and
                          error states should behave—so everyone understood the rationale
                          behind the final UI.
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
                          clear reference for implementation and reduced back-and-forth
                          around layout, responsiveness, and edge cases as the flow evolved.
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
                          I partnered closely with the registration DevOps lead to keep
                          design and implementation aligned. We reviewed builds against the
                          Figma specs in short working sessions, resolving questions on the
                          spot and updating designs when constraints surfaced. This pairing
                          reduced rework and helped us move from concept to usable
                          experience quickly.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          These conversations weren&apos;t just about pixels—they ensured
                          that the UI reflected real operational constraints while still
                          honoring the design system and improving the user journey.
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
                        realistic scenarios—confirming multiple enrollments, updating
                        details, and cancelling participation. This made it easier to gather
                        feedback on task flows and copy, not just static screens, and gave
                        the DevOps team a concrete reference for expected behavior.
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
                {/* 1. Persona + Empathy Map (single horizontal image + paragraph card) */}
                {project.images?.empathyMap && (
                  <RowReveal>
                    <div className="space-y-8">
                      {/* Horizontal persona/empathy image */}
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.empathyMap}
                          alt="Jenna business owner persona and empathy map"
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      {/* Descriptive paragraph in a card */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Jenna — Business Owner Persona
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          Jenna represents the kind of busy business owner this site is
                          designed for: she knows her website should be a revenue-driving
                          system, not just a brochure, but she doesn&apos;t have the time
                          or appetite for technical details. Mapping her goals,
                          frustrations, and behaviours confirmed that she doesn&apos;t want
                          more features—she wants more clarity. That insight shaped how I
                          structured the content and tone: less technical detail up front,
                          more guidance, examples, and next steps.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* 2. Journey Map (full-width image + paragraph card) */}
                {project.images?.journeyMap && (
                  <RowReveal>
                    <div className="mt-16 space-y-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.journeyMap}
                          alt="Client experience journey map for Jenna working with PrizmPix"
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Client Experience Journey
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The journey map outlines Jenna&apos;s path from realizing her
                          current site is holding the business back, through researching
                          options, into onboarding, delivery, and ongoing support. It
                          highlights key emotional moments—uncertainty, overwhelm, relief,
                          and confidence—which I used to decide where the website should
                          educate, where it should provide proof, and where it should make
                          it easy to get in touch.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* 3. Lo-fi Wireframes (full-width image + paragraph card) */}
                {project.images?.loFi && (
                  <RowReveal>
                    <div className="mt-16 space-y-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.loFi}
                          alt="Lo-fidelity PrizmPix home page wireframe sketches"
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Lo-Fi Wireframes — Exploring Structure
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          The lo-fi sketches focused on structure rather than style: how
                          quickly can Jenna understand what PrizmPix does, who it serves,
                          and what the next step is? I experimented with different ways of
                          prioritizing the hero message, service categories, proof (case
                          studies and testimonials), and contact entry points. Working at
                          this level made it easy to test alternative layouts without
                          getting stuck on visual details or motion.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* 4. Mid-fi Wireframes (full-width image + paragraph card) */}
                {project.images?.midFi && (
                  <RowReveal>
                    <div className="mt-16 space-y-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.midFi}
                          alt="Mid-fidelity PrizmPix wireframes showing layout and components"
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Mid-Fi Wireframes — Layout & Component System
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          In the mid-fi wireframes, I translated the strongest sketch
                          directions into a defined grid, typography scale, and reusable
                          modules. Sections like “Custom Website Builds,” “Our Work,” and
                          “How We Work” became components that can scale across future
                          pages. This is also where I planned the motion language—where the
                          GIF text mask, Lottie animations, and hover states would live so
                          they support the narrative instead of distracting from it.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* 5. Hi-fi Designs (two vertical mocks) + Outcome card */}
                {(project.images?.hiFi1 || project.images?.hiFi2) && (
                  <RowReveal>
                    <div className="mt-16 space-y-8">
                      <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-8">
                        {project.images?.hiFi1 && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.hiFi1}
                              alt="Final PrizmPix home page design"
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                        {project.images?.hiFi2 && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.hiFi2}
                              alt="Final PrizmPix work / case studies page design"
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      {/* Outcome / success summary */}
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Outcome
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          {project.outcome ||
                            "By aligning the website to the real emotional and operational needs of business owners, the final design became more than a marketing site — it became a clear decision path. Users can understand services, evaluate previous work, and reach out confidently with far fewer unknowns."}
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

              </>
            )}
          </div>
        </div>

       {/* Modal Footer CTA - ADD THIS HERE */}
        <div className="mt-20 bg-dark-background py-16">
          <div className="max-w-container mx-auto px-4 lg:px-[110px]">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-h3 font-heading font-bold text-white">
                Interested in working together?
              </h3>
              <p className="text-gray-400 mt-4 text-xl">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className="mt-8 px-8 py-3 rounded-md font-nav font-bold text-lg bg-primary-button text-white hover:bg-opacity-80 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
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
