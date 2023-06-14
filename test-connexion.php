<?php
$servername = "10.1.1.36";
$username = "DEV1-G7-SQL-BDD";
$password = "5kQ3@sQ6b#";
$dbname = "test-database";

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