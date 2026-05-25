import React from "react";

const Services = ({ serviceList }) => {
  return (
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="section-heading text-uppercase">Consulting Services</h2>
      </div>
      <div className="row">
        {serviceList.map((service) => {
          const { title, image, description } = service.data;
          return (
            <div key={service.uid} className="col-md-4 mb-4">
              <div className="service-card">
                {image?.url && (
                  <div className="service-card__icon-wrap">
                    <img
                      src={image.url}
                      alt={title.text}
                      className="service-card__icon"
                    />
                  </div>
                )}
                <h4 className="service-card__title">{title.text}</h4>
                <p className="service-card__desc">{description.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
