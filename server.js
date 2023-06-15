const express = require('express');
const sql = require('mssql');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/test-connexion', (req, res) => {
  const configPath = './config.json';
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  sql.connect(config)
    .then(() => {
      return sql.query('SELECT * FROM test_table;');
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(error => {
      console.error('Erreur de connexion à la base de données :', error);
      res.status(500).json({ error: 'Erreur de connexion à la base de données' });
    })
    .finally(() => {
      sql.close();
    });
});

app.listen(port, () => {
  console.log(`Serveur Express écoutant sur le port ${port}`);
});
