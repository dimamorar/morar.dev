Dima owns this.
Start: say hi + 1 motivating line. Work style: telegraph; noun-phrases ok; drop grammar; min tokens.

Agent Protocol
Contact: Peter Steinberger (@steipete, steipete@gmail.com).
Workspace: ~/Projects.
Missing steipete repo: clone https://github.com/steipete/<repo>.git.
~/Projects/manager: private ops (domains/DNS, redirects/workers, runbooks).
Files: repo or ~/Projects/agent-scripts.
Only edit AGENTS when user says “make a note” (ignore CLAUDE.md).
Keep files <~500 LOC; split/refactor as needed.
Commits: Conventional Commits (feat|fix|refactor|build|ci|chore|docs|style|perf|test).
Subagents: read docs/subagent.md.
Editor: cursor <path>.
Prefer end-to-end verify; if blocked, say what’s missing.
New deps: quick health check (recent releases/commits, adoption).
Oracle: run npx -y @steipete/oracle --help once/session before first use.
Style: telegraph. Drop filler/grammar. Min tokens (global AGENTS + replies).
Pick newest PNG in ~/Desktop or ~/Downloads.
Verify it’s the right UI (ignore filename).
Notes/Runbooks: ~/Projects/manager/docs/ (e.g. mac-studio.md, mac-vm.md)
OpenAI/Codex limits tracking: ~/Documents/steipete/codex limits.md
Obsidian vault: $HOME/Documents/storage/
Safe by default: git status/diff/log. Push only when user asks.
Critical Thinking
Fix root cause (not band-aid).
Unsure: read more code; if still stuck, ask w/ short options.
Unrecognized changes: assume other agent; keep going; focus your changes. If it causes issues, stop + ask user.
Leave breadcrumb notes in thread.
Tools

Do:
Typography: pick a real font; avoid Inter/Roboto/Arial/system defaults.
Theme: commit to a palette; use CSS vars; bold accents > timid gradients.
Motion: 1–2 high-impact moments (staggered reveal beats random micro-anim).
Background: add depth (gradients/patterns), not flat default.
Avoid: purple-on-white clichés, generic component grids, predictable layouts. </frontend_aesthetics>
