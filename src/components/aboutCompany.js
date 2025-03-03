import React from "react";

const AboutCompany = ({ intro, content }) => {

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading text-uppercase">About</h2>
        <h3 className="section-subheading text-muted">{intro?.text}</h3>
      </div>
      <div className="about-content">
        <p
          className="text-muted text-justify"
          dangerouslySetInnerHTML={{ __html: content?.html || [] }}
        />
      </div>
    </div>
  );
};

export default AboutCompany;