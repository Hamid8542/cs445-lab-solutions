// Exercise 04
// Create a memoized version of the following fibonacci() recursive method to improve its performance.

// function fibonacci(n) {
//     if (n <= 1) {
//         return n;
//     }
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }
// You may use console.time(label) and console.timeEnd(label) to measure the difference in performance.

var fibonacci = (function () {
    var memo = {};

    function f(n) {
        var value;

        if (n in memo) {
            value = memo[n];
        } else {
            if (n === 0 || n === 1)
                value = n;
            else
                value = f(n - 1) + f(n - 2);

            memo[n] = value;
        }

        return value;
    }

    return f;
})();
// console.time(`Execution time`);
// console.log(fibonacci(8));   // 21
// console.timeEnd(`Execution time`);

console.time(`label`);
console.log(fibonacci(8));   // 21
console.timeEnd(`label`);