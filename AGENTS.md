# Repository Guidelines

## Project Structure & Module Organization

This repository is a single-page static website. The root `index.html` contains the page markup, inline Tailwind configuration, custom CSS, and small JavaScript interactions. External visual assets are referenced by URL inside CSS background declarations. There are currently no separate `src/`, `tests/`, or `assets/` directories; add them only when the project grows enough to justify the split.

## Build, Test, and Development Commands

- `open index.html`: open the site directly in the default browser on macOS.
- `python3 -m http.server 8000`: serve the repository locally at `http://localhost:8000` for browser testing.
- `npx prettier --write index.html AGENTS.md`: format HTML and Markdown if Node tooling is available.

There is no build step at present. Tailwind CSS and Lucide icons are loaded from CDNs in `index.html`, so changes are visible after refreshing the browser.

## Coding Style & Naming Conventions

Use two-space indentation for HTML, CSS, and JavaScript. Keep section IDs descriptive and lowercase, such as `#about`, `#products`, and `#contact`, because navigation links depend on them. Prefer semantic HTML elements (`header`, `main`, `section`, `nav`, `footer`) and keep Chinese user-facing copy consistent with the existing professional corporate tone. For Tailwind classes, group layout, spacing, color, and state classes in a readable order.

## Testing Guidelines

There is no automated test suite. Before submitting changes, manually verify the page in a browser using the local server command above. Check desktop and mobile widths, header scroll behavior, mobile menu toggling, anchor navigation, external image loading, icon rendering, and phone/contact links. If JavaScript grows beyond simple interactions, add lightweight browser-based tests before introducing complex behavior.

## Commit & Pull Request Guidelines

This directory does not currently include Git history, so no repository-specific commit convention can be inferred. Use short, imperative commit messages, for example `Update homepage contact section` or `Fix mobile navigation spacing`. Pull requests should include a concise summary, screenshots for visual changes, tested browser sizes, and any changed external asset URLs or CDN dependencies.

## Security & Configuration Tips

Do not commit secrets, analytics keys, or private credentials into `index.html`. Prefer HTTPS URLs for external assets and CDNs. When changing CDN libraries, verify the page still works without a bundler and document the reason for the version or source change in the pull request.
