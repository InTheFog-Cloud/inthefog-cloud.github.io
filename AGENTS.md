# inthefog-cloud.github.io — Agent instructions

<!--
  AGENTS.md is the canonical, cross-tool instruction file for this repo.
  Codex CLI, Cursor, and VS Code Copilot read it natively; Claude Code
  imports it via CLAUDE.md; Gemini reads it via contextFileName.
  Keep it THIN — it is a bootstrap and an offline fallback, not a full
  standards library. The authoritative source is the HCS Governance MCP.
-->

## What this repo is

Public InTheFog hybrid cloud hub. Docusaurus, React, and TypeScript; curated public project catalog and introductory documentation. Private operations and planning live separately.

<!-- One paragraph. What the repo is, why it exists, and what it is not. -->

---

## Start here — connect to the HCS Governance MCP

This repo is governed by the **HCS Governance MCP server** (connection details in
[`.ai/mcp/mcp-servers.md`](.ai/mcp/mcp-servers.md)). It is the source of truth for
standards, hard rules, and orchestration guidance.

**At session start, call:**

```
bootstrap(repo="inthefog-cloud.github.io", client="<your client: claude-code | codex | gemini | cursor | vscode>")
```

It returns this repo's scope, the applicable hard rules, the index of applicable
standards, the `.ai/` session protocol, and orchestration guidance shaped for your
client's capability tier. **Prefer a live MCP answer over anything written in this file** —
this file is the offline fallback.

---

## Offline fallback (when the MCP server is unreachable)

**Standards scope:** `hcs` <!-- hcs | tierpoint-prodtech | azurelocal -->

**Hard rules digest:**

- No secrets, tokens, passwords, subscription/tenant/client IDs, or connection strings in any committed file.
- All scripts: PowerShell 7+ — `#Requires -Version 7.0`, `Set-StrictMode -Version Latest`, `$ErrorActionPreference = 'Stop'`. Never PS 5.1, never Bash.
- All documentation is Markdown only. Diagrams are draw.io only — commit the `.drawio` XML alongside any exported `.png`.
- Commit format: `type(scope): short description` — types `feat`, `fix`, `docs`, `chore`, `refactor`, `test` — with an `AB#<id>` work-item reference.

**Standards reference (public site — no auth required):**

- Governance — <https://platform.hybridsolutions.cloud/standards/governance/>
- Scripting — <https://platform.hybridsolutions.cloud/standards/scripting/>
- Automation — <https://platform.hybridsolutions.cloud/standards/automation/>
- Documentation — <https://platform.hybridsolutions.cloud/standards/documentation/>
- Agents (multi-model) — <https://platform.hybridsolutions.cloud/standards/agents/>
- AI workspace — <https://platform.hybridsolutions.cloud/standards/ai-workspace/>
- Full index — <https://platform.hybridsolutions.cloud/standards/>

---

## Session protocol

1. **Read `.ai/state/` first** — `CURRENT_TASK.md`, then `HANDOFF.md`, then `OPEN_QUESTIONS.md`.
2. Then read `.ai/memory/` for durable context (`PROJECT_CONTEXT.md`, `DECISIONS.md`, `COMMANDS.md`, `GOTCHAS.md`).
3. Summarise your believed state back to the operator before making changes.
4. **Before ending the session, update `.ai/state/HANDOFF.md`** — what changed, files touched, commands run and results, branch, blockers, next steps.

Full contract: the [AI workspace standard](https://platform.hybridsolutions.cloud/standards/ai-workspace/).

---

## Key facts

| Fact | Value |
|---|---|
| ADO org | Consult HCS Governance MCP for private work-tracking configuration |
| ADO project | Consult HCS Governance MCP |
| Area path | Consult HCS Governance MCP |
| Key Vault | Use the HCS credential broker and authoritative registry |
| Work item format | `AB#<id>` in commits and PRs |
