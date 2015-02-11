document.addEventListener("DOMContentLoaded", function() {
  var daysLeftElement = document.querySelector(".days-left");
  var contentContainer = document.querySelector(".content-container");
  var finalDay = new Date(2015, 1, 26);
  var nowDay = new Date();
  var daysLeft = Math.floor((finalDay - nowDay)/(1000*60*60*24));
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

  var phoneState = $("#phone1").val();
  $("#phone1").mask("(000) 000 - 0000");
  $("#phone").mask("(000) 000 - 0000").val(phoneState);

  function reportBack() {
    contentContainer.classList.remove("page-calling");
    contentContainer.classList.add("page-report-back");
  }
  var reportBackButton = document.querySelector(".report-back-button");
  var reportBackLink = document.querySelector(".report-back-link");
  reportBackButton.addEventListener("click", reportBack);
  reportBackLink.addEventListener("click", reportBack);

  var submitReportButton = document.querySelector(".submit-report-button");
  submitReportButton.addEventListener("click", function() {

    var senator1Value;
    var senator2Value;
    var congressRepValue;
    var fccMemberValue;

    var senator1Input = document.querySelector("input[name=\"senator-1\"]:checked");
    var senator2Input = document.querySelector("input[name=\"senator-2\"]:checked");
    var congressRepInput = document.querySelector("input[name=\"congress-rep\"]:checked");
    var fccMemberInput = document.querySelector("input[name=\"fcc-member\"]:checked");

    submitReportButton.classList.add("waiting");

    if (senator1Input) {
      senator1Value = senator1Input.value;
    }
    if (senator2Input) {
      senator2Value = senator2Input.value;
    }
    if (congressRepInput) {
      congressRepValue = congressRepInput.value;
    }
    if (fccMemberInput) {
      fccMemberValue = fccMemberInput.value;
    }
    function done() {
      contentContainer.classList.remove("page-report-back");
      contentContainer.classList.add("page-share");
      submitReportButton.classList.remove("waiting");
    }
    $.ajax({
      url: "https://docs.google.com/forms/d/1bB4Tals9lofhSsn4yX03zJ0MbPZQnJrb8JGDSnRs-tg/formResponse",
      data: {
        // Senator 1
        "entry.697672033": senator1Value,
        // Senator 2
        "entry.1405257537": senator2Value,
        // Your Congress Rep
        "entry.1361476653": congressRepValue,
        // FCC Member
        "entry.161412836": fccMemberValue,
        // Comments
        "entry.1089174419": document.querySelector(".comments-input").value
      },
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: done,
        200: done
      }
    });
  });

  callNumber.addEventListener("input", function() {
    $(".phone-label-warning").addClass('phone-label-secured').removeClass('phone-label-warning');
    callNumber.classList.remove("invalid");
    callNumberError.classList.remove("show");
  });

  var callButton = document.querySelector(".call-now-button");
  callButton.addEventListener("click", function() {
    analytics.event("submit", {label: "Submit a call on first page"});
    boolButton1 = true;
    boolButton2 = false;
    callButton.classList.add("waiting");
    makeCall(callNumber.value);
  });

  callNumber2.addEventListener("input", function() {
    $(".phone-label-warning").addClass('phone-label-secured').removeClass('phone-label-warning');
    callNumber2.classList.remove("invalid");
    callNumberError2.classList.add("hidden");
  });

  var callButton2 = document.querySelector(".call-now-button-2");
  callButton2.addEventListener("click", function() {
    analytics.event("submit", {label: "Submit a call on call script page"});
    boolButton1 = false;
    boolButton2 = true;
    callButton2.classList.add("waiting");
    spinner.classList.remove("hidden");
    makeCall(callNumber2.value);
  });

  function makeCall(value) {
    var url = "https://callcongress.mofoprod.net/create?campaignId=jan14th&userPhone=";
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
      $(".phone-label-secured").removeClass('phone-label-secured').addClass('phone-label-warning');
      if(boolButton1) {
        callNumber.classList.add("invalid");
        callNumberError.classList.add("show");
      } else {
        callNumber2.classList.add("invalid");
        callNumberError2.classList.remove("hidden");
      }
      return;
    }
    analytics.virtualPageview('calling-success-page');
    page2Wrapper.classList.remove("hidden");
    hl1.classList.add("blue-text-bg");
    hl2.classList.add("blue-text-bg");
    callScriptHeader.classList.add("white-text");
    scriptText.classList.add("white-text");
    spinner.classList.remove("hidden");
    contentContainer.removeChild(page1Div);
    contentContainer.classList.remove("page-1");
    contentContainer.classList.remove("page-call-script");
    contentContainer.classList.add("page-calling");
  }

  var openCallscript = document.querySelector(".call-script-link a");
  openCallscript.addEventListener("click", function() {
    analytics.virtualPageview('preview-the-call-script');
    $(".phone-label-warning").removeClass("phone-label-warning").addClass("phone-label-secured")
    contentContainer.classList.remove("page-1");
    readyScript.classList.remove("hidden");
    page2Wrapper.classList.remove("hidden");
    callWrapper.classList.add("hidden");
    contentContainer.classList.add("page-call-script");
    contentContainer.classList.remove("page-calling");
  });
});
