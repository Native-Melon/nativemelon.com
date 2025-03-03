import React from "react";
import { Image } from "react-bootstrap";

const Services = ({ serviceList }) => {

  return (
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
              <p className="text-muted text-justify">{ service?.data?.description?.text }</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;