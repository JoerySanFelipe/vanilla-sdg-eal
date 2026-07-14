# Project Handover & Status: UCU SDG Web Portal

> **CRITICAL INSTRUCTION FOR ALL AI AGENTS**: Read this entire file **before performing any action** in this workspace. This document is the authoritative ground truth for the project's current state. It supersedes any assumptions or general knowledge you may have. Do not hallucinate file paths, component names, or data structures — refer to the sections below.

---

## 1. Project Overview

This is the **UCU External Affairs and Linkages (EAL) SDG Web Portal** for **Urdaneta City University (UCU)**, Urdaneta City, Philippines. The portal publicly documents UCU's contributions to all 17 United Nations Sustainable Development Goals (SDGs) as required for **THE Impact Rankings** and **UI GreenMetric** submissions.

The codebase is a **vanilla HTML5 + Tailwind CSS v3** project — **no frontend framework** (no React, Vue, Angular). UI components are implemented as **native Web Components** (`customElements.define`) in JavaScript.

### Primary Entry Point
- `index.html` — Homepage
- `sdg-reports/2025.html` — SDG Dashboard for the year 2025 (the main grid of all 17 SDGs)

---

## 2. Architecture & Key File Registry

### Core Files
| File | Purpose |
|------|---------|
| `css/global.css` | Tailwind CSS input source. **Always edit this file, NOT `style.css`** |
| `css/style.css` | **Compiled output only.** Never edit manually. Regenerate with the command below. |
| `js/sdg-components.js` | **Main component file.** Contains all custom Web Components including `UcuSdgLayout`, `SdgCard`, `SdgSeeAllCard`, `UcuHeader`, `UcuFooter`, etc. |
| `js/events-data.js` | UCU events and activities data store |
| `js/institutional-data.js` | Institutional metrics, research publications, and SDG-specific data arrays |
| `js/modals.js` | Modal overlay logic for event cards |
| `js/core-ui.js` | Scroll reveal animations, global UI helpers |

### SDG Report Pages
```
sdg-reports/
├── 2025.html              ← SDG Grid dashboard page (year 2025)
├── 2025/                  ← Individual SDG report fragments (source data)
│   ├── sdg1.html          ← SDG 1 data/narrative source
│   ├── sdg2.html
│   └── ... (sdg1 to sdg17)
├── 2024/                  ← 2024 archive (currently EMPTY — no HTML files yet)
├── 2024.html              ← 2024 grid (legacy, links not updated)
├── 2023.html              ← 2023 grid (legacy)
├── sdg1.html              ← NEW: Centralized gateway page for SDG 1 (all years)
├── sdg2.html              ← NEW: Centralized gateway page for SDG 2
└── ... (sdg1 to sdg17)   ← NEW: All 17 centralized gateway pages generated
```

### Evidence & Indicator Files (UI GreenMetric Pillar System)
```
evidence/[pillar]/[id].html    ← HTML evidence fragments
indicators/[pillar].html       ← Indicator registries
document_files/                ← Source DOCX reference documents
images/evidence/[X.Y]/         ← Extracted images per indicator
z-prompts/                     ← Python helper scripts (DOCX extraction)
```

---

## 3. Tailwind CSS Compilation

**This is mandatory after ANY change to `.html` or `.js` files that use Tailwind utility classes.**

```bash
npx tailwindcss -i ./css/global.css -o ./css/style.css
```

> ⚠️ Tailwind v3 is used. The project does NOT use Tailwind v4. Do not use v4 syntax.

---

## 4. Session Summary — July 14, 2026

This section documents all changes made during the **July 14, 2026 session**. This was a major UI/UX overhaul session.

### 4.1 Completed Work

#### A. Hero Section Background Blur
- Made the hero banner blur effect **subtle** (reduced intensity) on all 17 SDG report pages so the background image remains visible and impactful.

#### B. Standardized Terminology Across All 17 SDG Report Pages
Applied word-for-word terminology changes to `sdg-reports/2025/sdg1.html` through `sdg17.html` using a scripted approach:
- **"SDG Report"** → **"SDG {N} Narrative"** (e.g., "SDG 1 Narrative")
- **"SDG Researches"** → **"Researches"**
- **Button labels**: "Read Narrative" → **"Read"**, "Explore Section" → **"Explore"**, "View Publications" → **"View"**

#### C. SDG Grid at `2025.html` — Reverted to Original Style
The SDG grid was reverted to its original appearance at user request. Final state applied:
- **Border radius**: `none` (removed `rounded-2xl` from grid wrapper)
- **Dark overlay**: Subtle dark overlay on each image background card to make the SDG logo at bottom-right stand out
- **18th grid item** (See All card): Dark theme with overlay applied
- Grid links now point to the **new centralized gateway pages** (e.g., `sdg-reports/sdg1.html`) instead of the old `2025/sdg1.html` paths

#### D. SEO & Structured Data (All 17 SDG Report Pages)
Injected into `UcuSdgLayout` via `js/sdg-components.js`:
- `<meta>` tags: description, keywords, OpenGraph (`og:title`, `og:description`)
- **JSON-LD structured data** (`@type: Report`) for AI evaluators and search engines — auto-generates per SDG number and active year

#### E. Accordion UI Improvements (`UcuSdgLayout` in `js/sdg-components.js`)
- Sub-section accordions (under the Narrative) are now **collapsed by default** on page load
- Accordion toggle button labels refined: "Explore" / "Hide"
- Full accordion styling polish: border-left color using SDG's own HEX color, glassmorphism hover states

---

### 4.2 PRIMARY NEW FEATURE: Centralized SDG Year Archive Pages

**Status: IMPLEMENTED AND LIVE**

#### What Was Built
17 new master gateway HTML pages were generated at `sdg-reports/sdg1.html` through `sdg-reports/sdg17.html`. These serve as **centralized, single-URL entry points** for readers/evaluators to access all available yearly SDG reports for a specific goal without navigating away from the page.

#### Architecture
This is a **AJAX-driven, zero-reload dynamic tab system**:

1. **URL**: `sdg-reports/sdg{N}.html` (e.g., `sdg-reports/sdg1.html`)
2. **Default Year**: Always defaults to the **newest available year** (currently `2025`). Determined by the `year` attribute on `<ucu-sdg-layout>` and the `?year=` URL query parameter.
3. **Year Switching Engine** (`window.ucuSwitchYear(year)`):
   - Defined globally in `js/sdg-components.js` (injected once on first `UcuSdgLayout` mount)
   - On tab click, it `fetch()`es the raw HTML of `sdg-reports/{year}/sdg{N}.html`
   - Parses the fetched document with `DOMParser`
   - Extracts the inner content of the target year's `<ucu-sdg-layout>` element
   - Swaps the current layout's innerHTML and calls `connectedCallback()` to re-render
   - Updates the browser URL with `history.pushState({ year: YYYY })` for bookmarking
   - Shows a smooth `opacity + translateY` transition animation on `#ucu-dynamic-content`
4. **Graceful Fallback**: If a year's archive directory is empty or missing, an alert says "Archive for {year} is not available yet." — The content is not broken.

#### Year Tab UI — Right-Side Vertical Tab Bar
- The tabs appear as a **vertical stack on the right edge of the narrative container**
- Tabs display horizontally-readable year labels (e.g., "2025", "2024", "2023")
- **Active tab**: `bg-ucu-blue-dark` (dark navy blue) with white text
- **Inactive tabs**: Light gray background with muted text, hover effect
- Tabs have `rounded-r-xl` to only round the right side (they "emerge" from the container edge)
- Tabs are given `mt-8` to push them below the container's `rounded-2xl` top corner
- **Current positioning**: Static (non-sticky) — tabs scroll naturally with the page content. They are visible when the reader is at the top of the report, and scroll out of view as expected when the reader scrolls far down.
- On mobile/tablet (`<lg`): Horizontal tab bar shown at the top of the section instead

#### Key Component Attributes (`<ucu-sdg-layout>`)
```html
<ucu-sdg-layout 
  sdg="1"           ← SDG number (1-17)
  year="2025"       ← Default/current year
  years="2025,2024,2023"  ← Comma-separated list of available archive years
  base-path="../"   ← Relative path back to project root
>
```

#### How to Add a New Year Archive in the Future
1. Create the directory: `sdg-reports/2026/`
2. Add `sdg1.html` through `sdg17.html` inside it (same structure as `2025/`)
3. Update the `years` attribute on each centralized gateway page: `years="2026,2025,2024,2023"`
4. No JavaScript changes needed — the fetch engine picks it up automatically.

---

## 5. Current State of Key Components

### `UcuSdgLayout` (in `js/sdg-components.js`)
The most complex and recently modified component. It is responsible for:
- Rendering the full SDG report page layout (left nav sidebar, main narrative accordion, research accordion)
- Injecting JSON-LD structured data into `<head>`
- Parsing narrative HTML (from the `description` slot) into sub-accordions grouped by `<h2>` elements
- Matching events from `events-data.js` to narrative sections
- Rendering research publications from `institutional-data.js`
- **NEW**: Rendering the year tab bar (vertical on desktop, horizontal on mobile)
- **NEW**: Hosting the `window.ucuSwitchYear()` AJAX engine

### `SdgCard` & `SdgSeeAllCard` (in `js/sdg-components.js`)
- No border radius on the grid items (sharp edges, `rounded-none` equivalent)
- Dark overlay on the background image for logo visibility
- Links now point to centralized `sdg-reports/sdg{N}.html` pages

---

## 6. Known Issues & Pending Items

| # | Issue / Pending Task | Priority | Notes |
|---|----------------------|----------|-------|
| 1 | **2024 and 2023 archive directories are empty** | Medium | The `sdg-reports/2024/` and `sdg-reports/2023/` folders exist but have no HTML files. Year tabs for those years will show the "not available" alert. This is expected and graceful. |
| 2 | **`2024.html` and `2023.html` grid links not updated** | Low | The older `sdg-reports/2024.html` and `sdg-reports/2023.html` dashboard pages still link to the old year-specific subdirectory paths, not the centralized `sdg{N}.html` paths. |
| 3 | **Year tab UI could be made sticky if needed** | Low | The current implementation uses `position: static` for the tabs (they scroll with the page). The user explicitly chose this behavior. If they ever want truly fixed tabs, the approach would need a `position: fixed` implementation with explicit coordinates rather than CSS `sticky`, due to the flexbox context constraints. |
| 4 | **UI GreenMetric evidence indicator backlog** | High | The original task of converting DOCX evidence files to HTML fragments for the Education pillar (indicators 6.x) is paused. Resume using the procedures in Section 7 below. |

---

## 7. Evidence Conversion Procedures (DOCX → HTML)

When resuming the conversion of evidence indicator DOCX files (the original project task):

### Step 1: Scan & Verify
Check the `.docx` file header in `document_files/`. Filenames sometimes have typos. Read the document's actual headers to confirm the indicator ID before proceeding.

### Step 2: Extract Content & Media
```bash
python z-prompts/read_docx.py document_files/University_Country_X_Y_....docx scratch/extracted_text.txt
python z-prompts/extract_media.py document_files/University_Country_X_Y_....docx images/evidence/X.Y/
```

### Step 3: Build the HTML Fragment (`evidence/[pillar]/X_Y.html`)
- Wrap root: `<div class="ucu-prose-evidence flex flex-col">`
- Place extracted **screenshots/images at the top**, before any text
- Do NOT include document cover pages as images
- Wrap paragraphs in: `<p class="mb-3 text-lg font-medium leading-relaxed text-muted">`
- Use image table template with dark blue header (`bg-ucu-blue-dark text-white`)
- Copy text **word-for-word** from the DOCX — no paraphrasing, no custom calculations
- Bold key terms with `<strong>` tags
- Do NOT use any green Tailwind classes

### Step 4: Sync Registry
Update `indicators/[pillar].html` and the file's own JSON metadata comment to reflect the exact indicator title (including code suffixes like `(GD.5)`). Never rename physical `.html` files.

### Step 5: Compile CSS
```bash
npx tailwindcss -i ./css/global.css -o ./css/style.css
```

---

## 8. Git Status Reference (as of July 14, 2026 session end)

The following files were **modified** during this session:
- `js/sdg-components.js` — Major: Year tab system, layout refactor, JSON-LD, terminology updates
- `sdg-reports/2025.html` — Grid links updated to centralized pages
- `sdg-reports/2025/sdg1.html` through `sdg17.html` — Meta tags, terminology, `years` attribute added
- `css/style.css` — Recompiled multiple times

The following files were **newly created** during this session:
- `sdg-reports/sdg1.html` through `sdg-reports/sdg17.html` — All 17 centralized gateway pages

---

## 9. Environment & Tool Rules

- **CSS Framework**: Tailwind CSS **v3** (not v4)
- **Compile command**: `npx tailwindcss -i ./css/global.css -o ./css/style.css`
- **Do NOT use** `browser_subagent` tool for rendering verification — user verifies manually
- **Do NOT include** `ArtifactMetadata` block in `write_to_file` when writing to workspace source files
- **IDE**: Antigravity IDE (same account, different device — history is local only)
- **Workspace root**: `c:\kudecode\sdg-web`
