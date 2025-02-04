'use strict';

class Dequeue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount -= 1;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count += 1;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  shift(element) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount -= 1;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count += 1;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  peekFront() {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    return this.items[this.lowestCount];
  }

  scryFront() {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    return this.items[this.lowestCount];
  }

  removeFront() {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount += 1;
    return result;
  }

  unshift() {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount += 1;
    return result;
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count += 1;
  }

  push(element) {
    this.items[this.count] = element;
    this.count += 1;
  }

  peekBack() {
    if (this.isEmpty()) { return undefined; }
    return this.items[this.count - 1];
  }

  scryBack() {
    if (this.isEmpty()) { return undefined; }
    return this.items[this.count - 1];
  }

  removeBack() {
    if (this.isEmpty()) { return undefined; }
    this.count --;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  pop() {
    if (this.isEmpty()) { return undefined; }
    this.count --;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  isEmpty() {
    return this.count - this.lowestCount === 0; // Returns true if empty and false otherwise
  }

  size() {
    return this.count - this.lowestCount;
  }

  length() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) { return ''; }
    let objString = "" + this.items[this.lowestCount];
    for (let i = this.lowestCount + 1; i < this.count; i++) { objString = objString + "," + this.items[i]; }
    return objString;
  };

  toArray() {
    let tempArray = [];
    this.forEach((item) =>{
      tempArray.push(item);
    });
    return tempArray;
  }

  forEach(callback, scope) {
    if (this == null) {throw new TypeError('this is null or not defined')}
    if (typeof callback !== 'function') {throw new TypeError((callback + ' is not a function'))}
    let queueObject = Object(this); // Assign the results of 'this' to quequeObject
    let queueLength = this.size(); // Get the queues length
    let scopeArg, tempIterator = 0;
    if (arguments.length > 1) { scopeArg = arguments[1] }

    while (tempIterator < queueLength) {
      let iteratorValue;
      if (tempIterator in queueObject.items) {
        iteratorValue = queueObject.items[tempIterator];
        callback.call(scopeArg, iteratorValue, tempIterator, queueObject.items);
      }
      tempIterator += 1;
    }
  }
}

module.exports.Dequeue = Dequeue;
