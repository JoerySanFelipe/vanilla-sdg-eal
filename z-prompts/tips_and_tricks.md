# 5 Underrated Tricks to Maximize Your Coding Agent

This guide shows you how to leverage my advanced features to build the **UCU External Affairs & Linkages** portal faster, cleaner, and with complete visual confidence.

---

## 1. The Interactive Interview (`/grill-me`)
When starting a new feature, you don't need to write a massive, detailed prompt specifying every detail. You can use the `/grill-me` command to have me interview *you*.

### How to use it:
Type `/grill-me` followed by a brief description of what you want to achieve.
> **Example prompt:** `/grill-me I want to build a new contact form component for partnerships`

### What happens:
1. I will halt normal operations and display an interactive modal with multiple-choice questions.
2. I will ask about inputs, style preferences, validation needs, and error handling.
3. Once you submit, I will auto-generate a comprehensive [implementation_plan.md](file:///C:/Users/Joery/.gemini/antigravity-ide/brain/92cfe510-fe2b-4016-bd8f-51b5f50c7b46/implementation_plan.md) matching your answers perfectly.

---

## 2. Visual UI Mockups & Asset Creation (`generate_image`)
Before committing to HTML structure or Tailwind classes, you can iterate on design concepts or generate actual image assets.

### How to use it:
Ask me to generate a mockup or visual concept for a component.
> **Example prompt:** *"Can you generate a visual mockup for the new <ucu-home-hero> component? Make it look like a premium university annual report with a deep blue gradient, white text, and clear typographic hierarchy."*

### What happens:
1. I will run the image generation pipeline and create a premium UI design.
2. The image will be saved directly in the workspace artifacts directory.
3. You can review it, critique it, and tell me to tweak it before we write a single line of code.

---

## 3. Automated Interactive Verification (`browser_subagent`)
You do not need to open the browser, resize your screen, or test modal scroll locking manually. I can do it for you and provide video proof.

### How to use it:
Request visual testing during or after code changes.
> **Example prompt:** *"Verify the ucu-header mobile view. Resize the viewport to 375px, toggle the menu twice, click an accordion, and show me a recording of it."*

### What happens:
1. I start a headless browser subagent that targets your local server.
2. It interacts with the elements exactly as requested.
3. It captures a screen recording (saved as a high-quality WebP video) and links it directly in the [walkthrough.md](file:///C:/Users/Joery/.gemini/antigravity-ide/brain/92cfe510-fe2b-4016-bd8f-51b5f50c7b46/walkthrough.md) so you can play it inside your IDE.

---

## 4. Code Auditing & Critique Mode (Zero Code Generation)
Instead of asking me to rewrite a file, you can request a critique to ensure strict code quality. This is highly useful for checking if code complies with your **UCU Master Prompt** rules.

### How to use it:
Link a file or code block and ask for an audit.
> **Example prompt:** *"Audit [partnership.html](file:///c:/kudecode/sdg-web/partnership.html) against the 'No Green' rule and Biomechanical Reading Rules. Do not write any code, just list violations."*

### What happens:
1. I scan the file line-by-line.
2. I list every violation (e.g., inline green Tailwind classes like `text-green-500` or paragraphs missing the `.ucu-prose-narrative` wrapper).
3. I explain the exact fix, leaving you in full control of when and how the edits are committed.

---

## 5. Background Goal Sweep (`/goal`)
If you have a tedious, multi-file sweep that would take you hours of manual editing, delegate it to me as a background goal.

### How to use it:
Type `/goal` followed by a sweeping request.
> **Example prompt:** `/goal Scan all 17 SDG HTML files in sdg-reports/2025/ and ensure their base paths and script tags are relative and resolve cleanly.`

### What happens:
1. I enter an extra-thorough execution mode.
2. I list all target files, construct a multi-step checklist, and systematically edit, lint, and verify each file.
3. You can close the chat or work on something else; I will notify you automatically when the entire goal is achieved.



Here is the breakdown of the steps I currently perform each time you request an indicator conversion. I have categorized them by their importance and highlighted where we can optimize to save limit quota.

---

### Category A: IMPORTANT (Cannot be skipped)

1. **Scan Document Directory & Target File**
   * *What it does*: Matches the target HTML indicator with the corresponding DOCX reference file.
   * *Why it's critical*: Files often have typos in their filenames (e.g. `2_16` for the `2_15` indicator), so I must verify the file name on disk first.
2. **Extract & Parse DOCX Content**
   * *What it does*: Runs a Python script to extract the exact text paragraphs and locate image reference positions in the document body.
   * *Why it's critical*: Ensures a 1:1 literal transfer of words without summaries.
3. **Write the HTML Fragment Code**
   * *What it does*: Rewrites the target `.html` file with the exact paragraphs, inline image tables, styling tags (`<strong>`), and standard layout classes.
4. **Compile Tailwind CSS Styles**
   * *What it does*: Runs `npx @tailwindcss/cli` to build and output the updated stylesheet.
   * *Why it's critical*: Ensures all utility classes compile properly and render correctly.

---

### Category B: SKIPPABLE & OPTIMIZABLE (Can be bypassed or combined to save quota)

5. **Create & Approve Implementation Plans (`implementation_plan.md`)**
   * *What it does*: Drafts a design document explaining the proposed layout changes and waits for approval.
   * *Optimization*: Since we have now aligned on a **strict left-aligned article format with bolded keywords and no subheadings/cards**, we can skip this planning phase entirely and proceed directly to code execution. This will save a significant amount of token quota and time per turn.
6. **Maintain Task Checklists (`task.md`)**
   * *What it does*: Updates checkboxes to track current progress.
   * *Optimization*: We can skip creating and updating this file entirely and let me keep track of the tasks internally.
7. **Extracting DOCX Media Files**
   * *What it does*: Unzips and extracts all image attachments.
   * *Optimization*: If the target indicator does not require images, or if the correct images are already present on disk in the `images/evidence/` directory, I can skip this extraction process completely.
8. **Logging Walkthroughs (`walkthrough.md`)**
   * *What it does*: Appends details of the completed work to the master log.
   * *Optimization*: Instead of editing this file on every single turn, we can skip updating it, or update it only at the very end of our session.

---

### Recommended Optimization Proposal:
To save maximum quota and complete indicators faster, we can follow this streamlined workflow:
1. **You send the target file & reference directory.**
2. **I extract the text, immediately rewrite the HTML file 1:1, compile Tailwind CSS, and report completion.**
3. **No plans, no checkboxes, no walkthrough updates, and no media extraction unless specifically required.**

Let me know if this sounds good to you!

---

## Strict HTML Formatting Rules for Indicator Evidence

When converting reference documents to indicator HTML files, follow these rules:

1. **Root Container & Structure:** Wrap the entire content in a single `<div class="ucu-prose-evidence flex flex-col">` container.
2. **1:1 Literal Text Copy:** The text must match the source DOCX file word-for-word. Do not add summaries, intro cards, or wrapper card components.
3. **Subheadings:** You may add subheadings only if needed (e.g. `<h3 class="text-lg font-bold text-ucu-blue-dark mt-6 mb-3">`). Do not add extra text or details that cause confusion; keep the content clean and concise.
4. **Uniform Spacing:** Apply proper and uniform spacing throughout the page (e.g., margins between paragraphs and spacing around tables/images).
5. **Scannability Bolding:** Bold key sustainability terms, program names, organizations, and metrics using `<strong>` tags.
6. **No Green Policy:** Do not use green utility classes (e.g. `bg-green-*`, `text-green-*`). Use only official UCU branding colors (e.g., `bg-ucu-blue-dark`, neutrals).
7. **Inline Image Tables:** Use premium rounded shadow tables for images/figures (with `bg-ucu-blue-dark` header titles and hover transitions).
8. **Metadata Comment:** Always start the file with the JSON configuration header comment containing the ID, title, badge, src path, and related SDGs.