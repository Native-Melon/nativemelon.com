import * as React from "react";
import { graphql } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import Layout from "../components/layout";
import Seo from "../components/seo";

import ContactForm from "../components/contactForm";
import AboutCompany from "../components/aboutCompany";
import Services from "../components/services";
import Portfolio from "../components/portfolio";
import Products from "../components/products";

const HomePageTemplate = ({ data, location }) => {
  const { about_intro, about_content, slogans } = data?.prismicHomePage?.data || {};

  const serviceList = data?.allPrismicService?.nodes || [];
  const portfolioList = data?.allPrismicPortfolioItem?.nodes || [];
  const productList = data?.allPrismicProduct?.nodes || [];
  const slogan = slogans.filter((s) => s.slogan?.text)[
    Math.floor(Math.random() * slogans.length)
  ];

  return (
    <Layout location={location}>
      {/* Hero */}
      <header className="masthead" id="home">
        <div className="container">
          <div className="masthead-hero-stack">
            <div className="masthead-heading">
              Consulting <span className="masthead-accent-dot">&middot;</span>
            </div>
            <div className="masthead-heading">
              Products <span className="masthead-accent-dot">&middot;</span>
            </div>
            <div className="masthead-heading">Community</div>
          </div>
          <div className="masthead-rule" />
          <div className="masthead-subheading">
            {slogan.slogan.text}
          </div>
          <div className="masthead-ctas">
            <a href="#products" className="btn btn-primary btn-xl">
              Our Products
            </a>
            <a href="#contact" className="btn btn-outline-light btn-xl">
              Let&rsquo;s Talk
            </a>
          </div>
        </div>
      </header>

      {/* Dot divider */}
      <div className="dot-divider" aria-hidden="true" />

      {/* Products */}
      <section className="page-section" id="products">
        <Products productList={productList} />
      </section>

      {/* Dot divider */}
      <div className="dot-divider" aria-hidden="true" />

      {/* Consulting Services */}
      <section className="page-section" id="services">
        <Services serviceList={serviceList} />
      </section>

      {/* Dot divider */}
      <div className="dot-divider" aria-hidden="true" />

      {/* Work / Portfolio */}
      <section className="page-section bg-light" id="portfolio">
        <Portfolio portfolioList={portfolioList} />
      </section>

      {/* Dot divider */}
      <div className="dot-divider" aria-hidden="true" />

      {/* About */}
      <section className="page-section" id="about">
        <AboutCompany intro={about_intro} content={about_content} />
      </section>

      {/* Contact */}
      <section className="page-section" id="contact">
        <ContactForm />
      </section>
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { slogans } = data?.prismicHomePage?.data || {};
  return (
    <>
      <Seo pageTitle='Home' slogan={slogans[0].text} />
      <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
    </>
  );
};

export const homePageQuery = graphql`
  query HomePageQuery {
    prismicHomePage {
      _previewable
      data {
        company_name {
          text
        }
        about_intro {
          text
        }
        about_content {
          html
        }
        slogans {
          slogan {
            text
          }
        }
      }
    }
    allPrismicService {
      nodes {
        url
        uid
        data {
          title {
            text
          }
          image {
            url
          }
          description {
            text
          }
        }
      }
    }
    allPrismicProduct(sort: { data: { sort_order: ASC } }) {
      nodes {
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
          sort_order
        }
      }
    }
    allPrismicPortfolioItem {
      nodes {
        url
        uid
        data {
          title {
            text
          }
          image {
            url
            alt
          }
          summary {
            text
          }
          description {
            text
            html
          }
          project_url
        }
      }
    }
  }
`;

export default withPrismicPreview(HomePageTemplate);
