import { EventEmitter } from "events";

// Function-based solution, recursion

const eventEmitter = new EventEmitter();
let count = 0; // Initialize the counter variable

// Function to change the counter
function changeCounter(action, times) {
    if (action !== "increase" && action !== "decrease") {
        console.log("Invalid action passed.");
        return;
    }
    if (times <= 0) return; // Base case: stop recursion

    // Perform the action (increase or decrease)
    if (action === 'increase') {
        count++;
        eventEmitter.emit('increase'); // Emit 'increase' event
    } else if (action === 'decrease') {
        count--;
        eventEmitter.emit('decrease'); // Emit 'decrease' event
    }

    // Check the state after changing the counter
    checkState();

    // Recursive call
    changeCounter(action, times - 1);
}

// Method to check the current state of the counter
function checkState() {
    if (count === 0) {
        eventEmitter.emit('zero'); // Emit 'zero' event
    } else if (count > 0) {
        eventEmitter.emit('positive'); // Emit 'positive' event
    } else {
        eventEmitter.emit('negative'); // Emit 'negative' event
    }
}

// Event listeners
eventEmitter.on('increase', () => {
    console.log(`Counter increased: ${count}`);
});

eventEmitter.on('decrease', () => {
    console.log(`Counter decreased: ${count}`);
});

eventEmitter.on('zero', () => {
    console.log('Counter is zero.');
});

eventEmitter.on('positive', () => {
    console.log('Counter is positive.');
});

eventEmitter.on('negative', () => {
    console.log('Counter is negative.');
});


console.log('Initial counter value:', count);
changeCounter('increase', 3); 
changeCounter('decrease', 2); 
changeCounter('decrease', 2);  
changeCounter('increase', 3); 
changeCounter('invalidAction', 1); 

//////////////////////////////////////////////////////////////////////////

// // Function-based without recursion

// let count = 0; // Initialize the counter variable

// // Function to change the counter
// function changeCounter(action, times) {
//     if (action !== "increase" && action !== "decrease") {
//         console.log("Invalid action passed.");
//         return;
//     }
    
//     for (let i = 0; i < times; i++) {
//         // Perform the action (increase or decrease)
//         if (action === 'increase') {
//             count++;
//             eventEmitter.emit('increase'); // Emit 'increase' event
//         } else if (action === 'decrease') {
//             count--;
//             eventEmitter.emit('decrease'); // Emit 'decrease' event
//         }
//     }

//     // Check the state after changing the counter
//     checkState();
// }

// // Method to check the current state of the counter
// function checkState() {
//     if (count === 0) {
//         eventEmitter.emit('zero'); // Emit 'zero' event
//     } else if (count > 0) {
//         eventEmitter.emit('positive'); // Emit 'positive' event
//     } else {
//         eventEmitter.emit('negative'); // Emit 'negative' event
//     }
// }

// // Event listeners
// eventEmitter.on('increase', () => {
//     console.log(`Counter increased: ${count}`);
// });

// eventEmitter.on('decrease', () => {
//     console.log(`Counter decreased: ${count}`);
// });

// eventEmitter.on('zero', () => {
//     console.log('Counter is zero.');
// });

// eventEmitter.on('positive', () => {
//     console.log('Counter is positive.');
// });

// eventEmitter.on('negative', () => {
//     console.log('Counter is negative.');
// });

// // Test
// console.log('Initial counter value:', count);
// changeCounter('increase', 3); // Increase counter by 3
// changeCounter('decrease', 2); // Decrease counter by 2
// changeCounter('decrease', 2); // Decrease counter by 2 (to negative)
// changeCounter('increase', 3); // Increase counter by 3
// changeCounter('invalidAction', 1); // Test invalid action

/////////////////////////////////////////////////////////////////////////////////////



//Class-based solution


// class Counter extends EventEmitter { //const eventEmmitter = new EventEmitter(); -> we don't need this because we have inheritance, 
//     //and we don't have other instances
//     constructor() {
//         super();
//         this.count = 0; // Initialize the counter variable
//     }

//     // Method to increase the counter
//     increase() {
//         this.count++;
//         this.emit('increase'); // Emit 'increase' event
//         this.checkState(); // Check the state after increasing
//     }

//     // Method to decrease the counter
//     decrease() {
//         this.count--;
//         this.emit('decrease'); // Emit 'decrease' event
//         this.checkState(); // Check the state after decreasing
//     }

//     // Method to check the current state of the counter
//     checkState() {
//         if (this.count === 0) {
//             this.emit('zero'); // Emit 'zero' event
//         } else if (this.count > 0) {
//             this.emit('positive'); // Emit 'positive' event
//         } else {
//             this.emit('negative'); // Emit 'negative' event
//         }
//     }
// }

// // Create an instance of the Counter class
// const counter = new Counter();

// // Event listeners
// counter.on('increase', () => {
//     console.log(`Counter increased: ${counter.count}`);
// });

// counter.on('decrease', () => {
//     console.log(`Counter decreased: ${counter.count}`);
// });

// counter.on('zero', () => {
//     console.log('Counter is zero.');
// });

// counter.on('positive', () => {
//     console.log('Counter is positive.');
// });

// counter.on('negative', () => {
//     console.log('Counter is negative.');
// });

// // Test 
// try {
//     console.log('Initial counter value:', counter.count);
//     counter.increase(); // Counter: 1
//     counter.increase(); // Counter: 2
//     counter.decrease(); // Counter: 1
//     counter.decrease(); // Counter: 0
//     counter.decrease(); // Counter: -1
//     counter.increase(); // Counter: 0
//     counter.increase(); // Counter: 1
// } catch (error) {
//     console.error('An error occurred:', error.message);
// }

///////////////////////////////////////////////////////////////////

// Solution 2:

// Create an instance of EventEmitter
// class Counter extends EventEmitter {
//     constructor() {
//         super();
//         this.count = 0; // Initialize the counter variable
//     }

//     // Recursive method to change the counter
//     changeCounter(action, times) {
//         if (times <= 0) return; // Base case: stop recursion

//         // Perform the action (increase or decrease)
//         if (action === 'increase') {
//             this.count++;
//             this.emit('increase'); // Emit 'increase' event
//         } else if (action === 'decrease') {
//             this.count--;
//             this.emit('decrease'); // Emit 'decrease' event
//         }

//         // Check the state after changing the counter
//         this.checkState();

//         // Recursive call
//         this.changeCounter(action, times - 1);
//     }

//     // Method to check the current state of the counter
//     checkState() {
//         if (this.count === 0) {
//             this.emit('zero'); // Emit 'zero' event
//         } else if (this.count > 0) {
//             this.emit('positive'); // Emit 'positive' event
//         } else {
//             this.emit('negative'); // Emit 'negative' event
//         }
//     }
// }

// // Create an instance of the Counter class
// const counter = new Counter();

// // Event listeners
// counter.on('increase', () => {
//     console.log(`Counter increased: ${counter.count}`);
// });

// counter.on('decrease', () => {
//     console.log(`Counter decreased: ${counter.count}`);
// });

// counter.on('zero', () => {
//     console.log('Counter is zero.');
// });

// counter.on('positive', () => {
//     console.log('Counter is positive.');
// });

// counter.on('negative', () => {
//     console.log('Counter is negative.');
// });

// // Test
// try {
//     console.log('Initial counter value:', counter.count);
//     counter.changeCounter('increase', 3); // Increase counter by 3
//     counter.changeCounter('decrease', 2); // Decrease counter by 2
//     counter.changeCounter('decrease', 2); // Decrease counter by 2 (to negative)
//     counter.changeCounter('increase', 3); // Increase counter by 3
// } catch (error) {
//     console.error('An error occurred:', error.message);
// }

