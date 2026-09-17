# Auric Artisan — Marketplace media

Public media host for the Auric Artisan VS Code extensions. Extension source
lives in `Auric-Artisan-IDE-Plugins`; this repository provides stable HTTPS
assets for Visual Studio Marketplace and in-editor extension pages.

## Extension media kits

| Extension | Media kit | Primary media |
| --- | --- | --- |
| Auric Artisan Emoji | [`emoji/`](emoji/) | [Animated preview](emoji/media/marketplace/product-preview.gif) · [MP4 preview](emoji/media/marketplace/product-preview.mp4) |
| Auric Artisan Live | [`live/`](live/) | [Complete 4:20 real-use guide](live/media/marketplace/full-walkthrough.mp4) |
| Auric Artisan Terminal | [`terminal/`](terminal/) | [Complete 3:36 real-use guide](terminal/media/marketplace/full-walkthrough.mp4) |
| Auric Artisan File System | [`file-system/`](file-system/) | [v0.1.0 workspace gallery](file-system/README.md) |
| Auric Artisan Formatter | [`formatter/`](formatter/) | [Watch or download MP4](formatter/media/marketplace/full-walkthrough.mp4) |
| Auric Icons — Playful | [`playful/`](playful/) | Marketplace PNG set |
| Auric Icons — Drawn | [`drawn/`](drawn/) | Marketplace PNG set |
| Auric Icons — Modern | [`modern/`](modern/) | Marketplace PNG set |
| Auric Artisan Studio | [`studio/`](studio/) | Marketplace PNG sets |
| Auric Artisan Theme | [`theme/`](theme/) | Marketplace PNG set |

## File System v0.1.0

The [File System media kit](file-system/README.md) contains four versioned PNG captures of the actual extension webview renderer: workspace, Properties, action search and sidebar. They use illustrative sample data in a browser harness, not personal project data or a full VS Code application capture.

[Browse the current gallery](file-system/README.md) · [View media hashes and provenance](file-system/media/marketplace/v0.1.0/RELEASE-MEDIA.json)

Older File System videos and screenshots remain available and are clearly labelled as earlier-interface material. No new video, soundtrack or chapter metadata is claimed for this release.

## What the kits contain

Depending on the extension, a kit can include:

- a full H.264 walkthrough with visible guidance;
- SRT and WebVTT captions, embedded chapters, and a Markdown transcript;
- a detailed build-along guide and media manifest;
- a poster and full-resolution real-use chapter screenshots;
- a contact sheet for scanning the complete workflow;
- original music provenance;
- a compact animated GIF and its full-size source captures;
- extension icons and public copies of user-facing documentation.

The new File System screenshots render the real webview code with sample data. Legacy application recordings retain their original capture provenance. Refer to each kit's notes for the source of its imagery.

## VSCE integration

Each extension declares `vsce.baseImagesUrl` for its matching folder:

```text
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/file-system
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/formatter
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/emoji
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/live
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/terminal
```

This lets the extension READMEs use normal relative image and documentation
paths while VSCE publishes stable public HTTPS links. Video, guide, transcript,
caption, and gallery links point directly to this repository as well.

Licensed under MIT.
