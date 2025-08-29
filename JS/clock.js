function clock(){
    let now = new Date();
    let hrs = document.getElementById("hrs");
    let mins = document.getElementById("mins");
    let secs = document.getElementById("secs");

    now.getHours() <10 ? hrs.innerHTML="0"+now.getHours():hrs.innerHTML=now.getHours();
    now.getSeconds() <10 ? secs.innerHTML="0"+now.getSeconds():secs.innerHTML=now.getSeconds();
    now.getMinutes() <10 ? mins.innerHTML="0"+now.getMinutes():mins.innerHTML=now.getMinutes();
}
clock();
setInterval(clock,1000);
let theme = "white";
let body = document.querySelector("body");
let start = document.getElementById("start");
let optionBtns = document.getElementsByClassName("optionBtns")
let editbtn = document.getElementById("edit");
function changeTheme(){
    let weatherDiv = document.querySelector(".weather");
    if(theme == "black"){
        // body.style.background = "linear-gradient(360deg, rgb(75, 75, 75) 0%, rgba(255, 255, 255, 1) 100%)";
        body.style.backgroundColor = "white";
        body.style.color = "black";
        pause.style.backgroundColor = "white";
        pause.style.color = "black";
        pause.style.border= "2px solid black";
        start.style.backgroundColor = "white";
        start.style.color = "black";
        start.style.border= "2px solid black";
        weatherDiv.style.top = "5vh";
        weatherDiv.style.color = "black";
        weatherDiv.style.backgroundColor = "#E0E0E0";
        for (let btn of optionBtns) {
            btn.style.color = "black";
        }
        theme = "white";
        resetbtn.src = "restart symbol(black).png";
        editbtn.src = "edit.png";
        settings.src = "settings.png";
        pomodoroWrapper.style.border = "2px solid black";
    }
    else if(theme == "white") {
        // body.style.background = "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 100%)";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        pause.style.backgroundColor = "black";
        pause.style.color = "white";
        pause.style.border= "2px solid white";
        start.style.backgroundColor = "black";
        start.style.color = "white";
        start.style.border= "2px solid white";
        weatherDiv.style.top = "80vh";
        weatherDiv.style.backgroundColor = "#595959";
        weatherDiv.style.color = "white";
        for (let btn of optionBtns) {
            btn.style.color = "white";
        }
        theme = "black";
        resetbtn.src = "restart symbol.png";
        editbtn.src = "edit white.png";
        settings.src = "settings white.png";
        pomodoroWrapper.style.border = "2px solid white";
    }
}

const apiKey = "7d791de633ece010f46c00692e120ac8";
const city = "Pimpri-Chinchwad";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let temp = document.getElementById("temperature");
let weather;
let weatherPNG = document.getElementById("weatherImg");

function getWeather(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
        weather = data.weather[0].description;
        let number =  data.main.temp;
        let img = data.weather[0].description;
        let now = new Date();
        let hrs = now.getHours();
        if(number%2 <= 0.5){
            console.log("smaller");
            temp.innerHTML = number;
            temp.innerHTML = number-(number%1)+"°C";

        }
        else {
            console.log("greater");
            temp.innerHTML = number-(number%1)+1+"°C";
        }
        console.log(temp.innerHTML)
        console.log(number);
        console.log(weather);
        if(hrs<20){
            if (img.includes("overcast")){
                weatherPNG.src = "weather_tooCloudy.png";
            }
            else if (img.includes("rain")){
                weatherPNG.src = "weather_rain.png";
            }
            else if (img.includes("cloud")){
                weatherPNG.src = "weather_cloudy.png";
            }
            else if (img.includes("clear")){
                weatherPNG.src = "weather_sunny.png";
            }
            else  {
                weatherPNG.src = "weather_night.png";
            }
        }
        else {
            weatherPNG.src = "weather_night.png";
        }
    })
    .catch(error => console.error("Error fetching weather:", error));
}
getWeather();
setInterval(getWeather,300000);

let ControlIsShowing = false;
let PmoIsShowing  =  false;

function goAway(){
    // let container = document.querySelector(".container");
    // let time = document.getElementById("time");
    // let name =  document.querySelector(".name");
    // let pmo  = document.getElementById("pomodoro");
    let controls = document.querySelector(".controls");

    // console.log(container);
    // console.log(time);
    // console.log(name);

    // container.classList.add("show");
    // time.classList.add("show");
    // name.classList.add("show");
    // pmo.classList.add("show");
    // PmoIsShowing = true;


    if(PmoIsShowing == false){
        enterPomo();
        PmoIsShowing = true;
    }
    else if(PmoIsShowing == true) {
        quitPomo();
        PmoIsShowing = false;
    }

    // if(ControlIsShowing == false){
    //     controls.classList.add("show");
    //     ControlIsShowing = true;
    // }
    // else if(ControlIsShowing == true) {
    //     controls.classList.remove("show")
    //     ControlIsShowing = false;
    // }
    
}


let isRunning = false;
let definedMins = document.getElementById("userDefinedMins");
console.log("user def mins are" + definedMins.value);
time = Number(definedMins.value)*60;
let timeInterval;

function updateValue(){
    let definedMins = document.getElementById("userDefinedMins");
    console.log("user def mins are" + definedMins.value);
    console.log(definedMins.value);
    mins.innerText = definedMins.value;
    time = Number(definedMins.value)*60;
}
function updateTimer(type){
    if(type == 'start'){
        console.log("start");
        startTimer();
        timeInterval = setInterval(startTimer,1000);
    }
    else if(type == 'pause'){
        console.log("pause");
        pauseTimer();
    }
    else if(type == 'reset'){
        console.log("reset");
        resetTimer();
    }
}
let mins = document.getElementById("timerMinutes");
mins.innerText = definedMins.value;
let secs = document.getElementById("timerSeconds");
function startTimer(){
    isRunning = true;
    console.log("running");
    if (time > 0) {
        time--;
    }
    Math.floor(time / 60) == 0? mins.innerText = "0" + Math.floor(time / 60): mins.innerText =Math.floor(time / 60);
    (time % 60) == 0? secs.innerText = "0" + time % 60: secs.innerText = time % 60;
    console.log(time);
}

function pauseTimer(){
    if (isRunning == true){
        isRunning = false;
    }
    clearInterval(timeInterval);
}

function resetTimer(){
    pauseTimer();
    time = Number(definedMins.value) *60;
    let mins = document.getElementById("timerMinutes");
    let secs = document.getElementById("timerSeconds");
    
    Math.floor(time / 60) == 0? mins.innerText = "0" + Math.floor(time / 60): mins.innerText =Math.floor(time / 60);
    (time % 60) == 0? secs.innerText = "0" + time % 60: secs.innerText = time % 60;
    
}
let resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", ()=> {
    resetbtn.classList.add("rotate360");
    setTimeout(()=>{
        resetbtn.classList.remove("rotate360");
    },2000);
})
function quitPomo(){
    let container = document.querySelector(".container");
    let time = document.getElementById("time");
    let name =  document.querySelector(".name");
    let pmo  = document.getElementById("pomodoro");
    let controls = document.querySelector(".controls");
    if(PmoIsShowing == true) {
        pmo.classList.remove("show");
        container.classList.remove("show");
        time.classList.remove("show");
        name.classList.remove("show");
        PmoIsShowing = false;
    }
}

function enterPomo(){
    let container = document.querySelector(".container");
    let time = document.getElementById("time");
    let name =  document.querySelector(".name");
    let pmo  = document.getElementById("pomodoro");
    let controls = document.querySelector(".controls");
    if(PmoIsShowing == false) {
        pmo.classList.add("show");
        container.classList.add("show");
        time.classList.add("show");
        name.classList.add("show");
        PmoIsShowing = true;
    }
}

let settings = document.getElementById("settings");
let pomodoroWrapper  = document.querySelector(".pomodoroWrapper");
settings.addEventListener("mouseenter", () => {
    pomodoroWrapper.classList.add("show");
    setTimeout(() => {
        pomodoroWrapper.classList.remove("show");
    }, 5000);
});

// enterPomo();

let menuIsShowing = false;
let background = document.querySelector(".background");
let menuDiv = document.getElementById("editOptions");
function menu(){
    menuDiv.classList.add("show");
    background.classList.add("show");
    menuIsShowing = true;
}
function exitMenu(){
    menuDiv.classList.remove("show");
    background.classList.remove("show");
    menuIsShowing = false;
}