var bgpage = chrome.extension.getBackgroundPage();

function toggleBtnColor(btn, addClass, removeClass) {
  btn.classList.add(addClass);
  btn.classList.remove(removeClass);
}

function init() {

  // hideDaysBtns();
  displayUserData();
  displaytodayZekrSection();
  displayWeekZekrSection()

  document.addEventListener('click', function(e) {
    if (e.target) {
      if (e.target.id == 'settings_btn') {
        chrome.runtime.sendMessage({
          openSettings: true
        }, null);
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }, false);
  var theme_color_picker = document.getElementsByClassName('theme_color_picker');
  color_theme = bgpage.get_color_theme();
  for (item of theme_color_picker) {
    item.style.background = color_theme;
  }
}




function displayUserData() {
  let userNameElement = document.getElementById('user-name');
  let totalAzkarElement = document.getElementById('total-azkar');

  let user = bgpage.getUser();
  if (user) {
    {
      if (user.userName)
        userNameElement.innerHTML = user.userName;
      totalAzkarElement.innerHTML = user.totalAzkar;
    }
  }
}

function displaytodayZekrSection() {
  let usedAzkar = bgpage.getUsedAzkar();
  if (usedAzkar) {
    let dayAzkarCountElement = document.getElementById('day-azkar-count');
    let dayZekr = createDisplayTodayAzkar(usedAzkar);
    if (dayZekr) {
      if (dayZekr.innerCode) {
        let todayZekrBtn = document.getElementById('today-zekr-btn');
        if (todayZekrBtn)
          todayZekrBtn.style.display = 'inline';
        let dayAzkarElement = document.getElementById('today-azkar');
        dayAzkarElement.innerHTML = dayZekr.innerCode;
      }
      dayAzkarCountElement.innerHTML = dayZekr.count;
    }
  }

}

function displayWeekZekrSection() {
  let usedAzkar = bgpage.getUsedAzkar();
  if (usedAzkar) {
    let weekAzkarCountElement = document.getElementById('week-azkar-count');
    let weekZekr = createDisplayWeekAzkar(usedAzkar);
    if (weekZekr) {
      if (weekZekr.innerCode) {
        let weekZekrBtn = document.getElementById('week-zekr-btn');
        if (weekZekrBtn)
          weekZekrBtn.style.display = 'inline';
        let weekAzkarElement = document.getElementById('week-azkar');
        weekAzkarElement.innerHTML = weekZekr.innerCode;
      }
      weekAzkarCountElement.innerHTML = weekZekr.count;
    }
  }

}


function createDisplayTodayAzkar(usedAzkarArray) {
  let usedAzkar = null;
  if (usedAzkarArray && typeof usedAzkarArray !== 'undefined') {
    usedAzkar = {
      innerCode: '',
      count: 0
    }
    usedAzkarArray.forEach(function(item) {
      if (item.dayLastUpdate == new Date().toDateString()) {
        usedAzkar.count += item.dayRepetition;
        if (item.zekr && typeof item.zekr !== 'undefined' && item.zekr.trim() !== '')
          usedAzkar.innerCode += '<button class="center new-bots">' + item.zekr + ': <span style=" font-weight: bold;">' + item.dayRepetition + '<span>' + '</button>'
      }
    });

  }
  return usedAzkar;
}

function createDisplayWeekAzkar(usedAzkarArray) {
  let usedAzkar = null;
  if (usedAzkarArray && typeof usedAzkarArray !== 'undefined') {
    usedAzkar = {
      innerCode: '',
      count: 0
    }
    usedAzkarArray.forEach(function(item) {
      usedAzkar.count += item.weekRepetition;
      if (item.zekr && typeof item.zekr !== 'undefined' && item.zekr.trim() !== '')
        usedAzkar.innerCode += '<button class="center new-bots">' + item.zekr + ': <span style=" font-weight: bold;">' + item.weekRepetition + '<span>' + '</button>';
    });
  }
  return usedAzkar;
}
document.addEventListener("DOMContentLoaded", function(event) {
  // scrapeHigriDateAndTimes();
  init();

});