import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = (relativePath) =>
  fs.readFileSync(path.resolve(__dirname, '..', relativePath), 'utf8');

test('PublicAppBar keeps the expected public navigation entries', () => {
  const file = read('src/components/layout/PublicAppBar.vue');

  assert.match(file, /name:\s*'public-home'/);
  assert.match(file, /name:\s*'public-catalog'/);
  assert.match(file, /name:\s*'public-about'/);
  assert.match(file, /name:\s*'public-contact'/);
  assert.match(file, /name:\s*'public-faq'/);
  assert.match(file, /name:\s*'auth-login'/);

  assert.match(file, />\s*Inicio\s*</);
  assert.match(file, />\s*Vehículos\s*</);
  assert.match(file, />\s*Sobre\s*</);
  assert.match(file, />\s*Contacto\s*</);
  assert.match(file, />\s*FAQ\s*</);
});

test('PublicAppBar keeps search field wiring', () => {
  const file = read('src/components/layout/PublicAppBar.vue');

  assert.match(file, /v-model="q"/);
  assert.match(file, /placeholder="Búsqueda"/);
  assert.match(file, /@keyup\.enter="goSearch"/);
  assert.match(file, /const\s+q\s*=\s*ref\(''\)/);
});

test('PublicAppBar keeps router-driven navigation helpers', () => {
  const file = read('src/components/layout/PublicAppBar.vue');

  assert.match(file, /import\s+\{\s*ref\s*\}\s+from\s+'vue'/);
  assert.match(file, /import\s+\{\s*useRouter\s*\}\s+from\s+'vue-router'/);
  assert.match(file, /const\s+router\s*=\s*useRouter\(\)/);

  assert.match(file, /function\s+goHome\(\)\s*\{/);
  assert.match(file, /router\.push\(\{\s*name:\s*'public-home'\s*\}\)/);

  assert.match(file, /function\s+goSearch\(\)\s*\{/);
  assert.match(file, /name:\s*'public-catalog'/);
  assert.match(
    file,
    /query:\s*\{\s*q:\s*q\.value\?\.trim\(\)\s*\|\|\s*undefined\s*\}/
  );
});

test('PublicAppBar keeps login entry and clickable logo', () => {
  const file = read('src/components/layout/PublicAppBar.vue');

  assert.match(file, /class="logo"/);
  assert.match(file, /@click="goHome"/);
  assert.match(file, /aria-label="Entrar"/);
  assert.match(file, /:to="\{\s*name:\s*'auth-login'\s*\}"/);
});
