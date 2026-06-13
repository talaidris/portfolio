<!--
Name: Tala Idris
Student Number: 400571015
Date created: March 26 2025
Description: form to add events.
-->

<?php
include 'connect.php';
session_start();
$access = isset($_SESSION["login"]);

// checks the server to see if the user has access. if not, it only displays an error message.
if ($access) {
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
                <h2>Add New Event</h2>
                <form action="save_event.php" method="POST" enctype="multipart/form-data">
                    <input type="text" name="title" placeholder="Title" required><br>
                    <textarea name="description" placeholder="Description" required></textarea><br>
                    <input type="date" name="date" required><br>
                    <input type="text" name="location" placeholder="Location" required><br>
                    <input type="file" name="image" required><br>
                    <button type="submit">Save Event</button>
                </form>
            </div>

        </div>
    </body>

    </html>

<?php } else {
    echo "Access Denied.";
}
?>