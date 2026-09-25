# Abjad "Explore the app" (`/abjad`)

An interactive mirror of the Abjad app: a phone frame shows one app screen at a time, tapping a hotspot or tile
slides to the child screen, tapping a leaf plays a short clip and slides up an info card.

## Where things come from

| What | Source | Edited where |
| --- | --- | --- |
| Structure, tiers, costs, titles, summaries, how-to steps, "what your child learns", Arabic word | `src/data/abjad/app-manifest.json` | **the app repo** (`growth/site/app-manifest.json`, then `npm run site:sync`). Never edit it here. |
| Teacher notes, "has clip" flag, landscape flag | `src/data/abjad/content/<id>.json` | git |
| Hotspot rectangles, "opens scrolled to the bottom" | `src/data/abjad/hotspots/<id>.<lang>.json`, measured on the screenshot it sits next to | git |
| Posters, screenshots | `static/abjad/` | git |
| Clips | Bunny (`GATSBY_ABJAD_MEDIA_BASE_URL`, see `.env.example`) | Bunny |
| Store links (App Store / Google Play) | the Prismic `product` document with UID `abjad` (falls back to constants in `src/config/abjad.js`). Keep this document: it also feeds the product grid on the home page. It just has no page of its own any more. | Prismic |

Everything for the explorer is in this repo except the store links. There is no Prismic type for it.

### `links` (a node that opens nodes it does not own)

A manifest node may carry `"links": ["<node-id>", ...]`: "this screen can navigate to these existing nodes, but
does not own them". The Letter Station sheet (`desert-station`) uses it for `letter-detail`, `trace` and `find`,
which each have their own single parent elsewhere in the tree. `links` never duplicates a node or a page, and it does
not change any `parent`, page URL or breadcrumb. It only widens what a screen may point at:

- `tree.navigableKids(id)` returns the real children (sections flattened), then the `links` targets, de-duplicated.
  Hotspots and the fallback tile grid use that set. Everything that counts or lists things (`leavesOf`, "N inside",
  the overview, page generation) still walks the real children only, so a linked node is counted and generated once.
- Tapping a linked node opens that node's own page (`/abjad/trace/`). **Back from a linked node returns to its real
  parent** (`games-letters`), not to the screen that linked to it; its breadcrumb is its own parent chain.

The site never writes English or Arabic *app* copy. Arabic *UI* labels (buttons, badges) live in `src/lib/abjad/ui.js`.

## Media conventions

- **Clips:** `<base>/<id>.webm` and `<base>/<id>.mp4`, about 480px wide, muted, 2-3 s loop, a few hundred KB.
  Then set `"hasClip": true` in that node's content file (below). The base URL is `GATSBY_ABJAD_MEDIA_BASE_URL`
  (a placeholder until you set it).
- **Posters:** `static/abjad/posters/<id>.webp` (`.jpg`/`.png` also work). Shown before/instead of a clip.
  A poster can be per language, `static/abjad/posters/<id>.<lang>.webp`, for a leaf whose art is full of app UI.
  Per language the build picks `<id>.<lang>.*`, else the shared `<id>.*`, else the other language's file, so one
  poster is always enough and an Arabic one can be added for a single leaf without touching the rest.
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
  otherwise it shows the fallback grid of child nodes. A language with no screenshot of its own borrows the other
  language's capture together with its hotspots (they were measured on that image), so the Arabic side of the
  explorer works before any Arabic screenshot exists.
- **Content file** `src/data/abjad/content/<id>.json`, all fields optional:
  ```json
  { "teacherNote": { "en": "Try it as a pair task.", "ar": "جرّبوه بالأزواج." },
    "hasClip": true,
    "orientation": "landscape" }
  ```
  `teacherNote` is what the Teacher view adds under the manifest's "teaches" line (a node without one shows just
  "teaches"). App copy never goes here. `orientation` is `"portrait"` (the default) or `"landscape"`, for a leaf
  whose app screen is landscape (only the drawing board so far). Screens are always portrait.
- **Landscape leaves:** record the clip natively in landscape, full screen, without rotating it or adding bars
  afterwards, and export the poster with the same aspect ratio. On a wide layout the phone frame is turned on its
  side (about 2:1) and the info card sits beside the clip; on a narrow layout the frame stays portrait and the clip is
  letterboxed above the card. The clip is never cropped in either case.
- **Leaf posters:** leaves show a poster (or the clip) rather than a screenshot. Make it the phone's aspect (about
  660x1416) with the app header shifted down about 190 px so it clears the frame's notch and the back button.

Everything works with zero media: screens fall back to a themed grid, leaves to a themed placeholder.

## Build-time checks (`config/abjad/explore-pages.js`)

- **Fails the build:** a content file, hotspot file or image name that is not a manifest node id (the app renamed
  or removed it), a section heading used as a page, a content file with unknown fields or wrong types, a hotspot
  whose child is not a real child of that screen or a `links` target of it, a hotspot rectangle outside 0-100.
- **Warns:** nodes with no media yet, a screenshot without hotspots (or the reverse), a screen child with no
  hotspot, a clip without a poster, clips flagged while the Bunny base URL is still the placeholder.

## Toggles

- **Parent | Teacher** shows only if at least one content file has a `teacherNote`. Until then everyone sees the
  Parent view.
- **EN | عربي** is always there. It switches the explorer's chrome, the manifest copy and the direction (RTL), and
  picks the Arabic screenshot or poster for any node that has one. Nodes that do not keep the English art, so adding
  Arabic media is node-by-node and never leaves a gap.

  The starting language is resolved in this order, first hit wins:

  1. `?lang=ar` / `?lang=en` in the URL (deep link; not written to storage)
  2. `abx-lang` in localStorage — what this visitor last picked with the toggle
  3. the browser's own preference, `navigator.languages` matched on the primary subtag, so `ar`, `ar-EG` and
     `ar-SA` all count as Arabic while `["en-GB", "ar"]` still gets English
  4. English

  An explicit choice therefore always beats the browser: someone on an Arabic device who taps EN stays on English
  for every later visit. A locale match is never written to storage, so changing the browser's language changes
  the site's default too.

  The SSR HTML is English — that is what crawlers index and what hydration matches — and the preference is applied
  in a layout effect, which runs before the browser paints, so an Arabic visitor does not see a frame of English
  LTR before it flips.

  Note that only the explorer is translated. The site's own navbar and footer (`src/components/layout.js`) stay
  English in both modes.

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
