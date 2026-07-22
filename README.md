# Auric Artisan — Marketplace media

Public host for the README images used by the **Auric Icons** VS Code extensions
(Playful, Drawn, Modern). The extension source lives in a private repository; only
these marketing images are public so the Marketplace and the in-editor extension
page can load them.

```
playful/media/marketplace/{hero,co-install,explorer-workflow}.png
drawn/media/marketplace/{hero,co-install,explorer-workflow}.png
modern/media/marketplace/{hero,co-install,explorer-workflow}.png
```

Each extension's `package.json` sets `vsce.baseImagesUrl` to the matching folder,
e.g. `https://raw.githubusercontent.com/auricartisan/auric-artisan-media/main/playful`.
Regenerate the source art with `scripts/generate-marketplace-assets.mjs`, then copy
the updated PNGs here and push before republishing.

Licensed under MIT.
