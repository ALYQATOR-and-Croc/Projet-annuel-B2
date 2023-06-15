const express = require('express');
const sql = require('mssql');
const fs = require('fs');

const app = express();
const port = 3000;

// Charger les informations de connexion à partir du fichier config.json
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Route pour tester la connexion SQL
app.get('/', (req, res) => {
  // Tentative de connexion à la base de données
  sql.connect(config, (err) => {
    if (err) {
      console.log('Erreur de connexion à la base de données :', err);
      res.send('Erreur de connexion à la base de données');
    } else {
      console.log('Connexion à la base de données réussie');

      // Exécution d'une requête pour vérifier l'accès à la base de données
      const request = new sql.Request();
      request.query('SELECT 1 AS result', (err, recordset) => {
        if (err) {
          console.log('Erreur lors de l\'exécution de la requête :', err);
          res.send('Erreur lors de l\'exécution de la requête');
        } else {
          console.log('Requête exécutée avec succès');
          res.send('La base de données est connectée');
        }

        // Fermeture de la connexion à la base de données
        sql.close();
      });
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
