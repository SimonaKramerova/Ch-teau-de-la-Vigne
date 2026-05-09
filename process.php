<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $date = $_POST['date'];
    $type = $_POST['type'];
    $count = $_POST['count'];

    // Zde by následovalo uložení do DB nebo odeslání emailu
    echo "<h1>Rezervace úspěšná!</h1>";
    echo "<p>Děkujeme, pane/paní $name. Potvrzení bylo zasláno na $email.</p>";
    echo "<a href='index.php'>Zpět na hlavní stránku</a>";
}
?>