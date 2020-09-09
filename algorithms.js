///////////FIZ BUZZ//////////////

function fizzBuzz(num) {
  for(let i = 1; i <= num; i++) {
    if(i % 15 === 0) console.log('FizzBuzz');
    else if(i % 3 === 0) console.log('Fizz');
    else if(i % 5 === 0) console.log('Buzz');
    else console.log(i);
  }
}

function FizzBuzz(num) {
  const fizz = num % 3 === 0;
  const buzz = num % 5 === 0;
  return fizz && buzz ? 'fizzBuzz' 
         : fizz ? 'fizz' 
         : buzz ? 'Buzz'
         : num;
}



/////////HARMLESS RANSOM NOTE////////////

//Linear Time Complexity O(n) or O(n + m)

function harmlessRansomNote(noteText, magazineText) {
  let noteArr = noteText.split(' ');
  let magazineArr = magazineText.split(' ');
  let magazineObj = {};

  magazineArr.forEach(word => {
    if(!magazineObj[word]) magazineObj[word] = 0;
    magazineObj[word]++;
  })

  let noteIsPossible = true;

  noteArr.forEach(word => {
    if(magazineObj[word]) {
      magazineObj[word] --;
      if(magazineObj[word] < 0) noteIsPossible = false;
    }
    else noteIsPossible = false;
  })

  return noteIsPossible;
}

harmlessRansomNote('', 'this is all the magazine text in the magazine');


///////////IS PALINDROME///////////////

function isPalindrome(string) {
  string = string.toLowerCase();
  let charactersArr = string.split('');
  let validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  let lettersArr = charactersArr.filter(char => validCharacters.indexOf(char) > -1)

  return lettersArr.join('') === lettersArr.reverse().join('');
}

console.log(isPalindrome("Madam, i'm Adam"))



/////////////CAESAR CIPHER/////////////

function caesarCipher(str, num) {
  //если входное Num будет большим(300), то решить это можно модулем
  //теперь число может быть от -25 до 25
  num = num % 26;
  let lowerCaseString = str.toLowerCase();
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let newString = '';

  for(let i = 0; i < lowerCaseString.length; i++) {
    let currentLetter = lowerCaseString[i];

    if(currentLetter === ' ') {
      newString += currentLetter;
      continue;
    }

    let currentIndex = alphabet.indexOf(currentLetter);
    let shiftIndex = currentIndex + num;

    if(shiftIndex > alphabet.length - 1) shiftIndex = shiftIndex - alphabet.length;
    if(shiftIndex < 0) shiftIndex = alphabet.length + shiftIndex;
    if(str[i] === str[i].toUpperCase()) newString += alphabet[shiftIndex].toUpperCase();
    else newString += alphabet[shiftIndex];
  }

  return newString;
}

console.log(caesarCipher('tomaz jom', 2))


////////////REVERSE WORDS////////////////

//no Array.reverse() method

function reverseWord(word) {
  let reversedWord = '';

  for(let i = word.length - 1; i >= 0; i--) {
    reversedWord += word[i];
  }

  return reversedWord;
}

function reverseString(string) {
  let stringArr = string.split(' ');

  return stringArr.map(word => reverseWord(word)).join(' ');
}


console.log(reverseString('Time to grow up'))



//////////REVERSE ARRAY IN PLACE/////////////

//no Array.reverse() method
// no create new array in the loop and push in it

let array = ['one', 'two', 'three'];

function reverseArrayInPlace(array) {
  for(let i = 0; i < array.length / 2; i++) {
    let tempVar = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = tempVar;
  }
  return array;
}

console.log(reverseArrayInPlace(array))
//["three", "two", "one"]



/////////MEAN MEDIAN MODE//////////


function getMean(array) {
  return array.reduce((total, num) => total + num, 0) / array.length;
}


function getMedian(array) {
  array.sort();
  let median;

  if(array.length % 2 !== 0) {
    median = array[Math.floor(array.length / 2)];
  }
  else {
    let mid1 = array[array.length / 2 - 1]
    let mid2 = array[array.length / 2];
    median = (mid1 + mid2) / 2;
  }

  return median;
}


function getMode(array) {
  let modeObj = {};

  array.forEach(num => {
    if(!modeObj[num]) modeObj[num] = 0;
    modeObj[num]++;
  })

  let maxFrequency = 0;
  let modes = [];

  for(let num in modeObj) {
    if(modeObj[num] > maxFrequency) {
      modes = [num];
      maxFrequency = modeObj[num];
    }
    else if(modeObj[num] === maxFrequency) modes.push(num);
  }

  if(modes.length === Object.keys(modeObj).length) modes = [];

  return modes;
}


function meanMedianMode(array) {
  return {
    mean: getMean(array),
    median: getMedian(array),
    mode: getMode(array)
  }
}

console.log(meanMedianMode([1, 2, 3, 4, 5, 4, 6, 1]));
// {mean: 3.25, median: 3.5, mode: Array(2)}
//   mean: 3.25
//   median: 3.5
//   mode: (2) ["1", "4"]

console.log(meanMedianMode([9, 10, 23, 10, 23, 9]));
// {mean: 14, median: 23, mode: Array(0)}
//   mean: 14
//   median: 23
//   mode: []


////////////TWO SUM////////////////

function twoSum(numArray, sum) {
  let pairs = [];
  let hashtable = [];

  for(let i = 0; i < numArray.length; i++) {
    let currentNum = numArray[i];
    let counterpart = sum - currentNum;

    if(hashtable.indexOf(counterpart) !== -1) {
      pairs.push([currentNum, counterpart]);
    }

    hashtable.push(currentNum);
  }

  return pairs;

}

console.log(twoSum([1, 6, 4, 5, 3, 3], 7));
//[[6, 1], [3, 4], [3, 4]]


////////////BINARY SEARCH//////////////

//recursive version

function binarySearch(numArray, key) {
  let midIndex = Math.floor(numArray.length / 2);
  let midElement = numArray[midIndex];

  if(midElement === key) return true;
  else if(midElement < key && numArray.length > 1) {
    return binarySearch(numArray.splice(midIndex, numArray.length), key);
  }
  else if(midElement > key && numArray.length > 1) {
    return binarySearch(numArray.splice(0, midIndex), key);
  }
  else return false;
}

//no-recursive version

function binarySearch(array, key) {
  let low = 0;
  let high = array.length - 1;
  let mid;
  let element;

  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    element = array[mid];

    if(element < key) low = mid + 1;
    else if(element > key) high = mid - 1;
    else return mid;
  }
  
  return - 1;
}

/////////////FIBONACCI/////////////////

//with recursive
//but it has bad a time complexity O(n^2)
//SLOOOOOOOOOW
function fibonacci(position) {
  if(position < 3) return 1;
  else return fibonacci(position - 1) + fibonacci(position - 2);
}

///FASTER
//without recursive, but it is more efficient
function fibonacci(position) {
  let fibStart = [1, 1];
  for(let i = 0; i < fibStart.length; i++) {
    fibStart.push(fibStart[i] + fibStart[i + 1]);
    if(i === position - 1) return fibStart[i];
  }
}

console.log(fibonacci(0))

///FASTER THAN PREVIOUS
//Memoized Fibonacci(Мемоизация)

function fibMemo(index, cache) {
  cache = cache || [];
  if(cache[index]) return cache[index];
  else {
    if(index < 3) return 1;
    else {
      cache[index] = fibMemo(index - 1, cache) + fibMemo(index - 2, cache);
    }
  }

  return cache[index];
}

///EVEN FASTER THAN PREVIOUS
function fibonacci3(position, cache) {
  cache = cache || [1, 1];
  for(let i = 0; i < cache.length; i++) {
    cache.push(cache[i] + cache[i + 1]);
    if(i === position - 1) return cache[i];
  }
}



//////////SIEVE OF ERATOSTHENES////////////

//return all prime numbers(простые числа)
//Решето Эратосфена

//only loops, no specific methods
function sieveOfEratosthenes(num) {
  let primes = [];

  for(let i = 2; i <= num; i++) {
    primes[i] = true;
  }

  for(let i = 2; i ** 2 <= num; i++) {
    if(primes[i] === true) {
      for(let j = 2; j * i <= num; j++) {
        primes[i * j] = false;
      }
    }
  }

  let result = [];

  for(let i = 2; i < primes.length; i++) {
    if(primes[i]) result.push(i);
  }

  return result;
}


//без решета, но тоже ищет простые числа
//сразу без четных для экономии памяти

function isPrime(num) {
  if (num <= 1) return false;
  else if (num === 2) return true;
  else {
    for (let i = 2; i < num; i++) {
      if (num % i === 0)
        return false;
    }
      return true;
  }
}

function sieveOfEratosthenes2(num) {
  let sieve = [2];

  for(let i = 3; i <= num; i += 2) {
    sieve.push(i);
  }

  return sieve.filter(isPrime);;
}


/////BUBBLE SORT/////
//number of passes = array - 1

function bubbleSort2(array) {
  for(let i = array.length; i > 0; i--) {
    for(let j = 0; j < i; j++) {
      if(array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}


/////////MERGE SORT//////////

function mergeSort(arr) {
  if(arr.length < 2) return arr;

  let middleIndex = Math.floor(arr.length / 2);
  let firstHalf = arr.slice(0, middleIndex);
  let secondHalf = arr.slice(middleIndex);

  return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

function merge(arr1, arr2) {
  let result = [];

  while(arr1.length && arr2.length) {
    let minElem;

    if(arr1[0] < arr2[0]) minElem = arr1.shift();
    else minElem = arr2.shift();

    result.push(minElem);
  }

  if(arr1.length) result = result.concat(arr1);
  else result = result.concat(arr2);

  return result;
}


////////////MAX STOCK PROFIT//////////////

//first way
function maxStockProfit(pricesArr) {
  let maxProfit = -1;
  let buyPrice = 0;
  let sellPrice = 0;
  let changeBuyPrice = true;

  for(let i = 0; i < pricesArr.length; i++) {
    if(changeBuyPrice) buyPrice = pricesArr[i];
    sellPrice = pricesArr[i + 1];

    if(sellPrice < buyPrice) changeBuyPrice = true;
    else {
      let tempProfit = sellPrice - buyPrice;
      if(tempProfit > maxProfit) maxProfit = tempProfit;
      changeBuyPrice = false;
    }
  }
  return maxProfit;
}

//second way
const maxStockProfit2 = arr => {
  let maxProfit = 0; // initialize max
  let buyPrice = arr[0];

  for(let i = 1; i < arr.length; i++){
      let sellPrice = arr[i];

      if(sellPrice < buyPrice) buyPrice = sellPrice;
      else {
        let profit = sellPrice - buyPrice;
        console.log(maxProfit, profit)
        maxProfit = Math.max(profit, maxProfit);
      }
  }

  return maxProfit;
}


let array = [32, 46, 26, 38, 40, 48, 42];