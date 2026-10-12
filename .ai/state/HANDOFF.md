# Handoff

## Public launch verified - 2026-10-11

The hub is deployed from main at https://inthefog.cloud/.
Launch commit: 64d31c9612567144b087c556dd05fbda8a593a42.
Actions run 38193373331 and Pages deployment 7004847209 succeeded on trusted HCS
Linux runners. Required PR review/checks passed before the main merge.

Live HTTPS home, projects, about, /docs/, Azure Local, Hyper-V, Azure Arc and hybrid
operations routes return 200. JS, CSS and the logo return 200. Unknown routes show
the portal's useful 404. Both HTTP apex and www, and HTTPS www redirect to HTTPS
inthefog.cloud. The certificate covers both hosts; HTTPS enforcement is enabled.

Cloud and actual Actions validation passed: TypeScript, production build,
source/build/privacy/catalog tests, Chromium keyboard/light-dark/filter/mobile
checks, and dependency audit with zero high/critical findings. There are 31
reported moderate upstream advisories. The documented local braces patch includes
a passing recursion regression. All 24 unique public catalog links were verified.

HCS MCP now discovers and bootstraps this repository with hcs scope, web profile,
main branch and the approved Docusaurus exception. App authentication resolves
from the repository registry entry. Local canonical scaffold/secret-pattern checks
passed. The hosted MCP cannot inspect Windows workspace paths; remote drift PASS
is not claimed.

Issues are disabled and main is protected. Only trusted branches use the HCS
runner and Pages credentials. Fork contributions must be reviewed and promoted to
a trusted branch first. Private planning remains outside this repository; builds
consume approved public documentation and the curated catalog only.

The first successful deployment is the rollback baseline. Keep the last successful
commit/run available and recover through reviewed revert PRs and the trusted workflow.
No Node build ran on the Windows VM.

Files: Docusaurus config, React home/projects/about, shared catalog, starter docs,
Pages workflow, source/browser tests, dependency patch, intent/scaffold and state.
Commands: cloud npm ci/build/typecheck/test/test:browser/audit; local canonical
scaffold and secret checks; git diff --check; live HTTPS route/asset/redirect checks.

Next: maintain the public catalog through deliberate publication review and the
existing contribution workflow. Repository moves require a separate migration plan.
