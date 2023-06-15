function testConnection() {
  fetch('/test-connexion')
    .then(response => response.json())
    .then(data => {
      console.log('Connexion réussie à la base de données !');
      console.log('Résultat de la requête :', data);
    })
    .catch(error => {
      console.error('Erreur de connexion à la base de données :', error);
    });
}

document.getElementById('testButton').addEventListener('click', testConnection);
