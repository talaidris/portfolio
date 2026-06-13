<!--
Name: Kanza Alam
Student Number: 400528885
Date created: March 30 2025
Description: The PHP file for the feedback form. This file selects event names from the events table and
             inserts the event feedback into the feedbackForm table based on the event ID (foreign key).
-->

<?php
// connecting to database
include "connect.php";

$feedbackMessage = '';

// prepare and execute the SQL query to select the event id and title, ordered by date in descending order and fetch the event data
$event_stmt = $dbh->prepare("SELECT id, title FROM events ORDER BY date DESC");
$event_stmt->execute();

// sanitize the input values from the POST request for event ID and feedback
$eventID = filter_input(INPUT_POST, "eventID", FILTER_SANITIZE_NUMBER_INT);
$eventFeedback = filter_input(INPUT_POST, "eventFeedback", FILTER_SANITIZE_SPECIAL_CHARS);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // if both eventID and eventFeedback are not null, process the form submission
    if ($eventID !== null && $eventFeedback !== null) {

        // prepare a query to select the event title based on the provided event ID
        $eventTitleStmt = $dbh->prepare("SELECT title FROM events WHERE id = ?");

        // execute the query with the eventID
        $eventTitleStmt->execute([$eventID]);

        // fetch the event data (title) for the given event ID
        $event = $eventTitleStmt->fetch();

        // check if the event data was retrieved
        if ($event) {
            $eventTitle = $event['title'];

            // prepare a query to insert the feedback into the feedbackForm table
            $insert_stmt = $dbh->prepare("INSERT INTO feedbackForm (event_id, event_title, feedback) VALUES (?, ?, ?)");

            // execute the insert query
            $insert_stmt->execute([$eventID, $eventTitle, $eventFeedback]);

            $feedbackMessage = "Feedback submitted successfully!";
        } else {
            $feedbackMessage = "Error. Event not found.";
        }
    } else {
        $feedbackMessage = "Error. Please fill in all fields.";
    }
}
?>

<!doctype html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback</title>
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

        <div id="feedbackMessage" class="show">
            <?php
            if ($feedbackMessage) {
                echo htmlspecialchars($feedbackMessage);
            }
            ?>
        </div>

    </div>

</body>

</html>