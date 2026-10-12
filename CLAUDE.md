# inthefog-cloud.github.io — Claude Code

@AGENTS.md

<!--
  This file is a thin shim. All cross-tool repo instructions live in AGENTS.md,
  imported above via Claude Code's @path syntax (inlined at session launch).
  Keep only genuinely Claude-Code-specific notes below.
-->

## Claude Code notes

- Subagents, skills, and hooks for this repo live in `.claude/`. The repo-level MCP config is `.mcp.json`.
- Use **plan mode** before broad, repo-wide changes.
- Follow the `.ai/` session protocol: read `.ai/state/*` at session start, and update `.ai/state/HANDOFF.md` before ending a session.
- See the [agents standard](https://platform.hybridsolutions.cloud/standards/agents/) for the full multi-model model.
