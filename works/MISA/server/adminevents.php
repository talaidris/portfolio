<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin page to view events
-->

<?php
session_start();
$access = isset($_SESSION["login"]);
include "connect.php";

// checks the session to see if the user has access. if not, it only displays an error message.
if ($access) {

    //statement to get events from the database.
    $stmt = $dbh->prepare("SELECT * FROM events ORDER BY `date` DESC");
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

                // if the statement executes, it displays a table with all the events, 
                // otherwise it displays a simple error message
                if ($success) {
                ?>
                    <button onclick="location.href='add_event.php'">Add New Event</button>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Location</th>
                        </tr>
                        <?php while ($row = $stmt->fetch()) { ?>
                            <tr>
                                <td><?= $row['title'] ?></td>
                                <td><?= substr($row['description'], 0, 50) ?>...</td>
                                <td><?= $row['date'] ?></td>
                                <td><?= $row['location'] ?></td>
                                <td><a href="edit_event.php?id=<?= $row['id'] ?>">Edit</a></td>
                                <td><a href="delete_event.php?id=<?= $row['id'] ?>" onclick="return confirm('Are you sure?')">Delete</a></td>
                            </tr>
                        <?php } ?>
                    </table>
                <?php
                } else {
                    echo "<h1>Server error. Please try again later.</h1>";
                }
                ?>

            </div>
        </div>
    </body>

    </html>

<?php
} else {
    echo "<h1>Access Denied.</h1>";
}
?>