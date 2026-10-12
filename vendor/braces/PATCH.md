# Local braces security patch

Based on the MIT-licensed upstream braces 3.0.3 tarball. Original source and license
are retained. `3.0.3-inthefog.1` is a local revision, not an upstream release.

GHSA-vfj7-8cjw-p6xm has no published patched upstream version. This revision bounds
parser AST nesting to 128 before recursive compile, expansion, or stringify operations
can exhaust the JavaScript stack. Normal patterns retain the upstream behavior.

The catalog uses no user-supplied glob patterns. Trusted build inputs and the parser
depth regression checks provide additional protection. Remove this local revision when
an upstream fix is available and verified. Serialize-javascript and tinypool overrides
pin published security fixes.
