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

if (window.localStorage.getItem('favoriteCity')){
  favoriteCity = window.localStorage.getItem('favoriteCity')
  currentCity = favoriteCity 
  favoriteDivContainer.innerHTML = ''
  favoriteDiv = document.createElement('div')
  favoriteDiv.textContent = favoriteCity
  deleteFavoriteBtn = document.createElement('span')
  deleteFavoriteBtn.classList.add("info__delete--favorite")
  favoriteDiv.appendChild(deleteFavoriteBtn)
  favoriteDivContainer.appendChild(favoriteDiv)
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
        getData(currentCity)

    })
    
};


addFavoriteBtn.addEventListener('click', function(){
    favoriteDivContainer.innerHTML = ''
    favoriteCity = currentCity
    favoriteDiv = document.createElement('div')
    favoriteDiv.textContent = favoriteCity
    deleteFavoriteBtn = document.createElement('span')
    deleteFavoriteBtn.classList.add("info__delete--favorite")
    favoriteDiv.appendChild(deleteFavoriteBtn)
    favoriteDivContainer.appendChild(favoriteDiv)

    if (window.localStorage.getItem('favoriteCity')){
      window.localStorage.clear();
    }
    
    window.localStorage.setItem('favoriteCity', favoriteCity)

    
})



function createFavoriteItem(){
    favoriteDivContainer.innerHTML = ''
    favoriteCity = currentCity
    favoriteDiv = document.createElement('div')
    favoriteDiv.textContent = favoriteCity
    deleteFavoriteBtn = document.createElement('span')
    deleteFavoriteBtn.classList.add("info__delete--favorite")
    favoriteDiv.appendChild(deleteFavoriteBtn)
    favoriteDivContainer.appendChild(favoriteDiv)

    deleteFavoriteBtn.addEventListener('click', function(){
        console.log("pressed delete btn")
        favoriteDivContainer.innerHTML = ''
        window.localStorage.clear();
      
      })
}