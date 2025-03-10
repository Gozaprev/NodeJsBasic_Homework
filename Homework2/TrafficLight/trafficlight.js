import { EventEmitter } from "events";
import chalk from 'chalk';

const eventEmmitter = new EventEmitter();

// One of the solutions:

// class TrafficLight extends EventEmitter {
//     constructor() {
//         super();
//         this.setupEvents();
        
//     }

//     setupEvents() {
//         this.on('red', this.showRed);
//         this.on('yellow', this.showYellow);
//         this.on('green', this.showGreen);
//     }

//     showRed() {
//         console.log(chalk.bgRed(' RED '));
//         setTimeout(() => {
//             this.emit('yellow');
//         }, 3000); 
//     }

//     showYellow() {
//         console.log(chalk.bgYellow(' YELLOW '));
//         setTimeout(() => {
//             this.emit('green');
//         }, 3000); 
//     }

//     showGreen() {
//         console.log(chalk.bgGreen(' GREEN '));
//         setTimeout(() => {
//             this.emit('red');
//         }, 3000); 
//     }

//     start() {
//         this.emit('red'); // Start the traffic light with red
//     }
// }

// const trafficLight = new TrafficLight();
// trafficLight.start();

/////////////////////////////////////////////////////////////////////////

// Different solution:

class TrafficLight {
    constructor() {
        this.currentLight = 'red'; 
    }

    start() {
        this.showLight(this.currentLight);
    }

    showLight(light) {
        switch (light) {
            case 'red':
                console.log(chalk.bgRed(' RED '));
                this.currentLight = 'yellow';
                break;
            case 'yellow':
                console.log(chalk.bgYellow(' YELLOW '));
                this.currentLight = 'green';
                break;
            case 'green':
                console.log(chalk.bgGreen(' GREEN '));
                this.currentLight = 'red';
                break;
            default:
                return; 
        }

        
        setTimeout(() => {
            this.showLight(this.currentLight);
        }, 3000); 
    }
}

const trafficLight = new TrafficLight();
trafficLight.start();