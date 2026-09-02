const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const routesPath = path.join(__dirname, '..', 'src', 'routes.js');
const source = fs.readFileSync(routesPath, 'utf8');
const transformed = `${source.replace(/export const routes =/, 'const routes =')}\nmodule.exports = { routes };`;

function loadRoutes() {
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(transformed, sandbox, { filename: 'routes.js' });
  return sandbox.module.exports.routes;
}

test('router: define las rutas principales del sitio', () => {
  const routes = loadRoutes();

  assert.ok(Array.isArray(routes));
  assert.equal(routes.length, 3);
  assert.deepEqual(
    routes.map((route) => route.path),
    ['/', '/chat', '/about']
  );

  routes.forEach((route) => {
    assert.ok(route.view);
    assert.equal(typeof route.view, 'function');
  });
});

test('router: cada ruta tiene una vista asociada', () => {
  const routes = loadRoutes();

  const expected = new Set(['/', '/chat', '/about']);

  routes.forEach((route) => {
    assert.ok(expected.has(route.path));
  });
});
