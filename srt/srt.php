<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

define('SRT_STATE_SUBNUMBER', 0);
define('SRT_STATE_TIME',      1);
define('SRT_STATE_TEXT',      2);
define('SRT_STATE_BLANK',     3);

function srtReader($srt) {
    $lines = file($srt);
    $subs = array();
    $state = SRT_STATE_SUBNUMBER;
    $subNum = 0;
    $subText = '';
    $subTime = '';

    foreach ($lines as $line) {
        switch ($state) {
            case SRT_STATE_SUBNUMBER:
                $subNum = trim($line);
                $state  = SRT_STATE_TIME;
                break;

            case SRT_STATE_TIME:
                $subTime = trim($line);
                $state   = SRT_STATE_TEXT;
                break;

            case SRT_STATE_TEXT:
                if (trim($line) == '') {
                    // Check if a subtitle with the same number already exists
                    $existingSub = end($subs);
                    if ($existingSub && $existingSub->number == $subNum) {
                        // If it exists, append the text to the existing subtitle
                        $existingSub->text .= $subText;
                    } else {
                        // If not, create a new subtitle entry
                        $sub = new stdClass;
                        $sub->number = $subNum;
                        list($sub->startTime, $sub->stopTime) = explode(' --> ', $subTime);
                        $sub->text = $subText;
                        $subs[] = $sub;
                    }

                    $subText = '';
                    $state = SRT_STATE_SUBNUMBER;
                } else {
                    // Append the line to the text
                    $subText .= $line;
                }
                break;
        }
    }

    // Check if there's an unfinished subtitle after the loop
    if (!empty($subNum) && !empty($subTime) && !empty($subText)) {
        $sub = new stdClass;
        $sub->number = $subNum;
        list($sub->startTime, $sub->stopTime) = explode(' --> ', $subTime);
        $sub->text = $subText;
        $subs[] = $sub;
    }

    // Convert PHP array to JSON format
    return json_encode($subs, JSON_PRETTY_PRINT);
}

// Usage example
// $srtFilePath = './path/to/your/file.srt';
// $jsonData = srtReader($srtFilePath);
// echo $jsonData;
?>
