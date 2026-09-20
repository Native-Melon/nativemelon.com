import * as React from "react";

import Seo from "../components/seo";
import { createTree } from "../lib/abjad/tree";
import manifest from "../data/abjad/app-manifest.json";

const tree = createTree(manifest);

// The page body is the phone mirror, rendered by ExploreShell (see wrap-page-element.jsx) so that it
// persists between routes. The template only supplies the route and its <head>.
const AbjadExplorePage = () => null;

export default AbjadExplorePage;

export const Head = ({ pageContext }) => {
  const { abjadNodeId: id, abjadOgImage, abjadCanonical } = pageContext;
  const node = tree.byId[id];
  const name = node.title.en;
  const pageTitle = id === "home" ? "Explore the Abjad app" : `${name} · Explore the Abjad app`;
  return (
    <Seo pageTitle={pageTitle} slogan={node.summary && node.summary.en} image={abjadOgImage}>
      {abjadCanonical && <link rel="canonical" href={abjadCanonical} />}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Nunito:wght@600;700;800&family=Roboto+Slab:wght@400;500;700&display=swap"
      />
    </Seo>
  );
};
