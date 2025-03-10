import { EventEmitter } from "events";


class Counter extends EventEmitter { //const eventEmmitter = new EventEmitter(); -> we don't need this because we have inheritance, 
    //and we don't have other instances
    constructor() {
        super();
        this.count = 0; // Initialize the counter variable
    }

    // Method to increase the counter
    increase() {
        this.count++;
        this.emit('increase'); // Emit 'increase' event
        this.checkState(); // Check the state after increasing
    }

    // Method to decrease the counter
    decrease() {
        this.count--;
        this.emit('decrease'); // Emit 'decrease' event
        this.checkState(); // Check the state after decreasing
    }

    // Method to check the current state of the counter
    checkState() {
        if (this.count === 0) {
            this.emit('zero'); // Emit 'zero' event
        } else if (this.count > 0) {
            this.emit('positive'); // Emit 'positive' event
        } else {
            this.emit('negative'); // Emit 'negative' event
        }
    }
}

// Create an instance of the Counter class
const counter = new Counter();

// Event listeners
counter.on('increase', () => {
    console.log(`Counter increased: ${counter.count}`);
});

counter.on('decrease', () => {
    console.log(`Counter decreased: ${counter.count}`);
});

counter.on('zero', () => {
    console.log('Counter is zero.');
});

counter.on('positive', () => {
    console.log('Counter is positive.');
});

counter.on('negative', () => {
    console.log('Counter is negative.');
});

// Test 
try {
    console.log('Initial counter value:', counter.count);
    counter.increase(); // Counter: 1
    counter.increase(); // Counter: 2
    counter.decrease(); // Counter: 1
    counter.decrease(); // Counter: 0
    counter.decrease(); // Counter: -1
    counter.increase(); // Counter: 0
    counter.increase(); // Counter: 1
} catch (error) {
    console.error('An error occurred:', error.message);
}

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

