/* გაამრავლე თითოეული ელემენტი 3-ზე.
Input: [1,2,3] - Output: [3,6,9] */

{
    let arr = [1,2,3]
    let tripled = arr.map((num) => num * 3)
    console.log(tripled)
}

/* გაფილტრე ისეთი რიცხვები რომლებიც იყოფა უნაშთოდ 3-ზე */

{
    let arr = [1,2,3,4,5,6,7,14,15,63]
    let filteredArr = arr.filter((num) => num%3 ===0)
    console.log(filteredArr);
}

/* დააბრუნე ყველა დადებითი რიცხვის ჯამი */

{
    let arr = [-1,-5,3,5,12]
    let sum = arr.filter((num) => num>0).reduce((sum,item) => sum+item,0)
   /*  for (let i of arr){
        if(i>0){
            sum+=i
        }
    } */
    console.log(sum)
}

/* მოცემული სტრინგების მასივიდან წაშალე თითოეული სტრინგის ბოლო სიმბოლო
let namesArr = ["giorgi","nika","mariami"] */

{
    let namesArr = ["giorgi","nika","mariami"]
    let modifiedArr = namesArr.map((name) => name.slice(0,-1))
    console.log(modifiedArr)
}

/* გაამრავლე ყველა ელემენტი მასივში 2-ზე.
შემდეგ ამოიღე რიცხვები, რომლებიც იყოფა 3-ზე */

{
    let nums = [3,5,6,7,13.5]
    let tripleNums = nums.map((num) => num*2)
    //console.log(tripleNums)
    let filterTripleNums = tripleNums.filter((tNums) => tNums%3 ===0)
    console.log(filterTripleNums);

}

/* დაალაგე რიცხვები ზრდადობით  */

{
    let numsArr = [1,-1,-2,-10,111,3,2,5]
    let sortedArr = numsArr.sort((a,b) => a - b)
    console.log(sortedArr);
}

/* გაამრავლე ყველა ელემენტი 2-ზე და 
დატოვე მხოლოდ ისინი, რომლებიც 5-ზე მეტია. */

{
    let nums = [-2,-1,0,2,4,6,1,8]
    let doubleNums = nums.map((nums) => nums*2)
    //console.log(doubleNums)
    let filterDoubleNums = doubleNums.filter((dNUms) => dNUms>5)
    console.log(filterDoubleNums)
}

/* let arr = [1,1,1,1,2,2,3,3,3] დააბრუნე let unque = [1,2,3] */

{
    let arr = [1,1,1,1,2,2,3,3,3]
    let unique = [... new Set(arr)]
    console.log(unique)
}

/* დააბრუნეთ ორი ყველაზე მცირე რიცხვის ჯამს */

{
    let arr = [-1,20,90,4,5,111]
    let sortArr = arr.sort((a,b) => a-b)
    //console.log(sortArr);
    let sum01 = sortArr[0] + sortArr[1]
    console.log(sum01);
}