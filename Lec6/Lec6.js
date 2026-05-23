/* 1) იპოვე გამოსავალი როგორ შეიძლება გაეშვას ჯერ  
console.log("one") console.log("two") შემდეგ ფუნქცია.
აუცილებელია გამოიყენო ფრომისი */

{   function block(){
        for(let i = 1 ;i <1000000000;i++){}
    }

    /* ბოლკი უნდა გავაასინქრონულოთ. ამაში then დაგვეხმარება. 
    ის მიკროტასკ ქუიში გადაუშვებს ბლოკს და მხოლოდ მას შემდეგ 
    ამუშავდება რაც სინქრონული კოდები დაასრულებენ საქმეს */

    let aPromise = new Promise((res,rej) => res("resolved"))

    console.log("one")
    aPromise.then(res => block()) /* thenში მოთავსებით გავაასინქრონულეთ,
    ამიტომ სანამ ივენთ ლუპი არ დაინახავს ცარიელ ქოლსტაკს, მანამდე რიგში
    დააყოვნებს ბლოკ ფუნქციას */
    console.log("two")

} 

/* 2)ორი პრომისი შექმენი (ერთმა დაარესოლვოს, ერთმა დაარეჯექთოს)
და ორივე შემთხვევა დაამუშავე then/catch-ით,
  ცალცალკეც და “ჯგუფურადაც”  - ჯგუფურად Allsetteld გამოიყენე. */

let aPromise = new Promise((res,rej) => res("resolved")) 
let bPromise = new Promise((res,rej) => rej("rejected"))

aPromise
.then(res => console.log("Hello"))
.catch((error) => console.log("Error: ", error))

bPromise
.then(res => console.log("Bye"))
.catch((error) => console.error("Error: ", error))

//ვიყენებთ ოლსეთლდს რომელიც ყყველას შეეეხება განურჩევლად სტატუსისა
Promise.allSettled([aPromise,bPromise])
.then(res => console.log(res[0], res[1]))
.catch((error) => console.error("Error: ", error))

/* 3)შექენი 4 პრომისი (ზოგი resolve, ზოგი reject). 
დააბრუნე მარტო პირველი დარესოლვებული */

let aPromise = new Promise((res,rej) => {
    rej("rejected")
})
let bPromise = new Promise((res,rej) => {
    res("resolved")
})
let cPromise = new Promise((res,rej) => {
    res("resolved")
})
let dPromise = new Promise((res,rej) => {
    rej("rejected")
})

/* ვიყენებთ any-ს. ის აიგნორებს დარეჯექთებულ ფრომისებს
და პირველივე დარესოლვებულს აბრუნებს */
Promise.any([aPromise,bPromise,cPromise,dPromise])
.then(resp => console.log(resp))
.catch((error) => console.error("Error: ",error))


/* 4)შექმენი 4 ფრომისი  და რედიუსით დაითვალე 
რამდენია წარმატებული და რამდენი წარუმატებელი */

let aPromise = new Promise((res,rej) => {
    rej("rejected")
})
let bPromise = new Promise((res,rej) => {
    res("resolved")
})
let cPromise = new Promise((res,rej) => {
    rej("rejected")
})
let dPromise = new Promise((res,rej) => {
    rej("rejected")
})

/* ოლსეტლდით თითოეულ ფრომისს შევეხებით,
მერე რედიუსში შევიტანთ if ბლოკს რომელიც 
შეამოწმებს სტატუსს და თუ სტატუსი საჩვენოა
დავაპლიუსებთ */
Promise.allSettled([aPromise,bPromise,cPromise,dPromise])
.then(resp => {
    let resolved = resp.reduce((tot,cur) => {
        if(cur.status === "fulfilled"){
            tot++
        }
        return tot
    }, 0)
    console.log(resolved)
})
.catch((error) => console.error("Error: ",error))

