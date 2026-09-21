/**
 * Build-time layer for /abjad (the "Explore the app" experience): reads the app manifest, joins it with the site's own content (all in this
 * repo), validates the join, and creates one page per screen/leaf.
 *
 *   src/data/abjad/app-manifest.json       app facts + copy (generated in the app repo; never edited here)
 *   src/data/abjad/content/<id>.json       teacherNote {en, ar}, hasClip and orientation ("landscape" for the rare landscape leaf) for one node
 *   src/data/abjad/hotspots/<id>.<lang>.json   hotspot rectangles (+ startAtBottom), measured on that screenshot
 *   static/abjad/screens/<id>.<lang>.*     screenshots     static/abjad/posters/<id>.*   posters
 *
 * Coverage rules (the manifest owns app copy; "has content" here means media):
 *   - WARN  on manifest nodes with no media (they render as fallback screens / placeholder leaves).
 *   - FAIL  on site content whose id is not in the manifest (content file, hotspot file or image name), on
 *           malformed content files, and on hotspots that point at a node that is not a child of that screen.
 */
const fs = require("fs");
const path = require("path");
const { createTree, BASE_PATH } = require("../../src/lib/abjad/tree");
const manifest = require("../../src/data/abjad/app-manifest.json");

const STATIC_DIR = path.resolve(__dirname, "../../static/abjad");
const LANGS = ["en", "ar"];
const IMG_EXT = ["webp", "jpg", "png"];
const CONTENT_DIR = path.resolve(__dirname, "../../src/data/abjad/content");
const HOTSPOT_DIR = path.resolve(__dirname, "../../src/data/abjad/hotspots");

const tree = createTree(manifest);

const fileIn = (dir, base) => {
  for (const ext of IMG_EXT) {
    if (fs.existsSync(path.join(STATIC_DIR, dir, `${base}.${ext}`))) return `/abjad/${dir}/${base}.${ext}`;
  }
  return null;
};

// image file names -> ids (for the "unknown id" check)
const listImages = (dir) => {
  const p = path.join(STATIC_DIR, dir);
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p)
    .filter((f) => IMG_EXT.some((e) => f.endsWith(`.${e}`)))
    .map((f) => ({ file: `static/abjad/${dir}/${f}`, id: f.replace(/\.(webp|jpg|png)$/, "").replace(/\.(en|ar)$/, "") }));
};

const rectOk = (h) =>
  [h.x, h.y, h.w, h.h].every((v) => typeof v === "number" && Number.isFinite(v)) &&
  h.w > 0 && h.h > 0 && h.x >= 0 && h.y >= 0 && h.x + h.w <= 100.001 && h.y + h.h <= 100.001;

// { "<id>.<lang>": { startAtBottom, hotspots: [{ childId, x, y, w, h }] } }
function loadHotspotFiles(errors) {
  const out = {};
  if (!fs.existsSync(HOTSPOT_DIR)) return out;
  fs.readdirSync(HOTSPOT_DIR).filter((f) => f.endsWith(".json")).forEach((f) => {
    const m = f.match(/^(.+)\.(en|ar)\.json$/);
    const where = `src/data/abjad/hotspots/${f}`;
    if (!m) { errors.push(`${where}: file name must be <node-id>.<en|ar>.json`); return; }
    if (!tree.byId[m[1]]) { errors.push(`${where}: "${m[1]}" is not a node id in app-manifest.json`); return; }
    try {
      const j = JSON.parse(fs.readFileSync(path.join(HOTSPOT_DIR, f), "utf8"));
      out[`${m[1]}.${m[2]}`] = { startAtBottom: !!j.startAtBottom, hotspots: Array.isArray(j.hotspots) ? j.hotspots : [] };
    } catch (e) { errors.push(`${where}: invalid JSON (${e.message})`); }
  });
  return out;
}

// { "<id>": { teacherNote: {en, ar}, hasClip, orientation } }
function loadContentFiles(errors) {
  const out = {};
  if (!fs.existsSync(CONTENT_DIR)) return out;
  fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json")).forEach((f) => {
    const where = `src/data/abjad/content/${f}`;
    const id = f.replace(/\.json$/, "");
    if (!tree.byId[id]) { errors.push(`${where}: "${id}" is not a node id in app-manifest.json (renamed or removed in the app?)`); return; }
    if (!tree.isRoutable(id)) { errors.push(`${where}: "${id}" is a section heading, which has no screen of its own`); return; }
    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8")); }
    catch (e) { errors.push(`${where}: invalid JSON (${e.message})`); return; }
    Object.keys(j).filter((k) => !["teacherNote", "hasClip", "orientation"].includes(k)).forEach((k) => errors.push(`${where}: unknown field "${k}" (allowed: teacherNote, hasClip, orientation)`));
    if ("hasClip" in j && typeof j.hasClip !== "boolean") errors.push(`${where}: hasClip must be true or false`);
    if ("orientation" in j && !["portrait", "landscape"].includes(j.orientation)) errors.push(`${where}: orientation must be "portrait" or "landscape"`);
    if ("teacherNote" in j) {
      const t = j.teacherNote;
      if (!t || typeof t !== "object" || Object.keys(t).some((k) => !LANGS.includes(k) || (t[k] != null && typeof t[k] !== "string"))) {
        errors.push(`${where}: teacherNote must be { "en": "...", "ar": "..." } (either may be omitted)`);
      }
    }
    out[id] = j;
  });
  return out;
}

exports.createExplorePages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const template = path.resolve("./src/templates/abjad-explore.jsx");

  const siteRes = await graphql(`{ site { siteMetadata { siteUrl } } }`);
  const siteUrl = (siteRes.data.site.siteMetadata.siteUrl || "").replace(/\/$/, "");

  const productRes = await graphql(`
    { allPrismicProduct(filter: { uid: { eq: "abjad" } }) { nodes { data { app_store_url play_store_url } } } }
  `);
  const product = (productRes.data.allPrismicProduct.nodes[0] || {}).data || {};
  const stores = { appStore: product.app_store_url || null, playStore: product.play_store_url || null };

  const errors = [];
  const warnings = [];
  const contentFiles = loadContentFiles(errors);
  const hotspotFiles = loadHotspotFiles(errors);

  // ── FAIL: content keyed by an id the manifest does not have (content and hotspot files are checked when loaded) ──
  [...listImages("screens"), ...listImages("posters")].forEach(({ file, id }) => {
    if (!tree.byId[id]) errors.push(`${file}: "${id}" is not a node id in app-manifest.json`);
  });

  // The Parent | Teacher toggle only exists when there is something to switch to.
  const hasTeacherNotes = Object.values(contentFiles).some((c) => c.teacherNote && (c.teacherNote.en || c.teacherNote.ar));

  // A language is offered only if it has media of its own (a screenshot); English is the base and always offered.
  // The toggle is hidden while there is just one.
  const langs = LANGS.filter((l) => l === "en" || tree.nodes.some((n) => tree.isRoutable(n.id) && fileIn("screens", `${n.id}.${l}`)));

  const noMedia = { screens: [], leaves: [] };
  let clipCount = 0;

  tree.nodes.filter((n) => tree.isRoutable(n.id)).forEach((n) => {
    const id = n.id;
    const doc = contentFiles[id] || {};
    const screen = tree.isScreen(id);

    const screens = {};
    const hotspots = {};
    const startAtBottom = {};
    LANGS.forEach((lang) => {
      screens[lang] = fileIn("screens", `${id}.${lang}`);
      const file = hotspotFiles[`${id}.${lang}`];
      const source = `hotspots/${id}.${lang}.json`;
      const raw = file ? file.hotspots : [];
      const valid = [];
      const okChildren = new Set(screen ? tree.navigableKids(id) : []);
      raw.forEach((h) => {
        if (!screen) errors.push(`${id}: ${source} set on a node that is not a screen`);
        else if (!okChildren.has(h.childId)) errors.push(`${id}: ${source} child "${h.childId}" is not a child of this screen`);
        else if (!rectOk(h)) errors.push(`${id}: ${source} rectangle for "${h.childId}" must be percentages inside 0-100`);
        else valid.push({ childId: h.childId, x: h.x, y: h.y, w: h.w, h: h.h });
      });
      hotspots[lang] = valid;
      startAtBottom[lang] = !!(file && file.startAtBottom);
      if (screens[lang] && !valid.length) warnings.push(`${id}: has a ${lang} screenshot but no ${lang} hotspots, so the fallback grid is shown in ${lang}`);
      if (!screens[lang] && valid.length) warnings.push(`${id}: has ${lang} hotspots but no static/abjad/screens/${id}.${lang}.* image`);
      if (screens[lang] && valid.length && screen) {
        const missing = [...okChildren].filter((k) => !valid.some((h) => h.childId === k));
        if (missing.length) warnings.push(`${id} (${lang}): no hotspot for ${missing.join(", ")}; they stay reachable only through links outside the screenshot`);
      }
    });

    const poster = fileIn("posters", id);
    const hasClip = !!doc.hasClip && !screen;
    if (doc.hasClip && screen) warnings.push(`${id}: hasClip is set on a screen; clips only play on leaves`);
    if (hasClip) {
      clipCount += 1;
      if (!poster) warnings.push(`${id}: clip without a poster image (static/abjad/posters/${id}.webp)`);
    }

    // only leaves can be landscape: screens are captured screenshots of the portrait app
    if (doc.orientation === "landscape" && screen) warnings.push(`${id}: orientation is set on a screen; only leaves can be landscape`);
    const orientation = doc.orientation === "landscape" && !screen ? "landscape" : "portrait";

    const hasMedia = screen ? !!(screens.en || screens.ar) : hasClip || !!poster;
    if (!hasMedia) (screen ? noMedia.screens : noMedia.leaves).push(id);

    const content = {
      teacherNote: { en: (doc.teacherNote && doc.teacherNote.en) || null, ar: (doc.teacherNote && doc.teacherNote.ar) || null },
      hasClip,
      orientation,
      poster,
      screens,
      hotspots,
      startAtBottom,
    };
    const ogImage = poster || screens.en || null;

    createPage({
      path: tree.urlOf(id),
      component: template,
      context: {
        abjadNodeId: id,
        abjadContent: content,
        abjadStores: stores,
        abjadHasTeacherNotes: hasTeacherNotes,
        abjadLangs: langs,
        abjadOgImage: ogImage ? `${siteUrl}${ogImage}` : null,
        abjadCanonical: `${siteUrl}${tree.urlOf(id)}`,
      },
    });
  });

  // ── WARN: coverage ──
  const total = tree.nodes.filter((n) => tree.isRoutable(n.id)).length;
  const missing = noMedia.screens.length + noMedia.leaves.length;
  if (missing) {
    reporter.warn(
      `[abjad-explore] ${missing} of ${total} nodes have no media yet (fallback rendering):\n` +
        `  screens (${noMedia.screens.length}): ${noMedia.screens.join(", ") || "-"}\n` +
        `  leaves  (${noMedia.leaves.length}): ${noMedia.leaves.join(", ") || "-"}`
    );
  }
  if (clipCount && !process.env.GATSBY_ABJAD_MEDIA_BASE_URL) {
    warnings.push(`${clipCount} nodes are flagged hasClip but GATSBY_ABJAD_MEDIA_BASE_URL is not set (placeholder Bunny URL in use)`);
  }
  warnings.forEach((w) => reporter.warn(`[abjad-explore] ${w}`));

  // ── FAIL ──
  if (errors.length) {
    reporter.panicOnBuild(`[abjad-explore] ${errors.length} content error(s):\n  - ${errors.join("\n  - ")}`);
  }
  reporter.info(`[abjad-explore] created ${total} pages under ${BASE_PATH}/ (${total - missing} with media)`);
};
