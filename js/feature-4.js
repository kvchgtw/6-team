// Angie

let AUTHORIZATION_KEY_Angie = "CWB-853455FC-DE79-4717-82CC-6670E26F3399";
const now = new Date();
const hours = now.getHours();
let time = "night"
if (hours>=6 && hours<18){
    time = "day";
}

const mapIconLocation = {
    "嘉義縣":"translate(360px,490px)",
    "新北市":"translate(460px,170px)",
    "嘉義市":"translate(250px,480px)",
    "新竹縣":"translate(450px,290px)",
    "新竹市":"translate(370px,250px)",
    "臺北市":"translate(510px,150px)",
    "臺南市":"translate(240px,540px)",
    "宜蘭縣":"translate(580px,250px)",
    "苗栗縣":"translate(340px,290px)",
    "雲林縣":"translate(250px,430px)",
    "花蓮縣":"translate(530px,450px)",
    "臺中市":"translate(320px,330px)",
    "臺東縣":"translate(470px,600px)",
    "桃園市":"translate(400px,190px)",
    "南投縣":"translate(420px,420px)",
    "高雄市":"translate(250px,600px)",
    "金門縣":"translate(30px,280px)",
    "屏東縣":"translate(300px,700px)",
    "基隆市":"translate(570px,170px)",
    "澎湖縣":"translate(150px,450px)",
    "彰化縣":"translate(280px,380px)",
    "連江縣":"translate(200px,20px)"
}

function loadMapData() {
    src = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="+AUTHORIZATION_KEY_Angie+"&format=JSON&sort=time"
    fetch(src)
    .then((response) => response.json())
    .then(function(data) {
        const mapWeatherDataList = data["records"]["location"];
        mapWeatherDataList.forEach(function(e){
            const mapLocationName = e["locationName"];
            const mapWeatherElementParameterValue = e["weatherElement"][0]["time"][0]["parameter"]["parameterValue"];
            const [weatherType] = Object.entries(weatherTypes[time]).find(([weatherType, weatherCodes]) =>
                    weatherCodes.includes(Number(mapWeatherElementParameterValue)));
            mapElement = document.querySelector(".map__weather__icon");
            const img = document.createElement("img");
            img.src = `./icon/images/${weatherType}.svg`;
            img.style.width = "40px"
            img.style.position = 'absolute';
            img.style.top = "0px";
            if (mapLocationName in mapIconLocation) {
                img.style.transform = mapIconLocation[mapLocationName];
            }
            mapElement.appendChild(img);
        }
        );
    })
}

window.onload(loadMapData);

