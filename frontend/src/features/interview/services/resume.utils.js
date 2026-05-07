/**
 * resume.utils.js
 * Client-side resume generator — builds a styled HTML resume from an
 * interview report and triggers a browser download.
 * No external libraries needed.
 */

/**
 * Derive a short job-title guess from the job description text.
 * Looks for common patterns like "Senior X Engineer" at the start.
 */
function deriveTitle(description = "") {
    if (!description) return "Software Engineer";
    // Take the first non-empty line as the role title (capped at 80 chars)
    const firstLine = description
        .split(/\n/)
        .map((l) => l.trim())
        .find((l) => l.length > 3);
    return firstLine ? firstLine.slice(0, 80) : "Software Engineer";
}

/**
 * Build a beautiful, print-ready HTML resume string from the report data.
 * @param {Object} report - the InterviewReport document from the API
 * @returns {string} full HTML document string
 */
export function buildResumeHTML(report) {
    const jobTitle = deriveTitle(report?.Description || report?.description);
    const technicalQuestions = report?.technicalQuestions || [];
    const skillsGap = report?.skillsGap || [];
    const preparationPlan = report?.preparationPlan || [];
    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Derive key skills from skill-gap topics
    const skills = skillsGap.map((s) => s.skill).filter(Boolean);

    // Build preparation highlights as a summary of focus areas
    const planItems = preparationPlan.slice(0, 6).map((p) => `${p.day}: ${p.topic}`);

    // Top 5 sample tech questions as talking points
    const techPoints = technicalQuestions.slice(0, 5).map((q) => q.question);

    const skillsHTML = skills.length
        ? skills
              .map(
                  (s) =>
                      `<span style="display:inline-block;background:#f0f4ff;border:1px solid #c7d2fe;color:#3730a3;border-radius:20px;padding:3px 12px;font-size:12px;margin:3px 4px 3px 0;">${escapeHTML(s)}</span>`
              )
              .join("")
        : '<span style="color:#6b7280;font-style:italic;">To be assessed</span>';

    const planHTML = planItems.length
        ? planItems
              .map(
                  (item) =>
                      `<li style="margin-bottom:6px;color:#374151;">${escapeHTML(item)}</li>`
              )
              .join("")
        : '<li style="color:#6b7280;">Comprehensive preparation plan generated</li>';

    const techHTML = techPoints.length
        ? techPoints
              .map(
                  (q) =>
                      `<li style="margin-bottom:8px;color:#374151;line-height:1.5;">${escapeHTML(q)}</li>`
              )
              .join("")
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resume — ${escapeHTML(jobTitle)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: #f9fafb;
      color: #111827;
      padding: 40px 20px;
    }

    .page {
      max-width: 820px;
      margin: 0 auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.10);
      overflow: hidden;
    }

    /* Header */
    .resume-header {
      background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%);
      color: #fff;
      padding: 40px 48px 32px;
    }

    .resume-header h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }

    .resume-header .role {
      font-size: 15px;
      color: #c7d2fe;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .contact-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      font-size: 13px;
      color: #a5b4fc;
    }

    .contact-row span::before {
      margin-right: 4px;
    }

    /* Body */
    .resume-body {
      display: grid;
      grid-template-columns: 1fr 260px;
    }

    .main-col {
      padding: 36px 40px;
      border-right: 1px solid #e5e7eb;
    }

    .side-col {
      padding: 36px 28px;
      background: #f9fafb;
    }

    /* Section */
    .section { margin-bottom: 32px; }

    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #3730a3;
      margin-bottom: 14px;
      padding-bottom: 6px;
      border-bottom: 2px solid #e0e7ff;
    }

    /* Summary */
    .summary-text {
      font-size: 14px;
      line-height: 1.7;
      color: #374151;
    }

    /* Skills */
    .skills-cloud { line-height: 1.8; }

    /* Prep Plan */
    .plan-list {
      list-style: none;
      padding: 0;
    }

    .plan-list li {
      font-size: 13px;
      padding: 6px 0;
      border-bottom: 1px solid #f3f4f6;
      color: #374151;
    }

    /* Tech Q */
    .tech-list {
      list-style: disc;
      padding-left: 20px;
    }

    .tech-list li {
      font-size: 13.5px;
    }

    /* Note */
    .ai-note {
      font-size: 11px;
      color: #9ca3af;
      text-align: center;
      padding: 16px 40px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    @media print {
      body { padding: 0; background: #fff; }
      .page { box-shadow: none; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="page">

    <!-- Header -->
    <div class="resume-header">
      <h1>Your Full Name</h1>
      <p class="role">${escapeHTML(jobTitle)}</p>
      <div class="contact-row">
        <span>📧 youremail@example.com</span>
        <span>📞 +91 00000 00000</span>
        <span>🔗 linkedin.com/in/yourprofile</span>
        <span>📍 City, India</span>
      </div>
    </div>

    <!-- Body -->
    <div class="resume-body">

      <!-- Main Column -->
      <div class="main-col">

        <!-- Summary -->
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p class="summary-text">
            Motivated and results-driven professional seeking the role of
            <strong>${escapeHTML(jobTitle)}</strong>.
            Equipped with hands-on experience and a strong foundation in the key
            competencies required for this position, with a commitment to
            continuous learning and delivering high-quality outcomes.
          </p>
        </div>

        ${techHTML ? `
        <!-- Key Focus Areas (from AI-generated questions) -->
        <div class="section">
          <div class="section-title">Key Technical Competencies</div>
          <ul class="tech-list">
            ${techHTML}
          </ul>
        </div>` : ""}

        <!-- Experience placeholder -->
        <div class="section">
          <div class="section-title">Work Experience</div>
          <p style="font-size:13px;color:#6b7280;font-style:italic;">
            Add your work experience here — role, company, dates, and bullet-point achievements.
          </p>
        </div>

        <!-- Education placeholder -->
        <div class="section">
          <div class="section-title">Education</div>
          <p style="font-size:13px;color:#6b7280;font-style:italic;">
            Bachelor of Technology / B.Sc. in Computer Science or relevant field.
          </p>
        </div>

      </div>

      <!-- Side Column -->
      <div class="side-col">

        <!-- Skills -->
        <div class="section">
          <div class="section-title">Skills to Highlight</div>
          <div class="skills-cloud">${skillsHTML}</div>
        </div>

        ${planItems.length ? `
        <!-- Preparation Roadmap -->
        <div class="section">
          <div class="section-title">Preparation Plan</div>
          <ul class="plan-list">
            ${planHTML}
          </ul>
        </div>` : ""}

        <!-- Generated on -->
        <div class="section" style="margin-top: auto;">
          <p style="font-size:11px;color:#9ca3af;">Generated on ${today}</p>
        </div>

      </div>
    </div>

    <div class="ai-note">
      ✨ AI-tailored resume skeleton generated by GetYourDestination •
      Please fill in your personal details and experience before sharing.
    </div>

  </div>
</body>
</html>`;
}

/**
 * Trigger a browser download of the generated HTML resume.
 * @param {Object} report - the interview report object
 */
export function downloadResume(report) {
    const html = buildResumeHTML(report);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-tailored.html";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 200);
}

/** Simple HTML escape */
function escapeHTML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
