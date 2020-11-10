# How to use this repo for your own DnD campaign

Built using the amazing [MkDocs](https://www.mkdocs.org)

## Recommended tools

- [VSCode](https://code.visualstudio.com/Download) for editing files
- Bash shell ([WSL2 if Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10))

## Clone the repo

```git clone https://github.com/willquill/dnd-icespire.git```

## Modify files

Modify mkdocs.yml to reflect your own site_name, pages, and theme.

## Build

```mkdocs build```

## Test

```mkdocs serve```

Visit http://127.0.0.1:8000 in your browser to see it in action.

Wanna know what's _really_ cool? You can edit your files on the fly and see the effect while ```mkdocs serve``` is active.

## Deploy

### Put your Github private SSH key into ~/.ssh

For example, I'm using id_rsa_willquill

```chmod 600 ~/.ssh/id_rsa_willquill```

### Create ~/.ssh/config file and put in these contents but customized for you

```vi ~/.ssh/config```

Add this to the file:

```shell
Host github-as-willquill
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_willquill
IdentitiesOnly yes
```

### Create your own repo on Github

Go to github and create a public repository.

### Add new public repo

Add the remote repo using the Host name from the config file above and use youruser/yourrepo.git

```git remote add origin git@github-as-willquill:willquill/dnd-icespire.git```

### If you've enabled e-mail privacy in Github

1. Go to the Github Emails page [here](https://github.com/settings/emails)

2. Copy the Github-provided email on that page and paste the following into your terminal:

```git config user.email theid+youruser@users.noreply.github.com```

More info [here](https://stackoverflow.com/questions/43378060/meaning-of-the-github-message-push-declined-due-to-email-privacy-restrictions)

### Add a CNAME if you want a custom domain

```echo 'icespire.rakara.net' >> docs/CNAME```

More info on custom domain [here](https://medium.com/@hossainkhan/using-custom-domain-for-github-pages-86b303d3918a)

### Push to your master branch for good measure

```git add -A
git commit -m "initial commit"
git push -u origin master
```

### Deploy

```mkdocs gh-deploy```

## Notes about updating site after initial deployment

Never modify files directly within the ```site``` directory.

To make changes to your website after the initial deploy:

- Modify your yml and md files as needed.

- ```mkdocs gh-deploy```

Breakdown of what ```mkdocs gh-deploy``` does:

- Repopulates the ```site``` directory with a static site generated from your md and yml files.

- Pushes the contents of the ```site``` directory into the gh-pages branch on Github.