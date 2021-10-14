# What this is

Personal website of Will Coquillette, built with Gatsby, using a theme from @LekoArts.

# How I Built This

## Initial Setup

`nvm install 12`

`nvm use 12`

`npm install @lekoarts/gatsby-theme-minimal-blog`

`npm install -g gatsby-cli`

`gatsby new will-coquillette LekoArts/gatsby-starter-minimal-blog`

`cd will-coquillette`

## Customization

Look at the links below to customize it for your own use.

https://github.com/LekoArts/gatsby-starter-minimal-blog

https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog

## Test

`gatsby develop`

## Build

Create a static version of the site with the following command.

`gatsby build`

## Prepare Upload

### Install GitHub Pages

`npm install gh-pages`

### Add to gatsby-config.js

```js
module.exports = {
  pathPrefix: "/will-coquillette",
}
```

### Create CNAME

`echo "willcoquillette.com" >> CNAME`

### Add to package.json

```
{
  "scripts": {
    "deploy": "gatsby build --prefix-paths && cp CNAME public/ && gh-pages -d public"
  }
}
```

### Add the GitHub repository

`git remote add origin https://willquill.github.com/will-coquillette`

### Add CNAME to root of site



More info [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Build and Deploy

`npm run deploy`