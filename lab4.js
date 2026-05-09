class BiDirectionalPriorityQueue {
  constructor() {
    this._items = [];
    this._counter = 0;
  }

  enqueue(item, priority) {
    this._items.push({
      item,
      priority,
      order: this._counter++,
    });
  }

  dequeue(mode) {
    if (this._items.length === 0) return null;

    let idx = 0;

    if (mode === 'highest') {
      for (let i = 1; i < this._items.length; i++) {
        if (this._items[i].priority > this._items[idx].priority) {
          idx = i;
        }
      }
    } else if (mode === 'lowest') {
      for (let i = 1; i < this._items.length; i++) {
        if (this._items[i].priority < this._items[idx].priority) {
          idx = i;
        }
      }
    }

    const removed = this._items[idx];
    this._items.splice(idx, 1);
    return removed.item;
  }
}

const queue = new BiDirectionalPriorityQueue();

queue.enqueue('low task', 1);
queue.enqueue('high task', 10);
queue.enqueue('mid task', 5);

console.log('--- dequeue highest ---');
console.log(queue.dequeue('highest'));
console.log(queue.dequeue('highest'));