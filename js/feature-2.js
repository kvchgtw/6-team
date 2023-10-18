// LinkHus

let AUTHORIZATION_KEY = "CWA-301C95CA-2C41-460D-ACDA-F7598E1364F5";
// let default_location = "臺北市";

// 分類weatherType
// Page 4-14: https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf
// 36小時天氣預報api時段劃分說明: https://www.cwa.gov.tw/Data/data_catalog/1-1-6.pdf

const weatherTypes = {
    day: {
        "day-thunderstorm": [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        "day-clear": [1],
        "day-cloudy-fog": [25, 26, 27, 28],
        "day-cloudy": [2, 3, 4, 5, 6, 7],
        "day-fog": [24],
        "day-partially-clear-with-rain": [
            8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
        ],
        "day-snowing": [23, 37, 42],
    },
    night: {
        "night-thunderstorm": [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        "night-clear": [1],
        "night-cloudy-fog": [25, 26, 27, 28],
        "night-cloudy": [2, 3, 4, 5, 6, 7],
        "night-fog": [24],
        "night-partially-clear-with-rain": [
            8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
        ],
        "night-snowing": [23, 37, 42],
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

// ====== second_period_block
let secondTitle = document.querySelector(".info__second--title");
let secondTime = document.querySelector(".info__second--time");
let secondWeathericon = document.querySelector(".info__second--weathericon");
let secondTemperature = document.querySelector(".info__second--temperature");
let secondRainfall = document.querySelector(".info__second--rainfall");

// ====== third_period_block
let thirdTitle = document.querySelector(".info__third--title");
let thirdTime = document.querySelector(".info__third--time");
let thirdWeathericon = document.querySelector(".info__third--weathericon");
let thirdTemperature = document.querySelector(".info__third--temperature");
let thirdRainfall = document.querySelector(".info__third--rainfall");

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

            // first_time_period
            locationName.textContent = location.locationName;

            // check_day_night
            let firstTimeCheck = null;
            let secondTimeCheck = null;
            let thirdTimeCheck = null;
            let firstStartTime =
                location.weatherElement[0].time[0].startTime.slice(11, 16);

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
                firstWeathericon.classList.add("dayStyle");
                secondWeathericon.classList.add("nightStyle");
                thirdWeathericon.classList.add("dayStyle");
            } else {
                firstTimeCheck = "night";
                secondTimeCheck = "day";
                thirdTimeCheck = "night";
                firstTitle.textContent = "今晚明晨";
                secondTitle.textContent = "明日白天";
                thirdTitle.textContent = "明夜後晨";
                firstWeathericon.classList.add("nightStyle");
                secondWeathericon.classList.add("dayStyle");
                thirdWeathericon.classList.add("nightStyle");
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

            // probability of rainfall
            firstRainfall.textContent = `${location.weatherElement[1].time[0].parameter.parameterName}%`;
            secondRainfall.textContent = `${location.weatherElement[1].time[1].parameter.parameterName}%`;
            thirdRainfall.textContent = `${location.weatherElement[1].time[2].parameter.parameterName}%`;
        });
}
