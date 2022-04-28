// Exercise 03
// Re-write the following code using TypeScript Class syntax. Try to be as explicit as possible and add Types to everything you can. When you are done, transpile the TS code to JS code and inspect the JS code.

// class Car {
//     constructor(name) {
//         this.name = name;
//         this.acceleration = 0;
//     }
//     honk() {
//         console.log(` ${this.name} is saying: Toooooooooot!`);
//     }
//     accelerate(speed) {
//         this.acceleration = this.acceleration + speed;
//     }
// }

// let car = new Car("BMW");
// car.honk(); // BMW is saying: Toooooooooot!
// console.log(car.acceleration); // 0
// car.accelerate(60);
// console.log(car.acceleration); // 60

class Car {
    name: string;
    acceleration: number;

    constructor(name: string) {
        this.name = name;
        this.acceleration = 0;
    }
    
    // constructor(public name: string, public acceleration: number = 0) {

    // }


    honk(): void {
        console.log(` ${this.name} is saying: Toooooooooot!`);
    }

    accelerate(speed: number): void {
        this.acceleration = this.acceleration + speed;
    }
}

let car: Car = new Car('BMW');
car.honk(); // BMW is saying: Toooooooooot!
console.log(car.acceleration); // 0
car.accelerate(60);
console.log(car.acceleration); // 60