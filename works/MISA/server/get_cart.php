<!--
Name: Azeen Saba
Student Number: 400520177
Date created: April 20 2025
Description: Merch Store
-->

<?php
session_start();
include 'connect.php';

header('Content-Type: application/json');

$sid = session_id();
$stmt = $dbh->prepare(
    'SELECT merch_name, price, quantity
     FROM cart
     WHERE session_id = :sid'
);
$stmt->execute([':sid' => $sid]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total = 0;
foreach ($items as $row) {
    $total += $row['price'] * $row['quantity'];
}

echo json_encode([
    'items' => $items,
    'total' => number_format($total, 2)
]);
?>