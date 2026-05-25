import React from "react";

const PRODUCTS = [
  {
    id: "abjad",
    name: "Abjad",
    tagline: "Arabic · Ages 2–5",
    description:
      "An interactive app designed to introduce young children to the Arabic alphabet through play, sound, and storytelling.",
    status: "live",
    links: [
      { label: "App Store", href: "https://apps.apple.com/ug/app/abjad/id570214181" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=info.obada.abjad" },
    ],
  },
  {
    id: "sufra",
    name: "Sufra",
    tagline: "Meal Planner",
    description:
      "A web application for planning weekly meals, managing recipes, and organizing your family's grocery list.",
    status: "coming-soon",
  },
  {
    id: "jola",
    name: "Jola",
    tagline: "Community Canvassing",
    description:
      "A canvassing tool built to simplify door-to-door outreach — route planning, logging, and follow-up in one place.",
    status: "coming-soon",
  },
];

const Products = () => {
  return (
    <div className="container">
      <p className="products-section-heading">What we're building</p>
      <h2 className="section-heading text-uppercase mb-4">Products</h2>

      <div className="products-grid">
        {PRODUCTS.map((product) => {
          const isLive = product.status === "live";
          return (
            <div
              key={product.id}
              className={`product-card${!isLive ? " product-card--muted" : ""}`}
            >
              {!isLive && (
                <span className="product-card__badge">Coming Soon</span>
              )}
              <div className="product-card__name">{product.name}</div>
              <div className="product-card__tagline">{product.tagline}</div>
              <p className="product-card__desc">{product.description}</p>
              {isLive ? (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span
                    className="product-card__status-dot product-card__status-dot--live"
                    aria-hidden="true"
                    style={{ alignSelf: "center" }}
                  />
                  {product.links.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="product-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label} &rarr;
                    </a>
                  ))}
                </div>
              ) : (
                <span
                  style={{ fontSize: "0.85rem", color: "#999" }}
                >
                  <span
                    className="product-card__status-dot product-card__status-dot--soon"
                    aria-hidden="true"
                  />
                  In development
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="consulting-callout">
        <p className="consulting-callout__text mb-0">
          <strong>Also available:</strong> Web &amp; technology consulting for
          businesses and organizations.
        </p>
        <a href="#services" className="product-card__link">
          Consulting Services &rarr;
        </a>
      </div>
    </div>
  );
};

export default Products;
