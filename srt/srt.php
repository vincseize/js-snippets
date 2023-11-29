<!DOCTYPE html>
<html lang="en">

<?php
$file = 
include_once 'srtReader.php';
$file = './assets/models/camilia/camilia.srt';
$jsonData = srtReader($file);
// echo $jsonData;

?>

<!-- Use the JSON data in JavaScript -->
<script>
const srtContentPHP = <?php echo $jsonData; ?>;
// console.log(srtContentPHP);
</script>




<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subtitle Loader</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <!-- <script src="./js/srt-parser.js"></script> -->

  <script src="./js/timer.js"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    header {
      background-color: #333;
      color: #fff;
      padding: 10px;
      text-align: center;
    }

    main {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    footer {
      text-align: center;
      padding: 10px;
      background-color: #333;
      color: #fff;
    }

    .subtitle-container {
      text-align: left;
      background-color: #333;
      color: #fff;
      /* border: solid 1px gray; */
    }

  </style>

</head>
<body>

  <header>
    <h1>Subtitle Loader</h1>
  </header>
  
  <div id="timer">00:00:00,000</div>

  <div id="subtitle-container" class="subtitle-container"></div>


<script>

    const srtContent = <?php echo $jsonData; ?>;
    console.log(srtContent);

    // Get the timer element
    const timerElement = document.getElementById('timer');

    // Set times in seconds (e.g., 5 seconds)
    const startTime = '00:00:00,000';
    const endTime='00:00:05,010';
    //

    initTimer(startTime, endTime);

</script>







</body>
</html>
