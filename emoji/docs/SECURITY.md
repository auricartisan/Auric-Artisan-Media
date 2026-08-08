# Security and privacy

Auric Artisan Emoji is local-only and does not execute workspace code, make network requests, load remote images, collect telemetry, or use an account.

## Data retained

The extension stores only:

- favorite emoji IDs;
- recent emoji IDs, local use counts, and timestamps;
- the last used emoji ID;
- VS Code settings selected by the user.

Document text, search queries, clipboard contents, filenames, and workspace paths are not persisted. Use **Clear Emoji History** to remove recents and the last-used value. Favorites are separate so history clearing does not destroy intentional saved choices.

## Webview boundary

The sidebar and Studio panel use a restrictive content security policy with `default-src 'none'`. Scripts and styles are local extension resources. Dynamic catalog values are inserted with DOM APIs and `textContent`; no HTML from emoji names or workspace content is evaluated.

Webview messages are bounded action objects containing a known message type, emoji ID, and optional skin-tone ID. The extension validates IDs against its generated catalog before insertion, copying, or state updates.

## Editor operations

Emoji insertion uses the VS Code text editor edit API and creates a normal undo step. Shortcode replacement recognizes only bounded `:[a-z0-9_+-]:`-style tokens present in the local catalog. Unknown text is preserved.

Report vulnerabilities privately through the repository owner's established security contact. Do not attach secrets or private workspace content to a public issue.
