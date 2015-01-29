document.addEventListener("DOMContentLoaded", function() {
  var daysLeftElement = document.querySelector(".days-left");
  var finalDay = new Date(2015, 1, 26);
  var nowDay = new Date();
  var daysLeft = Math.ceil((finalDay - nowDay)/(1000*60*60*24));
  if (daysLeft === 0) {
    // do something on last day?
  }
  daysLeftElement.textContent = daysLeft;

  var callNumber = document.querySelector(".call-number");
  var callNumberError = document.querySelector(".phone-error");
  callNumber.addEventListener("input", function() {
    callNumber.classList.remove("invalid");
    callNumberError.classList.remove("invalid");
  });
  var callButton = document.querySelector(".call-now-button");
  callButton.addEventListener("click", function() {
    var formValid = false;
    var callForm = document.querySelector(".call-form");

    if (!callNumber.validity.valid) {
      callNumber.classList.add("invalid");
      callNumberError.classList.add("invalid");
      return;
    }
    callForm.setAttribute("action", callForm.getAttribute("action") + callNumber.value);
    //callForm.submit();
  });
});
