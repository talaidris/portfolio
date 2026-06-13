<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin page to edit an event
-->

<?php
include 'connect.php';
session_start();
$access = isset($_SESSION["login"]);

// checks the session to see if the user has access. if not, it only displays an error message.
if ($access) {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    // statement to get event from database.
    $stmt = $dbh->prepare("SELECT * FROM events WHERE id = ?");
    $success = $stmt->execute([$id]);
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

                // if the statement executes, it displays a form with the event for the user to edit., 
                // otherwise it displays a simple error message
                if ($success) {
                    $event = $stmt->fetch();
                ?>
                    <h2>Edit Event</h2>
                    <form action="update_event.php" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="id" value="<?= $event['id'] ?>">
                        <input type="text" name="title" value="<?= $event['title'] ?>" required><br>
                        <textarea name="description" required><?= $event['description'] ?></textarea><br>
                        <input type="date" name="date" value="<?= $event['date'] ?>" required><br>
                        <input type="text" name="location" value="<?= $event['location'] ?>" required><br>
                        <input type="file" name="image"><br>
                        <button type="submit">Update Event</button>
                    </form>
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
    echo "<h1>Access Denied</h1>";
}
?>