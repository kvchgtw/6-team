// Neal
// variables
const PRIMARY_COLOR = "#E6F8FC";
const SECOND_COLOR = "#8ABCE3";

let jsonData = {
  TWN1156: "Kaohsiung City",
  TWN1158: "Pingtung",
  TWN1160: "Tainan City",
  TWN1161: "Hsinchu City",
  TWN1162: "Hsinchu",
  TWN1163: "Yilan",
  TWN1164: "Keelung City",
  TWN1165: "Miaoli",
  TWN1166: "Taipei City",
  TWN1167: "New Taipei City",
  TWN1168: "Taoyuan",
  TWN1169: "Changhua",
  TWN1170: "Chiayi",
  TWN1171: "Chiayi City",
  TWN1172: "Hualien",
  TWN1173: "Nantou",
  TWN1174: "Taichung City",
  TWN1176: "Yunlin",
  TWN1177: "Taitung",
  TWN3414: "Penghu",
  TWN3415: "Kinmen",
  TWN5128: "Lienchiang",
};


// element
const svgElement = document.querySelector('.svg__tw');
const pathElements = svgElement.querySelectorAll("path[name]");
const position = svgElement.querySelector("#position");

let selectedPathElement = null
position.style.fill = 'gray'


// function
const setPositionCoordinate = (element) => {
  const svgRect = svgElement.getBoundingClientRect()
  const bbox = element.getBoundingClientRect()
  const positionRect = position.getBoundingClientRect()

  let x = bbox.left - svgRect.left + bbox.width / 2 - positionRect.width /2
  let y = bbox.top - svgRect.top + bbox.height /2 - positionRect.height /2

  position.setAttribute("transform", `translate(${x} ${y})`);
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

// event
pathElements.forEach(function (pathElement) {
  pathElement.addEventListener("mouseenter", function () {
    pathElement.style.fill = PRIMARY_COLOR;
  });
  
  pathElement.addEventListener("click", function (e) {
    position.classList.remove('hidden')
    setPositionCoordinate(pathElement)
    setSelectedColor(pathElement)
  });

  pathElement.addEventListener("mouseleave", function () {
    if (pathElement !== selectedPathElement) {
      pathElement.style.fill = SECOND_COLOR; 
    }
  });
});
