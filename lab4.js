class BiDirectionalPriorityQueue {
  constructor() {
    this._items = [];
    this._counter = 0;
  }

  enqueue(item, priority) {
    const entry = { item, priority, order: this._counter++ };

    let i = 0;
    while (i < this._items.length && this._items[i].priority <= priority) {
      i++;
    }
    this._items.splice(i, 0, entry);
  }

  dequeue(mode) {
    if (this._items.length === 0) return null;

    let idx;

    if (mode === 'highest') {
      idx = this._items.length - 1;
    } else if (mode === 'lowest') {
      idx = 0;
    } else if (mode === 'oldest') {
      idx = 0;
      for (let i = 1; i < this._items.length; i++) {
        if (this._items[i].order < this._items[idx].order) {
          idx = i;
        }
      }
    } else if (mode === 'newest') {
      idx = 0;
      for (let i = 1; i < this._items.length; i++) {
        if (this._items[i].order > this._items[idx].order) {
          idx = i;
        }
      }
    }

    const removed = this._items[idx];
    this._items.splice(idx, 1);
    return removed.item;
  }

  peek(mode) {
    if (this._items.length === 0) return null;

    if (mode === 'highest') return this._items[this._items.length - 1].item;
    if (mode === 'lowest') return this._items[0].item;
    if (mode === 'oldest') {
      return this._items.reduce((a, b) => (a.order < b.order ? a : b)).item;
    }
    if (mode === 'newest') {
      return this._items.reduce((a, b) => (a.order > b.order ? a : b)).item;
    }

    return null;
  }
}

export { BiDirectionalPriorityQueue };

const queue = new BiDirectionalPriorityQueue();

queue.enqueue('low task', 1);
queue.enqueue('high task', 10);
queue.enqueue('mid task', 5);
queue.enqueue('urgent task', 8);

console.log('--- peek ---');
console.log('highest:', queue.peek('highest'));
console.log('lowest:', queue.peek('lowest'));
console.log('oldest:', queue.peek('oldest'));
console.log('newest:', queue.peek('newest'));

console.log('\n--- dequeue highest ---');
console.log(queue.dequeue('highest'));
console.log(queue.dequeue('highest'));

console.log('\n--- dequeue oldest/newest ---');
const q2 = new BiDirectionalPriorityQueue();
q2.enqueue('first', 5);
q2.enqueue('second', 5);
q2.enqueue('third', 5);
console.log('oldest:', q2.dequeue('oldest'));
console.log('newest:', q2.dequeue('newest'));
