interface RoomInterface {
  getDescription(): string;

  getPrice(): number;
}

// Base Object
class BasicRoom implements RoomInterface {
  getDescription() {
    return "Base Room";
  }

  getPrice() {
    return 2.0;
  }
}

//Base Decorator
class BaseDecorator implements RoomInterface {
  protected room: RoomInterface;

  constructor(room: RoomInterface) {
    this.room = room;
  }

  getDescription() {
    return this.room.getDescription();
  }

  getPrice() {
    return this.room.getPrice();
  }
}

//Usage
class WifiDecorator extends BaseDecorator {
  getDescription() {
    return `${super.getDescription()} + Wifi`;
  }

  getPrice() {
    return super.getPrice() + 0.2;
  }
}

class BreakfastDecorator extends BaseDecorator {
  getDescription() {
    return `${super.getDescription()} + Breakfast`;
  }

  getPrice() {
    return super.getPrice() + 2;
  }
}

const room = new BasicRoom();

console.log("Description: ", room.getDescription());
console.log("Price: ", room.getPrice());
// Description:  Base Room
// Price:  2

let room2 = new BasicRoom();

room2 = new WifiDecorator(room2);
console.log("Description : ", room2.getDescription());
console.log("Price: ", room2.getPrice());
// Description :  Base Room + Wifi
// Price:  2.2