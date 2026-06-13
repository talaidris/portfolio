<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin homepage.
-->

<?php
// starts a new session
session_start();
?>
<!doctype html>

<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Admin</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<?php

include "connect.php";

// statement to get password from database.
$stmt = $dbh->prepare("SELECT * FROM adminpassword");
$success = $stmt->execute();
$pwd = $stmt->fetch();


// statement to get password from form.
$userpwd = filter_input(INPUT_POST, "password");
?>

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
        // checking if passwords match.if they match, it displays the admin page, 
        //otherwise it only displays the navbar to allow the user to go back to the main website.
        if (password_verify($userpwd, $pwd['pass'])) {
            $_SESSION["login"] = "true";
        ?>
            <div id="adminC">

                <h1>What would you like to do?</h1>
                <ul>
                    <li><a href="adminfeedback.php">check feedback</a></li>
                    <li><a href="adminsignup.php">check sign-up form</a></li>
                    <li><a href="adminevents.php">edit events</a></li>
                    <li><a href="logout.php">logout</a></li>
                </ul>

            </div>
    </div>
</body>

<?php
        } else {
            echo "<h1>Password is incorrect. Access denied.</h1>";
            session_unset();
            session_destroy();
        }
?>

</html>