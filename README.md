# VENIVIDIVICI — Voices History Left Behind

A private production dashboard and repeatable episode-making workspace for the historically researched, character-led Roman storytelling series.

## What the site does

**Dashboard (`index.html`):** Shows writing progress, current episode, what is complete or waiting, and the next recommended action. Episode 1 (Domitian) was written in four sections, Episode 2 (Nerva) has three imported draft sections with a fourth still to write, and Episode 3 (Trajan) is the next working proposal.

**Episode dossiers (`episode.html?id=01`, `?id=02`, `?id=03`):** Clickable episode catalogue, story and timeline notes, source status, transcript viewer, links to verified script source documents and a space for actual published YouTube links.

**Production Studio (`prompts.html`):** A reusable prompt wizard, not a static list of historical prompt archives. Pick one of nine actions (research, episode outline, draft narration, continue narration, fact-check, scene image, visual shotlist, animate art, or prepare YouTube description). Enter the character, date, setting and any relevant details, click **Generate prompt**, edit the result if necessary and **Copy prompt**. Blank values become editable `[insert ...]` placeholders. One-click presets are provided for writing Nerva Section 4 or planning Trajan. The wizard remembers fields in the browser, if local storage is available. It produces prompts, not finished AI-generated scripts or images.

## Source status — November 20, 2026

- **Episode 1 — Domitian:** Four original narration sections were completed in the Episode 1 Development discussion. Full verbatim script files are not yet imported; do not substitute the illustrative style-guide narration for them.
- **Episode 2 — Nerva:** Three draft sections were imported from [the linked Google Doc](https://docs.google.com/document/d/1kuhTBvZMVaO4BUOJiKJyO9TkjjDuD-hn937Faff6xmA/edit?usp=sharing). They appear on the Episode 2 page:
  - `scripts/episode-02-section-1.txt` — The Empty Throne;
  - `scripts/episode-02-section-2.txt` — The Burden of Mercy;
  - `scripts/episode-02-section-3.txt` — The Emperor and the Guard.
  - Section 4, **A Son for Rome**, remains **unwritten** and should not be marked as completed.
- **Episode 3 — Trajan:** Proposed next subject, not yet fully researched, scripted or published.
- **YouTube:** Channel: https://www.youtube.com/@VoicesHistoryLeftBehind. Verified episode-specific video links can be entered into `data/episodes.json` as `videoUrl`; placeholders should not look like published videos.

## Artwork

Web-sized versions of the user's supplied visual assets have been committed to `assets/images/`:
`logo-columns.webp`, `logo-wide.webp`, `logo-small.webp`, `logo-vertical.webp`, `icon.webp`, `domitian-thumb.webp`, `nerva-portrait.webp`, and `marble-wall.webp`.

These use the actual supplied artwork; the originals are not rewritten or replaced. The website uses the small banner as a real brand logo, the columns logo as a hero feature, episode artwork on the cards, and the marble texture in the production dashboard.

## Files and data

- `index.html`, `episode.html`, `prompts.html`: Static web pages.
- `assets/site.css`, `assets/site.js`, `assets/studio.js`: Styles, episode catalogue and production wizard.
- `data/episodes.json`: Episode statuses, section labels, transcript file paths, sources and verified YouTube links.
- `data/templates.json`: The nine reusable, fill-in-the-blanks production templates.
- `data/prompts.json`: **Historical archive** of original one-off image prompts, user instructions and source notes retained for provenance only; *not* used as the main wizard interface.
- `scripts/`: ElevenLabs narration drafts as plain text.
- `research/`: Separate image-scene research notes.

## Running

Serve the root folder over HTTP(S), e.g. `python -m http.server 8000` and open `http://localhost:8000/`. Opening `index.html` using `file://` directly may prevent JSON files loading due to browser restrictions.

The GitHub repository is private. Files being committed does not automatically create a public site. Set up an appropriate static hosting destination after checking access and publication permissions.

## Editorial guardrails

Use the four governing project documents. Narration follows people experiencing history, not encyclopedic chapters. Historical evidence must not be compromised for drama. Keep approved spoken text, research, visual instructions and publication assets separate, and label uncertainties and reconstructions.
