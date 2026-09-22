# Explore Abjad: remaining media checklist

Last audited 2026-09-21 against app build 26092002. Structure is complete: every app route is a manifest node (only
`Paywall` is excluded on purpose). What is left is media. See [README.md](./README.md) for file conventions.

**A leaf with action is done when all three exist:**
1. `src/data/abjad/content/<id>.json` containing `{ "hasClip": true }`
2. `static/abjad/posters/<id>.webp` (660x1416-ish, clear of the frame's notch at the top center)
3. `<id>.webm` + `<id>.mp4` on Bunny (2-3 s, ~480 px wide, muted)

A leaf with little action (see section 3) is done with just the poster.

Tick a leaf only when everything it needs is in. Prereq for every clip: `GATSBY_ABJAD_MEDIA_BASE_URL` set to the real Bunny base.

Progress: 37 of 63 leaves and 13 of 13 screens have media. 26 leaves remain, below.

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

## 1. Leaves with no media yet (26)

### Numbers world (7) — needs `world:numbers` (300 coins)
- [ ] `numbers-sort` Domino Sort
- [ ] `numbers-find` Find the Number
- [ ] `numbers-count` Count & Tap
- [ ] `numbers-more-or-less` More or Less
- [ ] `numbers-pattern` Continue the Pattern
- [ ] `numbers-recall` Number Recall
- [ ] `numbers-trace` Trace the Numeral

### Careers world (7) — needs `world:careers` (300 coins)
- [ ] `careers-chef` Cook a Meal
- [ ] `careers-doctor` Fix the Patient
- [ ] `careers-builder` Build Something
- [ ] `careers-farmer` Sort the Farm
- [ ] `careers-pilot` Fly the plane! (also route `CareersMazeGame`)
- [ ] `careers-teacher` Grade the Tests
- [ ] `careers-police` Catch the Culprit

### Songs (7)
- [ ] `song-alphabet` Alphabet Song (free)
- [ ] `song-desert` Desert World Song (free, needs `complete:world-desert`)
- [ ] `song-oasis` Oasis World Song (free, needs `complete:world-oasis`)
- [ ] `song-mountain` Mountain World Song (free, needs `complete:world-mountain`)
- [ ] `song-sea` Sea World Song (free, needs `complete:world-sea`)
- [ ] `song-countries` Arab Countries World Song (extra world, needs `world:countries` + `complete:world-countries`)
- [ ] `song-colors` Colors World Song (extra world, needs `world:colors`)

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
- [ ] Set `GATSBY_ABJAD_MEDIA_BASE_URL` (placeholder in use).

## Done so far

Screens (13 of 13): `home`, `adventure`, `songs`, `games`, `arcade`, `explorer`, `alphabet-grid` (interim),
`world-desert`, `desert-station`, `world-countries`, `world-colors`, `world-numbers`, `world-careers`.

Leaves with a poster and no clip (7): `daily-quest`, `settings`, `world-oasis`, `world-mountain`, `world-sea`,
`treasure-chests`, `letter-detail`.

Leaves with a poster and a live clip (7): the Colors world, section 0 above.
