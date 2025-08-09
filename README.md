# LearnPashtoToday — Web App

A lightweight, accessible, responsive website to help users learn Pashto (Afghanistan).  
This repo contains content, frontend UI, and simple JS logic for flashcards, quizzes, and an in-browser dictionary.

## Project layout (recommended)
/assets
/css/main.css
/images/...
/data/flashcards.json
/pages
index.html
practice.html
flashcards.html
qa.html
dictionary.html
/scripts
utils.js
flashcards.js
qa.js
search.js
README.md


## Goals & design principles
- **Accessibility first**: ARIA attributes, keyboard interaction, readable contrast, screen-reader announcement points, and visible focus states.
- **Separation of concerns**: Keep content (JSON) separate from logic (JS) and styling (CSS).
- **Responsiveness**: Mobile-first CSS, flexible containers and readable typography.
- **Cultural respect**: Content and UI should treat Pashto and Afghan culture with respect — correct diacritics, accurate translations, and contextual notes where necessary.

## How to run locally
1. Clone the repo.
2. Serve with a simple static server (some browsers block `fetch()` on `file://`):
   - Using Python 3: `python -m http.server 8000`
   - Or use `live-server` / `http-server` npm packages.
3. Open `http://localhost:8000/pages/index.html`.

## Developer notes & suggestions
- **Content management**: All vocabulary and phrase packs are stored in `/assets/data/flashcards.json`. Keep content here and use the UI to render. If you want admin editing pages, build a simple admin UI or migrate data to a headless CMS.
- **Internationalization (i18n)**: If you expand beyond Pashto → English, wrap UI strings and labels and add i18n JSON files.
- **Unit / Integration tests**: Add Jest (or similar) for JS unit tests. Test the `Flashcards` module and `QA` logic.
- **Build tooling**: For larger scale, set up npm + bundler (esbuild/webpack/rollup/Vite). For now the plain JS modules are small and easy to maintain.
- **Speech synthesis**: Browser voices vary for Pashto. Consider providing recorded native audio files for key phrases (higher quality), and fallback to TTS for non-critical text.
- **Performance**: Keep data JSON small and lazy-load larger packs (if you add audio assets).
- **Security**: If you add user accounts or storing progress, use HTTPS and secure storage. Do not store sensitive data unencrypted.

## Accessibility checklist (minimum)
- All interactive controls must be reachable by keyboard.
- Buttons use `aria-pressed` or suitable ARIA attributes.
- Provide `aria-live` regions for search / status updates.
- All images include descriptive `alt` text.
- Run basic screen-reader tests (NVDA/VoiceOver) for key flows: flashcards, quiz, and dictionary search.
- Provide captions or transcripts for any audio content.

## Styling & theming tips
- Use CSS variables (`--brand-1`, etc.) to make theming simple.
- Provide a 'high-contrast' toggle for visually impaired users.
- Keep font sizes relative (rem) and ensure large tap targets for mobile.

## Future ideas / roadmap
- Add user progress tracking (localStorage first, optional server later).
- Add recorded audio by native speakers and include IPA transcriptions.
- Add spaced repetition algorithm (SM-2 / Anki-style) for flashcards.
- Add pronunciation scoring using Web Speech API (speech-to-text) to give feedback.
- Add localization for other languages and switch UI language for learners.

## Credits & acknowledgements
- Project author: Ryan Blestowe (as noted in the original files).
- All content should be reviewed by a native Pashto speaker for dialectal variance and orthography accuracy before public release.