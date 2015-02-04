document.addEventListener("DOMContentLoaded", function() {
  var daysLeftElement = document.querySelector(".days-left");
  var contentContainer = document.querySelector(".content-container");
  var finalDay = new Date(2015, 1, 26);
  var nowDay = new Date();
  var daysLeft = Math.ceil((finalDay - nowDay)/(1000*60*60*24));

  // screen size:
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  if (daysLeft === 0) {
    // do something on last day?
  }
  daysLeftElement.textContent = daysLeft;

  var callNumber = document.querySelector(".call-number");
  var callNumberError = document.querySelector(".phone-error");
  var callWrapper = document.querySelector(".wrapper");

  callNumber.addEventListener("input", function() {
    callNumber.classList.remove("invalid");
    callNumberError.classList.remove("show");
  });
  var callButton = document.querySelector(".call-now-button");
  callButton.addEventListener("click", function() {
    callButton.classList.add("waiting");
    function reqListener (e) {
      var data = JSON.parse(this.responseText);
      callButton.classList.remove("waiting");
      if (data.message !== "queued") {
        callNumber.classList.add("invalid");
        callNumberError.classList.add("show");
        if(x < 520) {
          callWrapper.style.height = "450px";
        } else {
          callWrapper.style.height = "315px";
        }
        return;
      }

      contentContainer.classList.remove("page-1");
      contentContainer.classList.remove("page-call-script");
      contentContainer.classList.add("page-calling");
    }

    var url = "https://callcongress.mofostaging.net/create?campaignId=fcc-blanket&userPhone=";
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("post", url + callNumber.value, true);
    oReq.send();
  });

  var openCallscript = document.querySelector(".call-script-link a");
  openCallscript.addEventListener("click", function() {
    contentContainer.classList.remove("page-1");
    contentContainer.classList.add("page-call-script");
    contentContainer.classList.remove("page-calling");
  });
});
