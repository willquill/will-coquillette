# Overview

Personal website of Will Coquillette, built with Gatsby, using a theme from @LekoArts.

Located [here](https://willcoquillette.com).

# How I Built This

## Initial Setup

`nvm install 14`

`nvm use 14`

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

_Note: I actually needed to omit this next step - it depends on what you want your path to be_

```js
module.exports = {
  pathPrefix: "/will-coquillette",
}
```

### Create CNAME

`echo "willcoquillette.com" >> CNAME`

More info [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

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

## Build and Deploy

`npm run deploy`

# Using CircleCI

If you want this to automatically build and deploy upon commit, you can use CircleCI. These instructions will be incomplete until I flesh them out further.

Some instructions taken from [here](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/git-auth-ssh-keys.md#adding-the-ssh-private-key-to-circle-ci).

## Generate SSH keys

Create the key pair

`ssh-keygen -t rsa -b 4096 -C "<your_email>" -f git_deploy_key -N "<ssh_passphrase>"`

Copy the public key to your GitHub account and then delete the public key

`rm git_deploy_key.pub`

Encrypt the private key with symmetric encryption

```sh
openssl aes-256-cbc -e -p -in git_deploy_key -out git_deploy_key.enc -K `openssl rand -hex 32` -iv `openssl rand -hex 16`
```

It will output values for `salt`, `key`, and `iv`.

Continue following the instructions as outlined [here](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/git-auth-ssh-keys.md#adding-the-ssh-private-key-to-circle-ci).