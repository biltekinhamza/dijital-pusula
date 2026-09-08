# Proje Bahçesi Corporate Website

A bilingual (Turkish and English), responsive corporate website for ProjeBahçesi. It is built with semantic HTML5, CSS3, and modern vanilla JavaScript, with no server-side or paid dependencies.

## Project Structure

```text
proje-bahcesi/
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   |-- main.js
|   `-- translations.js
|-- assets/
|   |-- images/
|   |   `-- dashboard.svg
|   |-- icons/
|   |   `-- ui-icons.svg
|   `-- logo/
|       `-- logo-mark.svg
|-- favicon.svg
|-- README.md
`-- 404.html
```

## Local Preview

The site has no build step. Open `index.html` directly or serve the folder locally:

```bash
npx serve .
```

The optional command above uses `serve` only for local preview; it is not a website dependency. A local server is recommended when checking browser behavior.

## Publish on GitHub Pages

1. Create a GitHub repository and add the contents of this `proje-bahcesi` folder at the repository root.
2. Commit and push the files to the default branch, usually `main`.
3. In the GitHub repository, open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait for GitHub Pages to provide the public URL.
7. The canonical and social metadata already use `https://biltekinhamza.github.io/proje-bahcesi/`. Update them if the repository name or domain changes.

All site file references are relative, so the project works on both user sites and repository subpaths.

## Contact Information

Before publishing, search the project for these placeholders and replace them:

- `info@projebahcesi.example`
- `+90 (___) ___ __ __`
- `Şirket adresi buraya eklenecek`
- `Company address will be added here`
- `#social-placeholder` for LinkedIn and GitHub links
- `https://biltekinhamza.github.io/proje-bahcesi/` if the repository name or public domain changes

The contact form creates a structured `mailto:` draft and stores no form data. To use Formspree later, create an account, add the endpoint to the form `action`, change the form method to `POST`, and update `js/main.js` to submit via `fetch`. Do not add an endpoint until it belongs to ProjeBahçesi and has been tested.

## Content Updates

- Edit bilingual page copy and generated cards in `js/translations.js`.
- Keep the same object keys in both `tr` and `en` sections.
- Replace sample project concepts under `projects.items`; retain the sample label unless the entries are verified completed work.
- Change colors, spacing, and breakpoints through variables and rules in `css/style.css`.
- Replace `assets/logo/logo-mark.svg` and `favicon.svg` together if the brand mark changes.
- Update the privacy, cookie, and terms text with legal guidance before production use.

## Features

- Turkish default and English language switching
- Language preference saved in `localStorage`
- Responsive sticky navigation and mobile menu
- Active section highlighting and smooth scrolling
- Accessible tabs, service modal, FAQ accordion, and forms
- Interactive automation workflow and project concepts
- Contact validation with a no-backend email fallback
- Reduced-motion support and visible focus states
- Privacy-friendly cookie notice without tracking
- Dynamic copyright year
- SEO, Open Graph, Twitter Card, and structured data metadata
- Custom bilingual 404 page

## Verification Checklist

- [ ] Replace canonical, Open Graph, and structured-data URLs.
- [ ] Replace all contact and social placeholders.
- [ ] Review both Turkish and English content with the language switcher.
- [ ] Test navigation, service details, workflow, project tabs, FAQ, and legal dialogs by keyboard.
- [ ] Submit the form with empty, invalid, and valid values.
- [ ] Confirm the configured email address opens in the visitor's email client.
- [ ] Test at 320 px, 768 px, 1024 px, and a wide desktop viewport.
- [ ] Test with `prefers-reduced-motion` enabled.
- [ ] Run a browser console check for JavaScript errors.
- [ ] Check all internal links after publishing to the final GitHub Pages URL.
- [ ] Validate the HTML and review Lighthouse accessibility, SEO, and performance results.
- [ ] Confirm the custom 404 page is served by GitHub Pages.

## Browser Support

The site targets current versions of Chrome, Edge, Firefox, and Safari. It uses progressive enhancement for `IntersectionObserver` and the native `dialog` element.
