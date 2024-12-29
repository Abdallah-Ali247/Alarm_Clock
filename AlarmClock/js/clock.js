/*
// 1. Properties: 
    // a) public -> hours, minutes, seconds
    // b) private -> IntervalId

    class Clock{

    #intervalId = 0;
    constructor( _hours, _minutes, _seconds){
        this.hours = _hours;
        this.minutes = _minutes;
        this.seconds = _seconds;
    };

    set IntervalId( _intervalId){
        this.#intervalId = _intervalId;
    };
    get IntervalId( ){
        return this.#intervalId;
    };

};

*/


/* 
2. Constructor:
a) Accept an initial time (e.g., HH:MM:SS) as a string.
b) Parse the time and store it as hours, minutes, and seconds Properties.
*/

class Clock {

    #intervalId; // privat variable

    constructor(timeString) { // constrauctor take a string
        
        const regex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;  // regex for 'hh:mm:ss'
        const match = timeString.match(regex);  // check if string match regex

        if(match){ // if string matchs the regex
            this.hours = Number(match[1]);   // assign variables
            this.minutes = Number(match[2]);
            this.seconds = Number(match[3]);
        } else {                              // if not , then throw an error
            throw new Error("Invalid time format. Use HH:MM:SS.");
        }
    }

    set IntervalId(_intervalId) {        // function to set interval 
        this.#intervalId = _intervalId;  // assign input to the privat var
    }

    get IntervalId() {                  // function to get private interval
        return this.#intervalId;
    }

    // static method (access only by class) to format time as HH:MM:SS
    static formatTime(hours, minutes, seconds) {
        // cast vars to strings to apply `padStart` by 2 to mak (n--> 0n) --> 02:01:01
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }


    //4. Private Methods:
    //      a) Create a private method #tick() to increment the clock's time by one second.

    #tick() {                      // create private fun
        this.seconds += 1;        // increment seconds by 1

        if (this.seconds >= 60) {  // if seconds > or = to 60 then --> 1 minute
            this.seconds = 0;      // reset seconds
            this.minutes += 1;     // increment minutes by 1

            if (this.minutes >= 60) { // if minutes > or = to 60 then --> 1 hour
                this.minutes = 0;      // reset minutes
                this.hours += 1;       // increment hours by 1

                if (this.hours >= 24) { // if hours > or = 24 then --> 1 day
                    this.hours = 0;     // reset hours
                }
            }
        }
        console.log(`${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`);
    }


/*5. Public Methods:
    a) start(): Starts the clock using setInterval to call the #tick() method every second.
    b) stop(): Stops the clock.
    c) getTime(): Returns the current time formatted as HH:MM:SS (now it’s time to use 
    formatTime method to convert properties to string)
*/

    // public method to start the clock
    start() {
        if (this.#intervalId) return; // prevent multiple intervals (running interval returns a number )
        // if there is no interval then add one that run #tick ech 1s
        this.#intervalId = setInterval(() => this.#tick(), 1000);
    }

    // public method to stop the clock
    stop() {
        clearInterval(this.#intervalId); // clear the interval that stop function #tick that stop the clock
        this.#intervalId = 0; // peset the intervalid
    }

    // public method to get the current time formatted as HH:MM:SS
    getTime() {
        // just return the formatTime function called by class Name
        return Clock.formatTime(this.hours, this.minutes, this.seconds);
    }

}


/* 
Create a Subclass AlarmClock:
 Inherit from the Clock class.
 private alarmTime property to store the alarm time as , HH:MM:SS
 Constructor:
o Accept an additional parameter alarmTime (e.g., HH:MM:SS) for the alarm.
 Private Methods:
o Create a private method #checkAlarm() to compare the current time with the 
alarm time.
 Public Methods:
o Override the start() method to call #checkAlarm() every second.
o Add setAlarm(newAlarmTime) to update the alarm time.
*/

class AlarmClock extends Clock { // creat class AlarmClock inherit from class Clock

    #alarmTime;                 // privat vairable to store the alarm time as , HH:MM:SS

    constructor(timeString,_alarmTime) {  // constructor takes two strings (time start  , alarm time)
        super(timeString); // call the parent Clock constructor
        const regex = /^(\d{2}):(\d{2}):(\d{2})$/;  // same regex for time HH:MM:SS

        if (regex.test(_alarmTime)) {  // check if regex test the input time
            this.#alarmTime = _alarmTime; // assign input alarm to the privat var
        } else { // trow an error if worong format
            throw new Error("Invalid alarm time format. Use HH:MM:SS."); 
        }
        this.alarmTime=_alarmTime;
    }

    // public method to set or update the alarm time
    set alarmTime(newAlarmTime) {
        const regex = /^(\d{2}):(\d{2}):(\d{2})$/;

        if (regex.test(newAlarmTime)) {
            this.#alarmTime = newAlarmTime;
        } else {
            throw new Error("Invalid alarm time format. Use HH:MM:SS.");
        }
    }

    // getter for return alarmTime
    get alarmTime() {
        return this.#alarmTime;
    }

    // private method to check if the current time matches the alarm time
    #checkAlarm() {
        const currentTime = this.getTime();     // get  current time from calling 'getTime' fun from Clock Class
        if (currentTime === this.alarmTime){   // if current Time == alarm time 
            console.log("Alarm! Time to wake up!"); // then time to wake up
        }
    }

    // override the start() method to make it check alarm 
    // start() {
        
    //     if (this.IntervalId) return; // Prevent multiple intervals
    //     this.IntervalId = setInterval(() => {
    //         console.log('hi from start chinld')
    //         super.start(); // Call the parent class's tick method

    //         this.#checkAlarm();
    //     }, 1000);
    // }
  

}

// export class Clock & AlamClock
export { Clock, AlarmClock }; 

