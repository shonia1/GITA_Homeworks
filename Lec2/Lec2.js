/* 1) შექმენი ცარიელი მასივი და შეავსე მასში რიცხვები 5-დან 15-მდე
2) დაბეჭდე მასივის ელემენტები უკუღმა let arr = [1,2,3,4,5]
3) იპოვე მასივში მინიმალური რიცხვი let arr = [100,2,3,9]
4) ამოიღე შუა 3 ელემენტი slice-ით.let arr = [1,2,3,4,5,6,7]
5) გააერთიანე ორი მასივი let arr1 = [1,2] let arr2=[3,4]
6) წაშალე დუბლირებული ელემენტები let arr = [1,2,3,4,5,6,6,7,7]
7) გაყავი მასივი ორ ცალკე მასივად (ლუწი და კენტი). მინიშნება: გამოიყენე % 2 === 0  let arr = [1,2,3,4,5,6,7]
8) დაითვალე დადებითი რიცხვების რაოდენობა და უარყოფითი რიცხვების ჯამი.
let arr = [1,2,3,4,5,6,7,-1,-2,-3,-4]
9) დააბრუნე მასივის თითოეული ელემენტის ინვერსი (ანუ [1,-2] მაგივრად [-1,2]). მინიშნება: გამოიყენე push(-arr[i])
10) let arr = [1,[2,[3]],[4] შენი მიზანია მიიღო [1,2,3,4]
11)let fruits = ["apple", "banana", "orange", "kiwi"] წაშალე "banana" მასივიდან splice()-ით
"orange"-ის წინ დაამატე "mango"
ბოლოს დაბეჭდე ახალი მასივი.
splice-მ არ დაგაბნიოთ splice(საიდან დაიწოს,რამდენი წაშალოს,რითიჩაანაცვლოს) */

//1) შექმენი ცარიელი მასივი და შეავსე მასში რიცხვები 5-დან 15-მდე
{
  let arr = [];
  for (let i = 5; i < 16; i++) {
    arr.push(i);
  }
  console.log(arr);
}
//2) დაბეჭდე მასივის ელემენტები უკუღმა let arr = [1,2,3,4,5]
{
  let arr = [1, 2, 3, 4, 5];
  let reversedArr = arr.reverse();

  console.log(reversedArr);
}

//3) იპოვე მასივში მინიმალური რიცხვი let arr = [100,2,3,9]
{
  let arr = [100, 2, 3, 9];
  let sortedArr = arr.sort((a, b) => a - b);
  console.log(sortedArr[0]);
}

//4) ამოიღე შუა 3 ელემენტი slice-ით.let arr = [1,2,3,4,5,6,7]\
{
  let arr = [1, 2, 3, 4, 5, 6, 7];
  let slicedArr = arr.slice(2, -2);
  console.log(slicedArr);
}

//5) გააერთიანე ორი მასივი let arr1 = [1,2] let arr2=[3,4]
{
  let arr1 = [1, 2];
  let arr2 = [3, 4];
  let concatedArr = arr1.concat(arr2);
  console.log(concatedArr);
}

//6) წაშალე დუბლირებული ელემენტები let arr = [1,2,3,4,5,6,6,7,7]
{
  let arr = [1, 2, 3, 4, 5, 6, 6, 7, 7];
  let unique = [...new Set(arr)];
  console.log(unique);
}

//7) გაყავი მასივი ორ ცალკე მასრივში (ლუწი და კენტი) და დაბეჭდე ორივე
{
  let arr = [1, 2, 3, 4, 5, 6, 7];
  let even = [];
  let odd = [];
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (value % 2 === 0) {
      even.push(value);
    } else {
      odd.push(value);
    }
  }
  console.log(even);
  console.log(odd);
}

//8) დაითვალე დადებითი რიცხვების რაოდენობა და უარყოფითი რიცხვების ჯამი
{
  let arr = [1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4];
  let positiveCount = 0;
  let negativeSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (value > 0) {
      positiveCount++;
    } else {
      negativeSum += value;
    }
  }
  console.log(positiveCount);
  console.log(negativeSum);
}

//9) დააბრუნე მასივის თითოეული ელემენტის ინვერსი
{
  let arr = [1, -2];
  let inverted = [];
  for (let i = 0; i < arr.length; i++) {
    inverted.push(-arr[i]);
  }
  console.log(inverted);
}

//10) გაანაყყე რთული ნესტირებული მასივი ერთ რიგოვან მასივად
{
  let arr = [1, [2, [3]], [4]];
  let flattened = [];
  function flatten(item) {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        flatten(item[i]);
      }
    } else {
      flattened.push(item);
    }
  }
  flatten(arr);
  console.log(flattened);
}

//11) წაშალე "banana" და "orange"-ის წინ დაამატე "mango"
{
  let fruits = ["apple", "banana", "orange", "kiwi"];
  let bananaIndex = fruits.indexOf("banana");
  if (bananaIndex !== -1) {
    fruits.splice(bananaIndex, 1);
  }
  let orangeIndex = fruits.indexOf("orange");
  if (orangeIndex !== -1) {
    fruits.splice(orangeIndex, 0, "mango");
  }
  console.log(fruits);
}
