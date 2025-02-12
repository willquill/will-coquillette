# willcoquillette.com

My personal website.

## 🚀 Project Overview

[willcoquillette.com](https://willcoquillette.com) is a blazing fast personal website built with Astro.js and styled with Tailwind CSS.

Web development is not my primary strength. So I sincerely thank David Cojocaru, a 16yo coder from Romania for the [theme](https://github.com/cojocaru-david/cojocarudavid.me). I just copied his Astro site and personalized it for myself.

### Planned changes

- Do not require "hero" image on blog posts
- Rename `About` layout to `Markdown` and make the title be a variable properly
- Fix all the errors in the code
- Resolve vulnerabilities

## 🌟 Features

- 🚀 **Fast and optimized** - Built for speed and performance.
- 🎨 **Beautiful and customizable UI** - Tailwind CSS for easy customization.
- 🔒 **Secure and reliable** - Follows best security practices.
- 🔄 **Continuous integration and deployment** - Automated workflows with GitHub Actions.

## 🛠️ Technologies Used

- **Astro.js** - Static site generator.
- **Tailwind CSS** - Utility-first CSS framework.
- **TypeScript** - Typed JavaScript at Any Scale.
- **JavaScript** - High-level, often just-in-time compiled, and multi-paradigm.
- **CSS** - Cascading Style Sheets.

## 📚 Documentation

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Development Tips

- When I need an icon, I search it [here](https://raw.githubusercontent.com/iconify/icon-sets/refs/heads/master/json/mdi.json).

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/willquill/will-coquillette.git
   ```

2. **Install dependencies:**

   ```sh
   cd will-coquillette
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

### Usage

- **Build for production:**

  ```sh
  npm run build
  ```

- **Deploy:** (does this do anything...really?)

  ```sh
  npm run deploy
  ```

### Publishing to Cloudflare Pages from GitHub

Good info [here](https://developers.cloudflare.com/pages/get-started/git-integration/)

#### Initial setup

1. Install Cloudflare Workers and Pages application in your GitHub.
2. Give it access to your repository.
3. Login to Cloudflare and go to Compute > Workers & Pages > Create > Pages > Connect to git
4. Select your repository, branch, select Astro as preset, leave defaults.
5. Save & Deploy.
6. In Cloudflare, go to Custom domains tab for your new site. Click "Set up a custom domain."
7. Add the DNS records it tells you to add. Continue verifying, and you should be good!

Regarding DNS, I use [DNSControl](https://dnscontrol.org/) to manage my DNS with IaC, and my `dnsconfig.js` looks like this:

```js
D("willcoquillette.com", REG_NONE,
    DnsProvider(DSP_CLOUDFLARE),
    DefaultTTL(1),
    // Cloudflare pages
    CNAME("www", "will-coquillette.pages.dev.", CF_PROXY_ON),
    ALIAS("@", "will-coquillette.pages.dev.", CF_PROXY_ON),
```

#### Updating the Cloudflare pages site

Uhh I think you can go ahead and test locally with `npm run dev` and then just commit and push your changes to the branch you specified when setting up Cloudflare pages (I use `main`), and Cloudflare will automatically deploy your changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Contact

Feel free to reach out to me at [nonsense@willquill.addy.io](mailto:nonsense@willquill.addy.io).

## 🚀 Connect with Me

- FIXME: Add socials

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 🙏 Acknowledgments

- [Astro.js](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Actions](https://github.com/features/actions)
- Again, [David](https://github.com/cojocaru-david/cojocarudavid.me)
