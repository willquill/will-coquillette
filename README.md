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

## Setting up keys

Definitely read all of [this](https://circleci.com/docs/2.0/gh-bb-integration/#deployment-keys-and-user-keys) first.

The intended function of a CircleCI deploy key is to use the key to checkout (read) your repository. However, since we want to actually generate a static site with Gatsby and then push those files to the gh-pages branch, we'll need to do something special so CircleCI can _write_ to your repository as well.

[This section](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-deploy-key) of the documentation I linked above walks you through it pretty well, and I'll repeat it here.

If your CircleCI project or your GitHub repository already has a deploy key but you want to start fresh, it's safe to just delete it from both platforms.

Locally, run this command (but with whatever email address you want to use) to generate the key pair. Do not enter a passphrase. Just hit enter to skip it.

`ssh-keygen -t ed25519 -f circle_ci_deploy -C "4646219+willquill@users.noreply.github.com"`


`ssh-keygen -t ed25519 -f circle_ci_deploy -C "CircleCI Deploy Key with Write Access" -m PEM`

ssh-keygen -t rsa -b 4096 -C "CircleCI Deploy Key with Write Access" -f circleci_deploy -m PEM

Go to the "Add deploy key" section of your repository settings in GitHub and add the public key created with the `ssh-keygen` command.

Now go to your CircleCI project and add **the private key** under "Additional SSH keys". Do _not_ click "Add Deploy Key" because that auto-generated deploy key is only meant for read access, and we need write as well. For the hostname, enter `github.com`.

After creating the key, it will show up as a fingerprint.

In your config.yml for CircleCI, add the fingerprint using the add_ssh_keys key, wherever it's appropriate for your use case. Here's an example:

```
version: 2
jobs:
  deploy-job:
    steps:
      - add_ssh_keys:
          fingerprints:
            - "SO:ME:FIN:G:ER:PR:IN:T"
```

The official documentation states that the `checkout` job automatically adds the fingerprints of GitHub itself, but this wasn't the case for me, so I had to include this step in my build as well:

```
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

ssh-keygen -m PEM -t rsa -f circleci
