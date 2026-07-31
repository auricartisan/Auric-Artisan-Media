# Walkthrough chapters

This transcript accompanies the real VS Code Extension Development Host recording.

- **00:00:00.000 - Auric Artisan Formatter - full walkthrough** - Recorded in a real VS Code Extension Development Host. Every screen is the running extension.
- **00:00:04.000 - Start with real source** - This JSON file is intentionally unformatted; the extension has not changed it.
- **00:00:11.000 - Preview before writing** - A native VS Code diff shows every proposed formatting change against the untouched file.
- **00:00:25.000 - Explain every decision** - Inspect the language tier, active configuration and safety checks behind the result.
- **00:00:38.000 - Interactive Playground** - Tune source and options side by side, switch between result, diff and explanation, then copy a minimal config.
- **00:00:54.000 - Presets and configuration** - Start from a named style, import Prettier settings or generate a project configuration.
- **00:01:10.000 - Scan the whole workspace safely** - Format every supported file in memory and review the list; the scan writes nothing.
- **00:01:28.000 - CLI and CI parity** - The same zero-dependency engine checks repositories from the terminal with conventional exit codes.
- **00:01:45.000 - Use the full power** - Preview, explain, tune, scan and enforce one deterministic formatting policy in VS Code and CI.
