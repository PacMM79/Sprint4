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
// Calling generateJokes function
btn.addEventListener('click', generateJokes);
generateJokes();
