var bgpage = chrome.extension.getBackgroundPage();
var notloaded = true;

// UI Variables //
var add_to_list = document.getElementById('add_to_list');
var blacklist_ul = document.getElementById('blacklist');
var input_website = document.getElementById('input_website');
var clear_item = document.getElementsByClassName('clear_item');
var all_websites_toggle = document.getElementById('toggle_all_websites');
var always_show = document.getElementById('always_word_switch');
var minutes_input = document.getElementById('minutes_input');
var choose_lang_menu = document.getElementById('inputGroupSelect01');
var theme_color_africanstyle = document.getElementById('africanstyle');
var theme_color_bluewave = document.getElementById('bluewave');
var theme_color_summertime = document.getElementById('summertime');
var theme_color_party = document.getElementById('party');
var theme_color_stars = document.getElementById('stars');
var theme_color_picker = document.getElementById('theme_color_picker');
var redirectWebsite_lable = document.getElementById('redirectWebsite_lable');
var redirect_website_input = document.getElementById('redirect_website_input');
var add_redirect_btn = document.getElementById('add_redirect_btn');
var remove_redirect_btn = document.getElementById('remove_redirect_btn');

function displayRedirectWebsiteBtn(value) {
  if (value) {
    $('#remove_redirect_btn').attr("disabled", false);
  } else {
    $('#remove_redirect_btn').attr("disabled", true);
  }
}

// Blacklist Data Array
var blacklistData;

// Get local storage
function getStorage() {
  blacklistData = [];
  blacklistData = bgpage.get_blacklist();
}

function setStorage() {
  const alertItem = document.getElementById('alert');
  alertItem.style.display = "none";
  var value = input_website.value;
  var response = bgpage.add_to_blacklist(value);
  if (response.status) {
    item = response.message;
    addToBlacklist(item, blacklistData.length);
    blacklistData.push(item);
    input_website.value = ""
  } else {
    alertItem.innerHTML = response.message;
    alertItem.style.display = "block";
  }
}

function change_color_theme(color_theme) {
  theme_color_picker.style.background = color_theme;
  bgpage.set_color_theme(color_theme);
}

// Initialize List
function initSettings() {
  // Loop through array and add stored items to list
  blacklistData.forEach(addToBlacklist);
  all_websites_toggle.checked = bgpage.get_all_websites_status();
  minutes_input.value = bgpage.get_frequency();
  always_show.checked = (minutes_input.value == 0);

  // color_theme = bgpage.get_color_theme();
  // theme_color_picker.style.background = color_theme;


  // Event Listeners
  add_to_list.addEventListener('click', (e) => {
    setStorage();
  })

  theme_color_africanstyle.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to left, #ffbc00, #fe9e00, #fb7f00, #f65c00, #ee2e05)"
    change_color_theme(color_theme);
  });

  theme_color_bluewave.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to right, #A6FFCB, #12D8FA, #1FA2FF)";
    change_color_theme(color_theme);

  });

  theme_color_summertime.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to right, #a8ff78, #78ffd6)";
    change_color_theme(color_theme);

  });

  theme_color_party.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to right, #333333, #dd1818)";
    change_color_theme(color_theme);

  });

  theme_color_stars.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to right, #4568dc, #b06ab3)";
    change_color_theme(color_theme);

  });


  theme_color_stars.addEventListener('click', (e) => {
    color_theme = "linear-gradient(to right, #4568dc, #b06ab3)";
    change_color_theme(color_theme);

  });

  all_websites_toggle.addEventListener('change', function (e) {
    bgpage.toggle_all_websites_status();
  });

  always_show.addEventListener('change', function (e) {
    minutes_input.value = 0;
    bgpage.change_frequency(0);

  });


  minutes_input.addEventListener('change', function (e) {
    value = this.value;
    if (value >= 0 && value <= 120) {
      bgpage.change_frequency(value);
      always_show.checked = (minutes_input.value == 0);

    }

  });

  input_website.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      setStorage();
    }
  });

  redirect_website_input.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      setRedirectWebsiteStorage();
    }
  });
  add_redirect_btn.addEventListener('click', (e) => {
    setRedirectWebsiteStorage();
  });

  remove_redirect_btn.addEventListener('click', (e) => {
    removeRedirectWebsiteStorage();
    $('#remove_redirect_btn').attr("disabled", true);
  });
}



function removeRedirectWebsiteStorage() {
  try {
    bgpage.removeRedirectWebsite();
    displayRedirectWebsiteLabel(null);
    displayRedirectWebsiteBtn(null);
    redirect_website_input.value = ""

  } catch (error) {
    console.error(error);
  }
}

function displayRedirectWebsiteBtn(value) {
  if (value) {
    $('#remove_redirect_btn').attr("disabled", false);
  } else {
    $('#remove_redirect_btn').attr("disabled", true);
  }
}

function displayRedirectWebsiteLabel(value) {
  if (value) {
    redirectWebsite_lable.innerHTML = value;
    redirectWebsite_lable.style.display = "block";
  } else {
    redirectWebsite_lable.style.display = "none";

  }

}

function setRedirectWebsiteStorage() {
  const alertItem = document.getElementById('alertRedirect');
  alertItem.style.display = "none";
  var value = $('#redirect_website_input').val();
  var response = bgpage.setRedirectWebsite(value);
  if (response.status) {
    item = response.message;

    displayRedirectWebsiteLabel(item);
    displayRedirectWebsiteBtn(item);
    redirect_website_input.value = ""


  } else {
    alertItem.innerHTML = response.message;
    alertItem.style.display = "block";
  }
}
// Add an item to list
function addToBlacklist(val, index) {
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.id = 'blacklistItem_' + index;
  item.innerHTML = val;

  // Delete Image
  const deleted = document.createElement("span");
  deleted.className = "badge bg-danger rounded-circle  cursor-pointer";
  deleted.id = "delete_" + index;
  deleted.innerHTML = `<i class="fas fa-trash"></i>`;

  // Item Delete
  deleted.addEventListener('click', itemDeleted);

  // Append to list
  if (blacklist_ul != null && item != null) {
    item.appendChild(deleted);
    blacklist_ul.appendChild(item);
  }

}

function itemDeleted() {
  var item_index = parseInt(this.id.split("_")[1]);
  var items = this.parentNode;
  var parent = items.parentNode;
  parent.removeChild(items);
  bgpage.remove_from_blacklist(item_index);

}




document.addEventListener("DOMContentLoaded", function (event) {
  if (notloaded) {
    getStorage();
    initSettings();
    notloaded = false;
  }

});