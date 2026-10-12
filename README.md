# InTheFog

The public hub for hybrid cloud projects and documentation at
[inthefog.cloud](https://inthefog.cloud). Built with Docusaurus, React, and TypeScript.

## Development

Requires Node 22+ and PowerShell 7+ for automation.

```powershell
npm ci
npm run start
npm run build
npm run typecheck
npm test
npx playwright install --with-deps chromium
npm run test:browser
```

The curated catalog powers both the homepage and project directory. Publish only
approved public material. Internal planning and issues live in private operations;
Issues are deliberately disabled here. Existing project locations are preserved.

Trusted HCS runner builds publish to GitHub Pages. To roll back, revert the responsible
main-branch change through a PR and redeploy the last known-good source. See the Actions
deployment history for successful commits. No versioned software artifact is released,
so release-please is omitted.

Dependency audit: `npm audit --audit-level=high`. The pinned launch dependency set
has no high or critical findings; moderate upstream findings remain tracked during
dependency updates. The local, MIT-licensed braces patch is documented in
[vendor/braces/PATCH.md](vendor/braces/PATCH.md), with a regression test.
