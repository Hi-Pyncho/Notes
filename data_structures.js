

//////////СВЯЗАННЫЙ СПИСОК///////////////////

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



/////////////////////////////////////////////////////////////////////////////////
//рекурсия - если кратко, то когда функция вызывает саму себя
function func() {
  if(/*basic case*/) {
    return something
  } else { /*recursive case*/
    func();
  }
}

// factorial (!)
// 4! = 4 * 3 * 2 * 1 = 24
// 3! = 3 * 2 * 1 = 6

function factorial(num) {
  if(num === 1) {
    return num;
  } else {
    return num * factorial(num -1);
  }
}


/////////////////BINARY SEARCH TREE/////////////////////////

function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BST.prototype.insert = function(value) {
  if(value <= this.value) {
    if(!this.left) this.left = new BST(value);
    else this.left.insert(value);
  } else if(value > this.value) {
    if(!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
}

BST.prototype.contains = function(value) {
  if(value === this.value) return true;
  else if(value < this.value) {
    if(!this.left) return false;
    else return this.left.contains(value);
  }
  else if(value > this.value) {
    if(!this.right) return false;
    else return this.right.contains(value);
  }
}

//iteratorFunc
function log(value) {
  console.log(value);
}

//this.value === parent Node
BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
  if(order === 'pre-order') iteratorFunc(this.value);
  if(this.left) this.left.depthFirstTraversal(iteratorFunc, order);
  if(order === 'in-order') iteratorFunc(this.value);
  if(this.right) this.right.depthFirstTraversal(iteratorFunc, order);
  if(order === 'post-order') iteratorFunc(this.value);
}

BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
  let queue = [this];
  while(queue.length) {
    let treeNode = queue.shift();
    iteratorFunc(treeNode);
    if(treeNode.left) queue.push(treeNode.left);
    if(treeNode.right) queue.push(treeNode.right);
  }
}

BST.prototype.getMinVal = function() {
  if(this.left) return this.left.getMinVal();
  else return this.value;
}

BST.prototype.getMaxVal = function() {
  if(this.right) return this.left.getMaxVal();
  else return this.value;
}

var bst = new BST(50);

bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);



/////////////ХЕШ ТАБЛИЦА///////////////////

function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

function HashTable(size) {
this.buckets = Array(size);
this.numBuckets = this.buckets.length;
}

HashTable.prototype.hash = function(key) {
  let total = 0;
  for(let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  //модуль вернет число от 0 до 29. чтобы не вылезти за пределы хэшт-таблицы
  let bucket = total % this.numBuckets;
  return bucket;
}

HashTable.prototype.insert = function(key, value) {
  let index = this.hash(key);
  if(!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
  else if(this.buckets[index].key === key) {
    this.buckets[index].value = value;
  }
  else {
    let currentNode = this.buckets[index];
    while(currentNode.next) {
      if(currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      //теперь currentNode - последний
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
}

HashTable.prototype.get = function(key) {
  let index = this.hash(key);
  if(!this.buckets[index]) return null;
  else  {
    let currentNode = this.buckets[index];
    while(currentNode) {
      if(currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }
}

HashTable.prototype.retrieveAll = function() {
  let allNodes = [];
  for(let i = 0; i < this.numBuckets; i++) {
    let currentNode = this.buckets[i];
    while(currentNode) {
      allNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  }
  return allNodes;
}

let myHT = new HashTable(30);

myHT.hash('Becca')