import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = (relativePath) =>
  fs.readFileSync(path.resolve(__dirname, '..', relativePath), 'utf8');

test('PublicLayout keeps the public shell composition', () => {
  const file = read('src/layouts/PublicLayout.vue');

  assert.match(file, /class="public-layout"/);
  assert.match(file, /<PublicAppBar\s*\/>/);
  assert.match(file, /<v-main[^>]*class="main-content"/);
  assert.match(file, /class="page-shell"/);
  assert.match(file, /<router-view\s*\/>/);
  assert.match(file, /<(?:v-footer|footer)\b[^>]*>/);
  assert.match(file, /class="footer"/);
  assert.match(file, /AutoSphere/);
  assert.match(
    file,
    /import\s+PublicAppBar\s+from\s+['"]\.\.\/components\/layout\/PublicAppBar\.vue['"]/
  );
});

test('AuthLayout stays minimal and exposes a route outlet', () => {
  const file = read('src/layouts/AuthLayout.vue');

  assert.match(file, /<router-view\s*\/>/);
  assert.match(file, /class="auth-layout"/);
});

test('DashboardLayout keeps dashboard shell markers', () => {
  const file = read('src/layouts/DashboardLayout.vue');

  assert.match(file, /class="dashboard-layout"/);
  assert.match(file, /class="dashboard-sidebar"/);
  assert.match(file, /<router-view\s*\/>/);
  assert.match(file, /Panel interno/);
});

test('AdminLayout keeps admin shell markers', () => {
  const file = read('src/layouts/AdminLayout.vue');

  assert.match(file, /class="admin-layout"/);
  assert.match(file, /<router-view\s*\/>/);
  assert.match(file, /AutoSphere Admin/);
});
