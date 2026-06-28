# Project Handover & Status: UCU SDG Web Portal

This document serves as the persistent state, knowledge base, and session history. If you are starting a new session on a different device or environment, **read this file first** to understand the current task progress, procedures, recent changes, directory layout, and active code assets.

---

## 1. Active Goal & Current Tasks

### Goal
Convert reference `.docx` files containing SDG evidence for **Urdaneta City University (UCU)** into clean, framework-less, semantic HTML5 fragments that align with UI GreenMetric and THE Impact Rankings guidelines.

### Active Category / Pillar
- **Pillar**: Education & Research (Pillar 6)
- **Registry File**: `indicators/education.html`

### Current Task Status
- [x] **6.13** `evidence/education/6_13.html` (Number of Cultural Activities on Campus) - Converted and formatted.
- [x] **6.14** `evidence/education/6_14.html` (University Sustainability Program(s) with International Collaborations) - Converted and formatted.
- [x] **6.15** `evidence/education/6_15.html` (Number of Sustainability Community Services Projects Involving Students) - Converted and formatted.
- [x] **6.3** `evidence/education/6_3.html` (Total Number of Study Programs Related to Sustainability) - Converted and formatted.
- [/] **6.12** `evidence/education/6_12.html` (Number of Activities Organized by Student Organizations Related to Sustainability) - **IN PROGRESS**. The source document `document_files/University_Country_6_12_Number_of_activities_organized_by_student_organizations_related_to_sustainability_per_year.docx` has been placed in `document_files/` but the HTML fragment `evidence/education/6_12.html` is not fully aligned/finalized. This is the next indicator that needs to be updated.
- [ ] **Other SDG 6/Education indicators**: Need to be verified for word-for-word accuracy and visual styles (clean rounded shadow tables, biomechanical paragraph classes, bolded keywords).

---

## 2. Directory Structure & Key Resource Paths

- **Source DOCX Files**: `document_files/` (e.g., `University_Country_6_12_...docx`)
- **HTML Evidence Fragments**: `evidence/[pillar]/[id].html` (e.g., `evidence/education/6_13.html`)
- **Pillar/Indicator Registries**: `indicators/[pillar].html` (e.g., `indicators/education.html`)
- **Images Directory**: `images/evidence/[indicator_id_dot_notation]/` (e.g., `images/evidence/6.12/`)
- **Styles**:
  - Global CSS Input: `css/global.css`
  - Compiled Style Output: `css/style.css`
- **Helper Scripts (DOCX Extraction)**:
  - Text Extraction: `python z-prompts/read_docx.py <docx_path> <output_txt_path>`
  - Image/Media Extraction: `python z-prompts/extract_media.py <docx_path> <output_dir>`
  - Structural Inspection: `python z-prompts/inspect_docx.py <docx_path>`
- **Global Rules**: `.agents/AGENTS.md` (automatic instructions loaded by Antigravity)

---

## 3. Strict Layout, Styling, and Conversion Procedures

When processing any indicator, follow this sequence:

### Step 1: Scan & Verify Filenames
Check the headers/contents of the `.docx` file in `document_files/`. Filenames sometimes have typos (e.g., `2_16...docx` containing evidence for `2.15`). Read the document's headers first to verify the actual indicator ID.

### Step 2: Extract DOCX Content & Media
- Run the python extraction script:
  `python z-prompts/read_docx.py document_files/University_Country_X_Y_....docx scratch/extracted_text.txt`
- Run the media extraction script to save images to the assets directory:
  `python z-prompts/extract_media.py document_files/University_Country_X_Y_....docx images/evidence/X.Y/`

### Step 3: Format the HTML Fragment (`evidence/[pillar]/X_Y.html`)
- Wrap the entire content in:
  `<div class="ucu-prose-evidence flex flex-col">`
- Place newly extracted evidence screenshots/photos **at the top** of the content body (immediately after the opening `div` tag, before any description or introductory paragraphs).
- Group images into clean rounded tables with dark blue headers:
  ```html
  <table class="w-full border-collapse border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6 text-center">
    <thead>
      <tr class="bg-ucu-blue-dark text-white font-bold text-base">
        <th colspan="2" class="py-3 px-4 text-center">Event/Table Title</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white">
        <td class="p-4 border-r border-slate-200 align-middle">
          <img src="../../images/evidence/X.Y/image1.png" class="rounded-xl max-w-full h-auto mx-auto border border-slate-100 hover:scale-[1.01] transition-transform duration-300 shadow-sm" alt="Description" />
        </td>
      </tr>
    </tbody>
  </table>
  ```
- Exclude images that act solely as document cover pages.
- Wrap all body paragraphs in:
  `<p class="mb-3 text-lg font-medium leading-relaxed text-muted">`
- Do NOT use green Tailwind classes (`bg-green-*`, `text-green-*`, `border-green-*`). Use neutrals, white, and UCU dark blue (`bg-ucu-blue-dark`).
- Copy text paragraphs, table cells, and values from the source DOCX files **exactly as written, word-for-word, without paraphrasing or performing calculations**.
- Bold key sustainability terms, program names, organizations, and metrics using `<strong>` tags.
- Retain the JSON metadata comment at the top of the file:
  ```html
  <!--
  {
    "id": "X_Y",
    "title": "X.Y Indicator Title (Suffix)",
    "badge": "Pillar Badge Name",
    "src": "../evidence/[pillar]/X_Y.html",
    "relatedSdgs": [4, 11]
  }
  -->
  ```

### Step 4: Sync Title and Suffixes
- Update indicator titles in both the file's metadata comment and the corresponding `indicators/*.html` registry to match the DOCX title, including any indicator code suffixes (e.g. `(GD.5)`, `(WS.2)`, `(ED.6)`).
- Never rename physical files (e.g. keep `5_5.html` as `5_5.html`). Only update title strings.

### Step 5: Compile Tailwind CSS
Run style compilation:
`npx tailwindcss -i ./css/global.css -o ./css/style.css`

---

## 4. Git Status & Uncommitted Work Reference

At the time of this handover, the following changes were present on the workspace:
- **Modified files**:
  - `evidence/education/6_1.html`
  - `evidence/education/6_2.html`
  - `evidence/education/6_3.html`
  - `evidence/education/6_11.html`
  - `evidence/education/6_12.html`
  - `evidence/education/6_13.html`
  - `evidence/education/6_14.html`
  - `evidence/education/6_15.html`
  - `evidence/education/6_20.html`
  - `indicators/education.html`
  - `js/modals.js`
  - `css/style.css`
  - `.gitignore`
- **Untracked files**:
  - `document_files/University_Country_6_12_Number_of_activities_organized_by_student_organizations_related_to_sustainability_per_year.docx`
  - `.agents/AGENTS.md` (containing local styling/tool rules)
  - Extra images for `6.11`, `6.12`, and `6.3` in `images/evidence/`
