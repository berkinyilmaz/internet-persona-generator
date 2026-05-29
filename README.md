# Internet Persona Generator
Pick a vibe and get a full aesthetic identity — handle, bio, color palette, traits, and signature — generated in your browser.

---

## Live Demo
https://internet-persona-generator.vercel.app/

---

## Features
- 10 curated aesthetics — Dark Academia, Cottagecore, Y2K, Cyberpunk, Vaporwave, Minimalist, Soft Girl, Dreamcore, Goblincore, Coastal
- Username generator tuned per aesthetic (prefixes, cores, suffixes — never gibberish)
- 3-line bio composed from hand-written phrases that match the vibe
- 4-color palette with one-tap hex copy
- 4 randomized trait chips per persona
- Aesthetic-specific signature line (motto / aura)
- "Surprise me" button to jump to a random aesthetic
- One-click full persona copy to clipboard
- Save personas locally and revisit them anytime (`localStorage`, up to 24)
- Apple-like dark UI — minimal, premium, fast

---

## Tech Stack
- React 19 (Vite)
- Pure CSS with custom properties (Apple-inspired dark UI, no framework)
- `localStorage` for saved personas
- Inter (Google Fonts) + system monospace for handles

---

## How It Works
1. Choose one of 10 aesthetics — or hit **Surprise me** to roll one
2. Tap **Regenerate** to spin a new persona: handle, bio, palette, traits, signature
3. Tap any color swatch to copy its hex
4. **Copy** dumps the whole persona to your clipboard
5. **Save** stores it locally so you can compare or reuse later

> Generation runs entirely in your browser. No data leaves your machine.

---

## Installation
```bash
git clone https://github.com/berkinyilmaz/internet-persona-generator.git
cd internet-persona-generator
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

---

## Privacy
Everything runs **locally in your browser**. No accounts, no tracking, no network requests for generation. Saved personas live in your browser's `localStorage` and never leave the device.
# internet-persona-generator
# internet-persona-generator
