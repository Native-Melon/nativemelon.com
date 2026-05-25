import * as React from "react";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews";

import { repositoryConfigs } from "./config/prismic/previews";

import "./src/css/style.css";
import './src/css/custom.css'

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
    {element}
  </PrismicPreviewProvider>
);

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });
  setHeadComponents([
    <script
      key="prismic-toolbar"
      async
      defer
      src="https://static.cdn.prismic.io/prismic.js?new=true&repo=nativemelon"
    />,
  ]);
};
