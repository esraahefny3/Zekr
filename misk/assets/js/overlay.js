var click_status = false;
var randomZekrOverlayClassName = 'random-zekr-overlay';
var sabahZekrOverlayClassName = 'sabah-zekr-overlay';
var masaaZekrOverlayClassName = 'masaa-zekr-overlay';

var overlayStyle = `
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

function injectZekrOverlay(overlayClassName, inner_code) {

  let overlay_block = document.getElementsByClassName(overlayClassName)[0];
  if (!overlay_block) {
    overlay_block = document.createElement('div');
    overlay_block.setAttribute("class", overlayClassName);
    overlay_block.innerHTML = inner_code;
    overlay_block.style = overlayStyle;
    container_block = document.body;
    container_block.appendChild(overlay_block);
  }
}

function remove_overlay(overlayClassName) {
  let element = document.getElementsByClassName(overlayClassName)[0];
  if (element) {
    element.parentNode.removeChild(element);
    injectOverlayOff = false;
  }

}


//Add Onclick Listeners
document.addEventListener('click', function(e) {
  if (!click_status && e.target) {
    if (e.target.id == 'get-another-random-zekr') {
      click_status = true;
      getAnotherRandomZekr();
      e.stopPropagation();
      e.preventDefault();

    } else if (e.target.id == 'get-another-sabah-zekr') {
      click_status = true;
      getAnotherSabahZekr();
      e.stopPropagation();
      e.preventDefault();

    } else if (e.target.id == 'get-another-masaa-zekr') {
      click_status = true;
      getAnotherMasaaZekr();
      e.stopPropagation();
      e.preventDefault();

    } else if (e.target.id == 'random-settings-btn' || e.target.id == 'sabah-settings-btn' || e.target.id == 'masaa-settings-btn') {
      chrome.runtime.sendMessage({
        openSettings: true
      }, null);
      e.stopPropagation();
      e.preventDefault();
    } else if ((e.target.id == 'remove-random-overlay-btn' ||
        e.target.id == 'continue-browsing')) {
      click_status = true;
      remove_overlay(randomZekrOverlayClassName);

      e.stopPropagation();
      e.preventDefault();
    } else if (e.target.id == 'redirect') {
      click_status = true;
      redirect();
      e.stopPropagation();
      e.preventDefault();
    } else if (e.target.id == 'sabah-done-btn') {
      click_status = true;
      //save analytics
      // saveSabahZekr()
      setSabahDayDoneDate(new Date().toDateString());
      remove_overlay(sabahZekrOverlayClassName);
    } else if (e.target.id == 'sabah-later-btn' || e.target.id == 'remove-sabah-overlay-btn') {
      click_status = true;
      remove_overlay(sabahZekrOverlayClassName);
    } else if (e.target.id == 'masaa-done-btn') {
      click_status = true;
      //save analytics
      setMasaaDayDoneDate(new Date().toDateString());
      remove_overlay(masaaZekrOverlayClassName);
    } else if (e.target.id == 'masaa-later-btn' || e.target.id == 'remove-masaa-overlay-btn') {
      click_status = true;
      remove_overlay(masaaZekrOverlayClassName);
    }



  }
  window.setTimeout(function() {
    click_status = false;
  }, 500);



}, false);



//Onload

//check if redirect website exist to show the redirect link
function check_redirect() {
  chrome.runtime.sendMessage({
    check_redirect: true
  }, function(response) {
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

function setSabahDayDoneDate(date) {
  chrome.runtime.sendMessage({
    sabahZekrDone: true,
    sabahDayDoneDate: date
  }, null);
}

function setMasaaDayDoneDate(date) {
  chrome.runtime.sendMessage({
    masaaZekrDone: true,
    masaaDayDoneDate: date
  }, null);
}

function getAnotherRandomZekr() {
  chrome.runtime.sendMessage({
    getAnotherRandomZekrOverlay: true
  }, function(response) {
    // Script injected, we can proceed
    if (response && response.done) {
      var zekr = document.getElementById("random-zekr");
      var fadl = document.getElementById("random-fadl");
      zekr.innerHTML = response.zekrData.zekr;
      fadl.innerHTML = response.zekrData.fadl;
    }

  });
}

function getAnotherSabahZekr() {
  chrome.runtime.sendMessage({
    getAnotherSabahZekrOverlay: true
  }, function(response) {
    // Script injected, we can proceed
    if (response && response.done) {
      let zekr = document.getElementById("sabah-zekr");
      let fadl = document.getElementById("sabah-fadl");
      let repetition = document.getElementById("sabah-repetition");
      zekr.innerHTML = response.zekrData.zekr;
      fadl.innerHTML = response.zekrData.fadl;
      repetition.innerHTML = response.zekrData.repetition;
    }

  });
}

function getAnotherMasaaZekr() {
  chrome.runtime.sendMessage({
    getAnotherMasaaZekrOverlay: true
  }, function(response) {
    // Script injected, we can proceed
    if (response && response.done) {
      let zekr = document.getElementById("masaa-zekr");
      let fadl = document.getElementById("masaa-fadl");
      let repetition = document.getElementById("masaa-repetition");
      zekr.innerHTML = response.zekrData.zekr;
      fadl.innerHTML = response.zekrData.fadl;
      repetition.innerHTML = response.zekrData.repetition;
    }

  });
}

var injectOverlayOff;

if (!injectOverlayOff) {
  // content script
  chrome.runtime.sendMessage({
    injectOverlay: true
  }, function(response) {
    // Script injected, we can proceed
    if (response && response.done) {
      icon_src = chrome.runtime.getURL("assets/images/icons/icon128.png");

      let inner_code = `
			<section dir="rtl" class="zeker-overlay profilebox">
        <button class="prof-close btn btn-primary" id="remove-random-overlay-btn" type="button">
          <i class="fas fa-times"></i>
        </button>
					<aside class="zeker-overlay__aside ks_nomargin">
          <div class="zeker-overlay__aside__profile-pic">
            <img class="profpic" src=${icon_src} alt="profile picture" />
          </div>
						<ul class="prof-sm">
							<li>
								<span title="Learn another word" >
                  <i id="get-another-random-zekr" class="fas fa-sync-alt"></i>
								</span>
							</li>

							<li>
								<span  title="Settings (Change Language)" >
                  <i id="random-settings-btn"  class="fas fa-cogs svg-icon"></i>
								</span>
							</li>
						</ul>
					</aside>
          <div class="zeker-overlay__content">
            <header class="ks_header zeker-overlay__header">
              <h1 class="ks_center prof-name text-center text-primary mb-4">اذكر الله</h1>
            </header>
            <main class="ks-user-desc my-2">
              <h3 id="random-zekr" class="zekr-text">
                <i class="fas fa-quote-right fa-xs"></i> ${response.zekrData.zekr} <i class="fas fa-quote-left fa-xs"></i>
              </h3>
              <p id="random-fadl" class="zekr-text mb-0 mt-2 text-secondary-dark">${response.zekrData.fadl}</p>
            </main>
            <footer class="zeker-overlay__footer">
              <ul class="user-tags">
                <li class="tag ks_uppercase" >${response.higriDate}</li>
              </ul>
              <div class="mt-4">
                <button class="ks_info btn btn-primary ml-2" id="continue-browsing" type="button">
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
      injectZekrOverlay(randomZekrOverlayClassName, inner_code);

      // hideCloseOverlay();



    }
  })
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action == "open_sabah_overlay") {
    if (!injectOverlayOff) {
      showSabahZekr(message);
    }
    return true;
  }
  if (message.action == "open_masaa_overlay") {
    if (!injectOverlayOff) {
      showMasaaZekr(message);
    }
    return true;
  }
});

function showSabahZekr(message) {
  if (message.response && message.response.done) {
    icon_src = chrome.runtime.getURL("assets/images/icons/icon128.png");
    let inner_code = `
    <section dir="rtl" class="zeker-overlay profilebox">
      <button class="prof-close btn btn-primary" id="remove-sabah-overlay-btn" type="button">
        <i class="fas fa-times"></i>
      </button>
        <aside class="zeker-overlay__aside ks_nomargin">
        <div class="zeker-overlay__aside__profile-pic">
          <img class="profpic" src=${icon_src} alt="profile picture" />
        </div>
          <ul class="prof-sm">
            <li>
              <span title="Learn another word" >
                <i id="get-another-sabah-zekr" class="fas fa-sync-alt"></i>
              </span>
            </li>

            <li>
              <span  title="Settings (Change Language)" >
                <i id="sabah-settings-btn"  class="fas fa-cogs svg-icon"></i>
              </span>
            </li>
          </ul>
        </aside>
        <div class="zeker-overlay__content">
          <header class="ks_header zeker-overlay__header">
            <h1 class="ks_center prof-name text-center text-primary mb-4">اذكار الصباح</h1>
          </header>
          <main class="ks-user-desc my-2">
            <h3 id="sabah-zekr" class="zekr-text">
              <i class="fas fa-quote-right fa-xs"></i> ${message.response.zekrData.zekr} <i class="fas fa-quote-left fa-xs"></i>
            </h3>
            <p id="sabah-fadl" class="zekr-text mb-0 mt-2 text-secondary-dark">${message.response.zekrData.fadl}</p>
            <p id="sabah-repetition" class="zekr-text mb-0 mt-2 text-secondary-dark">${message.response.zekrData.repetition}</p>

          </main>
          <footer class="zeker-overlay__footer">
            <ul class="user-tags">
              <li class="tag ks_uppercase" >${message.response.higriDate}</li>
            </ul>
            <div class="mt-4">
              <button class="ks_info btn btn-primary ml-2" id="sabah-done-btn" type="button">
                <i class="fas fa-recycle"></i>
              تم
              </button>
              <button class="ks_info btn btn-secondary" id="sabah-later-btn" type="button">
               <i class="fas fa-share-square"></i>
              لاحقا
              </button>
            </div>
          </footer>
        </div>
  </section>
  `;
    injectOverlayOff = true;
    injectZekrOverlay(sabahZekrOverlayClassName, inner_code);
    return true;

  }
}

function showMasaaZekr(message) {
  if (message.response && message.response.done) {
    icon_src = chrome.runtime.getURL("assets/images/icons/icon128.png");
    let inner_code = `
    <section dir="rtl" class="zeker-overlay profilebox">
      <button class="prof-close btn btn-primary" id="remove-masaa-overlay-btn" type="button">
        <i class="fas fa-times"></i>
      </button>
        <aside class="zeker-overlay__aside ks_nomargin">
        <div class="zeker-overlay__aside__profile-pic">
          <img class="profpic" src=${icon_src} alt="profile picture" />
        </div>
          <ul class="prof-sm">
            <li>
              <span title="Learn another word" >
                <i id="get-another-masaa-zekr" class="fas fa-sync-alt"></i>
              </span>
            </li>

            <li>
              <span  title="Settings (Change Language)" >
                <i id="masaa-settings-btn"  class="fas fa-cogs svg-icon"></i>
              </span>
            </li>
          </ul>
        </aside>
        <div class="zeker-overlay__content">
          <header class="ks_header zeker-overlay__header">
            <h1 class="ks_center prof-name text-center text-primary mb-4">اذكار المساء</h1>
          </header>
          <main class="ks-user-desc my-2">
          <h3 id="sabah-zekr" class="zekr-text">
            <i class="fas fa-quote-right fa-xs"></i> ${message.response.zekrData.zekr} <i class="fas fa-quote-left fa-xs"></i>
          </h3>
          <p id="sabah-fadl" class="zekr-text mb-0 mt-2 text-secondary-dark">${message.response.zekrData.fadl}</p>
          <p id="sabah-repetition" class="zekr-text mb-0 mt-2 text-secondary-dark">${message.response.zekrData.repetition}</p>

          </main>
          <footer class="zeker-overlay__footer">
            <ul class="user-tags">
              <li class="tag ks_uppercase" >${message.response.higriDate}</li>
            </ul>
            <div class="mt-4">
              <button class="ks_info btn btn-primary ml-2" id="masaa-done-btn" type="button">
                <i class="fas fa-recycle"></i>
              تم
              </button>
              <button class="ks_info btn btn-secondary" id="masaa-later-btn" type="button">
               <i class="fas fa-share-square"></i>
               لاحقا
              </button>
            </div>
          </footer>
        </div>
  </section>
  `;

    injectOverlayOff = true;
    injectZekrOverlay(masaaZekrOverlayClassName, inner_code);
    return true;
  }
}