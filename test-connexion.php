<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $servername = "DEV1-G7-SQL-BDD";
    $username = "dev-alyqator";
    $password = "Jef!Z37;";
    $dbname = "test-database";

    // Créer une connexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérifier la connexion
    if ($conn->connect_error) {
        $result = "Echec de la connexion a la base de donnees : " . $conn->connect_error;
    } else {
        $result = "Connexion a la base de donnees reussie !";
    }

    // Fermer la connexion
    $conn->close();
}
?>
