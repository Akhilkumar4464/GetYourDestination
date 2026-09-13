# Build Prompt: GetYourDestination — Full Website Expansion

Use this prompt (in Claude Code, Cursor, v0, or similar) to turn the existing
GetYourDestination tool (shown in the reference screenshots) into a complete
marketing + product website with five pages.

---

## 1. Context

I already have a working AI career-prep tool called **GetYourDestination**
(MERN stack — React/Vite frontend, Node/Express backend, MongoDB, Google
Gemini AI for report generation). The current UI (see attached screenshots)
covers only the core app screens: login, the "Generate My Interview
Strategy" form, and the Technical Preparation report view.

I want to wrap this existing tool inside a proper multi-page website so it
feels like a real product, not just a dashboard.

## 2. Objective

Build a 5-page website:

1. **Home** — marketing landing page, first impression, hero + value prop
2. **About** — the story, mission, and who it's for
3. **Service** — this is the existing product screens from the screenshots
   (resume upload, job description input, AI report generation, previous
   reports)
4. **Feedback** — a page for users to rate their experience and leave
   testimonials/reviews
5. **Contact** — a contact form + support details

The Service page reuses the existing functional app; Home, About, Feedback,
and Contact are new marketing/support pages that wrap around it.

## 3. Critical: Make This a Visually Distinct Version

The reference screenshots use a fairly generic dark SaaS look: navy/black
background, indigo-to-purple gradients, glowing blue accents. **Do not reuse
that palette or that visual language.** The new site must be immediately
recognizable as a different, more premium version — same product, new
identity.

Target aesthetic: **luxurious, editorial, confident** — like a high-end
career consultancy, not a generic AI SaaS template. Think private members'
club or a premium advisory brand, not "another purple gradient AI app."

### New Design System

**Color palette — "Obsidian & Gold"**
- Background (primary): `#0B0D10` (near-black obsidian, not navy)
- Background (secondary/cards): `#14171B`
- Primary accent (gold): `#C9A227` (muted antique gold, not bright yellow)
- Secondary accent (deep emerald): `#0E3B36` — used sparingly for depth/contrast
- Text (primary): `#F4F1E9` (warm ivory, not pure white)
- Text (muted): `#9A968B`
- Borders/dividers: `#26241E` (warm charcoal, not cool grey)
- Success/error states: soft sage green `#7A9A7E` / muted rust `#B5654A`
  (avoid neon red/green)

**Typography**
- Headings: a refined serif (e.g. "Fraunces," "Playfair Display," or
  "Canela"-style) for a luxury/editorial feel
- Body: a clean grotesk sans (e.g. "Inter," "General Sans") for readability
- Generous line-height and letter-spacing on headings; avoid the tight,
  bold-everywhere look of the reference screens

**Visual language**
- Thin 1px hairline borders instead of glowing box-shadows
- Gold used as a *hairline accent* (underlines, small icons, active states)
  — never as a full gradient background
- No purple/indigo gradients anywhere
- Subtle grain/texture or soft radial vignette instead of flat glow effects
- More whitespace / breathing room than the reference screens, which feel
  dense

Explicitly note in the build: **the Service page (steps 3 below) should
carry over the reference screenshots' functionality and layout logic, but
restyled entirely in this new palette and type system** — so a user could
recognize the product but immediately tell this is the newer, more premium
version.

## 4. Page-by-Page Requirements

### Global (all pages)
- Sticky top navbar: logo/wordmark, links to Home / About / Service /
  Feedback / Contact, and a "Sign In" / "Get Started" button (gold outline,
  fills gold on hover)
- Footer: logo, short tagline, nav links, social icons, Privacy Policy /
  Terms / Help Center links, copyright line (matches the reference screens'
  footer content but restyled)
- Consistent max-width container, consistent section padding rhythm

### 4.1 Home
- Hero: headline ("Land Your Next Role With Confidence" or similar,
  reworded in the new voice), subheadline, primary CTA ("Start Free
  Analysis") and secondary CTA ("See How It Works")
- Social proof strip: stats reused from reference (94.8% success rate,
  3.5x faster prep, 10k+ strategies crafted) restyled as a clean stat row
- "How it works" 3-step section: Upload Resume → Paste Job Description →
  Get Your AI Strategy
- Feature highlights (reuse the four feature cards from the reference
  login screen — Targeted Technical Deep Dives, STAR Behavioral Framework,
  Adaptive 7-Day Roadmaps, ATS-Optimized Resumes — restyled as a 2x2 or 4-up
  grid)
- Testimonial preview (2–3 quotes, linking to full Feedback page)
- Closing CTA band

### 4.2 About
- Founder/mission story: why GetYourDestination exists (built by a
  student who struggled with placement prep, for students in the same
  position)
- Mission statement section
- "Who it's for" (students, career switchers, engineers/PMs/designers
  prepping for interviews)
- Values or approach (3–4 short pillars, e.g. Personalized, Data-driven,
  Fast, Honest feedback)
- Optional: simple timeline or milestones

### 4.3 Service
- This is the existing product, restyled:
  - Job Description input panel (left) + Resume upload / Quick
    Self-Description panel (right), matching the reference layout
  - "Previous Reports" grid below
  - The generated report view (Technical Preparation / Behavioral
    Questions / Road Map tabs, with Focus Areas sidebar) as shown in
    screenshot 3
- Keep the functional structure identical to the reference (same fields,
  same tabs, same flow) — only the visual skin changes
- Add a short intro strip at the top of this page explaining what the tool
  does, since it now lives inside a marketing site rather than being the
  landing page itself

### 4.4 Feedback
- Overall rating summary (average stars, count of reviews)
- Grid/list of testimonial cards (name, role, company, quote, star rating)
- A "Leave Feedback" form: name, email, star rating selector, comment box,
  submit button
- Optional: filter/sort by rating

### 4.5 Contact
- Contact form: name, email, subject, message, submit
- Support info block: email address, response time expectation, link to
  Help Center
- Optional: simple FAQ accordion (3–5 common questions) above or beside the
  form

## 5. Tech / Implementation Notes

- Keep the existing stack: React + Vite, Tailwind CSS for styling, React
  Router for the 5 pages, deploy-ready for Vercel (frontend) as before
- Extract the current single-purpose app (screenshots) into the `/service`
  route; build Home/About/Feedback/Contact as new routes around it
- Componentize repeated pieces (Navbar, Footer, StatRow, FeatureCard,
  TestimonialCard, CTASection) so the new design system is defined once
  (Tailwind config / CSS variables for the Obsidian & Gold palette) and
  reused everywhere
- Keep the Service page wired to the existing backend (Node/Express +
  MongoDB + Gemini) — no functional changes there, styling only

## 6. Deliverable

A cohesive 5-page site where Home/About/Feedback/Contact clearly read as a
new, more premium visual identity ("Obsidian & Gold"), while the Service
page preserves the existing product's functionality but is restyled to
match — so someone comparing the old screenshots to the new site sees the
same product, elevated.
