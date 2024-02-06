console.log("Uppgift 1");
const numbers = [1, 7, 24, 70, 13, 6];
const over10 = numbers.filter(myFunction);

function myFunction(value) {
  return value > 10;
}
console.log("The following numbers is above 10");
console.log(over10);
console.log("From this array:");
console.log(numbers);
console.log("------------");
console.log("Uppgift 2");
const bok = {
  title: "Robinson Crusoe",
  author: "Daniel Defoe",
  publishingYear: 1719,
  fullInfo: function () {
    return `The book is called ${this.title} and was written by ${this.author}. It was released in the year of ${this.publishingYear}`;
  },
};
const bokinfo = bok.fullInfo();
console.log(bokinfo);
console.log("------------");
console.log("Uppgift 3");
const number = 12;
console.log(`Submitted number: ${number}`);
if (number % 2 == 0) {
  console.log("Number is even");
} else {
  console.log("Number is uneven");
}
