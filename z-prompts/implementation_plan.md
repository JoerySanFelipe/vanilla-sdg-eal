# Implementation Plan - Evidence DOCX to HTML Conversion (1_10)

This plan outlines the process of converting the DOCX evidence document `University_Country_1_10_Total_area_on_campus_covered_in_planted_vegetation.docx` into a clean HTML fragment `1_10.html` that matches the styling, structure, and quality of the project's model HTML files.

## User Review Required

> [!IMPORTANT]
> - The converted output will be a raw HTML fragment (no `<html>`, `<head>`, `<body>`, or comment metadata blocks) saved directly to [1_10.html](file:///c:/kudecode/sdg-web/evidence/infrastructure/1_10.html).
> - All paragraphs will explicitly use `class="mb-3 text-lg font-medium leading-relaxed text-muted"`.
> - Images will be structured into HTML `<table>` elements with clear row/column formatting matching the model styling.
> - Images will reference the pre-extracted files in `../../images/evidence/1.10/`.

## Open Questions

None. All key decisions have been resolved through the `/grill-me` interview:
- Image extraction: Already done by the user (located in `images/evidence/1.10/`).
- Parsing DOCX: The agent will use a Python script to scan the DOCX file to retrieve the exact table data and text.
- Cover pages: `1_10` is not the first file in the indicator, so it has no cover pages to skip.
- Table style: Use HTML `<table>` elements to group images and structure data.
- Paragraph classes: Explicitly write `class="mb-3 text-lg font-medium leading-relaxed text-muted"` on all `<p>` tags.

## Proposed Changes

### Evidence Component

#### [MODIFY] [1_10.html](file:///c:/kudecode/sdg-web/evidence/infrastructure/1_10.html)
Refactor this file from its current messy python-generated format into a clean HTML fragment following these rules:
1. Strip the `<body>` element wrapper and the JSON comment metadata at the top.
2. Structure the image grid at the top into a clean HTML `<table>` element matching the table styling in `2_1.html` or `1_7.html`.
3. Wrap all text paragraphs in `<p class="mb-3 text-lg font-medium leading-relaxed text-muted">`.
4. Ensure standard headings use `<h2>` and `<h3>` without wrappers.
5. Use correct image sources pointing to `../../images/evidence/1.10/imageX.jpg` with descriptive `alt` tags based on document headings.

## Verification Plan

### Automated/Scripted Verification
- Write a short Python script to extract and print paragraphs and tables from [University_Country_1_10_Total_area_on_campus_covered_in_planted_vegetation.docx](file:///c:/kudecode/sdg-web/document_files/University_Country_1_10_Total_area_on_campus_covered_in_planted_vegetation.docx).
- Compare the extracted text/tables directly with the proposed HTML code to verify that no data is missing or incorrect.

### Manual Verification
- View the updated [1_10.html](file:///c:/kudecode/sdg-web/evidence/infrastructure/1_10.html) in the editor to verify it matches the structural model files (e.g., [1_4.html](file:///c:/kudecode/sdg-web/evidence/infrastructure/1_4.html)).
