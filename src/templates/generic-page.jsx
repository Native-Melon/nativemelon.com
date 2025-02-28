import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";

const GenericPageTemplate = ({ data, location }) => {
  const { site, prismicGenericPage: page } = data;
  const siteTitle = site.siteMetadata?.title || `Welcome`;

  return (
    <Layout location={location} title={siteTitle}>
        <h1 itemProp="headline">{page.data.title.text}</h1>
        <section
          dangerouslySetInnerHTML={{
            __html: page?.data?.content?.html || [],
          }}
          itemProp="articleBody"
        />
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { title, content } = data?.prismicGenericPage?.data || {};
  return <Seo title={title.text} description={content} />;
};

export default withPrismicPreview(GenericPageTemplate);

export const blogPostQuery = graphql`
  query GenericPageBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
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
          html
        }
      }
    }
  }
`;
