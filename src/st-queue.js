const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {
  constructor() {
    this.queue = null;
  }

  getUnderlyingList() {
    return this.queue;
  }

  enqueue(value) {
    if (!this.queue) this.queue = new ListNode(value);
    else if (!this.queue.next) this.queue.next = new ListNode(value);
    else {
      let next = this.queue.next;
      while (next.next) {
        next = next.next;
      }
      next.next = new ListNode(value);
    }
  }

  dequeue() {
    let removed = this.queue.value;
    this.queue = this.queue.next;
    return removed;
  }
};
