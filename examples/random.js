const lightjs = require('../src/light');

const SplitMix = new lightjs.SplitMix64(BigInt(Date.now()));

const min = 1;
const max = 100;

let arr = [
    "Apple",
    "Banana",
    "Orange"
]

console.log("Next value: " + SplitMix.next());
console.log("Random value between 0 and 1: " + SplitMix.random());
console.log("Random value between min and max: " + SplitMix.randint(min, max));
console.log("Random value in array: " + SplitMix.randomInArray(arr));
