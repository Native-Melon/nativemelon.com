# Explore Abjad: remaining media checklist

Last audited 2026-09-21 against app build 26092002. Structure is complete: every app route is a manifest node (only
`Paywall` is excluded on purpose). What is left is media. See [README.md](./README.md) for file conventions.

**A leaf is done when all three exist:**
1. `src/data/abjad/content/<id>.json` containing `{ "hasClip": true }`
2. `static/abjad/posters/<id>.webp` (660x1416-ish, app header clear of the notch)
3. `<id>.webm` + `<id>.mp4` on Bunny (2-3 s, ~480 px wide, muted)

Tick a leaf only when all three are in. Prereq for every clip: `GATSBY_ABJAD_MEDIA_BASE_URL` set to the real Bunny base.

Progress: 30 of 64 leaves and 12 of 12 screens have media. 34 leaves remain, below.

## 1. Leaves with no media yet (34)

### Colors world (7) — needs `world:colors` (300 coins)
Also fills the mirrored Games > Colors section. Do not duplicate clips there.
- [ ] `colors-match` Match the Color
- [ ] `colors-find` Find the Color
- [ ] `colors-tap` Tap to Color
- [ ] `colors-recall` Color Recall
- [ ] `colors-sort` Sort by Color
- [ ] `colors-mix` Mix Colors
- [ ] `colors-quiz` Colors Quiz

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

### Other (1)
- [ ] `letter-detail` Meet the Letter (from the Alphabet grid; has Trace/Play buttons and next/previous arrows)

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

## 3. Clip flagged and poster in, clip file unverified

- [ ] `treasure-chests`: poster done 2026-09-21. Record the clip from a map position with an unlocked chest
      (manifest `requires: record-on-a-map-with-unlocked-chest`).

## 4. Hotspot gaps on screens that have screenshots

Without a hotspot the child is reachable only through links outside the screenshot.

- [ ] `arcade`: hotspot for `arcade-leaderboard` (the four games are covered)
- [ ] `world-countries`: hotspot for `countries-wheel`, and check the `countries-quiz` one, which is very small (0.9% tall at the top)
- [ ] `desert-station`: hotspots for Connect and Assemble ("try another game", not on the current screenshot). These are
      not manifest children or links, so this needs the app repo's manifest first.

## 5. Content that switches things on

- [ ] Teacher notes: none exist, so the Parent | Teacher toggle is hidden. Add `teacherNote {en, ar}` to content files.
- [ ] Arabic screenshots: none exist, so the EN | عربي toggle is hidden. Add `static/abjad/screens/<id>.ar.webp`
      plus `hotspots/<id>.ar.json` for each screen (12 screens).
- [ ] Set `GATSBY_ABJAD_MEDIA_BASE_URL` (placeholder in use).

## Done so far

Screens (12 of 12): `home`, `adventure`, `songs`, `games`, `arcade`, `explorer`, `world-desert`, `desert-station`,
`world-countries`, `world-colors`, `world-numbers`, `world-careers`.

Leaves with a poster (7): `daily-quest`, `settings`, `alphabet-grid`, `world-oasis`, `world-mountain`, `world-sea`,
`treasure-chests`.
