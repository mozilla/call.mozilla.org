document.addEventListener("DOMContentLoaded", function() {
  var daysLeftElement = document.querySelector(".days-left");
  var contentContainer = document.querySelector(".content-container");
  var finalDay = new Date(2015, 1, 26);
  var nowDay = new Date();
  var daysLeft = Math.ceil((finalDay - nowDay)/(1000*60*60*24));
  var readyScript = document.querySelector(".ready-to-call");
  var callScript = document.querySelector(".call-script");
  var hl1 = document.querySelector(".hl1");
  var hl2 = document.querySelector(".hl1");
  var page1Div = document.querySelector(".page-1-wrapper");
  var page2Wrapper = document.querySelector(".page-2-wrapper");
  var callScriptHeader = document.querySelector(".call-script-heading");
  var scriptText = document.querySelector(".script-text");
  var boolButton1 = false;
  var boolButton2 = false;

  if (daysLeft === 0) {
    // do something on last day?
  }
  daysLeftElement.textContent = daysLeft;

  var callNumber = document.querySelector(".call-number");
  var callNumberError = document.querySelector(".phone-error");
  var callNumber2 = document.querySelector(".call-number-2");
  var callNumberError2 = document.querySelector(".phone-error-2");
  var callWrapper = document.querySelector(".page-1-wrapper");
  var spinner = document.querySelector(".fa-spinner");

  $("#phone").mask("(999) 999 - 9999");
  $("#phone").on("blur", function() {
    processPhone();
  });


  $("#phone1").mask("(999) 999 - 9999");
  $("#phone1").on("blur", function() {
    processPhone();
  });

function processPhone() {
  var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
  if( last.length == 3 ) {
    var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
    var lastfour = move + last;
    var first = $(this).val().substr( 0, 9 );

    $(this).val( first + '-' + lastfour );
  }

}

  callNumber.addEventListener("input", function() {
    callNumber.classList.remove("invalid");
    callNumberError.classList.remove("show");
  });

  var callButton = document.querySelector(".call-now-button");
  callButton.addEventListener("click", function() {
    boolButton1 = true;
    boolButton2 = false;
    callButton.classList.add("waiting");
    makeCall(callNumber.value);
  });

  callNumber2.addEventListener("input", function() {
    callNumber2.classList.remove("invalid");
    callNumberError2.classList.remove("show");
  });

  var callButton2 = document.querySelector(".call-now-button-2");
  callButton2.addEventListener("click", function() {
    boolButton1 = false;
    boolButton2 = true;
    callButton2.classList.add("waiting");
    spinner.classList.remove("hidden");
    makeCall(callNumber2.value);
  });


function makeCall(value) {
  var url = "https://callcongress.mofostaging.net/create?campaignId=fcc-blanket&userPhone=";
  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("post", url + value, true);
  oReq.send();
}

function reqListener (e) {
  var data = JSON.parse(this.responseText);
  callButton.classList.remove("waiting");
  callButton2.classList.remove("waiting");
  spinner.classList.add("hidden");
  if (data.message !== "queued") {
    if(boolButton1) {
      callNumber.classList.add("invalid");
      callNumberError.classList.add("show");
    } else {
      callNumber2.classList.add("invalid");
      callNumberError2.classList.add("show");
      callNumberError2.classList.remove("hidden");
    }
    return;
  }

  page2Wrapper.classList.remove("hidden");
  callScript.classList.add("blue-script-bg");
  hl1.classList.add("blue-text-bg");
  hl2.classList.add("blue-text-bg");
  callScriptHeader.classList.add("white-text")
  scriptText.classList.add("white-text")
  spinner.classList.remove("hidden");
  contentContainer.removeChild(page1Div)
  contentContainer.classList.remove("page-1");
  contentContainer.classList.remove("page-call-script");
  contentContainer.classList.add("page-calling");
}

  var openCallscript = document.querySelector(".call-script-link a");
  openCallscript.addEventListener("click", function() {

    contentContainer.classList.remove("page-1");
    readyScript.classList.remove("hidden");
    page2Wrapper.classList.remove("hidden");
    callWrapper.classList.add("hidden");
    contentContainer.classList.add("page-call-script");
    contentContainer.classList.remove("page-calling");
  });
});
