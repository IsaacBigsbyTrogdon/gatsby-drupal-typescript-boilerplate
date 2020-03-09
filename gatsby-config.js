/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Initialize dotenv
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}` // or '.env'
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Drupal TypeScript Boilerplate',
    siteUrl:
      'https://github.com/IsaacBigsbyTrogdon/gatsby-typescript-boilerplate',
    description:
      "Single-origin coffee pork belly Pitchfork bitters master cleanse food truck semiotics authentic McSweeney's mumblecore."
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-drupal',
      options: {
        baseUrl: 'https://live-contentacms.pantheonsite.io/',
        apiBase: 'api' // optional, defaults to `jsonapi`
        // links: { # Use to filter which content to import.
        //   articles: `https://ibt.best/api/articles`,
        // },
        // basicAuth: {
        //   username: process.env.BASIC_AUTH_USERNAME,
        //   password: process.env.BASIC_AUTH_PASSWORD,
        // },
        // params: {
        //   "api-key": process.env.BASIC_AUTH_PASSWORD
        // },
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-typescript-boilerplate',
        // eslint-disable-next-line @typescript-eslint/camelcase
        short_name: 'starter',
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_url: '/',
        // eslint-disable-next-line @typescript-eslint/camelcase
        background_color: '#663399',
        // eslint-disable-next-line @typescript-eslint/camelcase
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: './src/favicon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                autoprefixer: true,
                discardUnused: true,
                mergeIdents: true,
                zindex: true
              }
            ]
          })
        ]
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp'
  ]
};
