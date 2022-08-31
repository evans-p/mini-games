import { FibonacciHeap } from "mathjs";
/** An extention to the fibonacci heap, provided by mathJS*/
class Heap {
  constructor() {
    this.fibonacciHeap = new FibonacciHeap();
    this.heapItems = [];

    // Binding
    this.insert = this.insert.bind(this);
    this.size = this.size.bind(this);
    this.clear = this.clear.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.extractMinimum = this.extractMinimum.bind(this);
    this.findNode = this.findNode.bind(this);
  }

  insert(key, node) {
    this.heapItems.push(node);
    this.fibonacciHeap.insert(key, node);
  }
  size() {
    return this.fibonacciHeap.size();
  }
  clear() {
    this.fibonacciHeap.clear();
    this.heapItems = [];
  }
  isEmpty() {
    return this.fibonacciHeap.isEmpty();
  }
  extractMinimum() {
    let min = this.fibonacciHeap.extractMinimum().value;
    this.heapItems = this.heapItems.filter((val) => {
      return !(val[0] === min[0] && val[1] === min[1]);
    });
    return min;
  }
  findNode(node) {
    return this.heapItems.find(
      (element) => element[0] === node[0] && element[1] === node[1]
    );
  }
}

export default Heap;
