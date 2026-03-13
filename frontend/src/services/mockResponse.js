export function resolveMock(data, delay = 120) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(structuredClone(data));
    }, delay);
  });
}
