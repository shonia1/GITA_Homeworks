// let email = " EXAMPLE@MAIL.COM " - გაწმინდე (trim) და გადაიყვანე lowercase-ში. 
// გადაამოწმე, შეიცავს თუ არა "@"
let email = " EXAMPLE@MAIL.COM ";
let clean = email.trim().toLowerCase(); //ვაცხლით სფეისებს და ვაპატარავებთ
if (clean.includes("@")) { // ვამოწმებთ შეიცავს თუ არ @ს იმეილი
    console.log(`იმეილი ${clean} შეიცავს სიმბოლოს @`);
} 