<?php
$servername = "adresse_IP_du_serveur_SQL";
$username = "nom_utilisateur_SQL";
$password = "mot_de_passe_SQL";
$dbname = "nom_base_de_donnees_SQL";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    echo "Échec de la connexion à la base de données : " . $conn->connect_error;
} else {
    echo "Connexion à la base de données réussie !";
}

// Fermer la connexion
$conn->close();
?>