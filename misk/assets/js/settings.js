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


// Initialize List
function initSettings() {
  // Loop through array and add stored items to list
  blacklistData.forEach(addToBlacklist);
  all_websites_toggle.checked = bgpage.get_all_websites_status();
  minutes_input.value = bgpage.get_frequency();
  always_show.checked = (minutes_input.value == 0);


  // Event Listeners
  add_to_list.addEventListener('click', (e) => {
    setStorage();
  })


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


}



// Add an item to list
function addToBlacklist(val, index) {
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex align-items-center mb-2 border-1 rounded';
  item.id = 'blacklistItem_' + index;
  item.innerHTML = `<div class="ms-auto">${val}</div>`;

  // Delete Image
  const deleted = document.createElement("button");
  deleted.className = "btn btn-danger rounded-circle btn-sm";
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