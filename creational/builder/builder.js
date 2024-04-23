// Description: Implementing the builder pattern in JavaScript
class Person {
    constructor(name, gender, weight, height) {
        this.name = name;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
    }
}

// Builder class
class PersonBuilder {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }

    setWeight(weight) {
        this.weight = weight;
        return this; // return this(instance of the object) to allow chaining
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    builder() {
        return new Person(this.name, this.gender, this.weight, this.height);
    }
}

const patrickBuilt = new PersonBuilder("Jack", "Male")
    .setHeight(170)
    .setWeight(65)
    .builder();

console.log(patrickBuilt); // output: Person { gender: "Male", height: 170, name: "Jack", weight: 65}