<!--
 Name: Azeen Saba
Student Number: 400520177
Date created:
Description:
-->
<?php
session_start();
include 'connect.php';

$sid = session_id();
$stmt = $dbh->prepare("SELECT merch_name, price, quantity, (price*quantity) AS subtotal FROM cart WHERE session_id = :sid");
$stmt->execute([':sid' => $sid]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total = 0;
foreach ($items as $row) {
    $total += $row['subtotal'];
}

?>

<!doctype html>

<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Your Cart Items!</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
        }

        th,
        td {
            padding: 0.5em;
            border: 1px solid #ccc;
            text-align: center;
        }

        th {
            background: #FFEBCD;
        }

        tfoot td {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div id="container">
        <div id="headerMain">
            <div id="logo-container">
                <canvas id="animationCanvas"></canvas>
            </div>
            <script src="js/logoAnimation.js"></script>
            <div id="headtext">
                <a href="index.html" id="homelink">
                    <h1>MISA</h1>
                    <p>McMaster Ismaili Student Association</p>
                </a>
            </div>
            <div id="navbar">
                <a href="about.html" class="link">About Us</a>
                <a href="events.php" class="link">Events</a>
                <a href="sports.html" class="link">Sports</a>
                <a href="merch.html" class="link">Merch</a>
                <a href="admin.html" class="link">admin login</a>
            </div>
        </div>

        <div id="cart-page">
            <h1>Your Cart</h1>
            <?php if (empty($items)): ?>
                <p>Your cart is empty. <a href="merch.html">Continue shopping</a>.</p>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($items as $row): ?>
                            <tr>
                                <td><?= htmlspecialchars($row['merch_name']) ?></td>
                                <td>$<?= number_format($row['price'], 2) ?></td>
                                <td><?= $row['quantity'] ?></td>
                                <td>$<?= number_format($row['subtotal'], 2) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="text-align:right;">Total:</td>
                            <td>$<?= number_format($total, 2) ?></td>
                        </tr>
                    </tfoot>
                </table>
                <p><a href="merch.html">Continue shopping</a> | <a href="#">Checkout</a></p>
            <?php endif; ?>
        </div>

        <div id="footer">
            <p>Contact: <a href="https://www.instagram.com/misa.masi/" target="_blank">Instagram</a></p>
            &copy; MISA, McMaster University, 2025
        </div>
    </div>
</body>

</html>