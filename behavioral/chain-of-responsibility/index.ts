type InventoryItemType = {
  name: string;
  qty: number;
};

type WarehouseType = InventoryItemType & {
  location: string;
  deliveryTime: string;
};

const inventoryObj = {
  floor: [
    { name: "mouse pad", qty: 5 },
    { name: "master mx", qty: 15 },
    { name: "monitors", qty: 2 },
    { name: "das keyboard", qty: 2 },
  ],
  backroom: [
    { name: "mouse pad", qty: 5 },
    { name: "master mx", qty: 15 },
    { name: "desktop", qty: 2 },
    { name: "rack", qty: 1 },
  ],
  localstore: [
    { name: "das keyboard", qty: 2 },
    { name: "desktop", qty: 4 },
    { name: "wires", qty: 8 },
  ],
  warehouse: [
    { name: "mouse pad", qty: 100 },
    { name: "master mx", qty: 100 },
    { name: "all monitors", qty: 10 },
    { name: "das keyboard", qty: 20 },
    { name: "desktop", qty: 20 },
    { name: "wires", qty: 100 },
    { name: "microphone", qty: 10 },
    { name: "rack", qty: 3 },
  ],
};

/**
 * Represents a warehouse that can handle inventory and delivery of items.
 * This class is an example of the Chain of Responsibility design pattern.
 *
 * In the Chain of Responsibility pattern, each object in the chain has the ability to handle a request.
 * If it can't handle the request, it passes it to the next object in the chain.
 *
 * In this example, each warehouse represents a link in the chain.
 * The warehouses are connected in a sequence, and each warehouse has the option to handle a request or pass it to the next warehouse.
 *
 * @remarks
 * The `Warehouse` class has a private `next` property that holds the reference to the next warehouse in the chain.
 * The `setNext` method is used to set the next warehouse in the chain.
 * The `lookInLocalInventory` method is used to search for an item in the local inventory of the warehouse.
 *
 * @example
 * // Create warehouses
 * const warehouse1 = new Warehouse("Warehouse 1");
 * const warehouse2 = new Warehouse("Warehouse 2");
 * const warehouse3 = new Warehouse("Warehouse 3");
 *
 * // Set the next warehouse in the chain
 * warehouse1.setNext(warehouse2);
 * warehouse2.setNext(warehouse3);
 *
 * // Search for an item in the chain of warehouses
 * const item = warehouse1.lookInLocalInventory("Item 1");
 * if (item) {
 *   console.log("Item found in warehouse:", item);
 * } else {
 *   console.log("Item not found in any warehouse.");
 * }
 */
/**
 * Represents a warehouse that can handle inventory and delivery of items.
 */
class Warehouse {
  private next: Warehouse | null;

  /**
   * Creates an instance of Warehouse.
   * @param name - The name of the warehouse.
   * @param inventory - The inventory of the warehouse.
   * @param deliveryTime - The delivery time of the warehouse.
   */
  constructor(
    private name: string,
    private inventory: Array<InventoryItemType> = [],
    private deliveryTime = 0
  ) {
    this.name = name;
    this.inventory = inventory;
    this.deliveryTime = deliveryTime;
    this.next = null;
  }

  /**
   * Looks for an item in the local inventory of the warehouse.
   * @param itemName - The name of the item to look for.
   * @returns The item if found, otherwise undefined.
   */
  private lookInLocalInventory(itemName: InventoryItemType["name"]) {
    return this.inventory.find((item) => item.name === itemName);
  }

  /**
   * Sets the next warehouse in the chain.
   * @param newWarehouse - The next warehouse to set.
   */
  setNext(newWarehouse: Warehouse) {
    this.next = newWarehouse;
  }

  /**
   * Finds an item in the warehouse or passes the request to the next warehouse in the chain.
   * @param itemName - The name of the item to find.
   * @returns The warehouse information if the item is found, otherwise a string indicating that the item is not carried.
   */
  find(itemName: InventoryItemType["name"]): WarehouseType | string {
    const found = this.lookInLocalInventory(itemName);

    if (found) {
      return {
        ...found,
        location: this.name,
        deliveryTime:
          this.deliveryTime === 0
            ? "Now"
            : `It will be delivered in ${this.deliveryTime} day(s)`,
      };
    } else if (this.next) {
      return this.next.find(itemName);
    }
    return `We do not carry ${itemName}`;
  }
}

class Store {
  private storage: Warehouse;
  constructor(private name: string, inventory: typeof inventoryObj) {
    this.name = name;
    const floor = new Warehouse("store floor", inventory.floor);
    const backroom = new Warehouse("store backroom", inventory.backroom);
    const localstore = new Warehouse(
      "store localstore",
      inventory.localstore,
      4
    );
    const warehouse = new Warehouse("store warehouse", inventory.warehouse, 3);

    this.storage = floor;

    floor.setNext(backroom);
    backroom.setNext(localstore);
    localstore.setNext(warehouse);
  }

  find(itemName: string) {
    return this.storage.find(itemName);
  }
}

const chainShop = new Store("Chain Shop", inventoryObj);

console.log(chainShop.find("wires"));
console.log(chainShop.find("mouse pad"));
console.log(chainShop.find("rack"));
console.log(chainShop.find("microphone"));
console.log(chainShop.find("all monitors"));
console.log(chainShop.find("laptop"));
