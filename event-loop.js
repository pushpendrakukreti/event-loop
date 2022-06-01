/*
CallBack Queue or Task Queue (low priority)
Microtask Queue (high priority)
*/

let log = document.getElementById("logs");

/* ----------Example 1------------ */
// console.log("START"); //Console API
log.innerHTML += "START"; //DOM API

// browser provides the superpowers in form of api to JS Engine through window object
setTimeout(function cb() {      //it registers a callBack in setTimeout api environment with time
    // console.log("Timeout Callback");
    log.innerHTML += "<br>TIMEOUT CB";
}, 5000);
/* above registered callback cannot go to the call stack directly
it will go to callback queue and event loop which continuosly checks if callback queue
has any task it will send it to call stack to execute */

// console.log("END");
/* ------------------------------- */

/* ----------Example 2------------ */
// console.log("START");

document.getElementById("button")
    .addEventListener("click", function cb() {      //it registers a callBack in DOM api environment with click event
        // console.log("Event Callback");
        log.innerHTML += "<br>CLICK EVENT CB";
    });
/* above registered callback cannot go to the call stack directly
it will go to callback queue and event loop which continuosly checks if callback queue
has any task it will send it to call stack to execute */

// console.log("END");
/* ------------------------------- */

/* ----------Example 3------------ */
// console.log("START");

setTimeout(function cbT() {
    // console.log("CB SetTimeout");   //it registers a callBack in setTimeout api environment with timer started
    log.innerHTML += "<br>TIMEOUT 2CB";
}, 5000);

fetch("https://api.publicapis.org/entries")    //it will be registered in fet api env.
    .then(function cbF() {               //it will not go through microtask queue (high priority)
        // console.log("CB Netflix");
        log.innerHTML += "<br>PROMISE CB";
    });
//million line of code to be executed
// console.log("END");
log.innerHTML += "<br>END"; //DOM API

/* all the callback functions which comes through promises
and mutation observers will go into microtask queue */

/* ------------------------------- */

/* STARVATION : when microtask queue has function which creates another microtask and then so one
the callBack queue will never get a chance to execute the function inside it */