# Explore Abjad: remaining media checklist

Last audited 2026-09-21 against app build 26092002. Structure is complete: every app route is a manifest node (only
`Paywall` is excluded on purpose). What is left is media. See [README.md](./README.md) for file conventions.

**A leaf with action is done when all three exist:**
1. `src/data/abjad/content/<id>.json` containing `{ "hasClip": true }`
2. `static/abjad/posters/<id>.webp` (660x1416-ish, clear of the frame's notch at the top center)
3. `<id>.webm` + `<id>.mp4` on Bunny (2-3 s, ~480 px wide, muted)

A leaf with little action (see section 3) is done with just the poster.

Tick a leaf only when everything it needs is in. Prereq for every clip: `GATSBY_ABJAD_MEDIA_BASE_URL` set to the real Bunny base.

Progress: 58 of 63 leaves and 13 of 13 screens have media. 5 leaves remain, below.

## 0. Done: Colors world (7) — 2026-09-21

Posters made from the simulator captures, content files set to `hasClip: true`, and all seven clips confirmed live
on Bunny (`.mp4` returns 200 for each; `.webm` 404s for all seven, so the browser falls back to the `.mp4` `<source>`
— harmless, but worth recording an actual `.webm` alongside future clips if that matters to you). Also fills the
mirrored Games > Colors section; no separate clips needed there.

- [x] `colors-match` Match the Color
- [x] `colors-find` Find the Color
- [x] `colors-tap` Tap to Color (poster is the picture-gallery screen `ColorsTapGallery`, which is what this node owns)
- [x] `colors-recall` Color Recall
- [x] `colors-sort` Sort by Color
- [x] `colors-mix` Mix Colors
- [x] `colors-quiz` Colors Quiz

## 0b. Done: Numbers world (7) — 2026-09-21

Same treatment as Colors. One clip is not actually live yet:

- [x] `numbers-sort` Domino Sort — clip confirmed on Bunny
- [ ] `numbers-find` Find the Number — poster and content file in, but `numbers-find.mp4` **404s** on Bunny (the other
      six all return 200). The leaf will show the poster only until this is re-uploaded; nothing to do here otherwise.
- [x] `numbers-count` Count & Tap — clip confirmed on Bunny
- [x] `numbers-more-or-less` More or Less — clip confirmed on Bunny
- [x] `numbers-pattern` Continue the Pattern — clip confirmed on Bunny
- [x] `numbers-recall` Number Recall — clip confirmed on Bunny
- [x] `numbers-trace` Trace the Numeral — clip confirmed on Bunny

## 0c. Done: Careers world (7) — 2026-09-21

Same treatment as Colors and Numbers. All seven clips confirmed live on Bunny (`.mp4` 200 for each; `.webm` 404s for
all seven, same harmless pattern as the other worlds). `careers-builder`'s poster is the "Gear up!" dress-up screen
(route `CareersPlaceGame`), and `careers-pilot`'s is the maze itself (`CareersMazeGame`, an `alsoRoutes` entry — the
node's own route `CareersMazeLevelSelect` is the level picker before it); both checked against the manifest.

- [x] `careers-chef` Cook a Meal
- [x] `careers-doctor` Fix the Patient
- [x] `careers-builder` Build Something
- [x] `careers-farmer` Sort the Farm
- [x] `careers-pilot` Fly the plane!
- [x] `careers-teacher` Grade the Tests
- [x] `careers-police` Catch the Culprit

## 1. Leaves with no media yet (5)

### Arcade (5) — games cost tokens per play
- [ ] `whack-a-mole` Whack-a-Mole (1 token)
- [ ] `sliding-puzzle` Sliding Puzzle (1 token)
- [ ] `memory-match` Memory Match (1 token)
- [ ] `match3` Match 3 (2 tokens)
- [ ] `arcade-leaderboard` Global High Scores (free to view, needs network)

## 2. Clips flagged but no poster yet (23)

The content file already says `hasClip`. Each needs `static/abjad/posters/<id>.webp` (the build warns about these).
Also confirm each clip is actually on Bunny.

- [ ] `progress`
- [ ] `sticker-album`
- [ ] `drawing-board` (landscape: poster must match the landscape aspect ratio)
- [ ] `wardrobe`
- [ ] `bonus-challenge` (needs a letter station sheet; premium)
- [ ] `countries-quiz` (needs `world:countries` and 5+ countries met)
- [ ] `countries-wheel`
- [ ] `speed-round`
- [ ] `reward-spin-wheel` (modal after finishing a world or the daily quest)
- Letter exercises (Games > Letters):
  - [ ] `trace`
  - [ ] `find`
  - [ ] `connect`
  - [ ] `assemble`
  - [ ] `memory`
  - [ ] `memory-flip` (needs sound)
  - [ ] `letter-form`
  - [ ] `forms-matcher`
  - [ ] `recall`
  - [ ] `echo` (needs sound)
  - [ ] `mirror-match`
  - [ ] `letter-hunt`
  - [ ] `short-vowel` (needs sound)
  - [ ] `letters-wheel`

## 3. Poster-only leaves (no clip planned)

Little happens on these screens, so a poster is enough: their content files say `"hasClip": false` and nothing is
left to do. `treasure-chests` and `letter-detail` were moved here on 2026-09-21. Add a clip later only if you want one
(flip `hasClip` to `true` and upload `<id>.webm` + `<id>.mp4`).

- [x] `treasure-chests`: poster in
- [x] `letter-detail`: poster in (scaled to 95% and shifted down 30 px so the "1 \ 28" counter clears the frame's notch)
- [x] `song-alphabet`: poster in — 2026-09-22
- [x] `song-desert`: poster in — 2026-09-22
- [x] `song-oasis`: poster in — 2026-09-22
- [x] `song-mountain`: poster in — 2026-09-22
- [x] `song-sea`: poster in — 2026-09-22
- [x] `song-countries`: poster in — 2026-09-22
- [x] `song-colors`: poster in — 2026-09-22

## 4. Hotspot gaps on screens that have screenshots

Without a hotspot the child is reachable only through links outside the screenshot.

- [ ] `arcade`: hotspot for `arcade-leaderboard` (the four games are covered)
- [ ] `world-countries`: hotspot for `countries-wheel`, and check the `countries-quiz` one, which is very small (0.9% tall at the top)
- [ ] `desert-station`: hotspots for Connect and Assemble ("try another game", not on the current screenshot). These are
      not manifest children or links, so this needs the app repo's manifest first.

- [ ] `alphabet-grid`: now a screen (manifest `kind` changed from `feature` to `hub` in the app repo, 2026-09-21).
      Its screenshot is an interim copy of the old poster, which shows only the first 24 letters. Replace
      `static/abjad/screens/alphabet-grid.en.webp` with a full-length capture (28 letters) and re-measure the alef-tile
      hotspot in `hotspots/alphabet-grid.en.json`. `alphabet-grid.webp` in `posters/` is now unused by the page (only
      the share image falls back to the screenshot) and can be deleted.

## 5. Content that switches things on

- [ ] Teacher notes: none exist, so the Parent | Teacher toggle is hidden. Add `teacherNote {en, ar}` to content files.
- [ ] Arabic screenshots: none exist, so the EN | عربي toggle is hidden. Add `static/abjad/screens/<id>.ar.webp`
      plus `hotspots/<id>.ar.json` for each screen (13 screens).
- [x] Set `GATSBY_ABJAD_MEDIA_BASE_URL`: `.env` now has the real Bunny base (`https://cdn.nativemelon.com/explore`);
      `.env.example` still shows the placeholder, which is correct.

## Done so far

Screens (13 of 13): `home`, `adventure`, `songs`, `games`, `arcade`, `explorer`, `alphabet-grid` (interim),
`world-desert`, `desert-station`, `world-countries`, `world-colors`, `world-numbers`, `world-careers`.

Leaves with a poster and no clip (14): `daily-quest`, `settings`, `world-oasis`, `world-mountain`, `world-sea`,
`treasure-chests`, `letter-detail`, and the Songs (`song-alphabet`, `song-desert`, `song-oasis`, `song-mountain`,
`song-sea`, `song-countries`, `song-colors`).

Leaves with a poster and a live clip (20): the Colors, Numbers and Careers worlds (sections 0, 0b, 0c;
`numbers-find` has a poster but its clip is not live).
