/* 1)დაალაგე ზრდადობით და ამოიღე უნიკალურები გამოიყენე ForLoop */

{
  let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]];
  let sorted = arr.flat(Infinity).sort((a, b) => a - b);
  let unique = [];
  for (let i of sorted) {
    if (!unique.includes(i)) {
      unique.push(i);
    }
  }
  console.log(sorted);
  console.log(unique);
}

/* 2)იპოვე ყველაზე მაღალი rating-ის მქონე პროდუქტი, მაგრამ ისეთი, რომლის ფასიც < 1000. */

{
  let products = [
    { name: "Phone", price: 1200, rating: 4.5 },
    { name: "Laptop", price: 2500, rating: 4.8 },
    { name: "Book", price: 30, rating: 4.9 },
    { name: "TV", price: 800, rating: 4.0 },
  ];

  let filteredProducts = products.filter((el) => el.price < 1000);
  console.log(filteredProducts);

  let sortByRating = filteredProducts.sort((a, b) => b.rating - a.rating);
  console.log(sortByRating);

  let highestRating = sortByRating[0];
  console.log(highestRating);
}

/* 3)რედიუსის დახმარებით დათვალე რომელი რამდენჯერ მეორდება 
და for ლუპის დახმარებით იპოვე მეტჯერგამეორებული */

{
  let sentence = "dog cat dog bird cat dog fish bird";
  let splitSentence = sentence.split(" ");
  console.log(splitSentence);

  let reduceSentence = splitSentence.reduce((tot, cur) => {
    if (tot[cur]) {
      tot[cur]++;
    } else {
      tot[cur] = 1;
    }
    return tot;
  }, {});

  console.log(reduceSentence);

  let count = 0;
  let maxRepeat = "";
  for (let item in reduceSentence) {
    if (reduceSentence[item] > count) {
      count = reduceSentence[item];
      maxRepeat = item;
    }
  }

  console.log(count);
  console.log(maxRepeat);
}

/* ForLoop tasks

1)დაწერე ფუნქცია for loop-ის გამოყენებით, რომელიც დაითვლის 
რამდენჯერ გვხვდება კონკრეტული ასო მოცემულ სტრინგში.
 */

{
  let str = "hello i am a human";
  let splitStr = str.replaceAll(" ", "").split("");

  let count = 0;
  for (let letter of splitStr) {
    if (letter === "a") {
      count++;
    }
  }

  console.log(count);
  console.log(splitStr);
}

/* 2) დაწერე ფუნქცია, რომელიც შეამოწმებს არის თუ არა სტრინგი პალინდრომი 
(ეს სიტყვა თუ იკითხება ერთნაირად ესე იგი პალინდრომია.მაგალითად ana, abba,gig)  */

{
  function palindromChecker(str) {
    if (str === str.split("").reverse().join("")) {
      return `${str} პალინდრომია`;
    } else {
      return `${str} არ არის პალინდრომი`;
    }
  }

  console.log(palindromChecker("abba"));
  console.log(palindromChecker("goo"));
}

/* 3)შექმენი ფუნქცია, რომელიც მიიღებს ორ რიცხვების მასივს, 
გააერთიანებს მათ, წაშლის დუბლიკატებს და დაითვლის ჯამს. 
გამოიყენე მასივის მეთოდები და ლოგიკური ოპერატორები საჭიროებისამებრ.
 */

{
  function arr(arr1, arr2) {
    let concated = arr1.concat(arr2);
    let unique = [...new Set(concated)];
    let reduced = unique.reduce((tot, cur) => tot + cur, 0);
    return reduced;
  }

  let arr1 = [1, 2, 3, 4, 5];
  let arr2 = [1, 2, 3, 6];

  console.log(arr(arr1, arr2));
}

/* 4)შექმენი ფუნქცია ფაქტორიალის დასათვლელად. */

{
  function factorial(n) {
    let result = 1;
    for (let i = n; i > 0; i--) {
      result = result * i;
    }
    return result;
  }

  console.log(factorial(3));
}

/* 5)Two Sum - მოძებნე მასივში ის წყვილები, რომელთა ჯამიც უდრის მოცემულ რიცხვს 
ანუ [1,2,3,4,5,6,-7,-8] ამ მასივს და -15 თუ გადავცემთ მან უნდა დააბრუნოს [6,7] */

let arr = [1, 2, 3, 4, 5, 6, -7, -8];

function twoSum(arr, target /*-15*/) {
  for (let num1 = 0; num1 < arr.length; num1++) {
    for (let num2 = num1 + 1; num2 < arr.length; num2++) {
      if (arr[num1] + arr[num2] === target) {
        return [num1, num2];
      }
    }
  }
  return "წყვილი არ მოიძებნა";
}

console.log(twoSum(arr, -15));
