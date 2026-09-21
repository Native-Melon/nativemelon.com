import * as React from "react";
import { navigate } from "gatsby";

import Layout from "../layout";
import NarrationPanel from "./NarrationPanel";
import Overview from "./Overview";
import { LeafPane, ScreenPane } from "./panes";
import { AbxContext, useIsoLayoutEffect, useReducedMotion } from "./context";
import { T } from "../../lib/abjad/ui";
import { STORE_FALLBACK } from "../../config/abjad";
import { createTree } from "../../lib/abjad/tree";
// The webpack loader in config/abjad/manifest-loader.js ships only the public fields of the manifest.
import manifest from "../../data/abjad/app-manifest.json";
import "../../css/abjad-explore.css";

const tree = createTree(manifest);
const ANIM_MS = 380;
// Screens are portrait screenshots; only a leaf can be flagged landscape (content file `orientation`).
const orientOf = (p) => (!tree.isScreen(p.id) && p.content && p.content.orientation === "landscape" ? "landscape" : "portrait");
const LS = { lang: "abx-lang", lens: "abx-lens", hints: "abx-hints-done" };

const store = {
  get: (k) => { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
};

/**
 * The phone mirror. It lives in `wrapPageElement`, so it stays mounted while visitors move between the
 * /abjad/<id>/ pages. Every screen and leaf is a real route (crawlable HTML from SSR, working
 * browser history and deep links); this component turns the route change into a push/pop slide.
 */
export default function ExploreShell({ pageContext, location }) {
  const nodeId = pageContext.abjadNodeId;
  const content = pageContext.abjadContent;
  const stores = pageContext.abjadStores || {};
  const hasTeacherNotes = !!pageContext.abjadHasTeacherNotes;
  const langs = pageContext.abjadLangs || ["en"];

  const [langPref, setLangState] = React.useState("en");
  // a remembered or requested language that has no content yet falls back to English
  const lang = langs.includes(langPref) ? langPref : "en";
  const [lens, setLensState] = React.useState("parent");
  const [hints, setHints] = React.useState(true);
  const [overview, setOverview] = React.useState(false);
  const reduced = useReducedMotion();
  const reducedRef = React.useRef(false);
  reducedRef.current = reduced;

  const seq = React.useRef(0);
  const taps = React.useRef(0);
  const scrollMem = React.useRef({});
  const screenRef = React.useRef(null);
  const lastId = React.useRef(nodeId);
  const [nav, setNav] = React.useState(() => ({
    stack: tree.chain(nodeId),
    panes: [{ key: 0, id: nodeId, content, anim: null, intro: false }],
  }));

  /* preferences: SSR/first paint is English + Parent; then apply what the visitor chose before */
  React.useEffect(() => {
    const q = new URLSearchParams(location.search || "");
    const l = q.get("lang") || store.get(LS.lang);
    if (langs.includes(l)) setLangState(l);
    const w = store.get(LS.lens);
    if (w === "parent" || w === "teacher") setLensState(w);
    if (store.get(LS.hints)) setHints(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setLang = (l) => { setLangState(l); store.set(LS.lang, l); };
  const setLens = (l) => { setLensState(l); store.set(LS.lens, l); };

  const navRef = React.useRef(nav);
  navRef.current = nav;

  /* route change -> stack + slide */
  useIsoLayoutEffect(() => {
    if (lastId.current === nodeId) return;
    lastId.current = nodeId;
    const mode = location.state && location.state.abx;
    setOverview(false);

    const prev = navRef.current;
    const top = prev.stack[prev.stack.length - 1];
    let stack;
    let type;
    const at = prev.stack.lastIndexOf(nodeId);
    if (mode === "jump") { stack = tree.chain(nodeId); type = "none"; }
    else if (mode === "swap") { stack = [...prev.stack.slice(0, -1), nodeId]; type = "none"; }
    else if (at >= 0 && at < prev.stack.length - 1) { stack = prev.stack.slice(0, at + 1); type = tree.isModal(top) ? "down" : "pop"; }
    // a linked node is not owned by the screen it was opened from: its Back / breadcrumb use its own parent chain
    else if ((tree.byId[top].links || []).includes(nodeId)) { stack = tree.chain(nodeId); type = "push"; }
    else { stack = [...prev.stack, nodeId]; type = tree.isModal(nodeId) ? "up" : "push"; }

    if (type === "push" || type === "up") {
      taps.current += 1;
      if (taps.current >= 4) { setHints(false); store.set(LS.hints, "1"); }
    }

    const animate = type !== "none" && !reducedRef.current;
    const incoming = { key: ++seq.current, id: nodeId, content, anim: animate ? `${type}-in` : null, intro: type !== "pop" };
    const outgoing = prev.panes[prev.panes.length - 1];
    setNav({ stack, panes: animate ? [{ ...outgoing, anim: `${type}-out` }, incoming] : [incoming] });

    // keyboard/screen-reader users land on the new screen
    window.requestAnimationFrame(() => {
      const el = screenRef.current && screenRef.current.querySelector(".abx-pane:last-child");
      if (el) el.focus({ preventScroll: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  /* drop the outgoing pane once the slide is done */
  React.useEffect(() => {
    if (nav.panes.length < 2) return undefined;
    const keep = nav.panes[nav.panes.length - 1].key;
    const t = setTimeout(() => {
      setNav((p) => (p.panes[p.panes.length - 1].key === keep ? { ...p, panes: [{ ...p.panes[p.panes.length - 1], anim: null }] } : p));
    }, ANIM_MS);
    return () => clearTimeout(t);
  }, [nav.panes]);

  /* Escape: close the overview, else go back */
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (overview) { setOverview(false); return; }
      const s = navRef.current.stack;
      if (s.length > 1) navigate(tree.urlOf(s[s.length - 2]), { state: { abx: "pop" } });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overview]);

  // Without any teacher note the toggle is hidden, so a remembered "teacher" choice must not stick.
  const effLens = hasTeacherNotes ? lens : "parent";
  const ctx = React.useMemo(() => ({ tree, lang, lens: effLens, hints, stores }), [lang, effLens, hints, stores.appStore, stores.playStore]); // eslint-disable-line react-hooks/exhaustive-deps
  const backHref = nav.stack.length > 1 ? tree.urlOf(nav.stack[nav.stack.length - 2]) : null;
  const tt = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const topPane = nav.panes[nav.panes.length - 1];

  return (
    <Layout location={location} title="Abjad" bare>
      <div className="abx">
        <header className="abx-page-head" dir={dir} lang={lang}>
          <div className="abx-head-text">
            <p className="abx-eyebrow-top">{tt.eyebrow}</p>
            <h1>{tt.pageTitle}</h1>
            <p>{tt.pageIntro}</p>
            <div className="abx-head-meta">
              <div className="abx-dots" aria-hidden="true" />
              <span className="abx-head-pill"><span aria-hidden="true">✦</span> {tt.growthPill}</span>
            </div>
          </div>
          <div className="abx-stores abx-head-stores">
            <a className="abx-store" href={stores.appStore || STORE_FALLBACK.appStore} target="_blank" rel="noopener noreferrer"><small>{tt.dl}</small><b>App Store</b></a>
            <a className="abx-store" href={stores.playStore || STORE_FALLBACK.playStore} target="_blank" rel="noopener noreferrer"><small>{tt.gp}</small><b>Google Play</b></a>
          </div>
        </header>
        <main className="abx-shell">
          <AbxContext.Provider value={ctx}>
            <div className="abx-explore" dir={dir} lang={lang} data-panel="end" data-orient={orientOf(topPane)} data-hints={hints ? "on" : "off"}>
              <div className="abx-device">
                <div className="abx-screen" ref={screenRef}>
                  {nav.panes.map((p) => {
                    const leaving = p.anim && p.anim.endsWith("-out");
                    const props = leaving ? { "aria-hidden": "true", inert: "" } : {};
                    return (
                      <section
                        key={p.key}
                        className="abx-pane"
                        data-anim={p.anim || undefined}
                        data-id={p.id}
                        data-orient={orientOf(p)}
                        tabIndex={-1}
                        {...props}
                      >
                        {tree.isScreen(p.id) ? (
                          <ScreenPane id={p.id} content={p.content} backHref={backHref} scrollRef={scrollMem} />
                        ) : (
                          <LeafPane id={p.id} content={p.content} intro={p.intro} backHref={backHref} />
                        )}
                      </section>
                    );
                  })}
                </div>
              </div>
              <NarrationPanel
                id={topPane.id}
                stack={nav.stack}
                onLang={setLang}
                onLens={setLens}
                showLens={hasTeacherNotes}
                langs={langs}
                onOverview={() => setOverview(true)}
              />
              {overview && <Overview onClose={() => setOverview(false)} />}
            </div>
          </AbxContext.Provider>
        </main>
      </div>
    </Layout>
  );
}
