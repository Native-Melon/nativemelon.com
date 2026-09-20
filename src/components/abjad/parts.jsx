import * as React from "react";
import { Link } from "gatsby";
import { useAbx } from "./context";
import { T, tierInfo, title } from "../../lib/abjad/ui";

export const ICON = {
  chev: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
  ),
  chevR: (
    <svg className="abx-chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></svg>
  ),
};

export const Pulse = () => <i className="abx-pulse" aria-hidden="true" />;

/** Tier badge. `short` is the compact form used on tiles, rows and pills. */
export function Chip({ id, short = false, lg = false }) {
  const { tree, lang } = useAbx();
  const t = tierInfo(tree, id, lang);
  if (t.k === "none" && !short) return null;
  return (
    <span className={`abx-chip abx-${t.k}${lg ? " abx-lg" : ""}`}>
      <i className="abx-ic" />
      {short ? t.short : t.label}
    </span>
  );
}

/**
 * In-app navigation is a real Gatsby route change; `mode` tells the shell how to animate it:
 * push (slide in), pop (slide back), swap (replace in place), jump (rebuild the stack, no slide).
 */
export function NavLink({ id, mode = "push", children, ...rest }) {
  const { tree } = useAbx();
  return (
    <Link to={tree.urlOf(id)} state={{ abx: mode }} {...rest}>
      {children}
    </Link>
  );
}

export function BackLink({ backHref, modal, overlay }) {
  const { lang } = useAbx();
  if (!backHref) return null;
  return (
    <Link className="abx-back" to={backHref} state={{ abx: "pop" }} aria-label={modal ? T[lang].close : T[lang].back}>
      {modal ? ICON.x : ICON.chev}
    </Link>
  );
}

export const PaneBar = ({ id, backHref }) => {
  const { tree, lang } = useAbx();
  const n = tree.byId[id];
  return (
    <header className="abx-bar">
      <BackLink backHref={backHref} modal={tree.isModal(id)} />
      <div className="abx-bar-title">{title(tree, id, lang)}</div>
      {n.tier && <Chip id={id} short />}
    </header>
  );
};
