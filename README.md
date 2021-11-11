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

## Setting up keys

Definitely read all of [this](https://circleci.com/docs/2.0/gh-bb-integration/#deployment-keys-and-user-keys) first.

The intended function of a CircleCI deploy key is to use the key to checkout (read) your repository. However, since we want to actually generate a static site with Gatsby and then push those files to the gh-pages branch, we'll need to do something special so CircleCI can _write_ to your repository as well.

[This section](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-deploy-key) of the documentation I linked above walks you through it pretty well, and I'll repeat it here.

If your CircleCI project or your GitHub repository already has a deploy key but you want to start fresh, it's safe to just delete it from both platforms.

Locally, run this command (but with whatever email address you want to use) to generate the key pair. Do not enter a passphrase. Just hit enter to skip it.

`ssh-keygen -t rsa -m PEM -f circleci`

Go to the "Add deploy key" section of your repository settings in GitHub and add the public key created with the `ssh-keygen` command.

Now go to your CircleCI project and add **the private key** under "Additional SSH keys". Do _not_ click "Add Deploy Key" because that auto-generated deploy key is only meant for read access, and we need write as well. For the hostname, enter `github.com`.

The official documentation talks about needing to use `add_ssh_keys` with fingerprints. YOU DO NOT NEED TO DO THIS. In fact, when I did it, the checkout timed out on waiting for a passphrase. You don't even need it for `npm run deploy` - see my .circleci/config.yml as an example.