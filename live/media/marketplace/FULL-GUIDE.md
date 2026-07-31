# Auric Artisan Live 0.1.0 — Complete guide

This guide follows the publication walkthrough using the real control panel,
preview bundle, and a disposable responsive website.

## 1. Start with a folder

Open the website folder and press `Ctrl+Alt+L` (`Cmd+Alt+L` on macOS). Auric
serves static files on a free local port, injects its same-origin reload client,
and exposes the URL through the status bar and Servers view.

## 2. Open the dashboard inside the real page

Press `Alt+Shift+D` in the served website. Auric opens a full-screen Shadow DOM
dashboard with six focused tabs—Overview, Network, Server, Storage,
Environment, and Requests—instead of mounting one long wall of numbers:

- failures, disconnects, reload pauses, runtime errors, resource failures, and
  CSP violations first;
- rolling FPS, paints, interaction latency, layout shift, long tasks, and DOM
  size next;
- resource transfer, decoded size, delivery source, cache estimates, and
  server-confirmed cache validation after that;
- server routing, requests, storage totals, environment context, and sanitized
  request history below.

The browser APIs are feature-detected. Unsupported measurements say
“Unavailable”; a zero transfer size is only “likely cached,” while a server
cached flag or `304` is confirmed.

Only the selected panel is rendered. FPS sampling runs only while the dashboard
is open and visible, heavier page measurements wait for browser idle time,
pointer updates are frame-coalesced, and **Pause metrics** stops local sampling
immediately. Storage values are never read; the Storage tab uses browser totals
and key counts with bounded API waits.

## 3. Choose the cursor behavior

The Auric cursor replaces website cursors only after its same-origin stylesheet
loads. It adapts to links, buttons, and text fields without capturing events.
Choose **Use site cursor** in the dashboard to disable it immediately. Touch,
coarse-pointer, forced-colour, and print environments keep the native cursor.

## 4. Edit without losing page state

Save HTML and the connected page reloads once. Stylesheets and images hot-swap
in place, preserving scroll position, open dialogs, and form input. Save-only
mode is the default, so generated files, sync activity, formatters, cache writes,
and ordinary socket reconnects cannot repeatedly refresh the page. Select
filesystem-change mode only when an external compiler must drive updates; a
runaway-reload brake still pauses noisy paths and reports the file responsible.

## 5. Choose what runs

Open **Select Run Target**. Choose the built-in static server, a detected Vite,
Next, PHP, Python, Ruby, Go, Java, .NET, Rust, Elixir, or site-generator target,
or save a custom command. Auric supervises the process, reads the port it
actually selected, restarts crashes within a bounded budget, and reconnects the
proxy when it recovers.

## 6. Test every viewport

Open **Preview Beside**. Select responsive, phone, tablet, or desktop sizing,
rotate the device, reload the frame, or hand the URL to a full browser. Phone QR
codes and LAN addresses are generated locally.

## 7. Add a backend surface

Create `auric.live.json` to keep project behavior with the repository:

```jsonc
{
  "proxy": [{ "path": "/api/health", "target": "http://localhost:3000" }],
  "mock": {
    "enabled": true,
    "routes": [{ "method": "POST", "path": "/api/session", "status": 201,
      "delayMs": 400, "body": { "token": "{{uuid}}" } }],
    "rest": { "enabled": true, "base": "/api", "database": "db.json" }
  }
}
```

Mocks are matched before proxies. The REST database supports list, read, create,
replace, merge, delete, filtering, search, sorting, pagination, and relationships.

## 8. Inspect and reproduce requests

The control panel records the method, path, status, handler, size, and duration.
Filter by text or status, replay a request, copy it as `curl` or `fetch`, or
export a redacted HAR file. Authorization and cookie headers are masked before
storage and again before export.

## 9. Control what can be live

Create `.auricignore-live` beside the served root:

```gitignore
private/**
generated/**
!generated/preview/**
```

Matching paths are not served, listed, watched, reloaded, hot-swapped, or
recorded. The file reloads on save. `.auric-live/**` and the ignore file itself
remain protected even when ordinary dotfiles are allowed.

## 10. Read the local session record

When records are enabled, `.auric-live/latest.json` and uniquely named files
under `.auric-live/sessions/` keep bounded server totals, sanitized request
summaries, reload events, and aggregate browser performance/storage totals.
Writes are debounced, atomic, capped, and rotated.

The record never includes bodies, headers, queries, cookies, storage values,
IP addresses, or user agents. **Open Recorded Live Session** opens the latest
snapshot, and `auricLive.records.enabled` can disable recording completely.

## 11. Test difficult conditions

Apply Slow 3G, Fast 3G, custom latency/bandwidth, or offline shaping at the
server. It affects every client—including a physical phone—unlike browser-only
devtools throttling. Enable HTTPS, SPA fallback, clean URLs, custom headers,
authentication, PHP/CGI, or a mount path when the project needs them.

## Safety boundary

Static serving and inspection can remain available with limited trust. Commands
named by the workspace, PHP, and CGI execution require a trusted workspace.
Dotfiles are hidden by default. Bind to `127.0.0.1` when the site should not be
reachable from the LAN. Internal diagnostics require authentication when basic
auth is enabled, dashboard traffic is excluded from request totals, and runtime
record paths are never served.
