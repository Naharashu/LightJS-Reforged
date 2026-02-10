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
    * json copy of objec
    * @param {any} obj any object
    * @return json copy of object
    * 
    */
    jsonclone(obj: any) {
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

    /**
     * @param {number} ms time to wait in miliseconds 
     * @returns promise
     */
    wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class sorting {
    constructor() {}

    /**
     * InsertionSort, time complexity: O(n^2)
     * @param {number} arr unsorted array
     * @returns sorted array
     */
    InsertionSort(arr: number[]): number[] {
        if(arr.length == 0 || arr.length == 1) {
            return arr;
        }
        let sorted: number[] = arr;
        let j: number = 0;
        for(let i = 1;i<arr.length;i++) {
            let el = arr[i];
            j = i-1;
            while(j>=0&&arr[j]>el) {
                arr[j+1] = arr[j];
                j=j-1;
            }
            arr[j+1] = el;
        }
        return sorted;
    }

    /**
     * ShellSort with Knuts gap sequence, Time complexity: O(n^(3/2))
     * @param {number[]} array unsorted array 
     * @returns sorted array
     */
    ShellSort(array: number[]): number[] {
        if(array.length == 0 || array.length == 1) {
            return array;
        }
        let arr: number[] = array;
        let gap = 1;
        while(gap < arr.length) gap = 3 * gap + 1;
        let temp: number;
        let j: number = 0;
        while(gap>=1) {
            for(let i=gap;i<arr.length;i++) {
                temp = arr[i];
                j=i;
                while(j>=gap&&arr[j-gap]>temp) {
                    arr[j] = arr[j-gap];
                    j-=gap;
                }
                arr[j] = temp;
            }
            gap = Math.floor(gap/3);
        }
        return arr;
    }

    /**
     * swap values of two variables
     * @param {any} a - fist var(b=a) 
     * @param {any} b - second var(a=b) 
     * @returns void
     */
    swap(a: any, b: any): void {
        const c: any = a;
        a = b;
        b = c;
        return;
    }

    partition_qsort(arr: number[], low: number, high: number): number {
        let pivot: number = arr[high];
        let i: number = low-1;
        for(let j=0;j<high;j++) {
            if(arr[j]<=pivot) {
                i+=1;
                this.swap(arr[i+1], arr[high]);
            }
        }
        return i+1;
    }

    /**
     * QuickSort, Time complexity: O(n log n)
     * @param {number[]} arr unsorted array 
     * @returns sorted array
     */
    QuickSort(arr: number[], low: number, high: number): number[] {
        if(arr.length == 0 || arr.length == 1) {
            return arr;
        }
        let copy: number[] = arr;
        if(low<high) {
            let index: number = this.partition_qsort(copy, low, high);
            this.QuickSort(copy, low, index-1);
            this.QuickSort(copy, index+1, high);
        }
        return copy;
    }
}

module.exports = {
    utilities,
    SplitMix64,
    sorting
}