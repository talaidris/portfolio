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

if (empty($_POST['item']) || empty($_POST['price'])) {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
    exit;
}

$sid   = session_id();
$item  = $_POST['item'];
$price = (float) $_POST['price'];

$sql  = 'SELECT id, quantity FROM cart WHERE session_id = :sid AND merch_name = :item';
$stmt = $dbh->prepare($sql);
$stmt->execute([':sid' => $sid, ':item' => $item]);
$row  = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    $newQty = $row['quantity'] + 1;
    $update = $dbh->prepare('UPDATE cart SET quantity = :q WHERE id = :id');
    $update->execute([':q' => $newQty, ':id' => $row['id']]);
} else {
    $insert = $dbh->prepare(
        'INSERT INTO cart (session_id, merch_name, price, quantity)
         VALUES (:sid, :item, :price, 1)'
    );
    $insert->execute([':sid' => $sid, ':item' => $item, ':price' => $price]);
}

echo json_encode(['success' => true]);
?>