// Exercise 01
// Implement Factory Method pattern to create two types of light bulbs: regular bulbs and energy saver bulbs.

// Regular bulbs have a range of lumens between 50 and 100 and last for 1 year.
// Energy saver bulbs have a range of lumens between 5 and 40 and last for 10 years and comes in multiple colors.
// When you finish, you can use the code below to test:

// const bulbs = [];
// const factory = new Factory();

// bulbs.push(factory.createBulb("regular"));
// bulbs.push(factory.createBulb("energy", "red"));


// for (let i = 0, len = bulbs.length; i < len; i++) {
//     console.log(bulbs[i]);
// }

class Regular {
    constructor() {
        this.range = [50, 100];
        this.age = 1;
    }
}

class Energy {
    constructor(color) {
        this.range = [5, 40];
        this.age = 10;
        this.color = color;
    }
}

class Factory {
    createBulb(type, color) {
        if (type === 'regular') {
            return new Regular();
        } else if (type === 'energy') {
            return new Energy(color);
        }
        return null;
    }
}

const factory = new Factory();
const bulbs = [];
bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));
bulbs.push(factory.createBulb("energy", "blue"));

for (let i = 0, len = bulbs.length; i < len; i++) {
    console.log(bulbs[i]);
}