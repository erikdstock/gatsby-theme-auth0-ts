require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  plugins: [{ resolve: `gatsby-theme-minimal`, options: {} }]
};
