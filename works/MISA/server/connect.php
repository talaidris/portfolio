<?php

try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=idrist_db;charset=utf8mb4",
        "idrist_local",
        "jz{*Xwo5"
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect to database. {$e->getMessage()}");
}
