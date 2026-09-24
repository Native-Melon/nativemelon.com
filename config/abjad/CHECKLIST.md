# Explore Abjad: remaining media checklist

Last audited 2026-09-21 against app build 26092002. Structure is complete: every app route is a manifest node (only
`Paywall` is excluded on purpose). What is left is media. See [README.md](./README.md) for file conventions.

**A leaf with action is done when all three exist:**
1. `src/data/abjad/content/<id>.json` containing `{ "hasClip": true }`
2. `static/abjad/posters/<id>.webp` (660x1416-ish, clear of the frame's notch at the top center)
3. `<id>.webm` + `<id>.mp4` on Bunny (2-3 s, ~480 px wide, muted)

A leaf with little action (see section 3) is done with just the poster.

Tick a leaf only when everything it needs is in. Prereq for every clip: `GATSBY_ABJAD_MEDIA_BASE_URL` set to the real Bunny base.

Progress: 62 of 63 leaves have media (61 with a poster; `speed-round` is the only one still poster-less even though
its clip already plays). 13 of 13 screens have media. 1 leaf has none at all: `arcade-leaderboard`.

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

## 0d. Done: Arcade games (4) — 2026-09-22

Same treatment as the coin worlds. All four clips confirmed live on Bunny (`.mp4` 200 for each; `.webm` 404s for all
four, same harmless pattern as before).

- [x] `whack-a-mole` Whack-a-Mole (1 token)
- [x] `sliding-puzzle` Sliding Puzzle (1 token)
- [x] `memory-match` Memory Match (1 token)
- [x] `match3` Match 3 (2 tokens)

## 1. Leaves with no media yet (1)

### Arcade
- [ ] `arcade-leaderboard` Global High Scores (free to view, needs network) — the last leaf with no media at all.
      Its screen hotspot is also still missing (section 4).

## 0e. Done: posters for 20 previously-clip-only leaves — 2026-09-22

These already said `hasClip: true` (some going back to before this checklist existed) but had no poster, so they
rendered as the themed placeholder until their clip loaded. Captures came in filenames that don't match the node id
(app screen/component names), matched to nodes here by route and verified against the manifest and each screenshot's
content. All 20 clips confirmed live on Bunny. `drawing-board`'s poster is landscape (1200x552), matching its
`orientation: "landscape"` content field; the rest are the standard 660x1416.

- [x] `progress` (file `progress.en.png`)
- [x] `sticker-album` (file `adventure-album.en.png`, route `AdventureAlbum`; tall capture, poster is the top of the list)
- [x] `drawing-board` (file `sticker-canvas.en.png`, route `StickerCanvas`, landscape)
- [x] `wardrobe` (file `adventure-wardrobe.en.png`, route `AdventureWardrobe`)
- [x] `bonus-challenge` (file `bonus-challenge.en.png`)
- [x] `countries-quiz` (file `countries-quiz.en.png`)
- [x] `reward-spin-wheel` (file `reward-spin-wheel.en.png` — the "Quest Complete! Spin to Win!" sheet)
- Letter exercises (Games > Letters):
  - [x] `trace` (file `trace-canvas.en.png`, route `TraceCanvas`, an `alsoRoutes` entry — the node's own route
        `TracePicker` is the letter-picker screen before it)
  - [x] `find` (file `find-game.en.png`)
  - [x] `connect` (file `connect-game.en.png`)
  - [x] `assemble` (file `assemble-game.en.png`)
  - [x] `memory` (file `memory-game.en.png`)
  - [x] `memory-flip` (file `memory-flip-game.en.png`)
  - [x] `letter-form` (file `letter-form-game.en.png`)
  - [x] `forms-matcher` (file `letter-forms-matcher.en.png`)
  - [x] `recall` (file `recall-game.en.png`)
  - [x] `echo` (file `echo-game.en.png`)
  - [x] `mirror-match` (file `mirror-match.en.png`)
  - [x] `letter-hunt` (file `letter-hunt.en.png`)
  - [x] `short-vowel` (file `short-vowel-game.en.png`)
  - [x] `letters-wheel` (file `spin-wheel-game.en.png`, titled "Letter Wheel" — shares the app route `SpinWheelGame`
        with `countries-wheel`, which is a different node; its own capture came in 2026-09-22, see section 0f)

## 0f. Done: `countries-wheel` — 2026-09-22

Poster in, from its own capture (file reused the `spin-wheel-game.en.png` name, but content confirmed "Country Wheel"
with the six-flag wheel, not the letter one). Clip confirmed live on Bunny.

- [x] `countries-wheel` Country Wheel

## 2. Clips flagged but no poster yet (1)

The content file already says `hasClip`. Needs `static/abjad/posters/<id>.webp` (the build warns about this).

- [ ] `speed-round` (not in the Games menu; appears only as a random item in the premium daily quest)

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

- [ ] `arcade`: hotspot for `arcade-leaderboard` (the four games are covered) — missing in **both** languages
- [ ] `world-countries`: hotspot for `countries-wheel`, and check the `countries-quiz` one, which is very small (0.9% tall at the top) — both languages
- [ ] `desert-station`: hotspots for Connect and Assemble ("try another game", not on the current screenshot). These are
      not manifest children or links, so this needs the app repo's manifest first.

- [ ] `alphabet-grid`: now a screen (manifest `kind` changed from `feature` to `hub` in the app repo, 2026-09-21).
      Its **English** screenshot is still an interim copy of the old poster, showing only the first 24 letters. The
      Arabic one added 2026-09-24 is a proper full-length 28-letter capture. Replace
      `static/abjad/screens/alphabet-grid.en.webp` with a full-length capture and re-measure the alef-tile
      hotspot in `hotspots/alphabet-grid.en.json` (the Arabic file already has the correct one). `alphabet-grid.webp` in `posters/` is now unused by the page (only
      the share image falls back to the screenshot) and can be deleted.

## 5. Content that switches things on

- [ ] Teacher notes: none exist, so the Parent | Teacher toggle is hidden. Add `teacherNote {en, ar}` to content files.
- [x] Arabic art: all 13 screens have an Arabic capture and Arabic hotspots — 2026-09-24. See section 6.
- [x] Set `GATSBY_ABJAD_MEDIA_BASE_URL`: `.env` now has the real Bunny base (`https://cdn.nativemelon.com/explore`);
      `.env.example` still shows the placeholder, which is correct.

## 6. Done: Arabic screens (13, 98 hotspots) — 2026-09-24

**Decision: clips and leaf posters stay English-only.** Leaves show app footage; the card beside it (title, summary,
how-to-play, what it teaches) is fully Arabic from the manifest, so an Arabic visitor still reads an Arabic page.
That retired 48 clips and all 60 poster files, and `clipUrl` never needs a language dimension. Only screens got an
Arabic version.

All 13 are in: `static/abjad/screens/<id>.ar.webp` (converted from 1206 px simulator captures to 660 px webp,
`cwebp -q 82 -m 5`, sizes within a few KB of their English counterparts) plus `hotspots/<id>.ar.json`.

### The Arabic layout is NOT a mirror of the English one — do not auto-flip

Measured across all 98 rectangles: **88 are identical to the English ones and only 10 differ.** A blanket mirror
(`x' = 100 - x - w`) would have been wrong far more often than right, and wrong invisibly.

| Kind of screen | Transform | Why |
| --- | --- | --- |
| Illustrated maps — `adventure`, `world-desert`, `world-colors`, `world-numbers`, `world-careers`, `world-countries` (27 rects) | **identical** | The artwork is the same bitmap in both languages; only the header pill's text changes. Mirroring would move every hotspot off its target. |
| Full-width row lists — `games` (37), `songs` (7), `desert-station` (4), and 7 of `home`'s 9 | **identical** | Rows span `x≈5 w≈90`, so a mirror is a no-op. Row order is also unchanged between languages. |
| UI chrome that is actually laid out LTR/RTL — `arcade` (4), `explorer` (3), `home`'s gear + avatar (2) | **mirrored** | Grid columns swap, the three buttons reverse, the gear and the avatar cross to the other side. |
| `alphabet-grid` (1) | **re-measured** | Not a language difference: the Arabic capture is the proper full 28-letter grid, so the alef tile sits at a different y. The alef is top-**right** in both languages (the grid is RTL even in English). |

So the per-language hotspot file earns its keep, but mostly as an explicit copy. If the app ever changes its Arabic
layout, the build will not warn — the coupling is only enforced by re-checking against the capture, which is why the
files stay separate rather than being generated.

### Known gaps, unchanged by this work

Both languages are missing the same two hotspots (section 4): `arcade-leaderboard` and `countries-wheel`. The English
`alphabet-grid` capture is still the interim 24-letter one; the Arabic is the full 28.

## Done so far

Screens (13 of 13): `home`, `adventure`, `songs`, `games`, `arcade`, `explorer`, `alphabet-grid` (interim),
`world-desert`, `desert-station`, `world-countries`, `world-colors`, `world-numbers`, `world-careers`.

Leaves with a poster and no clip (14): `daily-quest`, `settings`, `world-oasis`, `world-mountain`, `world-sea`,
`treasure-chests`, `letter-detail`, and the Songs (`song-alphabet`, `song-desert`, `song-oasis`, `song-mountain`,
`song-sea`, `song-countries`, `song-colors`).

Leaves with a poster and a live clip (45): the Colors, Numbers and Careers worlds, the four arcade games, the
20 leaves postered in section 0e, and `countries-wheel` (sections 0, 0b, 0c, 0d, 0e, 0f; `numbers-find` has a
poster but its clip is not live).

Leaves with a live clip and no poster yet (1): `speed-round` (section 2).
