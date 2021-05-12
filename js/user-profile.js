 var inputUserNameId = '#input-username';
 var inputEmailId = '#input-email';
 var dialogDataSavedId = '#dialog-data-saved';
 var inputUserNameId = '#input-username';
 var profilePicId = '#imageResult';
 /*  ==========================================
     INTIALIZATION
 * ========================================== */
 //UPLOADE IMAGE
 function initFileUpload() {
   //listener to change event of file upload input
   $('#upload').on('change', function (e) {
     readURL(e);
   });
 }

 //SHOW UPLOADED IMAGE
 function readURL(e) {
   let fileName = e.target.files[0].name;
   if (e.target.files && e.target.files[0]) {
     var reader = new FileReader();

     reader.onload = function (e) {
       $(profilePicId)
         .attr('src', e.target.result);
     };
     let input = $('#upload')[0];
     reader.readAsDataURL(input.files[0]);
   }
 }

 //user data form submit listener
 function initUserDataFormSubmitListener() {
   $('#form-user-info').submit(function (e) {
     e.preventDefault();
     let user = storage_get(User.storageKey);
     user.userName = $(inputUserNameId).val();
     user.email = $(inputEmailId).val();
     user.location = {
       countryCode: $("#country-select option:selected").val(),
       countryName: $("#country-select option:selected").text(),
       stateName: $("#state-select option:selected").val()
     };

     saveUser(user);
   });
 }
 //initialize input fields
 //hnaaaaaaaaaa parsing l json
 function intializeFormInputFields() {
   let user = storage_get(User.storageKey);
   if (user) {
     $(inputUserNameId).val(user.userName);
     $(inputEmailId).val(user.email);
     if (user.location.countryCode) {
       setCountryStateSelect(user.location.countryCode, user.location.stateName);
     } else {
       autoDetectUserCountry();
     }

   }
 }

 function intializeCountries() {
   createOption("country-select", countries);
 }

 function createOption(elem, array) {
   var sel = document.getElementById(elem);
   var fragment = document.createDocumentFragment();

   array.forEach(function (jsonObj, index) {
     var opt = document.createElement('option')
     opt.innerHTML = jsonObj['name'];
     if (jsonObj['sortname']) {
       opt.value = jsonObj['sortname'];
       opt.setAttribute("country-id", jsonObj['id']);
     } else {
       opt.value = jsonObj['name'];
     }
     fragment.appendChild(opt);
   });

   sel.appendChild(fragment);
 }
 $('#country-select').on('change', function (e) {
   let countryId = $("#country-select option:selected").attr('country-id');
   //FILTER WITH COUNTRY ID
   // console.log(states["" + value + ""]);
   $('#state-select').find("option:gt(0)").remove();
   let selectedStates = states.filter(s => s.country_id == countryId);
   createOption('state-select', selectedStates);

 });
 $('#state-select').on('change', function (e) {
   var value = $(this).val();


 });

 function init() {
   //intialize file upload input

   // initFileUpload();

   //Intialize the NiceCountry Input
   // new NiceCountryInput($('.picker-country')).init();

   intializeCountries();
   intializeFormInputFields();

   //initialize user data form listener
   initUserDataFormSubmitListener();
 }

 /*  ==========================================
     DOCUMENT READY
 * ========================================== */

 $(function ($) {
   init();
 });
 /*  ==========================================
     SAVING USER DATA
 * ========================================== */
 function saveUser(user) {

   // userObject = JSON.parse(JSON.stringify(user));
   storage_set(User.storageKey, user);
   $.ajax({
     success: function (data) {
       $(dialogDataSavedId).modal('show');
     }
   });
 }


 /*  ==========================================
    COUNTRY AUTODETECT
 * ========================================== */
 //autodetect user country based on his ip
 function autoDetectUserCountry() {
   let loc = getUserLocation(callback);

   //callback handles user location and update country picker
   function callback(location) {
     if (location) {
       locationObject = JSON.parse(location);
       // updatePickerCountry(locationObject.countryCode);
       setCountryStateSelect(locationObject.countryCode, locationObject.city)
     }
   }
 }

 function setCountryStateSelect(countryCode, state) {
   $("#country-select").val(countryCode).trigger('change');
   $("#state-select").val(state).trigger('change');

 }

 //listener to click event on detect user location link
 $('#link-country-auto-detect').click(function () {
   autoDetectUserCountry();
 });