import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const braces = require('../vendor/braces');
test('patched brace processing preserves common build patterns', () => {
  assert.deepEqual(braces.expand('docs/{azure-local,hyper-v}.md'), ['docs/azure-local.md', 'docs/hyper-v.md']);
  assert.deepEqual(braces.expand('file{1..3}.md'), ['file1.md', 'file2.md', 'file3.md']);
  assert.deepEqual(braces.expand('a{b,{c,d}}'), ['ab', 'ac', 'ad']);
  assert.deepEqual(braces.expand('plain/path.md'), ['plain/path.md']);
});
test('deep balanced and unbalanced patterns fail before recursive stack exhaustion', () => {
  for (const pattern of ['{'.repeat(2000) + 'x' + '}'.repeat(2000), '('.repeat(2000) + 'x' + ')'.repeat(2000), '{'.repeat(2000)]) {
    for (const operation of [braces.parse, braces.compile, braces.expand]) {
      assert.throws(() => operation(pattern), error => error instanceof SyntaxError && error.message.includes('nesting exceeds'));
    }
  }
});
