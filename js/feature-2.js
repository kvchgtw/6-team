// LinkHus

// LinkHus

let AUTHORIZATION_KEY = "CWA-301C95CA-2C41-460D-ACDA-F7598E1364F5";
// let default_location = "臺北市";

// 分類weatherType
// Page 4-14: https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf
// 36小時天氣預報api時段劃分說明: https://www.cwa.gov.tw/Data/data_catalog/1-1-6.pdf

const weatherTypes = {
    day: {
        "day-Thunderstorm": [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        "day-Clear": [1],
        "day-CloudyFog": [25, 26, 27, 28],
        "day-Cloudy": [2, 3, 4, 5, 6, 7],
        "day-Fog": [24],
        "day-PartiallyClearWithRain": [
            8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
        ],
        "day-Snowing": [23, 37, 42],
    },
    night: {
        "night-Thunderstorm": [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        "night-Clear": [1],
        "night-CloudyFog": [25, 26, 27, 28],
        "night-Cloudy": [2, 3, 4, 5, 6, 7],
        "night-Fog": [24],
        "night-PartiallyClearWithRain": [
            8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
        ],
        "night-Snowing": [23, 37, 42],
    },
};

// ====== locationName
let locationName = document.querySelector(".info__left--locationName");
let todayBlock = document.querySelector(".info__left--today");

// ====== first_period_block
let firstTitle = document.querySelector(".info__first--title");
let firstTime = document.querySelector(".info__first--time");
let firstWeathericon = document.querySelector(".info__first--weathericon");
let firstTemperature = document.querySelector(".info__first--temperature");
let firstRainfall = document.querySelector(".info__first--rainfall");

// console.log("firstTitle: ", firstTitle);
// console.log("firstTime: ", firstTime);
// console.log("firstWeathericon: ", firstWeathericon);
// console.log("firstTemperature: ", firstTemperature);
// console.log("firstRainfall: ", firstRainfall);

// ====== second_period_block
let secondTitle = document.querySelector(".info__second--title");
let secondTime = document.querySelector(".info__second--time");
let secondWeathericon = document.querySelector(".info__second--weathericon");
let secondTemperature = document.querySelector(".info__second--temperature");
let secondRainfall = document.querySelector(".info__second--rainfall");

// console.log("secondTitle: ", secondTitle);
// console.log("secondTime: ", secondTime);
// console.log("secondWeathericon: ", secondWeathericon);
// console.log("secondTemperature: ", secondTemperature);
// console.log("secondRainfall: ", secondRainfall);

// ====== third_period_block
let thirdTitle = document.querySelector(".info__third--title");
let thirdTime = document.querySelector(".info__third--time");
let thirdWeathericon = document.querySelector(".info__third--weathericon");
let thirdTemperature = document.querySelector(".info__third--temperature");
let thirdRainfall = document.querySelector(".info__third--rainfall");

// console.log("thirdTitle: ", thirdTitle);
// console.log("thirdTime: ", thirdTime);
// console.log("thirdWeathericon: ", thirdWeathericon);
// console.log("thirdTemperature: ", thirdTemperature);
// console.log("thirdRainfall: ", thirdRainfall);

window.addEventListener("load", function () {
    let today = new Date();
    todayBlock.textContent = `${today.getMonth() + 1}/${today.getDate()}`;
    getData(currentCity);
});

function getData(location_name) {
    url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${location_name}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // location
            let location = data.records.location[0];
            // console.log("location: ", location);

            // first_time_period
            // console.log("locationName: ", location.locationName);
            locationName.textContent = location.locationName;

            // check_day_night
            let firstTimeCheck = null;
            let secondTimeCheck = null;
            let thirdTimeCheck = null;
            let firstStartTime =
                location.weatherElement[0].time[0].startTime.slice(11, 16);
            console.log("firstStartTime: ", firstStartTime);
            console.log(Number(firstStartTime.slice(0, 2)) - 12);

            if (
                Number(firstStartTime.slice(0, 2)) - 12 <= 0 &&
                Number(firstStartTime.slice(0, 2)) !== 0
            ) {
                firstTimeCheck = "day";
                secondTimeCheck = "night";
                thirdTimeCheck = "day";
                firstTitle.textContent = "今日白天";
                secondTitle.textContent = "今晚明晨";
                thirdTitle.textContent = "明日白天";
            } else {
                firstTimeCheck = "night";
                secondTimeCheck = "day";
                thirdTimeCheck = "night";
                firstTitle.textContent = "今晚明晨";
                secondTitle.textContent = "明日白天";
                thirdTitle.textContent = "明夜後晨";
            }

            // startTime and endTime

            let secondStartTime =
                location.weatherElement[0].time[1].startTime.slice(11, 16);
            let thirdStartTime =
                location.weatherElement[0].time[2].startTime.slice(11, 16);

            let firstEndTime = location.weatherElement[0].time[0].endTime.slice(
                11,
                16
            );
            let secondEndTime =
                location.weatherElement[0].time[1].endTime.slice(11, 16);
            let thirdEndTime = location.weatherElement[0].time[2].endTime.slice(
                11,
                16
            );

            // console.log("start: ", firstStartTime, "//end: ", firstEndTime);
            // console.log("start: ", secondStartTime, "//end: ", secondEndTime);
            // console.log("start: ", thirdStartTime, "//end: ", thirdEndTime);

            firstTime.textContent = `${firstStartTime} ~ ${firstEndTime}`;
            secondTime.textContent = `${secondStartTime} ~ ${secondEndTime}`;
            thirdTime.textContent = `${thirdStartTime} ~ ${thirdEndTime}`;

            // weather icon
            function weatherIcon(i, timeCheck) {
                let [weatherType] = Object.entries(
                    weatherTypes[timeCheck]
                ).find(([weatherType, weatherCodes]) =>
                    weatherCodes.includes(
                        Number(
                            location.weatherElement[0].time[i].parameter
                                .parameterValue
                        )
                    )
                );
                return weatherType;
            }
            // console.log(
            //     "location.weatherElement[0].time[0].parameter.parameterValue: ",
            //     location.weatherElement[0].time[0].parameter.parameterValue
            // );

            // console.log("weatherTypes.firstTimeCheck:");
            // console.log(Object.entries(weatherTypes[firstTimeCheck]));

            firstWeathericon.setAttribute(
                "src",
                `./icon/images/${weatherIcon(0, firstTimeCheck)}.svg`
            );
            secondWeathericon.setAttribute(
                "src",
                `./icon/images/${weatherIcon(1, secondTimeCheck)}.svg`
            );
            thirdWeathericon.setAttribute(
                "src",
                `./icon/images/${weatherIcon(2, thirdTimeCheck)}.svg`
            );

            // weather temp
            firstMinTemp =
                location.weatherElement[2].time[0].parameter.parameterName;
            secondMinTemp =
                location.weatherElement[2].time[1].parameter.parameterName;
            thirdMinTemp =
                location.weatherElement[2].time[2].parameter.parameterName;

            firstMaxTemp =
                location.weatherElement[4].time[0].parameter.parameterName;
            secondMaxTemp =
                location.weatherElement[4].time[1].parameter.parameterName;
            thirdMaxTemp =
                location.weatherElement[4].time[2].parameter.parameterName;

            firstTemperature.textContent = `${firstMinTemp}°C - ${firstMaxTemp}°C`;
            secondTemperature.textContent = `${secondMinTemp}°C - ${secondMaxTemp}°C`;
            thirdTemperature.textContent = `${thirdMinTemp}°C - ${thirdMaxTemp}°C`;
            // console.log("temperature: ");
            // console.log("min: ", firstMinTemp);
            // console.log("max: ", firstMaxTemp);
            // console.log("min: ", secondMinTemp);
            // console.log("max: ", secondMaxTemp);
            // console.log("min: ", thirdMinTemp);
            // console.log("max: ", thirdMaxTemp);

            // probability of rainfall
            firstRainfall.textContent = `${location.weatherElement[1].time[0].parameter.parameterName}%`;
            secondRainfall.textContent = `${location.weatherElement[1].time[1].parameter.parameterName}%`;
            thirdRainfall.textContent = `${location.weatherElement[1].time[2].parameter.parameterName}%`;
            // console.log("probability of rainfall: ");
            // console.log(
            //     location.weatherElement[1].time[0].parameter.parameterName
            // );
            // console.log(
            //     location.weatherElement[1].time[1].parameter.parameterName
            // );
            // console.log(
            //     location.weatherElement[1].time[2].parameter.parameterName
            // );
        });
}
