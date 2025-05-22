/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ pageTitle, slogan, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            companyName
            description
          }
        }
      }
    `
  );

  const metaDescription = slogan || site.siteMetadata?.description;
  const company = site.siteMetadata?.companyName;
  const title = pageTitle ? `${company} | ${pageTitle}` : company;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={company} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
};

export default Seo;
