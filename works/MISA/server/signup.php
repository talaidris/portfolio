<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: MISA Signup Form
-->

<!doctype html>

<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Signup</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <div id="container">
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


        <?php

        include "connect.php";

        $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
        $role = filter_input(INPUT_POST, "role", FILTER_SANITIZE_SPECIAL_CHARS);

        if ($name !== null && $email !== null && $role !== null) {
            $cmd = "INSERT INTO signup (name, email, role) VALUES (?,?,?)";
            $stmt = $dbh->prepare($cmd);
            $args = [$name, $email, $role];
            $success = $stmt->execute($args);

            if ($success) {
                echo '<div class="center-text">Thank you for signing up! We will reach out to you soon!</div>';
            } else {
                '<div class="center-text">server error. please try again later</div>';
            }
        } else {
            '<div class="center-text">Error, please try again.</div>';
        }
        ?>
    </div>
</body>

</html>