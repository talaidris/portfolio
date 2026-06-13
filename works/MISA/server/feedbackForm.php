<!--
Name: Kanza Alam
Student Number: 400528885
Date created: March 30 2025
Description: The php file for the feedback form. It mainly contains html but due to the slight usage of php,
             it is a php file. The form finds the event names from the events table and displays them to the
             user in order for them to select and then submit feedback for those specific events.
-->

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

        <div id="feedbackMessage"></div>

        <form id="feedbackForm" action="feedback.php" method="POST">
            <label for="eventID">Choose an Event:</label>
            <select name="eventID" id="eventID" required>
                <?php
                include "connect.php";

                $event_stmt = $dbh->prepare("SELECT id, title FROM events ORDER BY date DESC");
                $event_stmt->execute();

                while ($event = $event_stmt->fetch()) {
                    echo '<option value="' . htmlspecialchars($event['id']) . '">'
                        . htmlspecialchars($event['title']) . '</option>';
                }
                ?>
            </select>

            <br><br>

            <label for="eventFeedback">Your Feedback:</label>
            <textarea name="eventFeedback" id="eventFeedback" required></textarea>

            <br><br>

            <button type="submit">Submit Feedback</button>
        </form>
    </div>
</body>

</html>