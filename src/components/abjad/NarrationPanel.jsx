import * as React from "react";
import { useAbx } from "./context";
import { ICON, NavLink } from "./parts";
import { T, countPhrase, title } from "../../lib/abjad/ui";

function Seg({ opt, label, value, onChange, items }) {
  return (
    <span className="abx-seg" data-opt={opt} role="group" aria-label={label}>
      {items.map(([v, text, lang]) => (
        <button key={v} type="button" lang={lang} aria-pressed={value === v} onClick={() => onChange(v)}>{text}</button>
      ))}
    </span>
  );
}

/** Narration beside the phone: current screen's name, the manifest summary, counts, lens + language, quick links. */
export default function NarrationPanel({ id, stack, onLang, onLens, onOverview, showLens, langs }) {
  const { tree, lang, lens } = useAbx();
  const tt = T[lang];
  const n = tree.byId[id];
  const screen = tree.isScreen(id);
  const summary = n.summary && n.summary[lang];
  const explain = screen ? summary || tt.tapAnything : tt.partOf(title(tree, n.parent, lang));
  const stat = screen ? countPhrase(tree, id, lang) : n.parent && countPhrase(tree, n.parent, lang) ? `${tt.more} ${title(tree, n.parent, lang)}` : "";

  let quick = null;
  if (screen) {
    const ks = tree.navigableKids(id).slice(0, 6);
    if (ks.length) quick = { heading: tt.tryThese, ids: ks, mode: "push" };
  } else {
    const ks = tree.realKids(n.parent).filter((k) => k !== id).slice(0, 8);
    if (ks.length) quick = { heading: `${tt.more} ${title(tree, n.parent, lang)}`, ids: ks, mode: "swap" };
  }

  return (
    <aside className="abx-panel" aria-live="polite">
      <nav className="abx-crumbs" aria-label={tt.breadcrumb}>
        {stack.map((sid, i) =>
          i === stack.length - 1 ? (
            <span key={sid} className="abx-cur">{title(tree, sid, lang)}</span>
          ) : (
            <React.Fragment key={sid}>
              <NavLink id={sid} mode="pop">{title(tree, sid, lang)}</NavLink>
              <i aria-hidden="true">›</i>
            </React.Fragment>
          )
        )}
      </nav>
      <p className="abx-p-eyebrow">{tt.kind[n.kind]}</p>
      <h2 className="abx-p-title">{title(tree, id, lang)}</h2>
      <p className="abx-p-explain">{explain}</p>
      <p className="abx-p-stat">{stat}</p>
      <div className={`abx-ctrls${showLens ? "" : " abx-no-lens"}`}>
        {showLens && <Seg opt="lens" label={tt.audience} value={lens} onChange={onLens} items={[["parent", tt.parent], ["teacher", tt.teacher]]} />}
        {langs.length > 1 && (
          <Seg opt="lang" label={tt.language} value={lang} onChange={onLang} items={[["en", "EN", "en"], ["ar", "عربي", "ar"]].filter(([v]) => langs.includes(v))} />
        )}
        <button type="button" className="abx-btn-all" onClick={onOverview}>{ICON.grid}{tt.all}</button>
      </div>
      {quick && (
        <div className="abx-sibs">
          <h4>{quick.heading}</h4>
          <div>
            {quick.ids.map((k) => <NavLink key={k} id={k} mode={quick.mode}>{title(tree, k, lang)}</NavLink>)}
          </div>
        </div>
      )}
    </aside>
  );
}
