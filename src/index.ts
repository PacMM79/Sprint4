// Create generateJokes function
const jokes:any = document.querySelector('.joke');
const btn:any = document.getElementById('btn');

const generateJokes = async () => {
    try {
        const setHeader = {
            headers: {
                Accept: "application/json"
        }
    }
    // Fetching Api with async await
    const url = "https://icanhazdadjoke.com";
    const res = await fetch(url, setHeader);
    const data = await res.json();
    console.log(data);
    jokes.innerHTML = data.joke;
    }
    catch (error) {
        console.log('The error is ${error}');
    }
}
// Calling generateJokes function
btn.addEventListener('click', generateJokes);
generateJokes();

// Report Jokes
interface jokeResult { joke: string; score: number; date: string };
const reportJokes: jokeResult[] = [];

  function report(score: number) :void {
    let report: jokeResult = {
      joke : jokes.innerHTML,
      score: score,
      date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
  }

// Weather API
let tempResp: string;

const weather = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.389&lon=2.159&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6');
    const data = await response.json();
    const tempResp = data.main.temp;
    const ico = data.weather[0].icon;

    document.getElementById('tempResp')!.innerHTML = tempResp.toFixed(1) + 'º' +'C';

    const icoURL = `http://openweathermap.org/img/w/${ico}.png`;
    const icoElement = document.createElement('img');
    icoElement.src = icoURL;
    document.getElementById('icoWeather')!.appendChild(icoElement);

    console.log(data);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};
weather();