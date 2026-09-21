import * as React from "react";
import { useAbx } from "./context";
import { Chip, NavLink } from "./parts";
import { T, isFreeTier, tierInfo, title } from "../../lib/abjad/ui";

const FILTERS = ["all", "free"];

/** "See everything": the whole tree from the same data, with tier badges. "Free plan" fades out whatever needs Premium. */
export default function Overview({ onClose }) {
  const { tree, lang } = useAbx();
  const tt = T[lang];
  const [filter, setFilter] = React.useState("all");
  const match = (id) => filter === "all" || isFreeTier(tierInfo(tree, id, lang).k);
  const allLeaves = [...tree.leavesOf("home")];
  const freeCount = allLeaves.filter((id) => isFreeTier(tierInfo(tree, id, lang).k)).length;

  const Pill = ({ id }) => (
    <NavLink id={id} mode="jump" className={`abx-pill${match(id) ? "" : " abx-dim"}`}>
      {title(tree, id, lang)}
      <Chip id={id} short />
    </NavLink>
  );

  const Group = ({ id }) => {
    const n = tree.byId[id];
    if (n.mirrors) {
      return (
        <div className="abx-ov-grp">
          <h4>{title(tree, id, lang)}</h4>
          <p className="abx-mirror">{lang === "ar" ? "الأنشطة نفسها في" : "Same activities as"}{" "}
            <NavLink id={n.mirrors} mode="jump">{title(tree, n.mirrors, lang)} ↗</NavLink>
          </p>
        </div>
      );
    }
    const ks = tree.effKids(id);
    return (
      <div className="abx-ov-grp">
        <h4>
          {n.kind === "section" ? title(tree, id, lang) : <NavLink id={id} mode="jump">{title(tree, id, lang)}</NavLink>}
          {n.kind !== "section" && <Chip id={id} short />}
        </h4>
        <div className="abx-pills">{ks.filter((k) => !tree.isScreen(k)).map((k) => <Pill key={k} id={k} />)}</div>
        {ks.filter((k) => tree.isScreen(k)).map((k) => <Group key={k} id={k} />)}
      </div>
    );
  };

  const homeKids = tree.effKids("home");
  const hubs = homeKids.filter((k) => tree.byId[k].kind === "hub");
  const plain = homeKids.filter((k) => tree.byId[k].kind !== "hub");

  return (
    <section className="abx-overview" aria-label={tt.ovTitle}>
      <div className="abx-ov-head">
        <h2>{tt.ovTitle}</h2>
        <button type="button" className="abx-close-x" onClick={onClose}>{tt.close} ✕</button>
      </div>
      <p className="abx-ov-sub">{tt.ovSub}</p>
      <div className="abx-filters" role="group" aria-label={tt.filterBy}>
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{tt.f[f]}</button>
        ))}
      </div>
      {filter === "free" && <p className="abx-ov-count" aria-live="polite">{tt.freeOf(freeCount, allLeaves.length)}</p>}
      <div className="abx-ov-grid">
        {hubs.map((h) => {
          const inner = tree.effKids(h);
          const leaves = inner.filter((k) => !tree.isScreen(k));
          const subs = inner.filter((k) => tree.isScreen(k));
          return (
            <article className="abx-ov-card" key={h}>
              <h3><NavLink id={h} mode="jump">{title(tree, h, lang)}</NavLink></h3>
              {leaves.length > 0 && <div className="abx-pills">{leaves.map((k) => <Pill key={k} id={k} />)}</div>}
              {subs.map((k) => <Group key={k} id={k} />)}
            </article>
          );
        })}
        <article className="abx-ov-card">
          <h3>{tt.homeExtras}</h3>
          <div className="abx-pills">{plain.map((k) => <Pill key={k} id={k} />)}</div>
        </article>
      </div>
    </section>
  );
}
