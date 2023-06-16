document.getElementById('test-button').addEventListener('click', () => {
  fetch('/test-connexion')
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
});
