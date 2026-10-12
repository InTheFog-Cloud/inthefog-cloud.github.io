import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync, readFileSync} from 'node:fs';
import {chromium} from 'playwright';

const server = spawn('npm', ['run', 'serve', '--', '--host', '127.0.0.1', '--port', '4173', '--no-open'], {stdio: 'ignore'});
const catalog = JSON.parse(readFileSync('src/data/projects.json', 'utf8'));
let browser;
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {if ((await fetch('http://127.0.0.1:4173/')).ok) break;} catch {}
    if (attempt === 99) throw Error('Production preview did not start');
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  browser = await chromium.launch({headless: true, args: ['--no-sandbox']});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}, colorScheme: 'dark'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  assert.match(await page.title(), /InTheFog/);
  await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement.textContent), /Skip to main content/i);
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  mkdirSync('.artifacts/screenshots', {recursive: true});
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.getByRole('button', {name: /Switch between dark and light mode/}).click();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme);
    const shot = await page.screenshot({path: `.artifacts/screenshots/home-${theme}.png`, fullPage: true, animations: 'disabled'});
    if (process.env.HCS_CAPTURE_SCREENSHOTS === '1') console.log(`HCS_SCREENSHOT:home-${theme}:${shot.toString('base64')}`);
  }
  await page.goto('http://127.0.0.1:4173/projects/', {waitUntil: 'networkidle'});
  await page.getByLabel('Search projects').fill('surveyor');
  await page.getByLabel('Platform', {exact: true}).selectOption('Hyper-V');
  assert.match(await page.getByRole('status').innerText(), /^1 project found$/);
  await page.getByLabel('Platform', {exact: true}).selectOption('Azure Local');
  assert.match(await page.getByRole('heading', {name: 'No projects match yet.'}).innerText(), /No projects/);
  await page.getByRole('button', {name: 'Reset filters'}).click();
  assert.equal(await page.getByRole('status').innerText(), `${catalog.length} projects found`);
  await page.getByLabel('Search projects').focus();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'platform-filter');
  for (const route of ['docs/', 'docs/azure-local/', 'docs/hyper-v/', 'docs/azure-arc/', 'docs/hybrid-operations/', 'about/']) {
    const response = await page.goto(`http://127.0.0.1:4173/${route}`, {waitUntil: 'networkidle'});
    assert.equal(response.status(), 200, route);
    assert.ok(await page.getByRole('heading', {level: 1}).count(), route);
  }
  await page.goto('http://127.0.0.1:4173/404.html', {waitUntil: 'networkidle'});
  assert.ok(await page.getByRole('heading', {name: /Page Not Found/i}).count());
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile layout overflows');
  await page.getByRole('button', {name: /Toggle navigation bar/}).click();
  const mobileProjects = page.locator('.navbar-sidebar').getByRole('link', {name: 'Projects', exact: true});
  await mobileProjects.waitFor({state: 'visible'});
  assert.ok(await mobileProjects.isVisible());
  await mobileProjects.click();
  await page.getByLabel('Search projects').waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile catalog overflows');
  const mobile = await page.screenshot({path: '.artifacts/screenshots/projects-mobile.png', fullPage: true, animations: 'disabled'});
  if (process.env.HCS_CAPTURE_SCREENSHOTS === '1') console.log(`HCS_SCREENSHOT:projects-mobile:${mobile.toString('base64')}`);
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log('Browser checks passed: keyboard, themes, filtering, reset, routes, 404, mobile navigation and layout.');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
