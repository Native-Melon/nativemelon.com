import React from "react";
import { useState } from "react";
import Botpoison from "@botpoison/browser";
import axios from "axios";

const botpoison = new Botpoison({
  publicKey: "pk_6b12d516-1f8d-4f5c-a43a-ebff44d2e6a4"
});

const ContactForm = ({ image, description }) => {
  const [formSubmitted, setFormSubmitted] = useState('N');

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataRaw = new FormData(e.target);
    const formData = {
      'Name': formDataRaw.get('Name'),
      'Email': formDataRaw.get('Email'),
      'Phone': formDataRaw.get('Phone'),
      'Message': formDataRaw.get('Message'),
    }
    setFormSubmitted('P');
    // Process a challenge
    const { solution } = await botpoison.challenge();
    await axios.post("https://submit-form.com/HmGCa39GM", {
      ...formData,
      // Forward the solution
      _botpoison: solution,
    });
    setFormSubmitted('Y');
  };

  return (
      <div className="container">
      <div className="text-center">
          <h2 className="section-heading text-uppercase">Contact Us</h2>
          {/* <h3 className="section-subheading text-muted"></h3> */}
      </div>
      {/* This form is pre-integrated with SB Forms.
      To make this form functional, sign up at
      https://startbootstrap.com/solution/contact-forms
      to get an API token! */}
      <form id="contactForm" onSubmit={onSubmit}>
      {/* <form id="contactForm" action="https://submit-form.com/HmGCa39GM" method="POST"> */}
      {/* smart forms */}
      {/* <form id="contactForm" action="https://smartforms.dev/submit/67c0f20c5b45507342a0e603" method="POST"> */}
          <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                  <div className="form-group">
                      <input className="form-control" id="name" name="Name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                      <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                  </div>
                  <div className="form-group">
                      <input className="form-control" id="email" name="Email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                      <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                      <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                  </div>
                  <div className="form-group mb-md-0">
                      <input className="form-control" id="phone" name="Phone" type="tel" placeholder="Your Phone" />
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="form-group form-group-textarea mb-md-0">
                      <textarea className="form-control" id="message" name="Message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                      <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                  </div>
              </div>
          </div>
          {/* Submit error message */}
          <div className="text-center">
            <button className={`
              btn btn-xl text-uppercase
              ${formSubmitted === 'N' ? '' : 'disabled'}
              ${formSubmitted === 'N' ? 'btn-primary' : formSubmitted === 'Y' ? 'btn-success' : 'btn-secondary'}
              `}
              id="submitButton" type="submit">
                {formSubmitted === 'N' ? "Send Message" : formSubmitted === 'Y' ? `Message Sent!` : 'Sending Message...'}
              </button>
          </div>
      </form>
  </div>
);
};

export default ContactForm;
