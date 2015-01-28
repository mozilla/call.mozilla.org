document.addEventListener("DOMContentLoaded", function() {
  var daysLeftElement = document.querySelector(".days-left");
  var finalDay = new Date(2015, 1, 26);
  var nowDay = new Date();
  var daysLeft = Math.ceil((finalDay - nowDay)/(1000*60*60*24));
  if (daysLeft === 0) {
    // do something on last day?
  }
  daysLeftElement.textContent = daysLeft;
});
