# Project-Scoped Rules for Urdaneta City University (UCU) SDG Web Updates

## Content and Page Layout
- **Image Placement**: Always place newly extracted evidence screenshots/photos at the top of the content body (immediately after the opening element/tag, before any description or introductory paragraphs).
- **Exclude Document Covers**: Do not display images that function solely as document cover pages in the final HTML.
- **Word-for-Word Accuracy**: Copy text paragraphs, table cells, and values from the source DOCX files exactly as written, without paraphrasing or performing custom calculations.
- **Bulleted Lists**: Format lists using `<ul class="list-disc list-inside space-y-2 pl-4 text-lg font-medium leading-relaxed text-muted">` or similar clean styles.

## Metadata and File Registry
- **Title and Suffix Synchronization**: Update indicator titles in both the file's metadata comment and the corresponding `indicators/*.html` registry to match the DOCX title, including any indicator code suffixes (e.g. `(GD.5)`, `(WS.2)`).
- **Physical Filenames**: Do not rename the physical HTML files (e.g., `5_5.html` remains `5_5.html`). Only update the title strings inside the HTML files and index files.

## Technical Constraints
- **Tailwind Version**: Use Tailwind CSS v3 for style compilation.
- **Compilation Command**: Recompile styles after any HTML changes using `npx tailwindcss -i ./css/global.css -o ./css/style.css`.
- **Tool Restrictions**: Do not use the `browser_subagent` tool for checking rendering; verification is performed manually by the user.
- **Tool Parameter Safety**: Never include the `ArtifactMetadata` block in the `write_to_file` tool call when writing to workspace source files (only use it when creating/modifying artifacts in the brain directory).

## Session Initialization & Project State
- **Session Handover Status**: When starting a new session, or if you detect that the session/device has changed, always read the [PROJECT_STATUS.md](file:///c:/kudecode/sdg-web/PROJECT_STATUS.md) file in the root of the workspace first to understand the current task progress, procedures, recent changes, directory layout, and active code assets.

