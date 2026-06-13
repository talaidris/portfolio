<!-- Name: Muniya Fallah
Student Number: 400594083
Date created: March 26 2025
Description:  This page connects to the database, retrieves event records using SQL queries, and 
              loops through each event to display its details on the webpage. It also links a feedback 
              feature, allowing users to submit feedback related to specific events.
-->

<!doctype html>

<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Events</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div id="container">
    <div id="headerMain">
      <div id="logo-container">
        <canvas id="animationCanvas"></canvas>
      </div>
      <script src="js/logoAnimation.js"></script>
      <div id="headtext">
        <a href="index.html" id="homelink">
          <h1>MISA</h1>
          <p>McMaster Ismaili Student Association</p>
        </a>
      </div>
      <div id="navbar">
        <a href="about.html" class="link">About Us</a>
        <a href="events.php" class="link">Events</a>
        <a href="sports.html" class="link">Sports</a>
        <a href="merch.html" class="link">Merch</a>
        <a href="admin.html" class="link">admin login</a>
      </div>

    </div>

    <div id="content">

      <!-- Providing users with access to the event feedback form -->
      <div id="feedback">
        <a href="server/feedbackForm.php">Please Give Us Some Feedback!</a>
        <p>We want to hear from you! Please give us feedback for events so that we know what we can do better,
          change, or keep the same. Your feedback is important to us!</p><br>
      </div>

      <div id="event-banner">
        <img src="images/MisaEvent.png" alt="MISA Events Banner">
        <div class="banner-text">
          <h1>Step Into the MISA Experience!</h1>
          <h2>MISA Events</h2>
        </div>
      </div>

      <?php
      //Connection to the database
      try {
        $dbh = new PDO(
          "mysql:host=localhost;dbname=idrist_db",
          "idrist_local",
          "jz{*Xwo5"
        );
      } catch (Exception $e) {
        die("ERROR: Couldn't connect to database. {$e->getMessage()}");
      }

      //preparing and executing SQL query to retrieve events ordered by date. 
      $stmt = $dbh->prepare("SELECT * FROM events ORDER BY date DESC");
      $success = $stmt->execute();

      //Looping through the event records and displaying each event on the page. 
      while ($row = $stmt->fetch()) {
        // displaying the event here
        echo "<div class='event event-card'>";
        echo "  <div class='image-container'>";
        if (!empty($row['image_url'])) {
          echo "<img src='images/" . $row['image_url'] . "' width='100'/>";
        }
        echo "    <div class='event-details-overlay'>";
        echo "      <h2>" . htmlspecialchars($row['title'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . "</h2>";
        echo "      <p><strong>Date:</strong> " . $row['date'] . "</p>";
        echo "      <p><strong>Location:</strong> " . htmlspecialchars($row['location'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . "</p>";
        echo "      <p>" . htmlspecialchars($row['description'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . "</p>";
        echo "    </div>";
        echo "  </div>";
        echo "</div>";
      }
      ?>

    </div>

    <div id="footer">
      <a href="https://www.instagram.com/misa.masi/" target="_blank">
        <img class="instagram-logo" src="images/instagramLogo.png" alt="Instagram">
      </a>
      <p>&copy; MISA, McMaster University, 2025</p>
    </div>
  </div>

</body>


</html>