/* ArrayTasks

1)let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]] 
დაალაგე ზრდადობით და ამოიღე უნიკალურები გამოიყენე ForLoop

2)let products = [
  { name:"Phone", price:1200, rating:4.5 },
  { name:"Laptop", price:2500, rating:4.8 },
  { name:"Book", price:30, rating:4.9 },
  { name:"TV", price:800, rating:4.0 }
]
იპოვე ყველაზე მაღალი rating-ის მქონე პროდუქტი, მაგრამ ისეთი, რომლის ფასიც < 1000.

3)let sentence = "dog cat dog bird cat dog fish bird"
რედიუსის დახმარებით დათვალე რომელი რამდენჯერ მეორდება 
და for ლუპის დახმარებით იპოვე მეტჯერგამეორებული




ForLoop tasks

1)დაწერე ფუნქცია for loop-ის გამოყენებით, რომელიც დაითვლის 
რამდენჯერ გვხვდება კონკრეტული ასო მოცემულ სტრინგში. 

2) დაწერე ფუნქცია, რომელიც შეამოწმებს არის თუ არა სტრინგი პალინდრომი 
(ეს სიტყვა თუ იკითხება ერთნაირად ესე იგი პალინდრომია.მაგალითად ana, abba,gig) 

3)შექმენი ფუნქცია, რომელიც მიიღებს ორ რიცხვების მასივს, 
გააერთიანებს მათ, წაშლის დუბლიკატებს და დაითვლის ჯამს. 
გამოიყენე მასივის მეთოდები და ლოგიკური ოპერატორები საჭიროებისამებრ.

 4)შექმენი ფუნქცია ფაქტორიალის დასათვლელად. 

5)Two Sum - მოძებნე მასივში ის წყვილები, რომელთა ჯამიც უდრის მოცემულ რიცხვს 
ანუ [1,2,3,4,5,6,-7,-8] ამ მასივს და -15 თუ გადავცემთ მან უნდა დააბრუნოს [6,7] */

/* 1)დაალაგე ზრდადობით და ამოიღე უნიკალურები გამოიყენე ForLoop */

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

/* 2)იპოვე ყველაზე მაღალი rating-ის მქონე პროდუქტი, მაგრამ ისეთი, რომლის ფასიც < 1000. */

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

/* 3)რედიუსის დახმარებით დათვალე რომელი რამდენჯერ მეორდება 
და for ლუპის დახმარებით იპოვე მეტჯერგამეორებული */

let sentence = "dog cat dog bird cat dog fish bird";
