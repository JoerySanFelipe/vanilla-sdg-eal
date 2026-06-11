# Evidence Conversion - Complete Portable Context

> **Purpose**: This file contains ALL rules, procedures, progress, and helper scripts needed to continue the UI GreenMetric evidence DOCX→HTML conversion work. Point any AI agent to this file to resume seamlessly.
>
> **Last Updated**: 2026-06-10

---

## Table of Contents

1. [Conversion Rules & Styling](#1-conversion-rules--styling)
2. [Execution Workflow](#2-execution-workflow)
3. [Helper Scripts](#3-helper-scripts)
4. [SDG Color Reference](#4-sdg-color-reference)
5. [Completed Indicators](#5-completed-indicators)
6. [Remaining Work](#6-remaining-work)
7. [Reference Files (Correctly Formatted)](#7-reference-files-correctly-formatted)
8. [Critical Constraints](#8-critical-constraints)

---

## 1. Conversion Rules & Styling

### Root Wrapper
The entire HTML body must be wrapped inside:
```html
<div class="ucu-prose-evidence flex flex-col">
  <!-- all content here -->
</div>
```
**Do NOT** wrap paragraphs in card-like containers, white boxes, dashboard cards, or border shadows.

### 1:1 Literal Text Copy
- Text must be a **1:1 literal match** to the source DOCX.
- Do NOT add summaries, introductory key-value cards, metrics grids, dashboard stats headers, checklist boxes, or transition helper text.
- Strip out preliminary cover pages or document boilerplate templates (University Name, Web Address fields) and start directly with the descriptive content.

### Paragraph Typography
All body paragraphs use this exact class string:
```html
<p class="mb-4 text-lg font-medium leading-relaxed text-muted">
```

### Scannability Bolding
Bold key entities, program names, metrics, organizations, and sustainability terms with `<strong>` tags:
```html
The <strong>Water Conservation Program</strong> of <strong>Urdaneta City University (UCU)</strong>...
```

### Unified Image Tables
- Place all images in a **single table** at the top of the file (or where positioned in the DOCX).
- Use premium rounded shadow tables with `bg-ucu-blue-dark` header titles and hover transitions.
- For 2+ images, use a 2-column grid (2x2, 2x3, etc.).
- For a single image, use a single-column table.

**Image Table Template:**
```html
<table class="w-full border-collapse border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6 text-center">
  <thead>
    <tr class="bg-ucu-blue-dark text-white font-bold text-base">
      <th colspan="2" class="py-3 px-4 text-center">Unified Table Header Title</th>
    </tr>
    <tr class="bg-slate-100 text-slate-700 font-semibold text-sm border-b border-slate-200">
      <th class="py-2.5 px-3 w-1/2 border-r border-slate-200">Left Column Header</th>
      <th class="py-2.5 px-3 w-1/2">Right Column Header</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-white border-b border-slate-200">
      <td class="p-4 border-r border-slate-200 align-middle">
        <img src="../../images/evidence/X.X/image1.png" class="rounded-xl max-w-full h-auto mx-auto border border-slate-100 hover:scale-[1.01] transition-transform duration-300 shadow-sm" alt="Description" />
        <div class="text-xs text-slate-500 font-semibold mt-2">Brief Caption</div>
      </td>
      <td class="p-4 align-middle">
        <img src="../../images/evidence/X.X/image2.png" class="rounded-xl max-w-full h-auto mx-auto border border-slate-100 hover:scale-[1.01] transition-transform duration-300 shadow-sm" alt="Description" />
        <div class="text-xs text-slate-500 font-semibold mt-2">Brief Caption</div>
      </td>
    </tr>
  </tbody>
</table>
```

### Data Tables (Non-Image)
For schedule tables, inventory tables, calculation tables, etc.:
```html
<table class="w-full border-collapse border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6 text-center">
  <thead>
    <tr class="bg-ucu-blue-dark text-white font-bold text-base">
      <th colspan="2" class="py-3 px-4 text-center">Table Title</th>
    </tr>
    <tr class="bg-slate-100 text-slate-700 font-semibold text-sm border-b border-slate-200">
      <th class="py-2.5 px-3 w-1/2 border-r border-slate-200 text-center">Column 1</th>
      <th class="py-2.5 px-3 w-1/2 text-center">Column 2</th>
    </tr>
  </thead>
  <tbody class="text-slate-700 font-medium text-sm md:text-base">
    <tr class="bg-white border-b border-slate-100">
      <td class="p-4 border-r border-slate-200 font-semibold">Row Label</td>
      <td class="p-4 font-bold text-slate-800">Value</td>
    </tr>
  </tbody>
</table>
```
- Use standard sans-serif font for numbers and table cells (do NOT use `font-mono`).

### No Green Policy
Do NOT use any green CSS or Tailwind classes (`bg-green-*`, `text-green-*`, `border-green-*`). Only UCU brand colors:
- Neutrals and whites
- UCU dark blue: `bg-ucu-blue-dark` / `#24305e`

### SDG Section Layout
When SDGs are mentioned, format using the badge-aligned style from `evidence/infrastructure/1_19.html`:
```html
<h2 class="text-2xl font-bold text-ucu-blue-dark mt-8 mb-6 border-t border-slate-100 pt-6">Section Title and SDG Alignment</h2>

<div class="space-y-6">
  <div>
    <div class="flex items-center gap-2 mt-6 mb-3">
      <span class="px-2.5 py-0.5 text-xs font-bold text-white bg-[#4c9f38] rounded">SDG 3</span>
      <h3 class="text-lg font-bold !text-[#4c9f38] !my-0">Good Health and Well-being</h3>
    </div>
    <p class="mb-4 text-lg font-medium leading-relaxed text-muted">
      SDG-specific descriptive text goes here...
    </p>
  </div>
</div>
```

### Metadata Comment Header
Every file must preserve the leading metadata block:
```html
<!--
{
  "id": "4_1",
  "title": "4.1 Water Conservation Program",
  "badge": "Water",
  "src": "../evidence/water/4_1.html",
  "relatedSdgs": [11, 13]
}
-->
```

---

## 2. Execution Workflow

For each indicator file:

1. **Place the reference `.docx`** in `document_files/` directory (only one file at a time).
2. **Extract text**: Run `python z-prompts/read_docx.py <docx_path> <output_txt_path>` to extract paragraphs and tables.
3. **Inspect XML structure**: Run `python z-prompts/inspect_docx.py <docx_path>` to see the element flow including image placement.
4. **Extract media**: Run `python z-prompts/extract_media.py <docx_path> <output_dir>` to extract images to `images/evidence/X.X/`.
5. **Identify images**: Check which images are cover page/logo boilerplate (typically `image1.png` ~165KB logo, `image2.jpg` ~236KB GreenMetric logo, and the largest PNG ~3MB+ cover artwork) — exclude these. Only include images referenced in `word/document.xml` body, not `word/header1.xml`.
6. **Write/rewrite the HTML file** under `evidence/[category]/[indicator_id].html`.
7. **Compile Tailwind CSS**: `npx @tailwindcss/cli -i ./css/global.css -o ./css/style.css`

---

## 3. Helper Scripts

### read_docx.py
Extracts paragraphs and tables from a DOCX using only standard library:
```python
import sys
import zipfile
import xml.etree.ElementTree as ET

def extract_docx_content(docx_path, output_path):
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    try:
        with zipfile.ZipFile(docx_path) as z:
            doc_xml = z.read('word/document.xml')
        root = ET.fromstring(doc_xml)
        body = root.find('w:body', ns)
        if body is None:
            print("Error: Could not find document body.")
            return
        tbls = root.findall('.//w:tbl', ns)
        with open(output_path, 'w', encoding='utf-8') as f:
            for child in body:
                if child.tag.endswith('p'):
                    text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
                    if text.strip():
                        f.write(f"[P] {text.strip()}\n")
            for idx, tbl in enumerate(tbls):
                f.write(f"\n[TABLE {idx+1} START]\n")
                for row in tbl.findall('.//w:tr', ns):
                    row_data = []
                    for cell in row.findall('.//w:tc', ns):
                        cell_paragraphs = []
                        for cp in cell.findall('.//w:p', ns):
                            p_text = "".join([t.text for t in cp.findall('.//w:t', ns) if t.text])
                            if p_text.strip():
                                cell_paragraphs.append(p_text.strip())
                        cell_text = " / ".join(cell_paragraphs)
                        row_data.append(cell_text.strip())
                    f.write(" | ".join(row_data) + "\n")
                f.write(f"[TABLE {idx+1} END]\n\n")
    except Exception as e:
        print(f"Error reading docx: {e}")

def list_docx_media(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as z:
            media_files = [f for f in z.namelist() if f.startswith('word/media/')]
            print(f"Media files inside DOCX: {len(media_files)}")
            for f in media_files:
                info = z.getinfo(f)
                print(f"  {info.filename} - {info.file_size} bytes")
    except Exception as e:
        print(f"Error listing media: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python read_docx.py <docx_path> <output_txt_path>")
        sys.exit(1)
    extract_docx_content(sys.argv[1], sys.argv[2])
    list_docx_media(sys.argv[1])
```

### inspect_docx.py
Traces document body elements and image references:
```python
import sys
import zipfile
import xml.etree.ElementTree as ET

def inspect(docx_path):
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }
    with zipfile.ZipFile(docx_path) as z:
        doc_xml = z.read('word/document.xml')
        rels_xml = z.read('word/_rels/document.xml.rels')
    rels_root = ET.fromstring(rels_xml)
    rid_to_target = {}
    for rel in rels_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rid_to_target[rel.get('Id')] = rel.get('Target')
    root = ET.fromstring(doc_xml)
    body = root.find('w:body', ns)
    el_idx = 0
    for child in body:
        tag = child.tag.split('}')[-1]
        if tag == 'p':
            text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
            drawings = child.findall('.//w:drawing', ns)
            imgs = []
            for d in drawings:
                blip = d.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                if blip is not None:
                    embed_rid = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                    img_path = rid_to_target.get(embed_rid, "unknown")
                    imgs.append(f"Image[rId={embed_rid}, path={img_path}]")
            img_str = " | ".join(imgs)
            if text.strip() or img_str:
                print(f"[{el_idx}] P: {text.strip()} {img_str}")
                el_idx += 1
        elif tag == 'tbl':
            print(f"[{el_idx}] TABLE START:")
            rows = child.findall('.//w:tr', ns)
            for r_idx, row in enumerate(rows):
                cells = row.findall('.//w:tc', ns)
                cell_texts = []
                for c_idx, cell in enumerate(cells):
                    cell_p_texts = []
                    for cp in cell.findall('.//w:p', ns):
                        p_text = "".join([t.text for t in cp.findall('.//w:t', ns) if t.text])
                        cell_drawings = cp.findall('.//w:drawing', ns)
                        cell_imgs = []
                        for cd in cell_drawings:
                            blip = cd.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                            if blip is not None:
                                embed_rid = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                                img_path = rid_to_target.get(embed_rid, "unknown")
                                cell_imgs.append(f"Image[rId={embed_rid}, target={img_path}]")
                        img_str = ", ".join(cell_imgs)
                        if p_text.strip() or img_str:
                            cell_p_texts.append(f"{p_text.strip()} {img_str}".strip())
                    cell_texts.append(f"C{c_idx}: " + " / ".join(cell_p_texts))
                print(f"  Row {r_idx}: " + " | ".join(cell_texts))
            print(f"[{el_idx}] TABLE END")
            el_idx += 1

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python inspect_docx.py <docx_path>")
        sys.exit(1)
    inspect(sys.argv[1])
```

### extract_media.py
Extracts all media from a DOCX:
```python
import sys
import zipfile
import os

def extract_media(docx_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    with zipfile.ZipFile(docx_path) as z:
        for name in z.namelist():
            if name.startswith('word/media/'):
                base = os.path.basename(name)
                out_path = os.path.join(out_dir, base)
                with open(out_path, 'wb') as f:
                    f.write(z.read(name))
                print(f"Extracted {name} to {out_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_media.py <docx_path> <output_dir>")
        sys.exit(1)
    extract_media(sys.argv[1], sys.argv[2])
```

---

## 4. SDG Color Reference

| SDG | Name | Hex Color |
|-----|------|-----------|
| SDG 1 | No Poverty | `#e5243b` |
| SDG 2 | Zero Hunger | `#dda63a` |
| SDG 3 | Good Health and Well-being | `#4c9f38` |
| SDG 4 | Quality Education | `#c5192d` |
| SDG 5 | Gender Equality | `#ff3a21` |
| SDG 6 | Clean Water and Sanitation | `#26bde2` |
| SDG 7 | Affordable and Clean Energy | `#fcc30b` |
| SDG 8 | Decent Work and Economic Growth | `#a21942` |
| SDG 9 | Industry, Innovation and Infrastructure | `#fd6925` |
| SDG 10 | Reduced Inequalities | `#dd1367` |
| SDG 11 | Sustainable Cities and Communities | `#fd9d24` |
| SDG 12 | Responsible Consumption and Production | `#c9932b` |
| SDG 13 | Climate Action | `#3f7e44` |
| SDG 14 | Life Below Water | `#0a97d9` |
| SDG 15 | Life on Land | `#56c02b` |
| SDG 16 | Peace, Justice and Strong Institutions | `#00689d` |
| SDG 17 | Partnerships for the Goals | `#19486a` |

---

## 5. Completed Indicators

### Infrastructure (evidence/infrastructure/)
- [x] 1_3, 1_4, 1_5, 1_7, 1_8, 1_9, 1_10, 1_15, 1_16, 1_17, 1_18, 1_19

### Energy (evidence/energy/)
- [x] 2_1, 2_3, 2_5, 2_6, 2_8, 2_9, 2_10, 2_11, 2_13, 2_14, 2_15

### Water (evidence/water/)
- [x] 4_1, 4_2, 4_3, 4_4, 4_5, 4_6, 4_7

### Transport (evidence/transport/)
- [x] 5_4, 5_5, 5_9, 5_13, 5_14, 5_15, 5_16, 5_19

### Waste (evidence/waste/) — IN PROGRESS
- [ ] 3_1 ← **NEXT UP** (docx already in document_files/)
- [ ] 3_2, 3_3, 3_4, 3_5, 3_6, 3_7, 3_8, 3_9
- [ ] 3_10, 3_11, 3_12, 3_13, 3_14, 3_15, 3_16, 3_17, 3_19

### Education (evidence/education/) — NOT STARTED for clean prose refactor
- [ ] All files need review against DOCX sources

### Digitalization (evidence/digitalization/) — NOT STARTED
- [ ] All files need review against DOCX sources

---

## 6. Remaining Work

The Waste indicator category (`evidence/waste/`) is next. The workflow for each file:
1. User places the reference `.docx` in `document_files/`
2. Extract text, inspect XML, extract media
3. Identify which images are boilerplate (logos, covers) vs. actual evidence
4. Write clean HTML matching the DOCX 1:1
5. Compile Tailwind CSS

---

## 7. Reference Files (Correctly Formatted)

These completed files serve as formatting references:

| Purpose | Reference File |
|---------|---------------|
| **SDG badge layout** | `evidence/infrastructure/1_19.html` and `evidence/water/4_7.html` |
| **Unified 2x2 image table** | `evidence/transport/5_13.html` and `evidence/transport/5_9.html` |
| **Single image table** | `evidence/transport/5_14.html` |
| **Clean prose (no images)** | `evidence/transport/5_15.html` |
| **Prose + image table + data table** | `evidence/transport/5_14.html` |
| **Full pedestrian path (11 paragraphs)** | `evidence/transport/5_16.html` |

---

## 8. Critical Constraints

1. **No browser subagents** — Do NOT run browser subagents for visual validation unless explicitly instructed by the user.
2. **No dashboard cards** — No stat cards, metrics grids, dashboard headers, or key-value pill boxes.
3. **No card wrappers** — No `bg-white border border-slate-200 rounded-2xl p-6 shadow-sm` wrappers around sections.
4. **No green classes** — Use UCU brand colors only.
5. **No font-mono in tables** — Use standard sans-serif for numbers and table cells.
6. **No fabricated text** — Every word must come from the DOCX. No added introductions, conclusions, or summaries.
7. **Tailwind compile after every file** — Always run `npx @tailwindcss/cli -i ./css/global.css -o ./css/style.css` after changes.
