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
// let loader = document.createElement('div')
// loader.classList.add("info__location--loader")
infoSection.prepend(favoriteDivContainer)

let deleteFavoriteBtn = document.createElement('span')
deleteFavoriteBtn.classList.add("info__delete--favorite")

if (window.localStorage.getItem('favoriteCity')){
  favoriteCity = window.localStorage.getItem('favoriteCity')
  currentCity = favoriteCity 
  favoriteDivContainer.innerHTML = ''
  favoriteDiv = document.createElement('div')
  favoriteDiv.textContent = favoriteCity
  favoriteDiv.appendChild(deleteFavoriteBtn)
  favoriteDivContainer.appendChild(favoriteDiv)
}else{
  currentCity = default_location
}



const getPositionOptions = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 10000,
  };

function error(err) {
console.warn(`ERROR(${err.code}): ${err.message}`);
alert("無法取得用戶位置資訊。"+ `ERROR(${err.code}): ${err.message}`)
// loader.display = "none"
}

function success(position) {
    latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('取得用戶位置經緯度：', longitude, latitude)
        if (longitude && latitude){
            fetchCity()
        }
  }


locationBtn.addEventListener('click', function(){
    // locationBtn.style.display = 'none';
    // loader.style.display = 'block';
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, getPositionOptions);
    
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
        renderInfor(currentCity)
    })
    
};


addFavoriteBtn.addEventListener('click', function(){
    favoriteDivContainer.innerHTML = ''
    favoriteCity = currentCity
    favoriteDiv = document.createElement('div')
    favoriteDiv.textContent = favoriteCity
    favoriteDiv.appendChild(deleteFavoriteBtn)
    favoriteDivContainer.appendChild(favoriteDiv)

    if (window.localStorage.getItem('favoriteCity')){
      window.localStorage.clear();
    }
    
    window.localStorage.setItem('favoriteCity', favoriteCity)

    
})

deleteFavoriteBtn.addEventListener('click', function(){
  console.log("pressed delete")
  favoriteDivContainer.innerHTML = ''
  window.localStorage.clear();

})



