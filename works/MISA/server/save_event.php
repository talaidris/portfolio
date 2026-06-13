<!--
Name: Tala Idris
Student Number:400571015
Date created: March 26 2025
Description: admin page to save new events.
Note: file handling assistance from Yara Idris.
-->

<?php
include 'connect.php';
session_start();
$access = isset($_SESSION["login"]);

// checks the session to see if the user has access. if not, it only displays an error message.
if ($access) {
    $errors = [];
    $date = $_POST['date'];
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $location = trim($_POST['location'] ?? '');

    if (empty($title) || empty($description) || empty($location)) {
        die("Error: Title, description, and location are required.");
    }
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
                try {
                    // File upload handling
                    if (!empty($_FILES['image']['name'])) {
                        $targetDir = '../images/';

                        // Generate safe filename
                        $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                        $newFilename = uniqid() . '.' . $extension;
                        $targetFile = $targetDir . $newFilename;

                        // Move the file
                        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                            $imagePath = $newFilename;
                        } else {
                            // Get detailed error information if file does not upload
                            $error = error_get_last();
                            throw new Exception("Move failed. Error: " . $error['message']);
                        }
                    }

                    // Insert into database if there is an image.
                    if ($imagePath) {
                        $cmd = "INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)";
                        $stmt = $dbh->prepare($cmd);
                        $success = $stmt->execute([$title, $description, $date, $location, $imagePath]);
                    } else {
                        echo "an image is required.";
                    }


                    if ($success) {
                        echo "<h1>Event Added Successfully!</h1>";
                    } else {
                        echo "<h1>Error saving event to database</h1>";
                    }
                } catch (PDOException $e) {
                    echo "<h1>Database error. Please try again later.</h1>";
                } catch (Exception $e) {
                    echo "<h1>Upload Error. Please try again later.</h1>";
                }
                ?>
            </div>
        </div>
    </body>

    </html>
<?php
} else {
    echo "Access Denied.";
}
?>