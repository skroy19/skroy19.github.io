# Sanjoy Kumar Roy — academic portfolio

A simple, responsive academic portfolio built with original HTML, CSS, and JavaScript for `skroy19.github.io`. There is no build step, runtime dependency, external font, or npm installation requirement.

## Content and source

Website content is based on the supplied `Sanjoy_Cv_V7.pdf`. The downloadable file at `assets/Sanjoy-Kumar-Roy-CV.pdf` is an unchanged copy of that original PDF; SHA-256 hashes were compared after copying.

The page includes About, Research Interests, Experience, Selected Projects, Publication, Education, Achievements & Leadership, and Contact. IssueLens is the featured project. Roles, dates, contributions, metrics, publication details, and contact/profile links come from the CV. The two invention proposals remain described as submitted for evaluation and potential patent filing, not as filed or granted patents.

The [reference website](https://sadat-shahriyar.github.io/) informed the profile sidebar, quick overview, biographical paragraphs, and academic section structure. Its personal facts and unsupported categories, including research assistantship, were not imported. There are no empty content sections. The profile photo remains an explicitly labeled placeholder.

## Preview

Double-click `index.html` to view it directly in a browser. For a local server, open PowerShell in this folder and run:

```powershell
node tools/serve.cjs
```

Open http://127.0.0.1:3000. Save edits and refresh the browser to see changes. Press Ctrl+C to stop the server.

## Checks

```powershell
node --check script.js
node tools/check.cjs
```

Or run `npm.cmd run check` on Windows. No npm install is needed. Checks cover the eight required sections, unique IDs, local assets and anchors, a real PDF download, absence of old pending text, and mobile/scroll navigation behavior using a DOM stub. These checks do not replace visual review or source verification.

## Updating the site

- Edit biographical and academic content directly in `index.html`.
- Add new facts only when supplied or verified. Omit unknown links and unsupported roles.
- Replace `assets/Sanjoy-Kumar-Roy-CV.pdf` when a new original CV is supplied.
- Replace the initials portrait with an image when a profile photo is supplied; update its accessible description at the same time.
- Layout and colors are in `styles.css`; navigation behavior is in `script.js`.

## Publish on GitHub Pages

Create an empty public repository named exactly `skroy19.github.io` under the `skroy19` account. If the repository already exists, reconcile its contents before pushing; do not force push.

For a new empty repository, run from this folder:

```powershell
git init -b main
git add index.html styles.css script.js assets .nojekyll .gitignore package.json tools README.md
git commit -m "Add academic portfolio"
git remote add origin https://github.com/skroy19/skroy19.github.io.git
git push -u origin main
```

In repository **Settings → Pages**, select **Deploy from a branch**, **main**, and **/(root)**, then save. The intended address is https://skroy19.github.io/. Publication can take up to 10 minutes. The root `index.html`, relative asset links, and `.nojekyll` are ready for this setup. No deployment has been performed.

Official instructions: [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Files

- `index.html`: factual content and metadata.
- `styles.css`: responsive layout, blue/teal colors, typography, focus and print styles.
- `script.js`: mobile menu, active-section navigation, current year.
- `assets/`: initials favicon and original downloadable CV.
- `tools/serve.cjs`: dependency-free local preview server.
- `tools/check.cjs`: structural and navigation checks.
- `.preview/`: ignored local QA files, source extraction, and screenshots; not published.

## Validation

After the CV content update, JavaScript syntax and structural/navigation checks passed. Headless Edge checks passed at 320, 390, 768, 1024, and 1440 CSS pixels with no horizontal overflow. Mobile menu opening, Escape dismissal and focus return, link dismissal, and active-section navigation passed. Browser runtime checks found no JavaScript exceptions. The homepage, styles, script, favicon, and CV returned HTTP 200; an unknown path returned HTTP 404. Desktop About, projects, education/leadership, and mobile IssueLens screenshots were visually reviewed.
