// Neal
// variables
const PRIMARY_COLOR = "#E6F8FC";
const SECOND_COLOR = "#8ABCE3";

let jsonData = {
  TWN1156: "高雄市",
  TWN1158: "屏東縣",
  TWN1160: "臺南市",
  TWN1161: "新竹市",
  TWN1162: "新竹縣",
  TWN1163: "宜蘭縣",
  TWN1164: "基隆市",
  TWN1165: "苗栗縣",
  TWN1166: "臺北市",
  TWN1167: "新北市",
  TWN1168: "桃園市",
  TWN1169: "彰化縣",
  TWN1170: "嘉義縣",
  TWN1171: "嘉義市",
  TWN1172: "花蓮縣",
  TWN1173: "南投縣",
  TWN1174: "臺中市",
  TWN1176: "雲林縣",
  TWN1177: "臺東縣",
  TWN3414: "澎湖縣",
  TWN3415: "金門縣",
  TWN5128: "連江縣",
};


// element
const svgTWElement = document.querySelector('.svg__tw');
const pathElements = svgTWElement.querySelectorAll("path[name]");
const position = svgTWElement.querySelector("#position");

let selectedPathElement = null
position.style.fill = 'gray'


// function
const getPositionCoordinate = (element) => {
  const svgRect = svgTWElement.getBoundingClientRect();
  const positionRect = position.getBoundingClientRect()
  const bbox = element.getBoundingClientRect();

  // 計算縮放比例
  const scaleX = svgRect.width / svgTWElement.getAttribute("width");
  const scaleY = svgRect.height / svgTWElement.getAttribute("height");

  // 考慮到縮放比例
  let x = (bbox.left - svgRect.left + bbox.width / 2 - positionRect.width /2) / scaleX;
  let y = (bbox.top - svgRect.top + bbox.height /2 - positionRect.height /2) / scaleY;
  return {x, y}

}

const setSelectedColor = (element) => {

  // 取消先前的元素顏色
  if (selectedPathElement && selectedPathElement !== element) {
    selectedPathElement.style.fill = SECOND_COLOR;
  }

  // 為當前選定元素添加顏色
  element.style.fill = PRIMARY_COLOR;

  // 更新選定元素
  selectedPathElement = element;
}


const getCityName = (element) => {
  return jsonData[element.id]
}

const modifyCoordinateByCityName = (coordinate, cityName) => {
  let {x, y} = coordinate
  switch(cityName) {
    case '基隆市':
      x += 10;
      y -= 10;
      break
    case '新北市':
      x -= 30;
      y += 10;
      break
    case '臺北市':
      x += 10;
      y -= 10;
      break
    case '桃園市':
      x += 10;
      y -= 20;
      break
    case '新竹市':
      y -= 10;
      break
    case '臺中市':
      x -= 60;
      break
    case '南投縣':
      y -= 30;
      break   
    case '雲林縣':
      x -= 20;
      y -= 20;
      break  
    case '嘉義縣':
      x += 30;
      y -= 20;
      break  
    case '嘉義市':
      y -= 15;
      break  
    case '高雄市':
      x -= 70;
      y += 60;
      break  
    case '屏東縣':
      y -= 50;
      break  
    case '臺東縣':
      x -= 20;
      y -= 70;
      break  
    case '花蓮縣':
      x += 10;
      y -= 30;
      break  
    case '宜蘭縣':
      y += 20;
      break
    case '澎湖縣':
      x += 20;
      y -= 40;
      break    
    case '金門縣':
      x -= 140;
      y += 55;
      break    
    case '連江縣':
      x -= 75;
      y -= 15;
      break    
    
  }
  return {x, y}
}


const renderInfor = (location, targetElement=null) => {
  
  pathElements.forEach((pathElement) => {
    pathElement.style.cursor = 'pointer'
    const cityName = getCityName(pathElement)
    if (cityName !== location) return
    
    if (targetElement === null) {
      setPositionCoordinate(pathElement, location)
      return
    }
    targetElement.addEventListener('click', () => {
      setPositionCoordinate(pathElement, cityName)
    })
  })
}



const setPositionCoordinate = (pathElement, cityName) => {
  const coordinate = getPositionCoordinate(pathElement)
  const {x, y} = modifyCoordinateByCityName(coordinate, cityName)
  currentCity = cityName
  position.setAttribute("transform", `translate(${x} ${y})`);
  setSelectedColor(pathElement)
  getData(cityName);
  renderInforFrame()
}


const renderInforFrame = () => {
  const infoFrames = document.querySelectorAll('.info__frame')
    infoFrames.forEach(frame => {
      frame.classList.add('infor__frame--animation')
      setTimeout(() => {
        frame.classList.remove('infor__frame--animation')
      }, 500)
    })
}


// event
pathElements.forEach(function (pathElement) {
  pathElement.addEventListener("mouseenter", function () {
    pathElement.style.fill = PRIMARY_COLOR;
  });
  
  pathElement.addEventListener("click", function (e) {
    renderInforFrame()
    
    
    position.classList.remove('hidden')
    
    const cityName = getCityName(pathElement);
    setPositionCoordinate(pathElement, cityName)


  });

  pathElement.addEventListener("mouseleave", function () {
    if (pathElement !== selectedPathElement) {
      pathElement.style.fill = SECOND_COLOR; 
    }
  });
});

window.onload = renderInfor(currentCity)