import React from "react";

const Portfolio = ({ portfolioList }) => {
  if (!portfolioList?.length) return null;

  const isSingle = portfolioList.length === 1;

  return (
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="section-heading text-uppercase">Work</h2>
      </div>

      {isSingle ? (
        <div className="portfolio-feature-card">
          <div className="portfolio-feature-card__image">
            <img
              src={portfolioList[0]?.data?.image?.url}
              alt={portfolioList[0]?.data?.image?.alt || portfolioList[0]?.data?.title?.text}
            />
          </div>
          <div className="portfolio-feature-card__content">
            <h3 className="portfolio-feature-card__title">
              {portfolioList[0]?.data?.title?.text}
            </h3>
            <p className="portfolio-feature-card__desc">
              {portfolioList[0]?.data?.description?.text || portfolioList[0]?.data?.summary?.text}
            </p>
            {portfolioList[0]?.data?.project_url && (
              <a
                href={portfolioList[0].data.project_url}
                className="product-card__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View project &rarr;
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="row row-eq-height">
          {portfolioList.map((portfolio) => {
            const projectUrl = portfolio?.data?.project_url;
            const CardTag = projectUrl ? "a" : "div";
            const cardProps = projectUrl
              ? { href: projectUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <div key={portfolio.uid} className="col-lg-4 col-sm-6 mb-4">
                <CardTag className="portfolio-item" {...cardProps}>
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
                </CardTag>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
