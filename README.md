# Romantic Photo Diary

This project is a diary-style website with a romantic visual design and smooth page-turning transitions.

## What it does
- Loads diary entries from a backend endpoint (`/api/pages`).
- Backend data includes both `text` and `photo` fields for each page.
- Frontend intentionally displays **photos only** (as requested).
- First page expects an image at `assets/first-page.jpg` (add this file manually in GitHub).
- Turn pages by clicking the right edge (next spread) or left edge (previous spread).

## Run

```bash
node server.js
```

Then open: `http://localhost:4173`
