class Developer {
  constructor(name) {
    this.name = name;
    this.type = "Developer";
  }
}

class Tester {
  constructor(name) {
    this.name = name;
    this.type = "Tester";
  }
}

class EmployeeFactory {
  create(name, type) {
    switch (type) {
      case 1:
        return new Developer(name);

      case 2:
        return new Tester(name);
    }
  }
}

function say() {
  console.log(`Hi I am ${this.name} and I am a ${this.type}`);
}

const employeeFactory = new EmployeeFactory();
const employees = [];

employees.push(employeeFactory.create("Shayan", 1));
employees.push(employeeFactory.create("Sam", 1));
employees.push(employeeFactory.create("Elon", 2));
employees.push(employeeFactory.create("Jef", 2));

employees.forEach((emp) => {
  say.call(emp);
});
