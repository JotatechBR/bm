// Servidor estático simples (sem banco de dados, sem backend de verdade).
// Serve apenas os arquivos do site. Rode com: node server.js
// Depois abra: http://localhost:3000

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  let file = decodeURIComponent(req.url.split("?")[0]);
  if (file === "/") file = "/index.html";

  const filePath = path.join(__dirname, file);

  // Impede acesso a arquivos fora da pasta do projeto.
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end("Acesso negado");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Página não encontrada");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Site rodando em http://localhost:${PORT}`);
});
