{/* გაქვს ლეპტოპების მასივი, იპოვე ყველაზე ძვირი და გამოიტანე კონსოლში */
 
const laptops = [
 { model: "Dell XPS 13", price: 1800 },
 { model: "MacBook Pro 14", price: 2499 },
 { model: "Lenovo ThinkPad X1", price: 2100 },
 { model: "Asus Zephyrus G14", price: 1999 },
];
//გავსორტოთ და პირველივე დავლოგოთ
const mostExpensive = laptops.sort((a,b) => b.price-a.price)[0] 
console.log(mostExpensive);
}

{
    /* შექმენი ობიექტი, რომელსაც ექნება width, height და getArea() მეთოდი, რომელიც დააბრუნებს ფართობს. */
    const obj = {
        width: 5,
        height: 3,
        getArea: function(){
            return this.width*this.height
        }
    }
    console.log(obj.getArea());
}

{
    /* დაბეჭდე მხოლოდ იმ სტუდენტების სახელები, რომელთაც passed === true. */

const students = [
  { name: "Giorgi", score: 85, passed: true },
  { name: "Nika", score: 50, passed: false },
  { name: "Mariam", score: 92, passed: true },
  { name: "Luka", score: 60, passed: false }
];
//ვფილტრავთ ჯერ ვინც ჩაავარა, და მერე ვმაპავთ და ვიღებთ მხოლოდ სახელებს
const passedStudents = students.filter((student) => student.passed).map((student) => student.name)
console.log(passedStudents);
}

{
    /* გაფილტრე ისეთი პროდუქტები, რომლებიც 10$-ზე იაფია და დააბრუნე მხოლოდ მათი სათაურების მასივი. */

    const products = [
  { title: "Pencil", price: 2 },
  { title: "Notebook", price: 5 },
  { title: "Backpack", price: 35 },
  { title: "Ruler", price: 3 },
  { title: "Calculator", price: 40 }
];

//ვფილტრავთ ჯერ <10ზე. და მერე დავმაპავთ თაითლზე

const cheapProducts = products.filter((product) => product.price < 10).map((product) => product.title)
console.log(cheapProducts);
}

{
    /* დაალაგე ზრდადობით rating-ის მიხედვით */

    const movies = [
  { title: "Inception", rating: 9 },
  { title: "Avatar", rating: 7.5 },
  { title: "Joker", rating: 8.2 },
  { title: "Tenet", rating: 6.9 }
];

//ჩეულებრივ გავსორტავთ რეიტინგზე 

const byRating = movies.sort((a,b) => a.rating-b.rating)
console.log(byRating);
}

{
    /* იპოვე ყველაზე იაფი ტელეფონი და გამოიტანე მხოლოდ მისი model */

    const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];

//ვსორტავთ ფასის ზრდადობით და ვლოგავთ მოდელს

const cheapestPhone = phones.sort((a,b) => a.price-b.price)
console.log(cheapestPhone[0].model);
}

{
    /* დაბეჭდე 300- გვერდიანზე მეტი  */

    const books = [
  { title: "Harry Potter", pages: 500 },
  { title: "The Little Prince", pages: 120 },
  { title: "Lord of the Rings", pages: 700 },
  { title: "Animal Farm", pages: 250 },
];

//ვფილტრავთ 300+ ზე

const fatBook = books.filter((book) => book.pages > 300)
console.log(fatBook);
}

{
    /* დაალაგე ზრდადობით და შეკრიბე ფასი */

const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];

//ვსორტავთ ზრდადობის და ვარედიუსებთ

const sortPrice = phones.sort((a,b) => a.price-b.price).reduce((tot,cur) => tot + cur.price,0)
console.log(sortPrice);
}