/**
 * UI helpers for the Abjad explorer: site-owned chrome strings (English + Arabic, using the app's own
 * Arabic terms: تذاكر، عملات، النسخة الكاملة), tier labels, counts and the tile palette.
 * App copy (titles, summaries, steps, "teaches") is NOT here; it comes from the manifest.
 */

export const T = {
  en: {
    eyebrow: "Abjad · Explore",
    pageTitle: "Explore the Abjad app",
    pageIntro:
      "Tap through the app the way your child would. Every activity has a short preview and a plain-language note on what it teaches.",
    growthPill: "New activities added regularly",
    back: "Back", close: "Close", parent: "Parent", teacher: "Teacher", all: "See everything",
    audience: "Audience", language: "Language",
    how: "How to play", learnP: "What your child learns", learnT: "In the classroom",
    note: "Teacher note", teacherView: "Teacher view", word: "Arabic word", also: "Also inside",
    more: "More in", tryThese: "Try one", breadcrumb: "Breadcrumb", details: "Show or hide details",
    hint: "Tap a glowing dot to explore", soon: "Clip coming soon", play: "Play clip", pause: "Pause clip",
    scroll: "Scroll for more", dl: "Download on the", gp: "Get it on",
    ovTitle: "Everything in Abjad", ovSub: "Every screen and activity, straight from the app’s structure.",
    homeExtras: "Also on the home screen", filterBy: "Show",
    partOf: (p) => `Part of ${p}. Pick another one to compare.`, tapAnything: "Tap anything to open it.",
    f: { all: "Everything", free: "Free plan" },
    freeOf: (n, total) => `${n} of ${total} activities are free. Premium unlocks the rest.`,
    kind: { root: "Home", hub: "Section", section: "Section", world: "World", activity: "Activity", song: "Song", feature: "Feature", parents: "For grown-ups" },
  },
  ar: {
    eyebrow: "أبجد · استكشف",
    pageTitle: "استكشف تطبيق أبجد",
    pageIntro: "تجوّل في التطبيق كما يفعل طفلك. لكل نشاط مقطع قصير وشرح مبسّط لما يتعلّمه الطفل.",
    growthPill: "أنشطة جديدة تُضاف بانتظام",
    back: "رجوع", close: "إغلاق", parent: "ولي الأمر", teacher: "معلّم", all: "عرض الكل",
    audience: "الجمهور", language: "اللغة",
    how: "طريقة اللعب", learnP: "ماذا يتعلّم طفلك", learnT: "في الصف",
    note: "ملاحظة للمعلّم", teacherView: "عرض المعلّم", word: "الكلمة العربية", also: "بداخله أيضًا",
    more: "المزيد في", tryThese: "جرّب واحدًا", breadcrumb: "مسار التنقّل", details: "إظهار التفاصيل أو إخفاؤها",
    hint: "المس النقطة المضيئة للاستكشاف", soon: "المقطع قادم قريبًا", play: "تشغيل المقطع", pause: "إيقاف المقطع",
    scroll: "مرّر للمزيد", dl: "حمّل من", gp: "احصل عليه من",
    ovTitle: "كل ما في أبجد", ovSub: "كل شاشة وكل نشاط، كما هي في بنية التطبيق.",
    homeExtras: "من الشاشة الرئيسية", filterBy: "عرض",
    partOf: (p) => `جزء من «${p}». اختر نشاطًا آخر لتقارن.`, tapAnything: "المس أي عنصر لتفتحه.",
    f: { all: "كل شيء", free: "النسخة المجانية" },
    freeOf: (n, total) => `${digits(n, "ar")} من ${digits(total, "ar")} نشاطًا مجانية. والنسخة الكاملة تفتح الباقي.`,
    kind: { root: "الرئيسية", hub: "قسم", section: "قسم", world: "عالم", activity: "نشاط", song: "أغنية", feature: "ميزة", parents: "لأولياء الأمور" },
  },
};

export const digits = (n, lang) => (lang === "ar" ? Number(n).toLocaleString("ar-EG") : String(n));

export const actNoun = (c, lang) =>
  lang === "ar"
    ? c === 1 ? "نشاط واحد" : c === 2 ? "نشاطان" : c <= 10 ? `${digits(c, lang)} أنشطة` : `${digits(c, lang)} نشاطًا`
    : `${c} ${c === 1 ? "activity" : "activities"}`;

export const countPhrase = (tree, id, lang) => {
  const c = tree.leavesOf(id).size;
  if (!c) return "";
  const kind = tree.byId[id].kind;
  const noun = actNoun(c, lang);
  if (lang === "ar") return `${noun} ${kind === "root" ? "في التطبيق كله" : kind === "world" ? "في هذا العالم" : "في هذا القسم"}`;
  return kind === "root" ? `${noun} across the app` : kind === "world" ? `${noun} in this world` : kind === "section" ? `${noun} in this section` : `${noun} inside`;
};

export const title = (tree, id, lang) => (tree.byId[id].title && tree.byId[id].title[lang]) || id;
export const otherTitle = (tree, id, lang) => title(tree, id, lang === "en" ? "ar" : "en");

/** What a free user can play: free items, arcade games (tokens) and mixed items (part free). Extra worlds and premium are not. */
export const isFreeTier = (k) => k === "free" || k === "tokens" || k === "mixed";

/** Tier badge: { k, label, short } for a node, or k:'none'. Wording stays conservative: no prices. */
export const tierInfo = (tree, id, lang) => {
  const t = tree.tierOf(id);
  const k = t ? t.tier : "none";
  const ar = lang === "ar";
  if (k === "world") {
    // The coin cost unlocks the whole world, not the single item, so only the world node itself shows a number —
    // an item inside it (e.g. an activity or a song) borrows the "world" tier but stays priceless in its own badge,
    // same wording as world-tier nodes with no world ancestor to take a cost from (e.g. the world songs).
    const isWorldNode = tree.byId[id].kind === "world";
    if (!isWorldNode || t.coinCost == null) return { k, label: ar ? "عالم إضافي" : "Extra world", short: ar ? "عالم إضافي" : "Extra world", coins: null };
    const co = ar ? `${digits(t.coinCost, lang)} عملة` : `${t.coinCost} coins`;
    return { k, label: ar ? `عالم إضافي · ${co}` : `Extra world · ${co}`, short: co, coins: t.coinCost };
  }
  if (k === "tokens") {
    const n = t.tokenCost;
    const tk = ar ? (n === 1 ? "تذكرة واحدة" : n === 2 ? "تذكرتان" : `${digits(n, lang)} تذاكر`) : `${n} token${n === 1 ? "" : "s"}`;
    return { k, label: ar ? `ألعاب · ${tk} لكل لعبة` : `Arcade · ${tk} per play`, short: tk };
  }
  const M = {
    free: { label: ar ? "مجاني" : "Free", short: ar ? "مجاني" : "Free" },
    premium: { label: ar ? "النسخة الكاملة" : "Premium", short: ar ? "النسخة الكاملة" : "Premium" },
    mixed: { label: ar ? "مجاني والنسخة الكاملة" : "Free & premium", short: ar ? "متنوّع" : "Mixed" },
    none: { label: "", short: "—" },
  };
  return { k, ...M[k] };
};

export const ctaLine = (info, lang) => {
  const ar = lang === "ar";
  return {
    free: ar ? "مجاني داخل أبجد" : "Free to play in Abjad",
    premium: ar ? "يتطلّب النسخة الكاملة من أبجد" : "Needs an Abjad subscription",
    world: info.coins == null
      ? (ar ? "افتح العالم الإضافي داخل التطبيق" : "Unlock the extra world in the app")
      : ar ? `افتح هذا العالم بـ ${digits(info.coins, lang)} عملة داخل التطبيق` : `Unlock this world with ${info.coins} coins in the app`,
    tokens: ar ? "تُلعب بالتذاكر" : "Played with tokens",
    mixed: ar ? "بعضها مجاني وبعضها في النسخة الكاملة" : "Some free, some premium",
    none: ar ? "العبها في تطبيق أبجد" : "Play it in the Abjad app",
  }[info.k];
};

/* Palette: deterministic by position among siblings, so a node keeps its color everywhere. */
const PAL = [
  { a: "#E8694A", b: "#C4492A", fg: "#fff" },
  { a: "#2FA89A", b: "#1B7268", fg: "#fff" },
  { a: "#F5B44A", b: "#E08F1F", fg: "#2a1c05", scrim: "transparent" },
  { a: "#5563C1", b: "#37448F", fg: "#fff" },
  { a: "#A4599F", b: "#763B78", fg: "#fff" },
  { a: "#74936A", b: "#496543", fg: "#fff" },
];
export const palStyle = (tree, id) => {
  const p = tree.byId[id].parent;
  const i = p ? Math.max(0, tree.realKids(p).indexOf(id)) : 0;
  const c = PAL[i % PAL.length];
  return { "--a": c.a, "--b": c.b, "--fg": c.fg, ...(c.scrim ? { "--scrim": c.scrim } : {}) };
};

/** Big decorative Arabic letter on a tile: first letter of the last word of the Arabic title. */
export const firstLetter = (tree, id) => {
  const w = title(tree, id, "ar").trim().split(/\s+/).pop().replace(/^ال/, "");
  return [...w][0] || "أ";
};
