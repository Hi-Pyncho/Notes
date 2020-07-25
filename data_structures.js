//реализация связанного списка

function LinkedList() {
  this.head = null;
  this.tail = null;
}


function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

let node1 = new Node(30, 'node2', null);

LinkedList.prototype.addToHead = function(value) {
  let newNode = new Node(value, this.head, null);

  if(this.head) this.head.prev = newNode;
  else this.tail = newNode;

  this.head = newNode;
}

LinkedList.prototype.addTotail = function(value) {
  let newNode = new Node(value, null, this.tail);

  if(this.tail) this.tail.next = newNode;
  else this.head = newNode;

  this.tail = newNode;
}

LinkedList.prototype.removeHead = function() {
  if(!this.head) return null;

  let val = this.head.value;
  this.head = this.head.next;

  if(this.head) this.head.prev = null;
  else this.tail = null;

  return val;
}

LinkedList.prototype.removeTail = function() {
  if(!this.tail) return null;

  let val = this.tail.value;
  this.tail = this.tail.prev;

  if(this.tail) this.tail.next = null;
  else this.head = null;

  return val;
}

LinkedList.prototype.search = function(searchValue) {
  let currentNode = this.head;
  while(currentNode) {
    if(currentNode.value === searchValue) return currentNode.value;
    currentNode = currentNode.next;
  }
  return null;
}

LinkedList.prototype.indexOf = function(value) {
  let currentNode = this.head;
  let currentIndex = 0;
  while(currentNode) {
    if(currentNode.value === value) return currentIndex;
    currentNode = currentNode.next;
    currentIndex++;
  }
  return -1;
}


LinkedList.prototype.indexOfAll = function(value) {
  let indexes = [];
  let currentNode = this.head;
  let currentIndex = 0;
  while(currentNode) {
    if(currentNode.value === value) indexes.push(currentIndex);
    currentNode = currentNode.next;
    currentIndex++;
  } 
  return !indexes ? -1 : indexes;
}

let LL = new LinkedList();

LL.addToHead(100);
LL.addToHead(101);
LL.addToHead(102);
LL.addTotail(99);
LL.addTotail(98);
LL.addTotail(102);
LL.addTotail(99);


console.log(LL.indexOfAll(102));

