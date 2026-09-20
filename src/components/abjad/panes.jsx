import * as React from "react";
import { useAbx, useReducedMotion } from "./context";
import { BackLink, Chip, ICON, NavLink, PaneBar, Pulse } from "./parts";
import { STORE_FALLBACK, clipUrl } from "../../config/abjad";
import { T, actNoun, ctaLine, firstLetter, otherTitle, palStyle, tierInfo, title } from "../../lib/abjad/ui";

/* ───────────── Screens: real screenshot + hotspots, or the themed fallback grid / list ───────────── */

function Tile({ id, wide }) {
  const { tree, lang } = useAbx();
  const count = tree.isScreen(id) ? tree.leavesOf(id).size : 0;
  return (
    <NavLink id={id} className={`abx-tile${wide ? " abx-wide" : ""}`} style={palStyle(tree, id)}>
      <span className="abx-glyph" aria-hidden="true">{firstLetter(tree, id)}</span>
      <Pulse />
      <span className="abx-t-title">{title(tree, id, lang)}</span>
      {lang === "en" && <span className="abx-t-sub abx-ar" lang="ar">{otherTitle(tree, id, lang)}</span>}
      {count > 0 && <span className="abx-t-meta">{actNoun(count, lang)}</span>}
      {tree.tierOf(id) && <Chip id={id} short />}
    </NavLink>
  );
}

function Row({ id }) {
  const { tree, lang } = useAbx();
  return (
    <NavLink id={id} className="abx-row" style={palStyle(tree, id)}>
      <span className="abx-dotc" />
      <span className="abx-r-txt">
        <b>{title(tree, id, lang)}</b>
        {lang === "en" && <small className="abx-ar" lang="ar">{otherTitle(tree, id, lang)}</small>}
      </span>
      <Pulse />
      {tree.tierOf(id) && <Chip id={id} short />}
      {ICON.chevR}
    </NavLink>
  );
}

function ShotScreen({ id, src, hotspots, startAtBottom, backHref }) {
  const { tree, lang } = useAbx();
  const scrollerRef = React.useRef(null);
  // Some screens open scrolled to the end in the app (e.g. the world map starts at the first world, at the bottom).
  // The image height is only known once it has loaded.
  const onLoad = () => {
    const el = scrollerRef.current;
    if (startAtBottom && el) el.scrollTop = el.scrollHeight;
  };
  // an image that finished loading before hydration never fires onLoad
  React.useEffect(() => {
    const img = scrollerRef.current && scrollerRef.current.querySelector("img");
    if (img && img.complete) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const withHotspot = new Set(hotspots.map((h) => h.childId));
  // children without a hotspot on this capture (e.g. below the fold) stay reachable for keyboards and crawlers
  const hidden = tree.navigableKids(id).filter((k) => !withHotspot.has(k) && tree.isRoutable(k));
  return (
    <>
      {/* The screenshot keeps its natural aspect ratio and scrolls if it is taller than the frame; hotspots are
          percentages of the image, so they scroll with it. */}
      <div className="abx-shot" ref={scrollerRef}>
        <div className="abx-shot-in">
          <img src={src} alt="" decoding="async" onLoad={onLoad} />
          {hotspots.map((h) => (
            <NavLink
              key={h.childId}
              id={h.childId}
              className={`abx-hot${lang === "ar" ? " abx-flip" : ""}`}
              aria-label={title(tree, h.childId, lang)}
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
            >
              <Pulse />
            </NavLink>
          ))}
        </div>
      </div>
      {hidden.length > 0 && (
        <nav className="abx-sr" aria-label={title(tree, id, lang)}>
          <ul>{hidden.map((k) => <li key={k}><NavLink id={k}>{title(tree, k, lang)}</NavLink></li>)}</ul>
        </nav>
      )}
      {backHref && (
        <header className="abx-bar abx-overlay">
          <BackLink backHref={backHref} modal={tree.isModal(id)} />
        </header>
      )}
    </>
  );
}

export function ScreenPane({ id, content, backHref, scrollRef }) {
  const { tree, lang } = useAbx();
  const shotSrc = content.screens[lang];
  const hotspots = content.hotspots[lang] || [];
  const listRef = React.useRef(null);
  const [scrolled, setScrolled] = React.useState(false);

  // restore the scroll position when coming back to this screen (e.g. the long Exercises list)
  React.useLayoutEffect(() => {
    if (listRef.current && scrollRef && scrollRef.current[id]) listRef.current.scrollTop = scrollRef.current[id];
  }, [id, scrollRef]);

  const onScroll = (e) => {
    if (scrollRef) scrollRef.current[id] = e.currentTarget.scrollTop;
    if (!scrolled) setScrolled(true);
  };

  if (shotSrc && hotspots.length) {
    return (
      <>
        <ShotScreen id={id} src={shotSrc} hotspots={hotspots} startAtBottom={content.startAtBottom && content.startAtBottom[lang]} backHref={backHref} />
        <div className="abx-coach">{T[lang].hint}</div>
      </>
    );
  }

  const kids = tree.effKids(id);
  const sectioned = kids.some((k) => tree.byId[k].kind === "section");
  return (
    <>
      {id === "home" && !backHref ? (
        <header className="abx-bar abx-home-bar">
          <div className="abx-logo"><i />{lang === "ar" ? "أبجد" : "Abjad"}</div>
        </header>
      ) : (
        <PaneBar id={id} backHref={backHref} />
      )}
      <div ref={listRef} onScroll={onScroll} className={`abx-scroll ${sectioned ? "abx-list" : "abx-grid"}`}>
        {sectioned
          ? kids.map((k) =>
              tree.byId[k].kind !== "section" ? (
                <Row key={k} id={k} />
              ) : (
                <React.Fragment key={k}>
                  <h3 className="abx-sec">{title(tree, k, lang)}</h3>
                  {tree.effKids(k).map((leaf) => <Row key={leaf} id={leaf} />)}
                </React.Fragment>
              )
            )
          : kids.map((k, i) => <Tile key={k} id={k} wide={kids.length % 2 === 1 && i === 0} />)}
      </div>
      {sectioned && (
        <div className={scrolled ? "abx-scrolled" : ""}>
          <div className="abx-fade" />
          <div className="abx-scrollcue">{T[lang].scroll} ↓</div>
        </div>
      )}
      {!sectioned && <div className="abx-coach">{T[lang].hint}</div>}
    </>
  );
}

/* ───────────── Leaves: clip (or poster, or placeholder) + info card ───────────── */

function Clip({ id, content }) {
  const { tree, lang } = useAbx();
  const reduced = useReducedMotion();
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const label = title(tree, id, lang);

  // With reduced motion the clip does not autoplay; the visitor can start it.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) { v.pause(); setPlaying(false); }
  }, [reduced]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  if (content.hasClip && !failed) {
    return (
      <div className="abx-clip abx-media">
        <video
          ref={videoRef}
          muted loop playsInline disablePictureInPicture
          autoPlay={!reduced}
          preload="metadata"
          poster={content.poster || undefined}
          aria-label={label}
        >
          <source src={clipUrl(id, "webm")} type="video/webm" />
          <source src={clipUrl(id, "mp4")} type="video/mp4" onError={() => setFailed(true)} />
        </video>
        {reduced && <button type="button" className="abx-playbtn" onClick={toggle}>{playing ? T[lang].pause : T[lang].play}</button>}
      </div>
    );
  }
  if (content.poster) {
    return (
      <div className="abx-clip abx-media">
        <img src={content.poster} alt={label} loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div className="abx-clip">
      <div className="abx-pglyph" aria-hidden="true">{firstLetter(tree, id)}</div>
      <div className="abx-pmsg"><span>{T[lang].soon}</span></div>
    </div>
  );
}

function Sheet({ id, content, state, onToggle }) {
  const { tree, lang, lens, stores } = useAbx();
  const n = tree.byId[id];
  const tt = T[lang];
  const info = tierInfo(tree, id, lang);
  const parent = lens === "parent";
  const kids = tree.realKids(id);

  // App copy comes from the manifest; a block is hidden when its field is missing (never invented).
  const summary = n.summary && n.summary[lang];
  const steps = (n.howToPlay && n.howToPlay[lang]) || [];
  const teaches = n.teaches && n.teaches[lang];
  const teacherNote = content.teacherNote[lang];

  const appStore = stores.appStore || STORE_FALLBACK.appStore;
  const playStore = stores.playStore || STORE_FALLBACK.playStore;

  return (
    <div className="abx-sheet" data-state={state}>
      <button type="button" className="abx-handle" onClick={onToggle} aria-label={tt.details} aria-expanded={state === "open"}>
        <i />
      </button>
      <div className="abx-sheet-in">
        <div className="abx-s-head">
          <div>
            <h2>{title(tree, id, lang)}</h2>
            <small className="abx-ar" lang={lang === "en" ? "ar" : "en"}>{otherTitle(tree, id, lang)}</small>
          </div>
          <Chip id={id} lg />
        </div>
        {summary && <p className="abx-tag-line">{summary}</p>}
        {n.wordAr && (
          <p className="abx-word-row">
            <span className="abx-word"><small>{tt.word}</small><b lang="ar">{n.wordAr}</b></span>
          </p>
        )}
        {steps.length > 0 && (
          <>
            <h3>{tt.how}</h3>
            <ol className="abx-steps">{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
          </>
        )}
        {parent && teaches && (
          <>
            <h3>{tt.learnP}</h3>
            <div className="abx-lens-box abx-lens-parent"><p>{teaches}</p></div>
          </>
        )}
        {!parent && (teaches || teacherNote) && (
          <>
            <h3>{tt.learnT}</h3>
            <div className="abx-lens-box abx-lens-teacher">
              <span className="abx-who">{tt.teacherView}</span>
              {teaches && <p>{teaches}</p>}
              {teacherNote && <p><span className="abx-lbl">{tt.note}:</span> {teacherNote}</p>}
            </div>
          </>
        )}
        {kids.length > 0 && (
          <>
            <h3>{tt.also}</h3>
            <div className="abx-also">
              {kids.map((k) => <NavLink key={k} id={k}>{title(tree, k, lang)}</NavLink>)}
            </div>
          </>
        )}
        <div className="abx-cta">
          <p>{ctaLine(info, lang)}</p>
          <div className="abx-stores">
            <a className="abx-store" href={appStore} target="_blank" rel="noopener noreferrer"><small>{tt.dl}</small><b>App Store</b></a>
            <a className="abx-store" href={playStore} target="_blank" rel="noopener noreferrer"><small>{tt.gp}</small><b>Google Play</b></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeafPane({ id, content, intro, backHref }) {
  const { tree } = useAbx();
  const reduced = useReducedMotion();
  // The card slides up after the clip has played for a moment. The first paint (SSR / deep link) is already open.
  const [state, setState] = React.useState(intro ? "hidden" : "open");
  React.useEffect(() => {
    if (state !== "hidden") return undefined;
    const t = setTimeout(() => setState("open"), reduced ? 0 : content.hasClip ? 1400 : 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="abx-leaf" style={palStyle(tree, id)}>
      <header className="abx-bar abx-overlay">
        <BackLink backHref={backHref} modal={tree.isModal(id)} />
      </header>
      <Clip id={id} content={content} />
      <Sheet id={id} content={content} state={state} onToggle={() => setState((s) => (s === "open" ? "peek" : "open"))} />
    </div>
  );
}
