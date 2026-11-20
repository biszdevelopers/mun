# Next.js Starter

## !!!! IMPORTANT !!!! DO NOT UNDER ANY CIRCUMSTANCE PUBLIC THIS REPOSITORY. CONTAINS FACIAL COPYRIGHTED PHOTOS

### Edit Nov 9, 2026: Images are safely removed and now this repo can be public

A minimal Next.js App Router project using React and TypeScript.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create and run a production build:

```bash
npm run build
npm start
```

## GitHub Pages

The Pages workflow builds and deploys a static site on pushes to `main`, or when
run manually from the Actions tab. In the GitHub repository, select **Settings →
Pages → Build and deployment → Source → GitHub Actions** before the first run.

For a repository named `mun` owned by `relizc`, the URL is
<https://relizc.github.io/mun/>. This checkout currently points to
`biszdevelopers/mun`, whose default Pages URL is
<https://biszdevelopers.github.io/mun/>. The workflow reads the site's base path
from GitHub Pages, so assets and links also work under the repository subdirectory
or with a custom domain.

Pages serves static files, so event and theme data are captured during each build.
The build uses `EVENTS.yml` as its fallback. To fetch remote event data during the
build, set the repository Actions variable `YAML_SOURCE_EVENTS` to its URL.
Rerun the workflow to publish changes to that remote data. Normal development and
Node.js deployments keep their existing request-time event loading.

To check the Pages build locally in PowerShell:

```powershell
$env:GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/mun"
npm run build
```

The generated site is in `out/`; serve it with a static file server mounted at
`/mun/` (rather than `npm start`). Only routes implemented in `app/` are exported;
existing links to unfinished pages will still return 404.
