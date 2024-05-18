"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Create generateJokes function
const jokes = document.querySelector('.joke');
const btn = document.getElementById('btn');
const generateJokes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setHeader = {
            headers: {
                Accept: "application/json"
            }
        };
        // Fetching Api with async await
        const url = "https://icanhazdadjoke.com";
        const res = yield fetch(url, setHeader);
        const data = yield res.json();
        console.log(data);
        jokes.innerHTML = data.joke;
    }
    catch (error) {
        console.log('The error is ${error}');
    }
});
// Create generateJokes2 function
const generateJokes2 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetching Api with async await
        const url = "https://api.chucknorris.io/jokes/random";
        const res = yield fetch(url);
        const data = yield res.json();
        console.log(data);
        jokes.innerHTML = data.value;
    }
    catch (error) {
        console.log('The error is ${error}');
    }
});
// Call random to Joke1 or Joke2
const jokeCall = () => {
    const random = Math.trunc(Math.random() * 2);
    console.log(random);
    if (random <= 0)
        generateJokes();
    else
        generateJokes2();
    backgroundChange();
};
// Calling jokeCall function
btn.addEventListener('click', jokeCall);
jokeCall();
;
const reportJokes = [];
function report(score) {
    let report = {
        joke: jokes.innerHTML,
        score: score,
        date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
}
// Weather API
let tempResp;
const weather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.389&lon=2.159&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6');
        const data = yield response.json();
        const tempResp = data.main.temp;
        const ico = data.weather[0].icon;
        document.getElementById('tempResp').innerHTML = tempResp.toFixed(1) + 'º' + 'C';
        const icoURL = `http://openweathermap.org/img/w/${ico}.png`;
        const icoElement = document.createElement('img');
        icoElement.src = icoURL;
        document.getElementById('icoWeather').appendChild(icoElement);
        console.log(data);
    }
    catch (error) {
        console.log("Error calling API:", error);
    }
});
weather();
function backgroundChange() {
    const backPic = [
        "img/blob.svg",
        "img/blob1.svg",
        "img/blob2.svg",
        "img/blob3.svg",
        "img/blob4.svg",
        "img/blob5.svg",
    ];
    const randomOrder = Math.floor(Math.random() * backPic.length);
    const selectedPic = backPic[randomOrder];
    document.body.style.backgroundImage = `url(${selectedPic})`;
}
