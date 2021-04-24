 // const url = "http://www.whateverorigin.org/get?url=" + encodeURIComponent(child.val()["ajax-url"]) + "&callback=?";

 let countriesUrlsStorageKey = 'countries-urls';

 function makecountriesUrls() {
   let countriesUrls = {
    AD:'https://www.islamicfinder.org/prayer-widget/3041563/shafi/1/0/18.0/17.0',
   AE:'https://www.islamicfinder.org/prayer-widget/292968/shafi/4/0/18.5/19.0',
   EG:' https://www.islamicfinder.org/prayer-widget/360630/shafi/2/0/19.5/17.5',


 }
 storage_set(countriesUrlsStorageKey, countriesUrls);
   return countriesUrls;
 }

 function scrapeHigriDateAndTimes(countryCode,callback) {
   let url=getHigriUrl(countryCode);

   if(url)
   {
   fetch(url)
     .then(function(response) {
       return response.text();
     })
     .then(function(html) {
       let parser = new DOMParser();
       let doc = parser.parseFromString(html, "text/html");
       let higriObj = new Higri();
       higriObj.countryCode = countryCode;
       higriObj.lastModify = new Date().toDateString();

       let country = doc.querySelector('.inline-link').innerHTML;
       higriObj.country = country;

       let higriDate = doc.querySelector('#grey div').innerHTML;
       higriObj.higriDate = higriDate;

       let fajrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(1) > p:nth-child(3)").innerHTML;
       higriObj.fajrTime = fajrTime;

       let sunriseTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(3) > p:nth-child(3)").innerHTML;
       higriObj.sunriseTime = sunriseTime;

       let duhrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(5) > p:nth-child(3)").innerHTML;
       higriObj.duhrTime = duhrTime;

       let asrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(7) > p:nth-child(3)").innerHTML;
       higriObj.asrTime = asrTime;

       let magiribTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(9) > p:nth-child(3)").innerHTML;
       higriObj.magiribTime = magiribTime;
       let ishaTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(11) > p:nth-child(3)").innerHTML;
       higriObj.ishaTime = ishaTime;

       // let hijrDay = hijri_date.replace(/(^\d+)(.+$)/i, "$1");
       // let hijrMonth = hijri_date.split(' ')[1].replace(/,/g, '');
       // let hijrYear = hijri_date.split(' ')[2].replace(/h/g, '');

          storage_set(Higri.storageKey, higriObj);
       callback(higriObj);
     });
   }
   else
   {
    console.log('Cannot find higri url');
   }
 }

 function getHigriUrl(countryCode)
 {
  let countriesUrls = storage_get(countriesUrlsStorageKey);
   if (!countriesUrls) {
     countriesUrls = makecountriesUrls();
   }
   let map = new Map(Object.entries(countriesUrls));
   let url = map.get(countryCode);
   if(url)
   {
    return url;
   }
   return null;
 }