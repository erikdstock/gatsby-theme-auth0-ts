exports.onPreBootstrap = ({ reporter }) => {
  if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENTID) {
    reporter.panicOnBuild(`
        Please define both environment variables "AUTH0_DOMAIN" and "AUTH0_CLIENTID".
        They are mandatory for the auth0-js client to work.
        
        Read the documentation on how to set environment variables locally or in your build tool:
        
        https://www.gatsbyjs.org/docs/environment-variables/
        
        If you're using Netlify to host your website you can also have a look at their documentation:
        
        https://www.netlify.com/docs/continuous-deployment/#environment-variables
      `)
  }
}
