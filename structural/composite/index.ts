interface Organ {
    getInformation: () => void;
    getRevenue: () => void;
}

//Leaf Class
class SimpleOrgan implements Organ {
    private readonly name: string;
    private readonly position: string;

    constructor(name: string, position: string) {
        this.name = name;
        this.position = position;
    }

    getInformation() {
        return `Name is ${this.name} and position is ${this.position}`;
    }

    getRevenue() {
    }
}

//Composite Class
class CompoundOrgan implements Organ {
    private readonly name: string;
    private children: Array<Organ>=[];

    constructor(name:string) {
        this.children = [];
        this.name = name;
    }

    add(organ:Organ) {
        this.children.push(organ);
    }

    getInformation() {
        let output = `This is ${this.name} organ`;
        output += `\n And it contains ${this.children.length} members:`;
        this.children.forEach((organ, index) => {
            output += `\n ${index + 1}-${organ.getInformation()}`;
        });
        return output;
    }

    getRevenue() {
    }
}

//Usage
const organization = new CompoundOrgan("Headquarters");
organization.add(new SimpleOrgan("Jane Doe", "HR"));
const officers = new CompoundOrgan("Officers");
officers.add(new SimpleOrgan("John Doe", "CEO"));
officers.add(new SimpleOrgan("Jen Doe", "CTO"));
organization.add(officers);
const employees = new CompoundOrgan("Employees");
employees.add(new SimpleOrgan("Jack Dorsal", "Developer"));
employees.add(new SimpleOrgan("Daisy Ryan", "Designer"));
employees.add(new SimpleOrgan("Sara Smith", "Marketer"));
organization.add(employees);
console.log(organization.getInformation());
