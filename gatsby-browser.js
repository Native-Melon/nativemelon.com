import * as React from "react";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews";

import { repositoryConfigs } from "./config/prismic/previews";

import 'bootstrap/dist/css/bootstrap.min.css';
import './src/css/style.css'
import './src/css/custom.css'

export { wrapPageElement } from "./src/components/abjad/wrap-page-element";

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
    {element}
  </PrismicPreviewProvider>
);

// Moving between /abjad/ screens is an in-page interaction (the phone frame slides), so keep the page's
// scroll position. Arriving from elsewhere, or leaving, still scrolls to the top as usual.
const inExplorer = (location) => !!location && /^\/abjad(\/|$)/.test(location.pathname);
export const shouldUpdateScroll = ({ routerProps, prevRouterProps }) => {
  if (prevRouterProps && inExplorer(prevRouterProps.location) && inExplorer(routerProps.location)) return false;
  return true;
};
