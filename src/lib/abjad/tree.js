/**
 * Pure helpers over the app manifest (src/data/abjad/app-manifest.json).
 * CommonJS so that both gatsby-node.js and the React components can use it.
 * Pass the raw manifest (Node) or the trimmed one (browser bundle, see config/abjad/manifest-loader.js).
 */
const BASE_PATH = "/abjad";
const SCREEN_KINDS = new Set(["root", "hub", "section", "world"]);

function createTree(manifest) {
  const nodes = manifest.nodes;
  const byId = {};
  nodes.forEach((n) => {
    byId[n.id] = n;
  });
  const kidsMap = {};
  nodes.forEach((n) => {
    if (n.parent) (kidsMap[n.parent] = kidsMap[n.parent] || []).push(n.id);
  });

  const realKids = (id) => kidsMap[id] || [];
  // A section that mirrors a world shows that world's leaves (no duplicated content).
  const effKids = (id) => (byId[id].mirrors ? realKids(byId[id].mirrors) : realKids(id));

  // Screens show a grid/list of children. Core (free) worlds with no children are one leaf each: one clip + card.
  // A core world that has children (the desert: chests, bonus challenge) is a screen so they can be hotspots.
  const isScreen = (id) => SCREEN_KINDS.has(byId[id].kind) && effKids(id).length > 0;
  // Modal sheets (e.g. the explorer) have no navigator route in the app.
  const isModal = (id) => byId[id].kind === "hub" && !byId[id].route;
  // Section nodes are headings inside the Games list, not screens of their own.
  const isRoutable = (id) => byId[id].kind !== "section";

  // Children a visitor can tap from a screen (sections are flattened into their rows), then the node's `links`:
  // existing nodes it can open but does not own (their parent, page and breadcrumb are unchanged).
  const navigableKids = (id) => {
    const kids = effKids(id).flatMap((k) => (byId[k].kind === "section" ? effKids(k) : [k]));
    return [...new Set([...kids, ...(byId[id].links || []).filter((l) => byId[l])])];
  };

  const chain = (id) => {
    const c = [];
    for (let n = byId[id]; n; n = n.parent ? byId[n.parent] : null) c.unshift(n.id);
    return c;
  };

  // A leaf may carry `tier: "world"` itself, but the coin cost lives on its world node, so borrow it from there.
  // Other tiers are per node (nothing is inherited).
  const tierOf = (id) => {
    for (let n = byId[id]; n; n = n.parent ? byId[n.parent] : null) {
      if (!n.tier || (n.id !== id && n.tier !== "world")) continue;
      if (n.tier === "world" && n.coinCost == null) {
        for (let a = n.parent && byId[n.parent]; a; a = a.parent ? byId[a.parent] : null) {
          if (a.coinCost != null) return { ...n, coinCost: a.coinCost };
        }
      }
      return n;
    }
    return null;
  };

  const leavesOf = (id, set = new Set()) => {
    for (const k of effKids(id)) {
      if (!isScreen(k) && byId[k].kind !== "parents") set.add(k);
      leavesOf(k, set);
    }
    return set;
  };

  // /abjad/ is the Home screen; every other screen/leaf is /abjad/<id>/
  const urlOf = (id) => (id === "home" ? `${BASE_PATH}/` : `${BASE_PATH}/${id}/`);

  return {
    nodes, byId, realKids, effKids, navigableKids, isScreen, isModal, isRoutable,
    chain, tierOf, leavesOf, urlOf,
  };
}

module.exports = { createTree, BASE_PATH };
