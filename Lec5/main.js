/* 1. დაწერე ფუნქცია , რომელიც არგუმენტად იღებს sec-ს 
და ითვლის უკუსვლით იქმადე სანამ 0-მდე არ მივა */

{
    function timer(sec) {
        while (sec >= 0) {
            console.log(sec)
            sec--
        }
    }
    timer(10)
}

/* 2. დაწერე ფუქნცია. ფუქნციას გადააწოდე რიცხვი. 
და ასევე ლოგე რენდომული რიცხვი იქამდე სანამ 
ეს გადაცემული და რენდომ რიცხვი არ დაემთხვევა ერთმამენთს */

{
    //100მდე საკმარისია
    function getRandomNum() {
        return Math.floor(Math.random() * 101)
        }
    
    function find(num) {
        let currentRandomNum = ""
        count = 0 //რამდენ ციკლში იპოვის ეგეც დავათვლევინოთ
        while (num !== currentRandomNum) {
            count++
            currentRandomNum = getRandomNum()
            console.log(currentRandomNum)
        }
        console.log(`${currentRandomNum}-ის პოვნას მოვანდომეთ ${count} ციკლი`)
    }
    find(21)
}

/* 3.დაწერე ფუქნცია, რომელიც მიიღებს n და callback-ს.
როცა n > 27-ზე გაუშვი ეს callback-ი,რომელიც დააკონსოლებს,
რომ n ნამდვილად მეტია 27-ზე. სხვა შემთხვევაში დააკონსოლე რომ n ნაკლებია */

function check(n, callback) {
    if (n>27) {
        callback()
    } else {
        console.log(`${n} ნაკლებია ან ტოლი 27-ზე`)
    }
}

function confirm() {
    console.log("შეყვანილი რიცხვი ნამდვილად მეტია 27-ზე")
}

check(28, confirm)

/* 4.დაწერე ფუქნცია, რომელიც პარამეტრად მიიღებს API-ს
 და დააბრუნებს ამ API-ში მყოფ  4 - users. 
 https://jsonplaceholder.typicode.com/users 
 დაწერე ორივენაირად than/catch & async/await */

 async function getUsers(API) {
    let response = await fetch(API)
    let data = await response.json()
    console.log(data.slice(0,4))

 }
 getUsers("https://jsonplaceholder.typicode.com/users")

 function getUsers(API){
    fetch(API).then(response => response.json()).then(data => console.log(data.slice(0,4)))
    console.log(API)
}
getUsers("https://jsonplaceholder.typicode.com/users")


/* 5)დააწყვილე reduce-თი ცალკე ვისი ასაკიც მეტია 10 ზე 
და ვისი ასაკიც ნაკლებია 20-ზე */

let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 }
];

let reduced = people.reduce((tot,person) => {
    if (person.age>10) {
        tot.over10.push(person)
} if (person.age>20) {
    tot.over20.push(person)
} 
return tot 
},{over10: [], over20: []}) //საწყისად ობიექტი მასივებით გვჭირდება

console.log(reduced)


/* 6. დაწერე ფუნქცია, რომელიც მიიღებს ორ რიცხვს და callback-ს.
თუ პირველი მეტია მეორეზე გაუშვი callback 
და დაუბეჭდე "მეტია", სხვა შემთხვევაში "ნაკლები ან ტოლია". */

function compare(a, b, callback) {
    if(a>b){
        callback()
    }else{
        console.log(`${a} ნაკლებია ან ტოლი ${b}-ზე`)
    }
}

function answer() {
    console.log("მეტია")
}

compare(3, 5, answer)

/* 7.დაწერე reduce, რომელიც დააჯგუფებს - ცალკე 20-ზე მეტ ფასიან რიცხვებს და 
ცალკე 20-ზე ნაკლები ან ტოლი ფასიანი ნივთები */

let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 }
];

let split = products.reduce((tot,item) => {
    if(item.price>20) {
        tot.over20.push(item)
    } if(item.price<20) {
        tot.less20.push(item)
    }
    return tot
}, {over20: [], less20: []})

console.log(split)
