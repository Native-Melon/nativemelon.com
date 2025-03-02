import * as React from "react";
import { graphql } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Image } from "react-bootstrap";

import ContactForm from "../components/contactForm";

const HomePageTemplate = ({ data, location }) => {
  const { company_name, slogans } = data?.prismicHomePage?.data || {};

  const serviceList = data?.allPrismicService?.nodes || [];
  const portfolioList = data?.allPrismicPortfolioItem?.nodes || [];
  portfolioList.map(p => console.log(p));
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
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            {/* <h3 className="section-subheading text-muted"></h3> */}
          </div>
          <div className="row text-center">
            {serviceList.map((service) => {
              const title = service.data.title.text;

              return (
                <div className="col-md-4">
                  <Image
                    src={service?.data?.image?.url}
                    className="img-thumbnail"
                  />
                  <h4 className="my-3">{title}</h4>
                  <p
                    className="text-muted text-justify"
                    dangerouslySetInnerHTML={{
                      __html: service?.data?.description?.text || [],
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Portfolio Grid */}
      <section className="page-section bg-light" id="portfolio">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Portfolio</h2>
            {/* <h3 className="section-subheading text-muted"></h3> */}
          </div>
          <div className="row row-eq-height">
            {portfolioList.map((portfolio) => {
              return (
                <div className="col-lg-4 col-sm-6 mb-4">
                  <div className="portfolio-item">
                    <img
                      className="img-fluid"
                      src={portfolio?.data?.image?.url}
                      alt={portfolio?.data?.image?.alt}
                    />
                    <div className="portfolio-caption">
                      <div className="portfolio-caption-heading">
                        {portfolio?.data?.title?.text}
                      </div>
                      <div className="portfolio-caption-subheading text-muted">
                        {portfolio?.data?.summary?.text}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* About */}
      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">About</h2>
            <h3 className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src="assets/img/about/1.jpg"
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2009-2011</h4>
                  <h4 className="subheading">Our Humble Beginnings</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src="assets/img/about/2.jpg"
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>March 2011</h4>
                  <h4 className="subheading">An Agency is Born</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src="assets/img/about/3.jpg"
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>December 2015</h4>
                  <h4 className="subheading">Transition to Full Service</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src="assets/img/about/4.jpg"
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>July 2020</h4>
                  <h4 className="subheading">Phase Two Expansion</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  Be Part
                  <br />
                  Of Our
                  <br />
                  Story!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* Clients */}
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/microsoft.svg"
                  alt="..."
                  aria-label="Microsoft Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/google.svg"
                  alt="..."
                  aria-label="Google Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/facebook.svg"
                  alt="..."
                  aria-label="Facebook Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src="assets/img/logos/ibm.svg"
                  alt="..."
                  aria-label="IBM Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
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
