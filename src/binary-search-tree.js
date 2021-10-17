const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) this._root = new Node(data);

    let current = this._root;
    while (current) {
      if (data === current.data) return undefined;
      if (data < current.data) {
        if (current.left === null) {
          current.left = new Node(data);
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(data);
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let found = false;
    let current = this._root;

    if (!this._root) return found;

    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return false;
    return true;
  }

  find(data) {
    let current = this._root;
    let found = null;

    if (!this._root) return found;

    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = current;
      }
    }
    return found;
  }

  remove(data) {
    const removeNode = (position, value) => {
      if (position === null) return position;
      if (value === position.data) {
        if (position.right === null && position.left === null) {
          return null;
        } else if (position.left === null) {
          return position.right;
        } else if (position.right === null) {
          return position.left;
        } else {
          let min = this.min(position.right.data);
          console.log(min);
          position.right = removeNode(position.right, min);
          position.data = min;

          return position;
        }
      } else if (value < position.data) {
        position.left = removeNode(position.left, value);
        return position;
      } else {
        position.right = removeNode(position.right, value);

        return position;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min(value = this._root) {
    if (this._root === null) return null;
    if (this.find(value) === null) return null;
    if (value !== this._root) value = this.find(value);
    if (!value.left) return value.data;
    let current = value;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) return null;
    if (!this._root.right) return this._root.data;
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
};
