const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const homePage = path.resolve(`./src/templates/home-page.jsx`);
  const genericPage = path.resolve(`./src/templates/generic-page.jsx`);

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
};
