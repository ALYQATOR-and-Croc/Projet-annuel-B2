document.getElementById("testButton").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("result").innerHTML = xhr.responseText;
            } else {
                document.getElementById("result").innerHTML = "Erreur lors de la requête.";
            }
        }
    };
    xhr.open("GET", "test-connexion.php", true);
    xhr.send();
});