import { AlarmClock } from './clock.js';

// access Elements
const timeInput = document.getElementById('time');
const alarmTimeInput = document.getElementById('alarm-time');
const currentTimeDisplay = document.getElementById('current-time');
const alarmStatus = document.getElementById('alarm-status');
const alarmForm = document.getElementById('alarm-form');
const stopButton = document.getElementById('stop-button');

let alarmClock = null;
const alarmSound = new Audio('sound/alarm.mp3'); 
// Handle form submission
alarmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const initialTime = timeInput.value.trim();
    const alarmTime = alarmTimeInput.value.trim();

    try {
        // Create AlarmClock instance
        alarmClock = new AlarmClock(initialTime, alarmTime);

        // Start the clock
        alarmClock.start = function () {
            if (this.IntervalId) return; // Prevent multiple intervals
            this.IntervalId = setInterval(() => {
                this.seconds += 1; // Increment time
                if (this.seconds >= 60) {
                    this.seconds = 0;
                    this.minutes += 1;
                    if (this.minutes >= 60) {
                        this.minutes = 0;
                        this.hours += 1;
                        if (this.hours >= 24) {
                            this.hours = 0;
                        }
                    }
                }

                const currentTime = this.getTime();
                currentTimeDisplay.textContent = currentTime;

                // Check alarm
                if (currentTime === this.alarmTime) {
                    alarmStatus.textContent = "Alarm! Time to wake up!";
                    alarmStatus.style.color = "red";
                    alarmSound.play();
                    this.stop();
                }
            }, 1000);
        };

        alarmClock.start();
        stopButton.disabled = false;
        alarmStatus.textContent = "Clock started!";
        alarmStatus.style.color = "green";
        alarmStatus.style.fontWeight = "bold";
    } catch (error) {
        alarmStatus.textContent = error.message;
        alarmStatus.style.color = "red";
        alarmStatus.style.fontWeight = "bold";
    }
});

// Stop the clock
stopButton.addEventListener('click', () => {
    if (alarmClock) {
        alarmSound.pause();
        alarmSound.currentTime = 0;

        alarmClock.stop();
        alarmStatus.textContent = "Clock stopped!";
        alarmStatus.style.color = "yellow";
        alarmStatus.style.fontWeight = "bold";
        stopButton.disabled = true;
    }
});
