class SplitMix64 {
    private seed: number;
    constructor(seed_: number) {
        this.seed = seed_;
    }

    next() {
        this.seed += 0x9e3779b97f4a7c15;
        let z: number = this.seed;
        z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9
        z = (z ^ (z >> 27)) * 0x94d049b13c66a8ed
        z = z ^ (z >> 31)
        
        return (z >> 11) / 9007199254740992.0
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
    clone(obj: any) {
        return { ...obj };
    }

    /**
    * deep copy of objec
    * @param {any} obj any object
    * @return deep copy of object
    * 
    */
    deepclone(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
    * generates pseudo random value between min and max
    * @param {number} min min value
    * @param {number} max max value
    * @return number between a and b
    * 
    */

}

module.exports = {
    utilities,
    SplitMix64
}