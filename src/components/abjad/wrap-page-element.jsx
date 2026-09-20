import * as React from "react";
import ExploreShell from "./ExploreShell";

/**
 * gatsby-browser / gatsby-ssr `wrapPageElement`: pages created by config/abjad/explore-pages.js get the
 * persistent phone mirror. Being a wrapper (not part of the page component) it is not remounted between
 * /abjad/<id>/ pages, which is what lets the route change animate as a push/pop.
 */
export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext && props.pageContext.abjadNodeId) {
    return <ExploreShell {...props} />;
  }
  return element;
};
