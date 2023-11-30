// Initialize the timer variables
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timerInterval;

// Function to convert time in HH:MM:SS,SSS format to milliseconds
function timeToMilliseconds(time) {
    const timeArray = time.split(':');
    const secondsAndMilliseconds = timeArray[2].split(',');

    const hoursInMilliseconds = parseInt(timeArray[0]) * 3600000;
    const minutesInMilliseconds = parseInt(timeArray[1]) * 60000;
    const secondsInMilliseconds = parseInt(secondsAndMilliseconds[0]) * 1000;
    const milliseconds = parseInt(secondsAndMilliseconds[1]);

    return hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds + milliseconds;
}

function timeToSeconds(time) {
    const endTimeArray = time.split(':');
    const endTimeInSeconds =
        parseInt(endTimeArray[0]) * 3600 + parseInt(endTimeArray[1]) * 60 + parseFloat(endTimeArray[2].replace(',', '.'));

    return endTimeInSeconds;
}

// Function to get the current time in milliseconds
function getCurrentTimeInMilliseconds() {
    return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
}

// Function to update the timer
function updateTimer(startTimeInMilliseconds, endTimeInMilliseconds) {
    // Format the time components
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Update the timer element content
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds},${formattedMilliseconds}`;

    // Increment the milliseconds
    milliseconds += 10;

    // Check if a second has passed
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;

        // Check if a minute has passed
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    // Check if the end time has passed
    if (minutes * 60 + seconds + milliseconds / 1000 >= endTimeInMilliseconds / 1000) {
        clearInterval(timerInterval); // Stop the timer after reaching the end time
    }

    // Check if there are subtitles
    if (srtContent && srtContent.length > 0) {
        // Loop through subtitles and check if the current time matches
        srtContent.forEach((subtitle, index) => {
            const startSubtitleTime = timeToMilliseconds(subtitle.startTime);
            const stopSubtitleTime = timeToMilliseconds(subtitle.stopTime);
    
            if (
                startSubtitleTime <= getCurrentTimeInMilliseconds() &&
                getCurrentTimeInMilliseconds() <= stopSubtitleTime
            ) {
                // Update the subtitle container with the corresponding text
                subtitleContainer.textContent = subtitle.text;
            } else if (getCurrentTimeInMilliseconds() > stopSubtitleTime) {
                // Clear the subtitle container if the endTime is reached
                subtitleContainer.textContent = '';
            }
        });
    }
}

// External function to set up the timer
function initTimer(startTime, endTime) {
    const startTimeInSeconds = timeToSeconds(startTime);
    const endTimeInSeconds = timeToSeconds(endTime);

    const startTimeInMilliseconds = timeToMilliseconds(startTime);
    const endTimeInMilliseconds = timeToMilliseconds(endTime) + 10; // Adding 10 milliseconds

    // Set up the timer interval (10 milliseconds per tick)
    timerInterval = setInterval(() => updateTimer(startTimeInMilliseconds, endTimeInMilliseconds), 10);
}

// Example usage
// const startTime = '00:00:00,000';
// const endTime = '00:00:30,010';
// initTimer(startTime, endTime);
