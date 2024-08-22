// Get references to the necessary HTML elements
const stopwatchDisplay = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');
const circleElement = document.querySelector('.circle');

let stopwatchInterval;
let elapsedTime = 0;

// Function to toggle between play and pause states
const togglePlayPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
}

// Function to start or resume the stopwatch
const startStopwatch = () => {
    playPauseButton.classList.add('running');
    circleElement.classList.add('animate');
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    const startTime = Date.now() - elapsedTime;
    secondsSphere.style.animationPlayState = 'running';
    circleElement.classList.remove('reset');

    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        stopwatchDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
}

// Function to pause the stopwatch
const pauseStopwatch = () => {
    playPauseButton.classList.remove('running');
    circleElement.classList.remove('animate');
    secondsSphere.style.animationPlayState = 'paused';
    clearInterval(stopwatchInterval);
}

// Function to stop and reset the stopwatch
const resetStopwatch = () => {
    playPauseButton.classList.remove('running');
    circleElement.classList.add('reset');
    circleElement.classList.remove('animate');
    secondsSphere.style.animation = 'none';
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    elapsedTime = 0;
    clearInterval(stopwatchInterval);
    stopwatchDisplay.textContent = '00:00';
}

// Function to format time into MM:SS
const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
}
