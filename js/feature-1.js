// kvch
let currentCity = '台中市' //預設縣市為台中市。用戶會透過定位，或是點選地圖改變 currentCity
let cityTitle = document.querySelector(".info__left--title") //被選取的城市名稱。若定位改變，或是用戶點選地圖，就要更新名稱

let longitude=''
let latitude=''
let locationBtn = document.querySelector('.info__left--icon')

locationBtn.addEventListener('click', function(){
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        
        if (longitude && latitude){
            fetchCity()
        }
      });
    
    }else{
      alert("Your browser does not support Geolocation API");
    }

})
    

function fetchCity(){
    fetch("https://api.nlsc.gov.tw/other/TownVillagePointQuery1/"+longitude+'/'+latitude).then(function (response) {
    return response.text();
    }).then(function (data) {

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml");
        let ctyName = xmlDoc.querySelector("ctyName").textContent;

        currentCity = ctyName
        updateCityTitle()
        
    })
    
};


function updateCityTitle(){
    cityTitle.textContent = currentCity
}