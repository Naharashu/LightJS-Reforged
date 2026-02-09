/**
 * @constructor seed(bigint)
 */
class SplitMix64 {
    private seed: bigint;
    constructor(seed_: bigint) {
        this.seed = seed_;
    }
    /**
     * @returns bigint(64 bit integer)
     */
    next(): bigint {
        this.seed += 0x9e3779b97f4a7c15n;
        let z: bigint = this.seed;
        z = (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n;
        z = (z ^ (z >> 27n)) * 0x94d049b13c66a8edn;
        z = z ^ (z >> 31n);
        
        return z;
    }

    /**
    * generates pseudo random value between min and max
    * @return returns number between 0 and 1
    * @example myrandom.random() -> 0.43820411523125924
    */
    random(): number {
        const z: bigint = this.next();
        const x: bigint = z >> 11n;
        return Number(x & 0x1FFFFFFFFFFFFFn) / 0x20000000000000;
    }

    /**
    * generates pseudo random value between min and max
    * @param {number} min min value
    * @param {number} max max value
    * @return returns number between min and max
    * 
    */
    randint(min: number, max: number) {
        return Math.floor(this.random() * (max - min) + min);
    }

    /**
     * @param {T} arr array of T type 
     * @returns value in random index
     */
    randomInArray<T>(arr: T[]): T {
        if(arr.length==0) throw new Error("Array has no items");
        return arr[this.randint(0, arr.length)];
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
     * 
     * @param {any} a 
     * @param {any} b 
     * @returns true if types are matched or false if not
     */
    eqTypes(a: any, b: any) {
        return (typeof a == typeof b);
    }
}

module.exports = {
    utilities,
    SplitMix64
}