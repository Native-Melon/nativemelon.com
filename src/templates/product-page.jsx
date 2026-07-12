import * as React from "react";
import { graphql } from "gatsby";

import Seo from "../components/seo";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";

const ProductPageTemplate = ({ data }) => {
  const product = data.prismicProduct.data;
  const { name, tagline, description, app_store_url, play_store_url, web_url } = product;

  const storeLinks = [
    app_store_url && { label: "App Store", href: app_store_url },
    play_store_url && { label: "Google Play", href: play_store_url },
    web_url && { label: "Open App", href: web_url },
  ].filter(Boolean);

  return (
    <div className="product-landing">
      <div className="product-landing__card">
        <h1 className="product-landing__name">{name.text}</h1>
        <p className="product-landing__tagline">{tagline}</p>
        <p className="product-landing__desc">{description}</p>
        <div className="product-landing__links">
          {storeLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="product-card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Head = ({ data }) => {
  const { name, description, image } = data?.prismicProduct?.data || {};
  return (
    <Seo pageTitle={name?.text} slogan={description} image={image?.url} />
  );
};

export default withPrismicPreview(ProductPageTemplate);

export const productPageQuery = graphql`
  query ProductBySlug($id: String!) {
    prismicProduct(id: { eq: $id }) {
      _previewable
      uid
      data {
        name {
          text
        }
        tagline
        description
        status
        app_store_url
        play_store_url
        web_url
        image {
          url
        }
      }
    }
  }
`;
