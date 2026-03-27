function cloneData(data) {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(data);
  }

  return JSON.parse(JSON.stringify(data));
}

export function resolveMock(data, options = {}) {
  const delay = typeof options === 'number' ? options : (options.delay ?? 120);

  return new Promise((resolve) => {
    globalThis.setTimeout(() => {
      resolve(cloneData(data));
    }, delay);
  });
}

export function rejectMock(error, options = {}) {
  const delay = typeof options === 'number' ? options : (options.delay ?? 120);

  return new Promise((_, reject) => {
    globalThis.setTimeout(() => {
      reject(error instanceof Error ? error : new Error(String(error)));
    }, delay);
  });
}

export { cloneData };
