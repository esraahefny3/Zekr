var bgpage = chrome.extension.getBackgroundPage();


function init() {
	document.addEventListener('click',function(e){
	if(e.target){
	   if (e.target.id== 'settings_btn'){
	        chrome.runtime.sendMessage({openSettings : true}, null);
	        e.stopPropagation();
	    	e.preventDefault();
	    } 
	 }



 },false);


	var theme_color_picker = document.getElementsByClassName('theme_color_picker');

  	color_theme = bgpage.get_color_theme();
 
  	for (item of theme_color_picker) { 
  		item.style.background = color_theme;
    } 
}

document.addEventListener("DOMContentLoaded", function(event) { 
    init();

});