const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const handlerPath = path.join(__dirname, '..', 'api', 'functions.js');
const source = fs.readFileSync(handlerPath, 'utf8');
const transformed = `${source.replace(/export default\s+async function handler/, 'async function handler')}\nmodule.exports = handler;`;

function loadHandler() {
  const sandbox = {
    module: { exports: {} },
    exports: {},
    require,
    process,
    console,
    fetch: async () => ({
      ok: true,
      status: 200,
      json: async () => ({ candidates: [{ content: { parts: [{ text: 'Respuesta simulada' }] } }] })
    })
  };

  vm.runInNewContext(transformed, sandbox, { filename: 'functions.js' });
  return sandbox.module.exports;
}

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    }
  };
}

test('backend: rechaza métodos distintos de POST', async () => {
  const handler = loadHandler();
  const req = { method: 'GET' };
  const res = createRes();

  await handler(req, res);

  assert.equal(res.statusCode, 405);
  assert.deepEqual(res.body, { error: 'Método no permitido' });
});

test('backend: devuelve error si falta la API key', async () => {
  const oldKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  const handler = loadHandler();
  const req = { method: 'POST', body: { message: 'Hola' } };
  const res = createRes();

  await handler(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: 'API key no configurada' });

  if (oldKey) {
    process.env.GEMINI_API_KEY = oldKey;
  }
});

test('backend: valida que el mensaje sea obligatorio', async () => {
  process.env.GEMINI_API_KEY = 'test-key';
  const handler = loadHandler();
  const req = { method: 'POST', body: {} };
  const res = createRes();

  await handler(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { error: 'Falta el mensaje' });
});

test('backend: responde con un mensaje cuando la petición es válida', async () => {
  process.env.GEMINI_API_KEY = 'test-key';
  const handler = loadHandler();
  const req = {
    method: 'POST',
    body: {
      message: '¿Cómo estás?',
      personality: 'Eres un asistente amable.'
    }
  };
  const res = createRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { reply: 'Respuesta simulada' });
});
