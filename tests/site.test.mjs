import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
const catalog = JSON.parse(readFileSync('src/data/projects.json', 'utf8'));
test('curated catalog is unique, public, and covers launch platforms', () => {
  assert.equal(new Set(catalog.map(p => p.name)).size, catalog.length);
  for (const p of catalog) {
    assert.ok(p.name && p.summary && p.maturity && p.platformTags.length);
    for (const key of ['projectUrl', 'documentationUrl', 'sourceUrl']) {
      if (!p[key]) continue;
      const url = new URL(p[key]);
      assert.equal(url.protocol, 'https:');
      assert.ok(['azurelocal.cloud', 'labs.hybridsolutions.cloud', 'github.com'].includes(url.hostname));
      assert.ok(!url.username && !url.password && !url.search);
    }
  }
  for (const tag of ['Azure Local', 'Hyper-V', 'Azure Arc', 'Hybrid operations']) assert.ok(catalog.some(p => p.platformTags.includes(tag)));
  assert.equal(catalog.find(p => p.name === 'Hyper-V Surveyor').maturity, 'Preview');
  assert.equal(catalog.find(p => p.name === 'Hyper-V Trailwright').maturity, 'In the lab');
});
test('production pages and assets exist without private planning content', () => {
  for (const route of ['index.html', 'projects/index.html', 'about/index.html', 'docs/index.html', 'docs/azure-local/index.html', 'docs/hyper-v/index.html', 'docs/azure-arc/index.html', 'docs/hybrid-operations/index.html', '404.html']) {
    const html = readFileSync(path.join('build', route), 'utf8');
    assert.ok(html.includes('InTheFog'), route);
    assert.ok(!/dev\.azure\.com|AB#\d+|inthefog-launch-plan|github-work-tracking-study|gh[psu]_[A-Za-z0-9]{20,}/.test(html), route);
  }
  const walk = dir => readdirSync(dir).flatMap(name => {const file=path.join(dir,name);return statSync(file).isDirectory()?walk(file):[file]});
  const html=readFileSync('build/index.html','utf8');
  for(const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) assert.ok(statSync(path.join('build',match[1])).isFile());
  assert.ok(walk('build').every(file => !file.includes(`${path.sep}pmo${path.sep}`)));
  for (const file of walk('build').filter(file => /\.(?:html|js|json|css|txt)$/.test(file))) {
    assert.ok(!/dev\.azure\.com|inthefog-launch-plan|github-work-tracking-study|gh[psu]_[A-Za-z0-9]{20,}/.test(readFileSync(file,'utf8')), `Private content in ${file}`);
  }
  for(const p of catalog.filter(p=>p.featured)) assert.ok(html.includes(p.name));
});
