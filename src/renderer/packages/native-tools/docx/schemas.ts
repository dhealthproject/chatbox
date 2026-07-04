export const DOCX_DOCUMENT_SCHEMA_DESCRIPTION = `
Generate a DocxDocument JSON object with the following structure:

{
  "blocks": DocumentBlock[]
}

Each DocumentBlock is one of the following types:

1. HEADING
{
  "type": "heading",
  "text": string,
  "level": 1 | 2 | 3 | 4 | 5 | 6
}

2. PARAGRAPH
{
  "type": "paragraph",
  "text": string,
  "bold": boolean (optional),
  "italic": boolean (optional),
  "alignment": "left" | "center" | "right" | "justify" (optional),
  "bullet": { "level": 0-9 } (optional, makes paragraph a bullet point),
  "spacing": { "before": number, "after": number } (optional, in twips)
}

3. IMAGE
{
  "type": "image",
  "base64": string (base64-encoded image data),
  "mimeType": "image/png" | "image/jpeg" | "image/gif" | "image/webp",
  "width": number (optional, in pixels),
  "height": number (optional, in pixels),
  "caption": string (optional, displayed below image),
  "alignment": "left" | "center" | "right" (optional)
}

4. TABLE
{
  "type": "table",
  "headers": string[] (column header labels, empty array [] for no header row),
  "rows": string[][] (each inner array is one row, must match headers length),
  "columnWidths": number[] (optional, per-column width in twips, must match headers length),
  "width": number (optional, total table width in twips, default is full page width ~9360),
  "indent": number (optional, left indent in twips),
  "headerShading": boolean (optional, gray background on header row, default false),
  "borders": boolean (optional, show cell borders, default true. Set false for invisible layout tables)
}
Common twips reference: full A4 page width ≈ 9360, 1 inch = 1440, 1 cm ≈ 567.

5. LIST
{
  "type": "list",
  "items": string[],
  "ordered": boolean (optional, true for numbered list, false/omit for bullet list)
}

6. CHECKBOX
{
  "type": "checkbox",
  "checked": boolean,
  "text": string (label displayed next to checkbox),
  "alias": string (optional, accessible label),
  "checkedSymbol": { "value": string, "font": string } (optional, custom checked symbol),
  "uncheckedSymbol": { "value": string, "font": string } (optional, custom unchecked symbol)
}

7. COLUMNS (side-by-side layout using invisible table)
{
  "type": "columns",
  "columns": DocumentBlock[][] (each inner array is one column's content, can contain any block types),
  "columnWidths": number[] (optional, per-column width in twips, must match columns length)
}

8. PAGE BREAK
{ "type": "pageBreak" }

9. DIVIDER (horizontal rule)
{ "type": "divider" }

IMPORTANT RULES:
- All blocks must have a "type" field matching exactly one of the types above
- Table "rows" cells and "headers" must be plain strings (no nested blocks)
- For multi-column text layouts (e.g. two-column forms), always use "columns" not multiple tables
- For inline checkboxes on the same line (e.g. "☐ option1  ☐ option2"), use a "paragraph" with Unicode characters ☐ and ☒ directly in the text string
- Use "columns" with "borders: false" for signature blocks and form layouts that need invisible grid structure
- columnWidths values must always sum to approximately the total table/page width
- Avoid nesting "columns" blocks inside other "columns" blocks
`;