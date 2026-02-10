import * as lightjs from '../src/light.js';

const sort = new lightjs.sorting;

let arr = [9,8,7,6,5,4,3,2,1,0];
console.log("Unsorted: " + arr);
console.log("Sorted(Insertion): " + sort.InsertionSort(arr) + " - O(n^2)");
console.log("Sorted(Shell): " + sort.ShellSort(arr) + " - O(n^(3/2))");
console.log("Sorted(Quick): " + sort.QuickSort(arr) + " - O(n log n)");