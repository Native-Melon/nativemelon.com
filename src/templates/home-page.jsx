import * as React from "react";
import { Link, graphql } from "gatsby";

import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Bio from "../components/bio";

const HomePageTemplate = ({ data, location }) => {
  const {
    title,
  } = data?.prismicHomePage?.data || {};

  const blogList = data?.allPrismicPost?.nodes || [];

  return (
    <Layout location={location}>
      {/* Masthead */}
      <header class="masthead" id="home">
          <div class="container">
              <div class="masthead-heading text-uppercase">{title.text}</div>
              <a class="btn btn-primary btn-xl text-uppercase" href="#services">Our Services</a>
          </div>
      </header>
      {/* Services */}
      <section class="page-section" id="services">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase">Services</h2>
                  <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
              <div class="row text-center">
                  <div class="col-md-4">
                      <span class="fa-stack fa-4x">
                          <i class="fas fa-circle fa-stack-2x text-primary"></i>
                          <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                      </span>
                      <h4 class="my-3">E-Commerce</h4>
                      <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                  </div>
                  <div class="col-md-4">
                      <span class="fa-stack fa-4x">
                          <i class="fas fa-circle fa-stack-2x text-primary"></i>
                          <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                      </span>
                      <h4 class="my-3">Responsive Design</h4>
                      <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                  </div>
                  <div class="col-md-4">
                      <span class="fa-stack fa-4x">
                          <i class="fas fa-circle fa-stack-2x text-primary"></i>
                          <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
                      </span>
                      <h4 class="my-3">Web Security</h4>
                      <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                  </div>
              </div>
          </div>
      </section>
      {/* Portfolio Grid */}
      <section class="page-section bg-light" id="portfolio">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase">Portfolio</h2>
                  <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
              <div class="row">
                  <div class="col-lg-4 col-sm-6 mb-4">
                      {/* Portfolio item 1 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/1.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Threads</div>
                              <div class="portfolio-caption-subheading text-muted">Illustration</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 mb-4">
                      {/* Portfolio item 2 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/2.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Explore</div>
                              <div class="portfolio-caption-subheading text-muted">Graphic Design</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 mb-4">
                      {/* Portfolio item 3 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal3">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/3.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Finish</div>
                              <div class="portfolio-caption-subheading text-muted">Identity</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                      {/* Portfolio item 4 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal4">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/4.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Lines</div>
                              <div class="portfolio-caption-subheading text-muted">Branding</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
                      {/* Portfolio item 5 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal5">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/5.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Southwest</div>
                              <div class="portfolio-caption-subheading text-muted">Website Design</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                      {/* Portfolio item 6 */}
                      <div class="portfolio-item">
                          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal6">
                              <div class="portfolio-hover">
                                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                              </div>
                              <img class="img-fluid" src="assets/img/portfolio/6.jpg" alt="..." />
                          </a>
                          <div class="portfolio-caption">
                              <div class="portfolio-caption-heading">Window</div>
                              <div class="portfolio-caption-subheading text-muted">Photography</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      {/* About */}
      <section class="page-section" id="about">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase">About</h2>
                  <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
              <ul class="timeline">
                  <li>
                      <div class="timeline-image"><img class="rounded-circle img-fluid" src="assets/img/about/1.jpg" alt="..." /></div>
                      <div class="timeline-panel">
                          <div class="timeline-heading">
                              <h4>2009-2011</h4>
                              <h4 class="subheading">Our Humble Beginnings</h4>
                          </div>
                          <div class="timeline-body"><p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                      </div>
                  </li>
                  <li class="timeline-inverted">
                      <div class="timeline-image"><img class="rounded-circle img-fluid" src="assets/img/about/2.jpg" alt="..." /></div>
                      <div class="timeline-panel">
                          <div class="timeline-heading">
                              <h4>March 2011</h4>
                              <h4 class="subheading">An Agency is Born</h4>
                          </div>
                          <div class="timeline-body"><p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                      </div>
                  </li>
                  <li>
                      <div class="timeline-image"><img class="rounded-circle img-fluid" src="assets/img/about/3.jpg" alt="..." /></div>
                      <div class="timeline-panel">
                          <div class="timeline-heading">
                              <h4>December 2015</h4>
                              <h4 class="subheading">Transition to Full Service</h4>
                          </div>
                          <div class="timeline-body"><p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                      </div>
                  </li>
                  <li class="timeline-inverted">
                      <div class="timeline-image"><img class="rounded-circle img-fluid" src="assets/img/about/4.jpg" alt="..." /></div>
                      <div class="timeline-panel">
                          <div class="timeline-heading">
                              <h4>July 2020</h4>
                              <h4 class="subheading">Phase Two Expansion</h4>
                          </div>
                          <div class="timeline-body"><p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                      </div>
                  </li>
                  <li class="timeline-inverted">
                      <div class="timeline-image">
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
      <div class="py-5">
          <div class="container">
              <div class="row align-items-center">
                  <div class="col-md-3 col-sm-6 my-3">
                      <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/microsoft.svg" alt="..." aria-label="Microsoft Logo" /></a>
                  </div>
                  <div class="col-md-3 col-sm-6 my-3">
                      <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/google.svg" alt="..." aria-label="Google Logo" /></a>
                  </div>
                  <div class="col-md-3 col-sm-6 my-3">
                      <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/facebook.svg" alt="..." aria-label="Facebook Logo" /></a>
                  </div>
                  <div class="col-md-3 col-sm-6 my-3">
                      <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/ibm.svg" alt="..." aria-label="IBM Logo" /></a>
                  </div>
              </div>
          </div>
      </div>
      {/* Contact */}
      <section class="page-section" id="contact">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase">Contact Us</h2>
                  <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
              {/* This form is pre-integrated with SB Forms.
              To make this form functional, sign up at
              https://startbootstrap.com/solution/contact-forms
              to get an API token! */}
              <form id="contactForm" action="https://submit-form.com/HmGCa39GM">
                  <div class="row align-items-stretch mb-5">
                      <div class="col-md-6">
                          <div class="form-group">
                              <input class="form-control" id="name" name="Name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                              <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                          </div>
                          <div class="form-group">
                              <input class="form-control" id="email" name="Email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                              <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                              <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                          </div>
                          <div class="form-group">
                              <input class="form-control" id="phone" name="Phone" type="tel" placeholder="Your Phone" />
                          </div>
                          <div class="form-group mb-md-0">
                              <div class="h-captcha" data-sitekey="9f40a904-85ea-4be6-92de-54ded53caff4"></div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group form-group-textarea mb-md-0">
                              <textarea class="form-control" id="message" name="Message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                              <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                          </div>
                      </div>
                  </div>
                  {/* Submit error message */}
                  <div class="text-center">
                    <button class="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button>
                  </div>
              </form>
          </div>
      </section>

      {/* <Bio image={userImage} description={description.richText} />
      <ol style={{ listStyle: `none` }}>
        {blogList.map((post) => {
          const title = post.data.title.text;

          return (
            <li key={post.uid}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.url} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.data.post_date}</small>
                  <p>{post.data.excerpt}</p>
                </header>
              </article>
            </li>
          );
        })}
      </ol> */}
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { title, description } = data?.prismicHomePage?.data || {};
  return <>
    <Seo title={title.text} description={description.text} />
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  </>;
};

export const homePageQuery = graphql`
  query HomePageQuery {
    prismicHomePage {
      _previewable
      data {
        title {
          richText
          text
        }
        description {
          richText
          text
        }
      }
    }
    allPrismicPost {
      nodes {
        url
        uid
        data {
          post_date
          excerpt
          title {
            html
            text
          }
          post_body {
            html
          }
        }
      }
    }
  }
`;

export default withPrismicPreview(HomePageTemplate);
