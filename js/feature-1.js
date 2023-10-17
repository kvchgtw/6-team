// kvch
let currentCity = ''
let default_location = '臺中市' 
let longitude=''
let latitude=''
let locationBtn = document.querySelector('.info__left--icon')
let favoriteCity = ''
let addFavoriteBtn = document.querySelector(".info__favorite")
let infoSection = document.querySelector('.info')
let favoriteDivContainer = document.createElement('div')
infoSection.prepend(favoriteDivContainer)

if (favoriteCity){
  currentCity = favoriteCity
}else{
  currentCity = default_location
}






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
        console.log("current city after pressed location btn: ", currentCity)

    })
    
};


addFavoriteBtn.addEventListener('click', function(){
    favoriteDivContainer.innerHTML = ''
    favoriteCity = currentCity
    favoriteDiv = document.createElement('div')
    favoriteDiv.textContent = favoriteCity
    favoriteDivContainer.appendChild(favoriteDiv)

    
})



