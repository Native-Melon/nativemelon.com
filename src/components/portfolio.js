import React from "react";

const Portfolio = ({ portfolioList }) => {
  return (
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
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
