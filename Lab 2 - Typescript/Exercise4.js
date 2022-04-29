// Exercise 04
// Re-write the following code using TypeScript Class syntax.
// Try to be as explicit as possible and add Types to everything you can.
// When you are done, transpile the TS code to JS code and inspect the JS code.
// let baseObject = {
// 	width: 0,
// 	length: 0
// };
// let rectangle = Object.create(baseObject);
// rectangle.width = 5;
// rectangle.length = 2;
// rectangle.calcSize = function() {
// 	return this.width * this.length;
// };
// console.log(rectangle.calcSize()); // 10
// Option-1
// let baseObject: {
//     width: number,
//     length: number
// } = {
// 	width: 0,
// 	length: 0
// };
// let rectangle: any = Object.create(baseObject);
// rectangle.width = 5;
// rectangle.length = 2;
// rectangle.calcSize = function(): number {
// 	return this.width * this.length;
// };
// console.log(rectangle.calcSize()); // 10
// Option-2
var baseObject;
baseObject = {
    width: 0,
    length: 0
};
var rectangle = Object.create(baseObject);
rectangle.width = 5;
rectangle.length = 2;
rectangle.calcSize = function () {
    return this.width * this.length;
};
console.log(rectangle.calcSize()); // 10
var square = Object.create(baseObject);
square.width = 5;
square.length = 5;
square.calcSize = function () {
    return this.width * this.length;
};
console.log(square.calcSize()); // 25
