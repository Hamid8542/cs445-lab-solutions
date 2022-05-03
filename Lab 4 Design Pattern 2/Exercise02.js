// Exercise 02
// Implement Decorator pattern to add a logger to any object (additional class is needed). A logger method will log a message to the console.

// When you finish, you can use the code below to test:

// const user = new User("Kelly");

// const decorated = new DecoratedUser(user, "Broadway", "New York");
// decorated.logger();

class User {
    constructor(name) {
        this.name = name;
    }
}

class DecoratedUser {

    constructor(user, street, city) {
        this.user = user;
        this.name = user.name; // ensures interface stays the same
        this.street = street;
        this.city = city;
    }

    logger() {
        console.log("Decorated User: " + this.name + ", " +
            this.street + ", " + this.city);
    };
}

var user = new User("Kelly");

var decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.logger();