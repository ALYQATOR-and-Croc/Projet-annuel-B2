const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/test-connexion', (req, res) => {
  const result = {
    message: 'Connexion à la base de données réussie !',
  };
  res.json(result);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
