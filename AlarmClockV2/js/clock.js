

class Clock {

    #intervalId;

    constructor(timeString) {
        
        const regex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        const match = timeString.match(regex);

        if (match) {
            this.hours = Number(match[1]);
            this.minutes = Number(match[2]);
            this.seconds = Number(match[3]);
        } else {
            throw new Error("Invalid time format. Use HH:MM:SS.");
        }
    }

    set IntervalId(_intervalId) {
        this.#intervalId = _intervalId;
    }

    get IntervalId() {
        return this.#intervalId;
    }

    // Static method to format time as HH:MM:SS
    static formatTime(hours, minutes, seconds) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }


    #tick() {
        this.seconds += 1;

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
    }


    // Public method to start the clock
    start() {
        if (this.#intervalId) return; // Prevent multiple intervals
        this.#intervalId = setInterval(() => this.#tick(), 1000);
    }

    // Public method to stop the clock
    stop() {
        clearInterval(this.#intervalId);
        this.#intervalId = 0; // Reset the interval ID
    }

    // Public method to get the current time formatted as HH:MM:SS
    getTime() {
        return Clock.formatTime(this.hours, this.minutes, this.seconds);
    }

}


class AlarmClock extends Clock {

    #alarmTime='';

    constructor(timeString, alarmTime) {
        super(timeString); // Call the parent Clock constructor
        const regex = /^(\d{2}):(\d{2}):(\d{2})$/;

        if (regex.test(alarmTime)) {
            this.#alarmTime = alarmTime;
        } else {
            throw new Error("Invalid alarm time format. Use HH:MM:SS.");
        }
    }

    // Private method to check if the current time matches the alarm time
    #checkAlarm() {
        const currentTime = this.getTime();
        if (currentTime === this.#alarmTime) {
            console.log("Alarm! Time to wake up!");
        }
    }

    // Override the start() method
    // start() {
    //     if (this.IntervalId) return; // Prevent multiple intervals
    //     this.IntervalId = setInterval(() => {
    //         super.start(); // Call the parent class's tick method
    //         this.#checkAlarm();
    //     }, 1000);
    // }

    // Public method to set or update the alarm time
    set alarmTime(newAlarmTime) {
        const regex = /^(\d{2}):(\d{2}):(\d{2})$/;

        if (regex.test(newAlarmTime)) {
            this.#alarmTime = newAlarmTime;
        } else {
            throw new Error("Invalid alarm time format. Use HH:MM:SS.");
        }
    }

    // Getter for alarmTime
    get alarmTime() {
        return this.#alarmTime;
    }
}

export { Clock, AlarmClock };

