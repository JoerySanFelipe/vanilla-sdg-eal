# Master Prompt: UI GreenMetric Evidence Conversion

Copy and paste this prompt when initiating a new indicator conversion session or when instructing another AI agent to convert a DOCX evidence document into the correct HTML format.

***

```markdown
Role: Principal Web Architect & Expert HTML5 Data Parser

Task:
Convert a UI GreenMetric evidence document (.docx) into a clean, premium, and compliant HTML5 page fragment for Urdaneta City University (UCU), maintaining 1:1 literal text accuracy and strict style guidelines.

---

### Phase 1: Execution Steps

1. **Scan Document Directory & Identify Target File**
   - Locate the reference `.docx` file inside the `document_files/` directory.
   - Note: Reference filenames often contain typos (e.g., a file named `2_16...docx` might actually contain evidence for indicator `2.15`). Read the document's headers first to verify the actual indicator ID.

2. **Extract & Parse DOCX Content**
   - Run the python extraction script (`scratch/read_docx.py`) to extract body paragraphs, tables, and list media attachments.
   - Check the extracted paragraphs to ensure you have a complete copy of the text.

3. **Write/Rewrite the HTML File**
   - Open the target HTML file under `evidence/[category]/[indicator_id].html`.
   - Keep the metadata header at the very top of the file intact.
   - Replace the body content using the strict HTML styling rules defined below.
   - Review the final code: Ensure every paragraph from the reference document is present, styled, and mapped.

4. **Compile Tailwind CSS Styles**
   - Run the Tailwind compilation command in the workspace root:
     `npx @tailwindcss/cli -i ./css/global.css -o ./css/style.css`
   - This ensures all newly added classes (like custom spacing, hover transitions, etc.) compile correctly.

---

### Phase 2: Strict HTML Layout & Styling Rules

1. **Root Wrapper & Container**
   - The entire HTML body must be wrapped inside a single container div:
     `<div class="ucu-prose-evidence flex flex-col">`
     Do NOT wrap paragraphs or sections in card-like containers, white boxes, or border shadows. The narrative must flow as a clean, premium article.

2. **1:1 Literal Text Copy**
   - Text must be a 1:1 literal match to the source DOCX.
   - Do NOT add summaries, introductory key-value cards, metrics grids, or transition helper text.
   - Strip out preliminary cover pages or document boilerplate templates (e.g. University Name, Web Address fields at the top of subsequent documents) and start directly with the descriptive content.

3. **Subheadings**
   - Use subheadings only if they exist in the source document or are necessary for structural clarity.
   - Standardize subheading tags: `<h3 class="text-lg font-bold text-ucu-blue-dark mt-6 mb-3">`.
   - Never add subheadings that introduce fabricated text.

4. **Uniform Spacing**
   - Apply clean, uniform vertical spacing. Use paragraph margins (or flex gaps) consistently (e.g. `<p class="mb-4">` or spacing helpers) to ensure proper margins between text blocks, subheadings, and image tables.

5. **Scannability Bolding**
   - Bold key entities, core program names, metrics, organizations, and sustainability terms with `<strong>` tags.
   - *Example:* `The <strong>Water Conservation Program</strong> of <strong>Urdaneta City University (UCU)</strong> has been strategically implemented in alignment with...`

6. **No Green Policy**
   - Do NOT use any green CSS or Tailwind classes (`bg-green-*`, `text-green-*`, `border-green-*`). Only UCU brand colors (neutrals, whites, and UCU dark blue: `bg-ucu-blue-dark` / `#0f3a61`) are allowed.

7. **Inline Image/Figure Tables**
   - Group evidence images into a double-column or single-column table styled with UCU dark blue headers.
   - **Table Markup Example:**
     ```html
     <table class="w-full border-collapse border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6 text-center">
       <thead>
         <tr class="bg-ucu-blue-dark text-white font-bold text-base">
           <th colspan="2" class="py-3 px-4 text-center">Table Title / Heading</th>
         </tr>
         <tr class="bg-slate-100 text-slate-700 font-semibold text-sm border-b border-slate-200">
           <th class="py-2.5 px-3 w-1/2 border-r border-slate-200">Left Column Header</th>
           <th class="py-2.5 px-3 w-1/2">Right Column Header</th>
         </tr>
       </thead>
       <tbody>
         <tr class="bg-white">
           <td class="p-4 border-r border-slate-200 align-middle">
             <img src="../../images/evidence/4.1/image1.png" class="rounded-xl max-w-full h-auto mx-auto border border-slate-100 hover:scale-[1.02] transition-transform duration-300 shadow-sm" alt="Description" />
             <div class="text-xs text-slate-500 font-semibold mt-2">Brief Caption Label</div>
           </td>
           <td class="p-4 align-middle">
             <img src="../../images/evidence/4.1/image2.png" class="rounded-xl max-w-full h-auto mx-auto border border-slate-100 hover:scale-[1.02] transition-transform duration-300 shadow-sm" alt="Description" />
             <div class="text-xs text-slate-500 font-semibold mt-2">Brief Caption Label</div>
           </td>
         </tr>
       </tbody>
     </table>
     ```

8. **Metadata Comment Header**
   - Every file must preserve the leading metadata block in HTML comments:
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
```
