const express = require('express');
const app = express();
const sql = require('mssql');

// Configuration de la connexion à la base de données SQL Server
const config = {
  user: 'dev-alyqator',
  password: 'Jef!Z37;',
  server: '10.1.1.36',
  database: 'test-database',
};

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint pour tester la connexion SQL
app.get('/test-connexion', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      res.send('Erreur de connexion à la base de données.');
    } else {
      console.log('Connexion réussie à la base de données.');
      res.send('Connexion réussie à la base de données.');
    }
  });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
