import test from 'node:test';
import assert from 'node:assert/strict';

import { createPinia, setActivePinia } from 'pinia';
import {
  hasRequiredRole,
  registerRouterGuards,
  requiresAuth,
  requiresGuest,
} from '../src/router/guards.js';
import { useAuthStore } from '../src/stores/auth.js';

function resetPinia() {
  setActivePinia(createPinia());
}

test('guard helpers detect auth and guest metadata', () => {
  resetPinia();
  assert.equal(requiresAuth({ meta: { requiresAuth: true } }), true);
  assert.equal(requiresAuth({ meta: {} }), false);
  assert.equal(requiresGuest({ meta: { requiresGuest: true } }), true);
  assert.equal(requiresGuest({ meta: {} }), false);
});

test('role guard checks store roles', () => {
  resetPinia();
  const authStore = useAuthStore();
  authStore.startSession({ nextRoles: ['seller'] });

  assert.equal(
    hasRequiredRole({ meta: { roles: ['seller'] } }, authStore),
    true
  );
  assert.equal(
    hasRequiredRole({ meta: { roles: ['admin'] } }, authStore),
    false
  );
  assert.equal(hasRequiredRole({ meta: {} }, authStore), true);
});

test('router guard redirects unauthenticated users away from protected routes', async () => {
  resetPinia();
  let registeredGuard;
  const router = {
    beforeEach(guard) {
      registeredGuard = guard;
    },
  };

  registerRouterGuards(router);

  const result = await registeredGuard({
    fullPath: '/panel/comprador',
    meta: { requiresAuth: true },
  });

  assert.deepEqual(result, {
    name: 'auth-login',
    query: { redirect: '/panel/comprador' },
  });
});

test('auth store starts and clears sessions correctly', () => {
  resetPinia();
  const authStore = useAuthStore();

  authStore.startSession({
    nextUser: { id: 1, email: 'test@example.com' },
    nextRoles: ['buyer'],
    token: 'token-123',
  });

  assert.equal(authStore.isAuthenticated, true);
  assert.deepEqual(authStore.user, { id: 1, email: 'test@example.com' });
  assert.deepEqual(authStore.roles, ['buyer']);
  assert.equal(authStore.primaryRole, 'buyer');

  authStore.clearSession();

  assert.equal(authStore.isAuthenticated, false);
  assert.equal(authStore.user, null);
  assert.deepEqual(authStore.roles, []);
});
