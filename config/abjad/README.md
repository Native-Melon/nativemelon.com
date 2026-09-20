# Abjad "Explore the app" (`/abjad`)

An interactive mirror of the Abjad app: a phone frame shows one app screen at a time, tapping a hotspot or tile
slides to the child screen, tapping a leaf plays a short clip and slides up an info card.

## Where things come from

| What | Source | Edited where |
| --- | --- | --- |
| Structure, tiers, costs, titles, summaries, how-to steps, "what your child learns", Arabic word | `src/data/abjad/app-manifest.json` | **the app repo** (`growth/site/app-manifest.json`, then `npm run site:sync`). Never edit it here. |
| Teacher notes, "has clip" flag | `src/data/abjad/content/<id>.json` | git |
| Hotspot rectangles, "opens scrolled to the bottom" | `src/data/abjad/hotspots/<id>.<lang>.json`, measured on the screenshot it sits next to | git |
| Posters, screenshots | `static/abjad/` | git |
| Clips | Bunny (`GATSBY_ABJAD_MEDIA_BASE_URL`, see `.env.example`) | Bunny |
| Store links (App Store / Google Play) | the Prismic `product` document with UID `abjad` (falls back to constants in `src/config/abjad.js`). Keep this document: it also feeds the product grid on the home page. It just has no page of its own any more. | Prismic |

Everything for the explorer is in this repo except the store links. There is no Prismic type for it.

The site never writes English or Arabic *app* copy. Arabic *UI* labels (buttons, badges) live in `src/lib/abjad/ui.js`.

## Media conventions

- **Clips:** `<base>/<id>.webm` and `<base>/<id>.mp4`, about 480px wide, muted, 2-3 s loop, a few hundred KB.
  Then set `"hasClip": true` in that node's content file (below). The base URL is `GATSBY_ABJAD_MEDIA_BASE_URL`
  (a placeholder until you set it).
- **Posters:** `static/abjad/posters/<id>.webp` (`.jpg`/`.png` also work). Shown before/instead of a clip.
- **Screenshots:** `static/abjad/screens/<id>.<lang>.webp` with `<lang>` = `en` or `ar`, about 660 px wide. A tall capture
  is fine: the phone frame scrolls it, and hotspots scroll with it. (A full-length capture from the app: see the
  `snapshotContentContainer` option of `react-native-view-shot`.)
- **Hotspots:** `src/data/abjad/hotspots/<id>.<lang>.json`:
  ```json
  { "startAtBottom": false,
    "hotspots": [ { "childId": "adventure", "x": 5, "y": 60.15, "w": 90, "h": 12.65 } ] }
  ```
  `x, y, w, h` are percentages (0-100) of the **whole** image. They are per language on purpose (Arabic screenshots
  are mirrored). Set `startAtBottom` for screens that open scrolled to the end in the app (the world map).
  A screen uses the screenshot look only when it has both the image and at least one hotspot for that language;
  otherwise it shows the fallback grid of child nodes.
- **Content file** `src/data/abjad/content/<id>.json`, both fields optional:
  ```json
  { "teacherNote": { "en": "Try it as a pair task.", "ar": "جرّبوه بالأزواج." },
    "hasClip": true }
  ```
  `teacherNote` is what the Teacher view adds under the manifest's "teaches" line (a node without one shows just
  "teaches"). App copy never goes here.
- **Leaf posters:** leaves show a poster (or the clip) rather than a screenshot. Make it the phone's aspect (about
  660x1416) with the app header shifted down about 190 px so it clears the frame's notch and the back button.

Everything works with zero media: screens fall back to a themed grid, leaves to a themed placeholder.

## Build-time checks (`config/abjad/explore-pages.js`)

- **Fails the build:** a content file, hotspot file or image name that is not a manifest node id (the app renamed
  or removed it), a section heading used as a page, a content file with unknown fields or wrong types, a hotspot
  whose child is not a child of that screen, a hotspot rectangle outside 0-100.
- **Warns:** nodes with no media yet, a screenshot without hotspots (or the reverse), a screen child with no
  hotspot, a clip without a poster, clips flagged while the Bunny base URL is still the placeholder.

## Toggles that appear on their own

- **Parent | Teacher** shows only if at least one content file has a `teacherNote`. Until then everyone sees the
  Parent view.
- **EN | عربي** shows only when more than one language has media of its own: English is always offered, Arabic
  once any `static/abjad/screens/*.ar.*` screenshot exists. Until then the whole page is English, and a remembered
  or requested Arabic (`?lang=ar`) is ignored. All Arabic copy is already in the manifest, so it becomes reachable
  the moment the first Arabic screenshot is added.

## Routes

`/abjad/` is the Home screen and the product page: the explorer replaces the old standalone Abjad product page. Every
other screen and leaf is `/abjad/<id>/`. Section headings
inside the Exercises list (`games-letters`, `games-colors`, ...) have no page of their own.

## How it works

`gatsby-node.js` calls `createExplorePages`, which creates one page per node with the node's content in the page
context. The phone mirror (`src/components/abjad/ExploreShell.jsx`) is rendered by `wrapPageElement`, so it stays
mounted between routes: a route change becomes a slide, browser back/forward and deep links work, and each page
is real, crawlable HTML. `config/abjad/manifest-loader.js` strips internal manifest fields (`note`, `requires`, ...)
from the browser bundle.
