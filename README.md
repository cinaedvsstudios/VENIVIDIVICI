# VENIVIDIVICI — Voices History Left Behind

An editorial website and production archive for the historically researched Roman storytelling series.

## Website

- `index.html` — clickable episode catalogue and future story ideas.
- `episode.html?id=01` — Domitian episode dossier, section-by-section narration viewer and YouTube area.
- `episode.html?id=02` — Nerva episode dossier, with the four approved section names and known drafting status.
- `episode.html?id=03` — Trajan working proposal.
- `prompts.html` — searchable, filterable archive with copy controls.
- `data/episodes.json` — status, summaries, narration paths and YouTube links.
- `data/prompts.json` — recovered prompt wording and provenance, style guide and clearly labelled new templates.
- `assets/site.css` and `assets/site.js` — shared responsive design and client-side logic.
- `research/` — historical production notes kept separate from the narration and prompts.

### Source status — checked 20 November 2026

**Episode 1 (Domitian):** four narration sections were finished in the Episode 1 Development conversation, but their complete verbatim text was not in the accessible project files. Do not replace them with the illustrative narrative from the style document. Add the actual approved texts as `scripts/episode-01-section-1.txt` through `scripts/episode-01-section-4.txt`.

**Episode 2 (Nerva):** the Episode Two Outline conversation records these four sections:

1. The Empty Throne — drafted, 2,182 words (original text not imported).
2. The Burden of Mercy — drafted, 2,180 words (original text not imported).
3. The Emperor and the Guard — drafted, 2,034 words (original text not imported).
4. A Son for Rome — narration not yet completed in the last available note.

Add approved drafts as `scripts/episode-02-section-1.txt` through `scripts/episode-02-section-3.txt`. Do not populate Section 4 until it has been written and approved. When a matching file exists, the episode page reads and displays it automatically.

**YouTube:** the known verified channel is https://www.youtube.com/@VoicesHistoryLeftBehind. Individual episode video URLs were not recovered. Add a verified `videoUrl` to the matching entry in `data/episodes.json`.

**Artwork and logo:** an original logo and most previously generated scene PNGs were referenced in earlier conversations but were not present as accessible image files in this repository or in the supplied project files. The design currently uses an original typographic monogram instead of pretending it is the final series logo. Add approved artwork under `assets/images/` and update the layout after importing it. The uploaded `font reference.png` is a reference, not the VENIVIDIVICI logo.

**Prompt provenance:** the library includes 19 original verbatim historical-scene image prompts from two archived image-generation sets; several verbatim user requests recovered from the named development chats; original visual style guidance; concise summaries of Episode 2 planning directions explicitly labelled as non-verbatim; and new reusable research, narration and visual templates explicitly labelled as such.

## Preview and publishing

Serve the repository from a local static HTTP server (for example, `python -m http.server 8000`) and open `http://localhost:8000/`. Direct `file://` opening cannot load the JSON data reliably.

To make it publicly available, enable a compatible static host such as GitHub Pages or Cloudflare Pages for this repository. The repository was private at development time; simply committing this site does **not** guarantee a live public URL. Review publication permissions and privacy before enabling hosting.

## Editorial standard

The four project source documents govern all production. No fabricated historical quotations or events. Research, reconstructed atmosphere, production prompts, scripts and publication text remain separately identified.
