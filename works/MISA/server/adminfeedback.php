<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin page to view feedback.
-->

<?php
session_start();
$access = isset($_SESSION["login"]);
include "connect.php";

// checks the session to see if the user has access. if not, it only displays an error message.
if ($access) {

    // statement to get feedback from the database 
    $stmt = $dbh->prepare("SELECT `event_title`, `feedback` FROM feedbackForm");
    $success = $stmt->execute();
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

            <div id="adminC">

                <ul>
                    <li><a href="adminfeedback.php">check feedback</a></li>
                    <li><a href="adminsignup.php">check sign-up form</a></li>
                    <li><a href="adminevents.php">edit events</a></li>
                    <li><a href="logout.php">logout</a></li>
                </ul>

                <?php

                // if the statement executes, it displays a table with all the feedback, 
                // otherwise it displays a simple error message
                if ($success) {
                    echo "<table>";
                    echo "<tr><th>event</th><th>feedback</th></tr>";
                    while ($row = $stmt->fetch()) {
                        echo "<tr>";
                        echo "<td>{$row['event_title']}</td>";
                        echo "<td>{$row['feedback']}</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<h1>Server error. Please try again later</h1>";
                }
                ?>

            </div>
        </div>
    </body>

    </html>

<?php
} else {
    echo "<h1>Access Denied</h1>";
}
?>