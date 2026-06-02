/* 
1)დაწერე ფუქნცია რომელიც გაფილტრავს ლუწებზე და იპოვი მათ საშუალოს [1,2,3,4,5,6]
2)დაწერე ფუნქცია, რომელიც დათვლის სიტყვების რაოდენობას წინადადებაში.
let = "I love JavaScript"
3) დაწერე ფუნქიცა რომელიც დააბრუნებს true თუ რიცხვი მარტივია თუ არადა false.
4) let words = ["dog", "elephant", "cat", "hippopotamus"] იპოვე ყველაზე გრძელი ისტყვა
5)let arr = [3, 5, 3, 2, 5, 5, 3, 5] დააბრუნე ისეთი რიცხვი რომელიც მეორდება უფრო მეტჯერ
6)let nums = [1, 2, 3, 4, 5, 6, 7, 8] დაწერე ფუქნცია რომელიც დაითვლის რამდენი ლუწი და რამდენი კენტი რიცხვია
7)let nums = [10, 2, 33, 5, 7] დაწერე ფუქნცია როემლიც დააბრუენბს ყველაზე პატარა რიცხვს */

//1)დაწერე ფუქნცია რომელიც გაფილტრავს ლუწებზე და იპოვი მათ საშუალოს [1,2,3,4,5,6]
{
  function average(arr) {
    let filtered = arr.filter((el) => el % 2 === 0);
    if (filtered.length === 0) {
      return 0;
    }
    let reduced = filtered.reduce((tot, cur) => tot + cur, 0);
    let result = reduced / filtered.length;
    return result;
  }

  const arr1 = [1, 3, 5];
  console.log(average(arr1));
  const arr2 = [1, 2, 3, 4];
  console.log(average(arr2));
}

//2)დაწერე ფუნქცია, რომელიც დათვლის სიტყვების რაოდენობას წინადადებაში.
{
  let sentence = "hello, i am a human.";
  console.log(sentence.split(" "));
  let sentence2 = "  hello, iAm aHuman .  ,, ";

  function wordCount(text) {
    //დავსპლიტავთ სიტყვებად
    //მერე რეგექსით მხოლოდ ასოებს დავტოვებთ, და ამას ცვლადში შევინახავთ
    //ამ ცვლადის ლიგრძეს გავუტილებთ 0 და თუ გათრუვდა ე.ი სიტვას არ შიცავს
    //თუ გაფოლსდა სიტყვების რაოდენობა ცვლადის სიგრძის ტოლია
    let words = text.split(" ").filter((el) => {
      let cleanWords = el.replace(/[^a-zA-Z]/g, "");
      return cleanWords.length > 0;
    });
    if (words.length === 0) {
      return "სიტყვებს არ შეიცავს";
    }
    return words.length;
  }
  console.log(wordCount(sentence));
  console.log(wordCount(sentence2));
}

//3) დაწერე ფუნქიცა რომელიც დააბრუნებს true თუ რიცხვი მარტივია თუ არადა false.
    {
    function numCheck(num) {
        if (num <= 1) return `${num} არც მარტივია და არც შედგენილი`;
        if (num === 2) return `${num} მარტივია`;
        if (num%2 === 0) return `${num} შედგენილია`;
        //ყოველ ნაბიჯზე i-ს ვზრდით 2-ით
        //რადგან ლუწებზე შემოწმება აზრი არ აქვს.ნუმი ისედაც კენტია
        for (let i = 3; i <= Math.sqrt(num); i+=2) { 
            if (num % i === 0) { //თუ num უნაშთოდ იყოფა i-ზე, ეს ნიშნავს,რომ ვიპოვეთ გამყოფი
                return `${num} შედგენილია`;
            }
        }
        return `${num} მარტივია`
    }

    console.log(numCheck(1));
    console.log(numCheck(2));
    console.log(numCheck(9));
    console.log(numCheck(15));
}