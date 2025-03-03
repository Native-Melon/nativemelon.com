import * as React from "react";
import { graphql } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import Layout from "../components/layout";
import Seo from "../components/seo";

import ContactForm from "../components/contactForm";
import AboutCompany from "../components/aboutCompany";
import Services from "../components/services";
import Portfolio from "../components/portfolio";

const HomePageTemplate = ({ data, location }) => {
  const { company_name, about_intro, about_content, slogans } = data?.prismicHomePage?.data || {};

  const serviceList = data?.allPrismicService?.nodes || [];
  const portfolioList = data?.allPrismicPortfolioItem?.nodes || [];
  const slogan = slogans.filter((s) => s.slogan?.text)[
    Math.floor(Math.random() * slogans.length)
  ];

  return (
    <Layout location={location}>
      {/* Masthead */}
      <header className="masthead" id="home">
        <div className="container">
          <div className="masthead-heading text-uppercase">
            {company_name.text}
          </div>
          <div className="masthead-subheading">{slogan.slogan.text}</div>
        </div>
      </header>
      {/* Services */}
      <section className="page-section" id="services">
        <Services serviceList={serviceList} />
      </section>
      {/* Portfolio Grid */}
      <section className="page-section bg-light" id="portfolio">
        <Portfolio portfolioList={ portfolioList } />
      </section>
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
  const { company_name, slogans } = data?.prismicHomePage?.data || {};
  return (
    <>
      <Seo company={company_name.text} slogan={slogans[0].text} />
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
        }
      }
    }
  }
`;

export default withPrismicPreview(HomePageTemplate);
