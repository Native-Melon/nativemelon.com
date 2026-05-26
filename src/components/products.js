import React from "react";

const FALLBACK_PRODUCTS = [
  {
    uid: "abjad",
    data: {
      name: { text: "Abjad" },
      tagline: "Arabic · Ages 2–5",
      description:
        "An interactive app designed to introduce young children to the Arabic alphabet through play, sound, and storytelling.",
      status: "live",
      app_store_url: "https://apps.apple.com/ug/app/abjad/id570214181",
      play_store_url:
        "https://play.google.com/store/apps/details?id=info.obada.abjad",
      web_url: null,
    },
  },
  {
    uid: "sufra",
    data: {
      name: { text: "Sufra" },
      tagline: "Meal Planner",
      description:
        "A web application for planning weekly meals, managing recipes, and organizing your family's grocery list.",
      status: "coming-soon",
      app_store_url: null,
      play_store_url: null,
      web_url: null,
    },
  },
  {
    uid: "jola",
    data: {
      name: { text: "Jola" },
      tagline: "Community Canvassing",
      description:
        "A canvassing tool built to simplify door-to-door outreach — route planning, logging, and follow-up in one place.",
      status: "coming-soon",
      app_store_url: null,
      play_store_url: null,
      web_url: null,
    },
  },
];

const Products = ({ productList = [] }) => {
  const products = productList.length > 0 ? productList : FALLBACK_PRODUCTS;

  return (
    <div className="container">
      <p className="products-section-heading">What we&rsquo;re building</p>
      <h2 className="section-heading text-uppercase mb-4">Products</h2>

      <div className="products-grid">
        {products.map((product) => {
          const { name, tagline, description, status, app_store_url, play_store_url, web_url } =
            product.data;
          const isLive = status === "live";

          const storeLinks = [
            app_store_url && { label: "App Store", href: app_store_url },
            play_store_url && { label: "Google Play", href: play_store_url },
            web_url && { label: "Open App", href: web_url },
          ].filter(Boolean);

          return (
            <div
              key={product.uid}
              className={`product-card${!isLive ? " product-card--muted" : ""}`}
            >
              {!isLive && (
                <span className="product-card__badge">Coming Soon</span>
              )}
              <div className="product-card__name">{name.text}</div>
              <div className="product-card__tagline">{tagline}</div>
              <p className="product-card__desc">{description}</p>
              {isLive ? (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span
                    className="product-card__status-dot product-card__status-dot--live"
                    aria-hidden="true"
                  />
                  {storeLinks.map(({ label, href }) => (
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
                <span style={{ fontSize: "0.85rem", color: "#999" }}>
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
