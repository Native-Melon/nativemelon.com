import * as React from "react";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews";

import { repositoryConfigs } from "./config/prismic/previews";

import 'bootstrap/dist/css/bootstrap.min.css';
import './src/css/style.css'
import './src/css/custom.css'

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
    {element}
  </PrismicPreviewProvider>
);
