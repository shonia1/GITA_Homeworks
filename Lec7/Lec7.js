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


