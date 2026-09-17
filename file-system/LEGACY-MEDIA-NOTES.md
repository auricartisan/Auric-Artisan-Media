# Historical media notes

Preserved verbatim from the previous kit README. These notes describe the previous interface and may reference assets not present in the current checkout. Use README.md for the verified v0.2.0 media inventory.

# Auric Artisan File System — from zero to an advanced workspace

[![Watch the complete Auric Artisan File System masterclass recorded in real VS Code](media/marketplace/video-poster.png)](media/marketplace/full-walkthrough.mp4)

The masterclass runs for about eight minutes. It starts inside a disposable VS
Code workspace, clears its demonstration entries through recoverable Workspace
Trash, and builds an advanced project from a visibly empty Explorer. It then
uses Auric Artisan File System to scaffold, transform, relate, organize, find,
clean, undo, redo, and restore real files.

The recording comes from the running extension in a real VS Code Extension
Development Host. The controls, project tree, typed inputs, previews, generated
files, metadata, duplicate review, Trash, and operation history are real-use
captures. No screenshot, poster, or video frame is AI-generated.

## Watch, read, or build along

| Resource | What it provides |
| --- | --- |
| [Full walkthrough MP4](media/marketplace/full-walkthrough.mp4) | The complete human-paced, from-zero workflow with visible guidance, music, soft captions, and embedded chapters |
| [`FULL-GUIDE.md`](media/marketplace/FULL-GUIDE.md) | Detailed setup, every workflow, safety boundaries, command names, expected results, and practice instructions |
| [`TRANSCRIPT.md`](media/marketplace/TRANSCRIPT.md) | Action-by-action timeline matching the real recording |
| [SRT captions](media/marketplace/full-walkthrough.srt) | Downloadable English instruction captions |
| [WebVTT captions](media/marketplace/full-walkthrough.vtt) | Browser-friendly English instruction captions |
| [`chapters.ffmeta`](media/marketplace/chapters.ffmeta) | Chapter names and timing metadata embedded in the MP4 |
| [`MUSIC.md`](media/marketplace/MUSIC.md) | Soundtrack provenance, deterministic synthesis method, seed, mix target, and reuse information |
| [Video poster](media/marketplace/video-poster.png) | Full-resolution cover composed from the real empty and final workspace captures, the extension icon, and typography |
| [Contact sheet](media/marketplace/contact-sheet.png) | A single visual overview of the complete guide |
| [Chronological screenshot gallery](media/marketplace/screenshots/) | Full-size real captures for each important stage |
| [`ASSET-MANIFEST.json`](media/marketplace/ASSET-MANIFEST.json) | File sizes, hashes, dimensions, duration, and media provenance |

## A safe from-zero demonstration

No repository, extension source, existing project, or user file is deleted for
this guide.

The capture automation creates a uniquely identified disposable workspace under
the operating system's temporary directory. The few starter entries shown in
the opening chapter exist only inside that workspace. Auric moves them to its
recoverable Workspace Trash before the project is built, and cleanup is allowed
only after the temporary-path and session-marker checks pass.

The final project, every intermediate file, and the deliberate duplicate used
for the recovery lesson are created during the recording. See the
[full safety explanation](media/marketplace/FULL-GUIDE.md#safety-boundary-what-delete-everything-means-here)
before reproducing the opening chapter.

## Original soundtrack and accessibility

The quiet ambient soundtrack is original deterministic procedural music made
for this walkthrough. FFmpeg synthesizes it from mathematical oscillators and
seeded pink noise. It contains no external music, stock audio, samples, loops,
or AI-generated audio.

The guide also includes:

- concise burned-in instructions for sound-off viewing;
- a selectable English subtitle track;
- standalone SRT and WebVTT captions;
- embedded chapter markers;
- a detailed text transcript and full build-along guide;
- descriptive alternative text for every image below.

## Real-use gallery, in order

Each image is a full-size capture from the same real VS Code Extension
Development Host workflow. Select an image to inspect the interface at its
original resolution.

### 01. Clean slate after a recoverable Trash move

The recording first moves four empty demonstration entries—created only inside
the temporary session—to recoverable Workspace Trash. This frame shows the
visibly empty Explorer after that cleanup and before project creation begins.

[![Real VS Code workspace after Auric moved four disposable starter entries to Workspace Trash and before project creation](media/marketplace/screenshots/01-empty-workspace.png)](media/marketplace/screenshots/01-empty-workspace.png)

### 02. One complete command centre

The searchable Auric menu groups creation, transformation, organization,
navigation, cleanup, history, and recovery without replacing the native
Explorer.

[![Auric Artisan File System command centre in the native VS Code interface](media/marketplace/screenshots/02-command-center.png)](media/marketplace/screenshots/02-command-center.png)

### 03. Type a complete project structure

Nested paths and brace expansion describe folders, source areas, documentation,
tests, and demonstration files in one human-readable input.

[![Batch Create Files and Folders input with nested paths and brace expansion](media/marketplace/screenshots/03-batch-create-input.png)](media/marketplace/screenshots/03-batch-create-input.png)

### 04. Review before creating anything

The checklist exposes every planned path. Individual rows can be unchecked
before the operation receives final approval.

[![Auric batch creation preview listing every planned project path](media/marketplace/screenshots/04-batch-create-preview.png)](media/marketplace/screenshots/04-batch-create-preview.png)

### 05. The project exists in the native Explorer

After approval, the real Explorer refreshes with the complete structure. No
mock file tree or pre-rendered result is substituted.

[![Newly created project structure shown in the real VS Code Explorer](media/marketplace/screenshots/05-project-created.png)](media/marketplace/screenshots/05-project-created.png)

### 06. Framework-aware scaffolding

The preset picker exposes the built-in framework ecosystems and guided
generators used to create a component family with source, styles, test, and
story.

[![Auric Artisan framework preset picker used during real project scaffolding](media/marketplace/screenshots/06-framework-preset.png)](media/marketplace/screenshots/06-framework-preset.png)

### 07. Guarded multi-file rename

Every component-family filename appears beside its proposed replacement.
Conflicts, invalid targets, and protected paths would be reported in this same
preview before Apply is available.

[![Batch rename before-and-after preview for a generated component family](media/marketplace/screenshots/07-batch-rename-preview.png)](media/marketplace/screenshots/07-batch-rename-preview.png)

### 08. Navigate and generate related files

Relationship rules connect the component, test, stylesheet, story, types,
documentation, and barrel files. Existing and missing companions are clearly
distinguished.

[![Related-file picker connecting a component to its real companion files](media/marketplace/screenshots/08-related-files.png)](media/marketplace/screenshots/08-related-files.png)

### 09. Organize without changing physical paths

Tags, favorites, pins, collections, and virtual folders add workflow meaning
while the real files remain at stable locations.

[![Auric tags and collections organizing files without moving them](media/marketplace/screenshots/09-tags-and-collections.png)](media/marketplace/screenshots/09-tags-and-collections.png)

### 10. Combine filters and save the working view

The filter workflow combines query mode, kind, tag, extension, path, size,
date, flags, and Git state; workspace profiles preserve the resulting context.

[![Advanced Auric filter and workspace profile workflow in VS Code](media/marketplace/screenshots/10-filter-and-profile.png)](media/marketplace/screenshots/10-filter-and-profile.png)

### 11. Review content-based duplicates

Same-size candidates are hashed, originals are retained, and reclaimable copies
are selected for review before any cleanup operation runs.

[![Content-based duplicate review with original and disposable copy identified](media/marketplace/screenshots/11-duplicate-review.png)](media/marketplace/screenshots/11-duplicate-review.png)

### 12. Inspect recoverable Workspace Trash

Trash entries preserve the original path, size, and deletion time. Permanent
emptying is a separate, explicit action.

[![Auric Workspace Trash showing a recoverable file and its original location](media/marketplace/screenshots/12-workspace-trash.png)](media/marketplace/screenshots/12-workspace-trash.png)

### 13. Restore, undo, redo, and inspect history

The operation timeline keeps the exact plans visible, while Undo, Redo, and
manual Trash restoration demonstrate multiple recovery routes.

[![Auric operation history and recovery controls after restoring a file](media/marketplace/screenshots/13-restore-and-history.png)](media/marketplace/screenshots/13-restore-and-history.png)

### 14. The advanced, recoverable final workspace

The closing frame shows the project created entirely during the guide, ready for
Quick Open, related-file navigation, saved views, and future guarded changes.

[![Completed project built from zero with Auric Artisan File System](media/marketplace/screenshots/14-final-workspace.png)](media/marketplace/screenshots/14-final-workspace.png)

## Asset integrity and provenance

Use [`ASSET-MANIFEST.json`](media/marketplace/ASSET-MANIFEST.json) to verify the
published masterclass set. It records technical metadata and SHA-256 hashes for
the video, captions, guides, poster, contact sheet, and chronological
screenshots. The legacy GIF and its source captures remain a separately
validated fallback.

The compact [real workflow GIF](media/real-workflow.gif), its
[full-size source captures](media/marketplace/gif-source/), and the
[Marketplace icon](media/icon.png) remain available for surfaces where the
long-form guide is not appropriate.

All application UI shown in this kit comes from real-use VS Code Extension
Development Host captures. The poster and contact sheet are deterministic
layouts assembled from those captures, the extension icon, and typography. No
image, poster, or video frame is AI-generated.
