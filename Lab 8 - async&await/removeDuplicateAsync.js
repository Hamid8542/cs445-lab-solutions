// Create a method named removeDuplicatesAsync which works only for Array types and removes all duplicates for any array asynchornously. You MUST use async & await When you finish, test using the code below:

// console.log(`start`);
// [4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
// console.log(`end`);

// Output:
// start
// end
// [4, 1, 5, 7, 2, 3, 6]

Array.prototype.removeDuplicatesAsync = async function() {
    console.log(await [...new Set(this)]);
}

console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);

// Output:
// start
// end
// [4, 1, 5, 7, 2, 3, 6]