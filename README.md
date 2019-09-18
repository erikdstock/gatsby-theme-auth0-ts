<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Theme - Auth0
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/86f1f840-1a9c-4994-be3e-6c9341cf6d9a/deploy-status)](https://app.netlify.com/sites/gatsby-theme-auth0-example/deploys)

TODOS:

- [ ] Update .env.example and warning to include callback url
- [ ] Fix types
- [ ] Add tests
- [ ] Update this readme (everything below this line)

```shell
gatsby new my-theme https://github.com/gatsbyjs/gatsby-starter-theme-workspace
cd my-theme
yarn workspace example develop
```

## Layout

```shell
.
├── README.md
├── gatsby-theme-auth0
│   ├── README.md
│   ├── gatsby-config.js
│   ├── index.js
│   └── package.json
├── example
│   ├── README.md
│   ├── gatsby-config.js
│   ├── package.json
│   └── src
├── package.json
└── yarn.lock

3 directories, 10 files
```

### `gatsby-theme-auth0`

This directory is the theme package itself. You should rename this at
some point to be `gatsby-theme-{my-theme-name}`. Also change the
`package.json` name field and the corresponding dependency in the
example directory's `package.json`/`gatsby-config.js` to match the chosen name.

- `gatsby-theme-auth0/`
  - `gatsby-config.js`: An empty gatsby-config that you can use as a starting point for building functionality into your theme.
  - `index.js`: Since themes also function as plugins, this is an empty file that
    gatsby needs to use this theme as a plugin.
  - `package.json`: The dependencies that your theme will pull in when people install it. `gatsby` should be a `peerDependency`.

### `example`

This is an example usage of your theme. It should look the same as the
site of someone who installed and used your theme from npm.

- `example/`
  - `gatsby-config.js`: Specifies which theme to use and any other one-off config a site might need.
  - `src/`: Source code such as one-off pages or components that might live in
    a user's site.

You can run the example with:

```sh
yarn workspace example develop
```
