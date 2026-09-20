const path = require(`path`);
const { createExplorePages } = require("./config/abjad/explore-pages");

// Ship only the public fields of the Abjad app manifest to the browser (see the loader for details).
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /app-manifest\.json$/,
          type: "javascript/auto",
          loader: require.resolve("./config/abjad/manifest-loader.js"),
        },
      ],
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const homePage = path.resolve(`./src/templates/home-page.jsx`);
  const genericPage = path.resolve(`./src/templates/generic-page.jsx`);
  const productPage = path.resolve(`./src/templates/product-page.jsx`);

  const homePageQueryResult = await graphql(
    `
      {
        prismicHomePage {
          id
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
      }
    `
  );

  const homePageData = homePageQueryResult.data.prismicHomePage.data;

  createPage({
    path: "/",
    component: homePage,
    context: {
      id: homePageData.id,
    },
  });

  // Get all markdown blog posts sorted by date
  const genericPageQueryResult = await graphql(
    `
      {
        allPrismicGenericPage {
          nodes {
            id
            uid
            url
            data {
              title {
                text
              }
              content {
                html
              }
            }
          }
        }
      }
    `
  );

  const posts = genericPageQueryResult.data.allPrismicGenericPage.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: post.url,
        component: genericPage,
        context: {
          id: post.id,
        },
      });
    });
  }

  const productPageQueryResult = await graphql(
    `
      {
        allPrismicProduct {
          nodes {
            id
            uid
          }
        }
      }
    `
  );

  const products = productPageQueryResult.data.allPrismicProduct.nodes;

  products.forEach((product) => {
    // /abjad is the "Explore the app" experience (createExplorePages); the product document still feeds the home
    // page grid and the explorer's store links, it just has no standalone page.
    if (product.uid === "abjad") return;
    createPage({
      path: `/${product.uid}`,
      component: productPage,
      context: {
        id: product.id,
      },
    });
  });

  // Abjad "Explore the app": one page per screen/leaf, joined with Prismic + static media.
  await createExplorePages({ graphql, actions, reporter });
};
