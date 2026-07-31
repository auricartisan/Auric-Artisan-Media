# Auric Artisan — Marketplace media

Public media host for the Auric Artisan VS Code extensions. Extension source
lives in `Auric-Artisan-IDE-Plugins`; this repository provides stable HTTPS
assets for Visual Studio Marketplace and in-editor extension pages.

## Extension media kits

| Extension | Media kit | Full video |
| --- | --- | --- |
| Auric Artisan File System | [`file-system/`](file-system/) | [Watch or download MP4](file-system/media/marketplace/full-walkthrough.mp4) |
| Auric Artisan Formatter | [`formatter/`](formatter/) | [Watch or download MP4](formatter/media/marketplace/full-walkthrough.mp4) |
| Auric Icons — Playful | [`playful/`](playful/) | Marketplace PNG set |
| Auric Icons — Drawn | [`drawn/`](drawn/) | Marketplace PNG set |
| Auric Icons — Modern | [`modern/`](modern/) | Marketplace PNG set |
| Auric Artisan Studio | [`studio/`](studio/) | Marketplace PNG sets |
| Auric Artisan Theme | [`theme/`](theme/) | Marketplace PNG set |

The File System and Formatter kits contain:

- a full 1920-pixel-wide H.264 walkthrough with explanations burned in;
- standalone SRT captions and a Markdown chapter transcript;
- a video poster derived from a real extension screenshot;
- full-resolution screenshots for the major workflow chapters;
- the compact animated GIF and its original full-size source captures;
- extension icons used by the Marketplace package.
- public copies of user-facing documents linked from Marketplace README pages.

Every File System and Formatter screen was captured from a running VS Code
Extension Development Host. No screenshot, poster or video frame is
AI-generated.

## VSCE integration

Each extension declares `vsce.baseImagesUrl` for its matching folder:

```text
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/file-system
https://raw.githubusercontent.com/auricartisan/Auric-Artisan-Media/main/formatter
```

This lets the extension READMEs use normal relative image and documentation
paths while VSCE publishes stable public HTTPS links. Video, transcript and
caption links point directly to this repository as well.

Licensed under MIT.
