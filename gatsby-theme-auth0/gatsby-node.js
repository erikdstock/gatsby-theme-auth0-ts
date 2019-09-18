exports.onPreBootstrap = ({ reporter }) => {
  if (
    !process.env.GATSBY_AUTH0_DOMAIN ||
    !process.env.GATSBY_AUTH0_CLIENTID ||
    !process.env.GATSBY_AUTH0_CALLBACK
  ) {
    reporter.panicOnBuild(`
        Please define the following environment variables:
        
        GATSBY_AUTH0_DOMAIN
        GATSBY_AUTH0_CLIENTID
        GATSBY_AUTH0_CALLBACK

        They are mandatory for the auth0-js client to work.
        
        Read the documentation on how to set environment variables locally or in your build tool:
        
        https://www.gatsbyjs.org/docs/environment-variables/
        
        If you're using Netlify to host your website you can also have a look at their documentation:
        
        https://www.netlify.com/docs/continuous-deployment/#environment-variables
      `)
  }
}
