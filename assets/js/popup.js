var bgpage = chrome.extension.getBackgroundPage();
var click_status = false;


$(function ($) {
  waitResponse();
  $('#settings-btn').click(function () {
    chrome.runtime.sendMessage({
      openSettings: true
    }, null);
  });
  $('#user-profile-btn').click(function () {
    open_new_tab("user-profile.html");
  });
  $('#dashboard-btn').click(function () {
    open_new_tab("dashboard.html");
  });
  run_popup();
});

function waitResponse() {
  // $('#dynamicDiv').hide();
  $('.user-tags').hide();

}

function showResponse() {
  // $('#dynamicDiv').show();
  $('.user-tags').show();
}




function run_popup() {
  let body = document.getElementById("popup_body");

  chrome.runtime.sendMessage({
    getAnotherRandomZekrOverlay: true
  }, function (response) {

    // Script injected, we can proceed
    if (response && response.done) {
      console.log(response);
      let zekr = document.getElementById("zekr");
      let fadl = document.getElementById("fadl");

      // var higriDate = document.getElementById("higri_lang");
      var popup_content = document.getElementById("popup_content");
      var sheet = document.createElement('style');
      document.body.appendChild(sheet);

      zekr.innerHTML = `<i class="fas fa-quote-right fa-xs"></i>
                        ${response.zekrData.zekr}
                        <i class="fas fa-quote-left fa-xs"></i> `;

      if (response.higriDate === "") {
        return null;
      } else {
        const higriDate = document.getElementById("higri-date");
        higriDate.innerHTML = response.higriDate;
      }

      fadl.innerHTML = response.zekrData.fadl;
      // response_date.innerHTML = response.date;
      showResponse();


    }
  });

  popup_content.style.display = "block";
  body.style.opacity = "1";
}