"use strict";
class SplitMix64 {
    constructor(seed_) {
        this.seed = seed_;
    }
    next() {
        this.seed += 0x9e3779b97f4a7c15n;
        let z = this.seed;
        z = (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n;
        z = (z ^ (z >> 27n)) * 0x94d049b13c66a8edn;
        z = z ^ (z >> 31n);
        return z;
    }
    random() {
        const z = this.next();
        const x = z >> 11n;
        return Number(x & 0x1fffffffffffffn) / 0x20000000000000;
    }
    /**
    * generates pseudo random value between min and max
    * @param {number} min min value
    * @param {number} max max value
    * @return returns number between min and max
    *
    */
    randint(min, max) {
        return Math.floor(this.random() * (max - min) + min);
    }
}
class utilities {
    constructor() { }
    /**
    * simple copy of object by reference
    * @param {any} obj any object
    * @return simple copy of object
    *
    */
    clone(obj) {
        return { ...obj };
    }
    /**
    * deep copy of objec
    * @param {any} obj any object
    * @return deep copy of object
    *
    */
    deepclone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
module.exports = {
    utilities,
    SplitMix64
};
