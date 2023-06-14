const http = require('http');
const fs = require('fs');
const sql = require('mssql');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Erreur interne du serveur');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/test-connexion' && req.method === 'GET') {
    sql.connect(config, (err) => {
      if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.statusCode = 500;
        res.end('Erreur de connexion à la base de données.');
      } else {
        console.log('Connexion réussie à la base de données.');
        res.statusCode = 200;
        res.end('Connexion réussie à la base de données.');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Page introuvable');
  }
});

const config = {
    user: 'dev-alyqator',
    password: 'Jef!Z37;',
    server: '10.1.1.36',
    database: 'test-database',
};

server.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
