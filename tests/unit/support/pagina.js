const fs = require('fs');
const path = require('path');

const SISTEMA = path.join(__dirname, '..', '..', '..', 'sistema');

function carregarPagina(html, scripts = [], { raizScripts = SISTEMA } = {}) {
  const conteudo = fs.readFileSync(path.join(SISTEMA, html), 'utf8');
  const corpo = conteudo.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
  document.body.innerHTML = corpo.replace(/<script[\s\S]*?<\/script>/gi, '');

  scripts.forEach((script) => {
    const codigo = fs.readFileSync(path.join(raizScripts, script), 'utf8');
    (0, eval)(codigo);
  });
}

function dispararCarregamento() {
  document.dispatchEvent(new Event('DOMContentLoaded'));
  if (typeof window.onload === 'function') window.onload();
}

function preencher(campos) {
  Object.entries(campos).forEach(([id, valor]) => {
    document.getElementById(id).value = valor;
  });
}

function enviarFormulario(id = 'form') {
  document.getElementById(id).dispatchEvent(new Event('submit', { cancelable: true }));
}

function estaOculto(id) {
  return document.getElementById(id).classList.contains('d-none');
}

module.exports = { SISTEMA, carregarPagina, dispararCarregamento, preencher, enviarFormulario, estaOculto };
