import test from 'node:test';
import assert from 'node:assert/strict';

import publicRoutes from '../src/router/routes/public.js';
import authRoutes from '../src/router/routes/auth.js';
import appRoutes from '../src/router/routes/app.js';
import adminRoutes from '../src/router/routes/admin.js';
import utilityRoutes from '../src/router/routes/utility.js';

function flattenRoutes(routes) {
  return routes.flatMap((route) => [route, ...(route.children || [])]);
}

test('route modules expose the expected route groups', () => {
  assert.equal(publicRoutes.length, 1);
  assert.equal(authRoutes.length, 1);
  assert.equal(appRoutes.length, 1);
  assert.equal(adminRoutes.length, 1);
  assert.equal(utilityRoutes.length, 1);
});

test('named routes use lazy component functions', () => {
  const namedRoutes = [
    ...flattenRoutes(publicRoutes),
    ...flattenRoutes(authRoutes),
    ...flattenRoutes(appRoutes),
    ...flattenRoutes(adminRoutes),
    ...flattenRoutes(utilityRoutes),
  ].filter((route) => route.name);

  for (const route of namedRoutes) {
    assert.equal(typeof route.component, 'function');
  }
});

test('critical route names remain available', () => {
  const names = new Set(
    [
      ...flattenRoutes(publicRoutes),
      ...flattenRoutes(authRoutes),
      ...flattenRoutes(appRoutes),
      ...flattenRoutes(adminRoutes),
      ...flattenRoutes(utilityRoutes),
    ]
      .filter((route) => route.name)
      .map((route) => route.name)
  );

  assert.equal(names.has('public-home'), true);
  assert.equal(names.has('public-catalog'), true);
  assert.equal(names.has('public-listing-detail'), true);
  assert.equal(names.has('auth-login'), true);
  assert.equal(names.has('utility-not-found'), true);
});
