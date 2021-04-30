//code to inject and style (editable, will be great if we could use other file as well!)
//var inner_code = "<p>this is an overlay</p> <button id='remove_overlay_btn'> turn me off</button";
//var inner_code = "<div id='container'> <div id='success-box'> <div class='dot'></div> <div class='dot two'></div> <div class='face'>   <div class='eye'></div>   <div class='eye right'></div>   <div class='mouth happy'></div> </div> <div class='shadow scale'></div> <div class='message'><h1 class='alert'>Success!</h1><p>yay, everything is working.</p></div> <button class='button-box'><h1 class='green'>continue</h1></button> </div> </div>";
var click_status = false;

var lang;
var overlay_style = `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    background-color: rgba(0,0,0,0.9) !important;
	z-index: 6000;
`;

//Hide remove_overlay_btn,remove_overlay_btn and redirect btns
function hideCloseOverlay() {
  document.getElementById("remove_overlay_btn").style.display = 'none';
  document.getElementById("continue_browsing").style.display = 'none';
  document.getElementById("redirect").style.display = 'none';
  document.getElementById("get-another-zekr").style.display = 'none';


}
//Display remove_overlay_btn,remove_overlay_btn and redirect btns
function displayCloseOverlay() {
  document.getElementById("remove_overlay_btn").style.display = 'inline';
  document.getElementById("continue_browsing").style.display = 'inline';
  document.getElementById("get-another-zekr").style.display = 'inline';
}

function inject_overlay(inner_code, color_to_add) {

  var overlay_block = document.getElementsByClassName("ks_overlay")[0];

  if (!overlay_block) {

    overlay_block = document.createElement('div');
    overlay_block.setAttribute("class", "ks_overlay");
    overlay_block.innerHTML = inner_code;
    overlay_block.style = overlay_style;
    var sheet = document.createElement('style')
    colors = [];
    color_to_add.replace(/[0-9A-F]{6}/gi, function (color) {
      colors.push("#" + color);
    });
    sheet.innerHTML = ".profilebox {background-image: " + color_to_add + " !important;} .profpic {border-color: " + colors[0] + " !important;} .prof-sm .ks_sm  {background: " + colors[0] + " !important;}";
    document.body.appendChild(sheet);

    container_block = document.body;
    container_block.appendChild(overlay_block);

  }


}

function remove_overlay() {
  var element = document.getElementsByClassName("ks_overlay")[0];
  if (element) {
    element.parentNode.removeChild(element);
  }

}


//Add Onclick Listeners
document.addEventListener('click', function (e) {
  if (!click_status && e.target) {
    if (e.target.id == 'get-another-zekr') {
      click_status = true;
      getAnotherZekr();
      e.stopPropagation();
      e.preventDefault();

    } else if (e.target.id == 'settings_btn') {
      chrome.runtime.sendMessage({
        openSettings: true
      }, null);
      e.stopPropagation();
      e.preventDefault();
    } else if ((e.target.id == 'remove_overlay_btn' || e.target.id == 'continue_browsing')) {
      click_status = true;

      continueBrowsing();
      remove_overlay();

      e.stopPropagation();
      e.preventDefault();
    } else if (e.target.id == 'redirect') {
      click_status = true;
      redirect();
      e.stopPropagation();
      e.preventDefault();
    }

  }
  window.setTimeout(function () {
    click_status = false;
  }, 500);



}, false);


function continueBrowsing() {
  chrome.runtime.sendMessage({
    continueBrowsing: true
  }, null);
}

//Onload

//check if redirect website exist to show the redirect link
function check_redirect() {
  chrome.runtime.sendMessage({
    check_redirect: true
  }, function (response) {
    if (response.response) {
      document.getElementById("redirect").style.display = 'inline';

    }
  });

}

//Redirect to user redirect website
function redirect() {
  chrome.runtime.sendMessage({
    redirect: true
  }, null);
}

function overlay_on(inner_code, color_to_add) {
  inject_overlay(inner_code, color_to_add);
}

/*

Errors: No errors for now!

*/

function getAnotherZekr() {
  chrome.runtime.sendMessage({
    getAnotherZekrOverlay: true
  }, function (response) {
    // Script injected, we can proceed
    if (response && response.done) {
      var zekr = document.getElementById("zekr");
      var fadl = document.getElementById("fadl");
      zekr.innerHTML = response.zekrData.zekr;
      fadl.innerHTML = response.zekrData.fadl;
    }

  });
}

var injectOverlayOff;

if (!injectOverlayOff) {
  // content script
  chrome.runtime.sendMessage({
    injectOverlay: true
  }, function (response) {
    // Script injected, we can proceed
    if (response && response.done) {
      icon_src = chrome.runtime.getURL("images/icon48.png");

      var inner_code = `
			<section dir="rtl" class="zeker-overlay profilebox">
        <button class="prof-close btn btn-primary" id="remove_overlay_btn" type="button">
          <i class="fas fa-times"></i>
        </button>
					<aside class="zeker-overlay__aside ks_nomargin">
          <div class="zeker-overlay__aside__profile-pic">
            <img class="profpic" src=${icon_src} alt="profile picture" />
          </div>
						<ul class="prof-sm">
							<li>
								<span title="Learn another word" >
                  <i id="get-another-zekr" class="fas fa-sync-alt"></i>
								</span>
							</li>

							<li>
								<span  title="Settings (Change Language)" >
                  <i id="settings_btn"  class="fas fa-cogs svg-icon"></i>
								</span>
							</li>
						</ul>
					</aside>
          <div class="zeker-overlay__content">
            <header class="ks_header zeker-overlay__header">
              <h1 class="ks_center prof-name text-center text-primary mb-4">اذكر الله</h1>
            </header>
            <main class="ks-user-desc my-2">
              <h3 id="zekr" class="zekr-text">
                <i class="fas fa-quote-right fa-xs"></i> ${response.zekrData.zekr} <i class="fas fa-quote-left fa-xs"></i>
              </h3>
              <p id="fadl" class="zekr-text mb-0 mt-2 text-secondary-dark">${response.zekrData.fadl}</p>
            </main>
            <footer class="zeker-overlay__footer">
              <ul class="user-tags">
                <li class="tag ks_uppercase" >${response.higriDate}</li>
              </ul>
              <div class="mt-4">
                <button class="ks_info btn btn-primary ml-2" id="continue_browsing" type="button">
                  <i class="fas fa-recycle"></i>
                  تابع التصفح
                </button>
                <button class="ks_info btn btn-secondary" id="redirect" type="button">
                 <i class="fas fa-share-square"></i>
                إعادة توجيه
                </button>
              </div>
            </footer>
          </div>









				</section>
		`;

      injectOverlayOff = true;
      overlay_on(inner_code, response.color_to_add);

      // hideCloseOverlay();



    }
  })
};