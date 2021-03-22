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
  document.getElementById("learn_another").style.display = 'none';


}
//Display remove_overlay_btn,remove_overlay_btn and redirect btns
function displayCloseOverlay() {
  document.getElementById("remove_overlay_btn").style.display = 'inline';
  document.getElementById("continue_browsing").style.display = 'inline';
  document.getElementById("learn_another").style.display = 'inline';
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
    color_to_add.replace(/[0-9A-F]{6}/gi, function(color) {
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
document.addEventListener('click', function(e) {
  if (!click_status && e.target) {
    if (e.target.id == 'learn_another') {
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
  window.setTimeout(function() {
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

function overlay_on(inner_code, color_to_add) {
  inject_overlay(inner_code, color_to_add);
}

/*

Errors: No errors for now!

*/

function getAnotherZekr() {
  chrome.runtime.sendMessage({
    getAnotherZekrOverlay: true
  }, function(response) {
    // Script injected, we can proceed
    if (response && response.done) {
      var learn_word = document.getElementById("learn_word");
      var translated_word = document.getElementById("translated_word");
      learn_word.innerHTML = '"' + response.en_word + '"';
      translated_word.innerHTML = '"' + response.new_word + '"';
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



      icon_src = chrome.runtime.getURL("pp.jpg");

      var inner_code = `
			<section class="profilebox">
					<aside class="ks_nomargin">
						<a href="https://www.kasahorow.org" target="_blank"><img class="profpic" src=" ` + icon_src + `" alt="profile picture" /></a>
						<button class="prof-close" id="remove_overlay_btn" type="button"  >&times;</button>
						<ul class="prof-sm">
							<li class="ks_sm" >
								<span title="Learn another word" >
									<svg id="learn_another" class="svg-icon" viewBox="0 0 20 20">
										<path fill="none" d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"></path>
									</svg>
								</a>
							</li>

							<li class="ks_sm" >
								<span  title="Settings (Change Language)" >
									<svg id="settings_btn" class="svg-icon" viewBox="0 0 20 20">
										<path d="M17.498,11.697c-0.453-0.453-0.704-1.055-0.704-1.697c0-0.642,0.251-1.244,0.704-1.697c0.069-0.071,0.15-0.141,0.257-0.22c0.127-0.097,0.181-0.262,0.137-0.417c-0.164-0.558-0.388-1.093-0.662-1.597c-0.075-0.141-0.231-0.22-0.391-0.199c-0.13,0.02-0.238,0.027-0.336,0.027c-1.325,0-2.401-1.076-2.401-2.4c0-0.099,0.008-0.207,0.027-0.336c0.021-0.158-0.059-0.316-0.199-0.391c-0.503-0.274-1.039-0.498-1.597-0.662c-0.154-0.044-0.32,0.01-0.416,0.137c-0.079,0.106-0.148,0.188-0.22,0.257C11.244,2.956,10.643,3.207,10,3.207c-0.642,0-1.244-0.25-1.697-0.704c-0.071-0.069-0.141-0.15-0.22-0.257C7.987,2.119,7.821,2.065,7.667,2.109C7.109,2.275,6.571,2.497,6.07,2.771C5.929,2.846,5.85,3.004,5.871,3.162c0.02,0.129,0.027,0.237,0.027,0.336c0,1.325-1.076,2.4-2.401,2.4c-0.098,0-0.206-0.007-0.335-0.027C3.001,5.851,2.845,5.929,2.77,6.07C2.496,6.572,2.274,7.109,2.108,7.667c-0.044,0.154,0.01,0.32,0.137,0.417c0.106,0.079,0.187,0.148,0.256,0.22c0.938,0.936,0.938,2.458,0,3.394c-0.069,0.072-0.15,0.141-0.256,0.221c-0.127,0.096-0.181,0.262-0.137,0.416c0.166,0.557,0.388,1.096,0.662,1.596c0.075,0.143,0.231,0.221,0.392,0.199c0.129-0.02,0.237-0.027,0.335-0.027c1.325,0,2.401,1.076,2.401,2.402c0,0.098-0.007,0.205-0.027,0.334C5.85,16.996,5.929,17.154,6.07,17.23c0.501,0.273,1.04,0.496,1.597,0.66c0.154,0.047,0.32-0.008,0.417-0.137c0.079-0.105,0.148-0.186,0.22-0.256c0.454-0.453,1.055-0.703,1.697-0.703c0.643,0,1.244,0.25,1.697,0.703c0.071,0.07,0.141,0.15,0.22,0.256c0.073,0.098,0.188,0.152,0.307,0.152c0.036,0,0.073-0.004,0.109-0.016c0.558-0.164,1.096-0.387,1.597-0.66c0.141-0.076,0.22-0.234,0.199-0.393c-0.02-0.129-0.027-0.236-0.027-0.334c0-1.326,1.076-2.402,2.401-2.402c0.098,0,0.206,0.008,0.336,0.027c0.159,0.021,0.315-0.057,0.391-0.199c0.274-0.5,0.496-1.039,0.662-1.596c0.044-0.154-0.01-0.32-0.137-0.416C17.648,11.838,17.567,11.77,17.498,11.697 M16.671,13.334c-0.059-0.002-0.114-0.002-0.168-0.002c-1.749,0-3.173,1.422-3.173,3.172c0,0.053,0.002,0.109,0.004,0.166c-0.312,0.158-0.64,0.295-0.976,0.406c-0.039-0.045-0.077-0.086-0.115-0.123c-0.601-0.6-1.396-0.93-2.243-0.93s-1.643,0.33-2.243,0.93c-0.039,0.037-0.077,0.078-0.116,0.123c-0.336-0.111-0.664-0.248-0.976-0.406c0.002-0.057,0.004-0.113,0.004-0.166c0-1.75-1.423-3.172-3.172-3.172c-0.054,0-0.11,0-0.168,0.002c-0.158-0.312-0.293-0.639-0.405-0.975c0.044-0.039,0.085-0.078,0.124-0.115c1.236-1.236,1.236-3.25,0-4.486C3.009,7.719,2.969,7.68,2.924,7.642c0.112-0.336,0.247-0.664,0.405-0.976C3.387,6.668,3.443,6.67,3.497,6.67c1.75,0,3.172-1.423,3.172-3.172c0-0.054-0.002-0.11-0.004-0.168c0.312-0.158,0.64-0.293,0.976-0.405C7.68,2.969,7.719,3.01,7.757,3.048c0.6,0.6,1.396,0.93,2.243,0.93s1.643-0.33,2.243-0.93c0.038-0.039,0.076-0.079,0.115-0.123c0.336,0.112,0.663,0.247,0.976,0.405c-0.002,0.058-0.004,0.114-0.004,0.168c0,1.749,1.424,3.172,3.173,3.172c0.054,0,0.109-0.002,0.168-0.004c0.158,0.312,0.293,0.64,0.405,0.976c-0.045,0.038-0.086,0.077-0.124,0.116c-0.6,0.6-0.93,1.396-0.93,2.242c0,0.847,0.33,1.645,0.93,2.244c0.038,0.037,0.079,0.076,0.124,0.115C16.964,12.695,16.829,13.021,16.671,13.334 M10,5.417c-2.528,0-4.584,2.056-4.584,4.583c0,2.529,2.056,4.584,4.584,4.584s4.584-2.055,4.584-4.584C14.584,7.472,12.528,5.417,10,5.417 M10,13.812c-2.102,0-3.812-1.709-3.812-3.812c0-2.102,1.71-3.812,3.812-3.812c2.102,0,3.812,1.71,3.812,3.812C13.812,12.104,12.102,13.812,10,13.812"></path>
									</svg>
								</a>
							</li>



						</ul>
					</aside>
					<header class="ks_header">
						<h1 class="ks_center prof-name">اذكر الله</h1>
						<a href="https://www.kasahorow.org" class="ks_nounderline" target="_blank"><h4 class="ks_center prof-user">@kasahorow_learn</h4></a>
					</header>
					<main class="ks-user-desc">
						<p class="ks_center"> <span id="learn_word" class="ks_uppercase" >"` + response.zekr + `"</span>. <span id="translated_word" class="ks_uppercase"> "` + response.fdl + `"<span/>.</p>
					</main>
					<footer>
						<ul class="user-tags">
							<li class="tag ks_uppercase" >` + response.date + `</li>

						</ul>
					</footer>
					<br><br>
					<container>
					<row>

				        <div class="col-sm-4">
				       		 <button class="ks_info" id="continue_browsing" type="button"   ">Continue browsing</button>
						</div>
						<div class="col-sm-2">
				       		 <button class="ks_info" id="redirect" type="button"   ">Redirect</button>
						</div>
					</row>
					</container>
				</section>
		`;

      injectOverlayOff = true;
      overlay_on(inner_code, response.color_to_add);

      hideCloseOverlay();



    }
  })
};