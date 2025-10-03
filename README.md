# LearnPashtoToday — Web App

A lightweight, accessible, responsive website to help users learn Pashto (Afghanistan).  
This repo contains content, frontend UI, and simple JS logic for flashcards, quizzes, and an in-browser dictionary.

## Goals & design principles
- **Accessibility first**: ARIA attributes, keyboard interaction, readable contrast, screen-reader announcement points, and visible focus states.
- **Separation of concerns**: Keep content (JSON) separate from logic (JS) and styling (CSS).
- **Responsiveness**: Mobile-first CSS, flexible containers and readable typography.
- **Cultural respect**: Content and UI should treat Pashto and Afghan culture with respect — correct diacritics, accurate translations, and contextual notes where necessary.

## Future ideas / roadmap
- Add user progress tracking (localStorage first, optional server later).
- Add recorded audio by native speakers and include IPA transcriptions.
- Add spaced repetition algorithm (SM-2 / Anki-style) for flashcards.
- Add pronunciation scoring using Web Speech API (speech-to-text) to give feedback.
- Add localization for other languages and switch UI language for learners.

## Credits & acknowledgements
- Project author: Ryan Blestowe.
- All content should be reviewed by a native Pashto speaker for dialectal variance and orthography accuracy before public release.
