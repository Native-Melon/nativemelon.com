import * as React from "react";
import { graphql } from "gatsby";
import { PrismicRichText } from "@prismicio/react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/^\s*\d+[.)]\s*/, "") // strip a leading "9." / "9)" ordinal
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Builds a heading serializer that slugifies heading text into ids,
// disambiguating repeated slugs with -2, -3, etc.
const createHeadingSerializer = () => {
  const seen = new Map();

  const slugFor = (text) => {
    const base = slugify(text) || "section";
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  return {
    heading2: ({ text, children, key }) => (
      <h2 id={slugFor(text)} key={key}>
        {children}
      </h2>
    ),
    heading3: ({ text, children, key }) => (
      <h3 id={slugFor(text)} key={key}>
        {children}
      </h3>
    ),
  };
};

const GenericPageTemplate = ({ data, location }) => {
  const { site, prismicGenericPage: page } = data;
  const siteTitle = site.siteMetadata?.companyName || `Welcome`;
  const headingSerializer = createHeadingSerializer();

  return (
    <Layout location={location} title={siteTitle}>
      <div className="container">
        <div className="generic-page-title-area">
          <h1 itemProp="headline">{page.data.title.text}</h1>
        </div>
        <section itemProp="articleBody">
          <PrismicRichText
            field={page?.data?.content?.richText}
            components={headingSerializer}
          />
        </section>
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { title, content } = data?.prismicGenericPage?.data || {};
  return <Seo pageTitle={title.text} description={content} />;
};

export default withPrismicPreview(GenericPageTemplate);

export const blogPostQuery = graphql`
  query GenericPageBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        companyName
      }
    }
    prismicGenericPage(id: { eq: $id }) {
      _previewable
      url
      uid
      data {
        title {
          text
        }
        content {
          richText
        }
      }
    }
  }
`;
