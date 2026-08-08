# Publishing

## Release checklist

1. Use Node.js 20 or newer and sign in to the intended `auric-artisan` Marketplace publisher.
2. Update `package.json` and `CHANGELOG.md` together.
3. Run `npm ci` from the committed lockfile.
4. Run `npm run vscode:prepublish`.
5. Run `npm run vsix` and inspect the printed VSIX file tree.
6. Install the VSIX in a clean VS Code profile.
7. Test the Activity Bar view, full panel, Quick Pick, search, every category, favorites, recents, tone selection, all copy formats, multi-cursor insertion, shortcode completion, shortcode replacement, and history clearing.
8. Check dark, light, high-contrast, narrow-sidebar, and reduced-motion environments.
9. Confirm the package excludes `node_modules`, tests, build scripts, the lockfile, and development settings.
10. Publish only after verifying the VSIX publisher, identifier, version, icon, preview, README, licence, and third-party notice.

Publishing credentials and Marketplace publisher ownership are external requirements and are never stored in this repository.
