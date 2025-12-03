// src/CaseStudyGrid.jsx

import React from "react";
import { CASE_STUDIES } from "./caseStudies";
import "./CaseStudies.css";

export default function CaseStudyGrid({ onOpen }) {
  return (
    <section className="cs-section">
      <div className="cs-section-header">
        <p className="cs-eyebrow">Selected Work</p>
        <h2 className="cs-section-title">Case Studies</h2>
      </div>

      <div className="cs-grid">
        {CASE_STUDIES.map((study) => (
          <article
            key={study.id}
            className="cs-card"
            onClick={() => onOpen(study.id)}
          >
            <div className="cs-card-imageWrapper">
              <img
                src={study.thumbnail}
                alt={study.title}
                className="cs-card-image"
              />
            </div>

            <div className="cs-card-body">
              <p className="cs-card-heading">{study.heading}</p>
              <h3 className="cs-card-title">{study.title}</h3>
              <p className="cs-card-label">{study.cardLabel}</p>
              <p className="cs-card-description">{study.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
