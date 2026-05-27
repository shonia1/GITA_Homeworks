/* 1) შექმენი Triangle (სამკუთხედი) კლასი, რომელიც იღებს სამ გვერდს (a, b, c) 
და დაამატე მეთოდები: getPerimeter(), getArea() , isRightTriangle(). */

class Triangle {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }

    //პერიმეტრის გამოთვლა
    getPerimeter() {
        //ჯერ შევამოწმოთ სამკუთხედის გვერდის სიგრძეების რეალურობა
        if (this.a + this.b <= this.c || this.b + this.c <= this.a || this.c + this.a <= this.b){
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        } if (this.a <= 0 || this.b <=0 || this.c <= 0) {
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        }
        const p = this.a + this.b + this.c
        return p
    }
    //ფართობის გამოთვლა
    getArea() {
        //ჯერ შევამოწმოთ სამკუთხედის გვერდის სიგრძეების რეალურობა
        if (this.a + this.b <= this.c || this.b + this.c <= this.a || this.c + this.a <= this.b){
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        } if (this.a <= 0 || this.b <=0 || this.c <= 0) {
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        }
        const p = (this.a + this.b + this.c)/2
        const area = Math.sqrt(p * (p-this.a) * (p-this.b) * (p-this.c))
        return Number(area.toFixed(2))
    }
    //შემოწმება, არის თუ არა მართი კუთხე სამკუთხედში
    isRightTriangle() {
        //ჯერ შევამოწმოთ სამკუთხედის გვერდის სიგრძეების რეალურობა
        if (this.a + this.b <= this.c || this.b + this.c <= this.a || this.c + this.a <= this.b){
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        } if (this.a <= 0 || this.b <=0 || this.c <= 0) {
            return "შეიყვანეთ სამკუთხედის რეალური პარამეტრები"
        }
        if((this.a**2)+(this.b**2) === (this.c**2)){
            return true
        } else {
            return false
        }
    }
}

//დავაინსტანსოთ
const triangle = new Triangle(3,4,5)

const perimeter = triangle.getPerimeter()
console.log(perimeter, typeof perimeter)

const area = triangle.getArea()
console.log(area, typeof area)

const typeOfTriangle = triangle.isRightTriangle()
console.log(typeOfTriangle)


/* 2) შექმენი Smartphone (სმარტფონი) კლასი property-ებით: brand, model, releaseYear. 
გააკეთე ექსტენშენი GamingPhone, რომელსაც დაემატება gpuScore და batteryCapacity, 
და დაამატე მეთოდი performanceIndex(). */

class Smartphone {
    constructor(brand, model, releaseYear) {
        this.brand = brand
        this.model = model
        this.releaseYear = releaseYear
    }
}

class GamingPhone extends Smartphone {
    constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
        super(brand, model, releaseYear)
        this.gpuScore = gpuScore
        this.batteryCapacity = batteryCapacity
    }
    performanceIndex() {
        if (this.gpuScore > 90) {
            return "Top Tier"
        } else if (this.gpuScore > 80 && this.gpuScore < 90) {
            return "Good Tier"
        } else {
            return "Not gaming phone"
        }
    }

}

const phone = new GamingPhone("Apple", "11", 2020, 89, 3600)
console.log(phone);
console.log(phone.performanceIndex())


/* 3)შექმენი CryptoWallet (კრიპტო საფულე) კლასი, 
მეთოდებით: deposit(), withdraw(), transfer(), getHistory(), */

class CryproWallet {
    constructor(current) {
        this.current = current
        //ცარიელი მასივი ისტორიის შესანახად
        this.history = []
        //მეორე საფულე, ტრანსფერითვის
        this.secondWallet = 0
    }
    deposit(deposit) {
        //შეყვანილი რიცხვის ვალიდურობა
        if (deposit < 0) {
            return "შეიყვანეთ დადებითი რიცხვი"
        }
        //მიმდინარე ბალანსის აფდეითი
        this.current += deposit
        //ისტორიის შენაცვა ობირქტად
        this.history.push({
            ტიპი: "შემოტანა",
            თანხა: deposit
        })
        //ყვოცელთვის ვაბრუნებთ მიმდინარე ბალანსს
        return this.current
    }

    withdraw(withdraw) {
        if (withdraw < 0) {
            return "შეიყვანეთ დადებითი რიცხვი"
        } else if (this.current < withdraw) {
            return "თანხა ანგარიშზე საკმარისი არ არის"
        }
        this.current -= withdraw
        this.history.push({
            ტიპი: "გატანა",
            თანხა: withdraw
        })
        return this.current
    }

    transfer(transfer) {
        //ვამოწმებთ შეყვანილი რიცხვს
        if (this.current < transfer) {
            return "თანხა ანგარიშზე საკმარისი არ არის"
        } else if (transfer < 0) {
            return "შეიყვანეთ დადებითი რიცხვი"
        }
        //ვაკორექტირებთ მიმდინარე ბალანს
        this.current -= transfer
        //ვამატებთ მეორე საფულეში
        this.secondWallet += transfer
        //ვინახავთ ისტორიას
        this.history.push({
            ტიპი: "გადარიცხვა",
            თანხა: transfer
        })
        return this.current
    }

    //მხოლოდ დააბრუნებს იმ ჩაფუშულ ინფორმაციას რაც ტითოეულ მოქმედებაში ხდება
    getHistory() {
        return this.history 
    }
}

//შევინახოთ ცვლადში
const wallet = new CryproWallet(1000)

console.log(wallet.deposit(100))
console.log(wallet.withdraw(200))
console.log(wallet.transfer(50))
console.log(wallet.getHistory())
console.log(wallet.secondWallet)
console.log(wallet.current)

