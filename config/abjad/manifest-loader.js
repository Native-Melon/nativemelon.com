/**
 * Webpack loader: ships only the public fields of app-manifest.json to the browser
 * (drops the internal `note`, `requires`, `params`, ...). gatsby-node.js reads the raw file itself.
 */
const KEEP = [
  "id", "parent", "kind", "route", "title", "summary", "howToPlay", "teaches",
  "wordAr", "tier", "coinCost", "tokenCost", "mirrors",
];

module.exports = function manifestLoader(source) {
  const manifest = JSON.parse(source);
  const trimmed = {
    appBuild: manifest.appBuild,
    nodes: manifest.nodes.map((n) =>
      KEEP.reduce((o, k) => (k in n ? { ...o, [k]: n[k] } : o), {})
    ),
  };
  return `module.exports = ${JSON.stringify(trimmed)};`;
};
