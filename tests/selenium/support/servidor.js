const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..', '..', '..', 'sistema');
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

function iniciarServidor() {
  const servidor = http.createServer((req, res) => {
    const caminho = path.normalize(decodeURIComponent(req.url.split('?')[0]));
    const arquivo = path.join(RAIZ, caminho);
    if (!arquivo.startsWith(RAIZ) || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream' });
    fs.createReadStream(arquivo).pipe(res);
  });

  return new Promise((resolve) => {
    servidor.listen(0, '127.0.0.1', () => {
      resolve({
        url: `http://127.0.0.1:${servidor.address().port}`,
        parar: () => new Promise((fim) => servidor.close(fim)),
      });
    });
  });
}

module.exports = { iniciarServidor };
