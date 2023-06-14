<?php
$servername = "DEV1-G7-SQL-BDD";
$username = "dev-alyqator";
$password = "Jef!Z37;";
$dbname = "test-database";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    echo "Echec de la connexion a la BDD : " . $conn->connect_error;
} else {
    echo "Connexion a la BDD reussie !";
}

// Fermer la connexion
$conn->close();
?>