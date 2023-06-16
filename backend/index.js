const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// server.js
// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.static('public'));

// app.get('/test-connexion', (req, res) => {
//   const result = {
//     message: 'Connexion à la base de données réussie !',
//   };
//   res.json(result);
// });

// app.listen(port, () => {
//   console.log(`Serveur démarré sur le port ${port}`);
// });

// script.js
// document.getElementById('test-button').addEventListener('click', () => {
//     fetch('/test-connexion')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.message);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la requête:', error);
//       });
//   });