interface Observer {
  update: (payload: any) => void;
}

class Subject {
  private observers: Array<Observer> = []; // array of observer functions

  subscribe(fn: Observer) {
    this.observers.push(fn);
  }

  unsubscribe(fnToRemove: Observer) {
    this.observers = this.observers.filter((fn) => {
      if (fn !== fnToRemove) return fn;
    });
  }

  fire(payload: any) {
    this.observers.forEach((observer) => observer.update(payload));
  }
}

const subject = new Subject();

class Observer1 implements Observer {
  constructor() {
    console.log(`This is observer 1`);
  }
  update(payload: any) {
    console.log(`This is payload`, payload);
  }
}

class Observer2 implements Observer {
  constructor() {
    console.log(`This is observer 2`);
  }

  update(payload: any) {
    console.log(`This is payload`, payload);
  }
}

subject.subscribe(new Observer1());
