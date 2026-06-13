<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin logout page
-->

<?php

// session gets deleted and a simple message is displayed.
session_start();
session_unset();
session_destroy();
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Admin</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <div id="adminC">
        <div id="headerRest">
            <a id="logo" href="../index.html"><img id="logo" src="../images/logo.png" style="width: 100px;"></a>
            <div id="headtext">
                <a href="../index.html" id="homelink">
                    <h1>MISA</h1>
                    <p>McMaster Ismaili Student Association</p>
                </a>
            </div>
            <div id="navbar">
                <a href="../about.html" class="link">About Us</a>
                <a href="../events.php" class="link">Events</a>
                <a href="../sports.html" class="link">Sports</a>
                <a href="../merch.html" class="link">Merch</a>
                <a href="../admin.html" class="link">admin login</a>
            </div>
        </div>
        <h1>You are logged out.</h1>
    </div>
</body>

</html>