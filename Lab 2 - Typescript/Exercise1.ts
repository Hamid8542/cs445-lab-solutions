// Exrecise 1
// Re - write the following code using TypeScript.Try to be as explicit as possible and add Types
// to everything you can.When you are done, transpile the TS code to JS code and inspect the JS code.

// class University {
//     constructor(name, dept) {
//         this.name = name;
//         this.dept = dept;
//     }
//     graduation(year) {
//         console.log(`Graduating ${this.dept} ${year} students`);
//     }
// }

// let miu = new University("MIU", "MSD");
// miu.graduation(2021);

class University  {
    name: string;
    dept: string
    constructor(name: string, dept: string) {
        this.name = name;
        this.dept = dept;
    }
    graduation(year: number): void{
        console.log(`Graduating ${this.dept} ${year} students`);
    }
}

let miu: University = new University("MIU", "MSD");
miu.graduation(2022);