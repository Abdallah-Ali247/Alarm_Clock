/*
import { Clock, AlarmClock } from "./clock.js";


// 1. Properties: 
    // a) public -> hours, minutes, seconds
    // b) private -> IntervalId
let clock = new Clock(10,20,30,40)

console.log(clock.hours)
console.log(clock.minutes)
console.log(clock.seconds)
console.log(clock.IntervalId)
console.log('*******************')

clock.hours = 100;
clock.minutes =200;
clock.seconds = 300; 
clock.IntervalId = 400;

console.log(clock.hours)
console.log(clock.minutes)
console.log(clock.seconds)
console.log(clock.IntervalId)
*/

/* 
2. Constructor:
    a) Accept an initial time (e.g., HH:MM:SS) as a string.
    b) Parse the time and store it as hours, minutes, and seconds Properties.
*/
/*
let clock = new Clock('15:2:10');
console.log(clock.hours);
console.log(clock.minutes);
console.log(clock.seconds);
console.log(clock.IntervalId); 
clock.IntervalId = 44;
console.log(clock.IntervalId);

// 
console.log(Clock.formatTime(clock.hours,clock.minutes,clock.seconds))
*/


// import class Clock & AlarmClock
import { Clock, AlarmClock } from './clock.js';



// test class Clock
console.log("Set Time to Clock...");
const basicClock = new Clock("23:59:55");          // create object from Clock and set Clock
console.log("Initial Time:", basicClock.getTime()); // call get time to display the Clock time

basicClock.start();       // call the Start function to start interval by increasing time by 1s


setTimeout(() => {     // sit time out each 5s
    basicClock.stop(); // call stop function to clear interval then stop the clock
    console.log("Stopped Basic Clock at:", basicClock.getTime()); // display current time
}, 5000); // stop after 5 seconds it means (23:59:55) + 5s = (00:00:00) stop time





const alarmClock = new AlarmClock("10:20:50","10:20:55"); 
// test Class AlarmClock
setTimeout(() => {
    console.log("\n\nTesting Alarm Clock...");
    
    // alarmClock.alarmTime = "00:00:01";
    console.log("Initial Time:", alarmClock.getTime());
    console.log("Alarm Time:", alarmClock.alarmTime);

    alarmClock.start();

    setTimeout(() => {
        alarmClock.stop();
        console.log("Stopped Alarm Clock at:", alarmClock.getTime());
    }, 10000); // Stop after 10 seconds
}, 8000); // Start the alarm clock test after the basic clock test








