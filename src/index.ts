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

// Create generateJokes2 function
const generateJokes2 = async () => {
  try {
      // Fetching Api with async await
      const url = "https://api.chucknorris.io/jokes/random";
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      jokes.innerHTML = data.value;
  }
  catch (error) {
      console.log('The error is ${error}');
  }
}

// Call random to Joke1 or Joke2
const jokeCall = () => {
  const random : number = Math.trunc(Math.random() * 2);
  console.log(random);
  if (random <= 0) generateJokes();
  else generateJokes2();
  backgroundChange();
};

// Calling jokeCall function
btn.addEventListener('click', jokeCall);
jokeCall();

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

function backgroundChange(): void {
  const backPic: string[] = [
    "img/blob.svg",
    "img/blob1.svg",
    "img/blob2.svg",
    "img/blob3.svg",
    "img/blob4.svg",
    "img/blob5.svg",
  ];

  const randomOrder: number = Math.floor(
    Math.random() * backPic.length
  );
  const selectedPic: string = backPic[randomOrder];

  document.body.style.backgroundImage = `url(${selectedPic})`;
}