# Auric Artisan Terminal 0.1.0 — Full build-along guide

This guide follows the complete walkthrough slowly enough to reproduce it in a
new project. Every pictured product surface comes from the real extension UI.

## 1. Open a clean project

Open a trusted folder in VS Code and focus Auric Terminal with
`Ctrl+Alt+T` (`Cmd+Option+T` on macOS). Read the panel from top to bottom:
workspace identity, session tabs, transcript, composer, and status bar. The
left rail opens every inspector without covering the command history.

## 2. Learn before running

Type `git -m` without pressing Enter. Auric recognizes incomplete Git grammar,
explains that `-m` belongs to `git commit`, and offers an editable correction.
Suggestions use the current repository, package, files, branches, history, and
installed tools. Select a suggestion or keep typing your own command.

## 3. Run a real project check

Type `npm run check` and run it in Auric. The block retains the command,
directory, shell, time, duration, ANSI output, and exit status. Pin important
results, collapse noise, rerun a check, copy it as Markdown, or export it.
Use the native terminal handoff when a program needs a full TTY.

## 4. Navigate without a mouse

Press `Ctrl/Cmd+K`. Search the Terminal palette for scripts, Git actions,
sessions, saved commands, tool installs, and views. Press `Ctrl/Cmd+F` to find
text in output. Use `Alt/Option+Up/Down` in the composer to recall history.

## 5. Work with packages and Git

Open **Packages** to run scripts from the closest `package.json`. In a
monorepo, Auric discovers workspace packages and prepares the correct command
for npm, pnpm, Yarn, or Bun.

Open **Git** to inspect branch divergence and changed files before acting.
Staging, commits, branch changes, pull, push, and stash actions remain visible
and reviewable.

## 6. Make work repeatable

Create `.auric/runbooks.json` and add a named sequence:

```json
{
  "runbooks": [{
    "name": "Release confidence",
    "steps": ["npm run validate", "npm test", "git status --short"]
  }]
}
```

Runbooks stop at the first failed step unless that step opts into
`continueOnError`. Saved workflows never bypass command-risk review.

## 7. Control session environment

Open **Environment** to add values that should survive fresh shell processes,
or load `.env`, `.env.local`, or `.env.development`. Secret-looking names are
masked. Values apply to the current Auric session and are not written back.

## 8. Inspect the toolchain

Open **Toolchain** to see detected developer tools, versions, and resolved
paths. A missing tool may offer an install recipe for a package manager already
present on the machine. Auric fills and explains the command; you decide
whether to run it.

## 9. Review danger, then cancel

Type `git reset --hard` but do not run it. Read the destructive classification
and inspect `git status` or `git diff` first. Commands that delete data, rewrite
history, force-push, publish, elevate privileges, alter the registry, or pipe a
download into a shell require additional confirmation.

## 10. Customize and continue

Open **Customize** and tune density, font size, prompt style, ANSI palette,
accent, backdrop, and motion. Create another session for an independent working
directory and scrollback. Keep servers in background blocks while you continue
using the composer.

## Safe limits

Auric is a scrollback-oriented command workspace, not a full-screen terminal
emulator. Use the native terminal for Vim, `top`, TUI installers, and shell
sessions. Review every generated command. Keep dangerous-command confirmation
enabled and outside-workspace navigation disabled unless you understand the
change.
