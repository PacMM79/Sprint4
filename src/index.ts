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
    userVotes = 0;
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
      userVotes = 0;
  }
  catch (error) {
      console.log('The error is ${error}');
  }
}

// Call random to Joke1 or Joke2
const jokeCall = () => {
  const random : number = Math.trunc(Math.random() * 2);
  if (random <= 0) generateJokes();
  else generateJokes2();
  backgroundChange();
  document.getElementById("voteRes").innerHTML = "";
  resetColor();
};

// Calling button jokes
btn.addEventListener('click', jokeCall);
jokeCall();

// Report Jokes score
interface jokeResult {
  joke: string;
  score: number;
  date: string;
}

let reportJokes: jokeResult[] = [];
let userVotes: number = 0;

function report(score: number): void {
  const index = reportJokes.findIndex((item) => item.joke === jokes.innerHTML);
  if (index !== -1 && userVotes === 1) {
    // Report 2nd vote, update Array score
    reportJokes[index].score = score;
    reportJokes[index].date = new Date().toISOString();
    document.getElementById("voteRes").innerHTML = "Vot actualitzat amb èxit!";
    console.table(reportJokes);
    resetColor();
  }
  else if (userVotes <= 1) {
    // Report 1st vote to Array
    const report = {
      joke: jokes.innerHTML,
      score: score,
      date: new Date().toISOString(),
    };
    reportJokes.push(report);
    document.getElementById("voteRes").innerHTML = "Gràcies, vot realitzat amb èxit!";
    console.table(reportJokes);
  }
  else {
  // Show max 2 vote
  document.getElementById("voteRes").innerHTML = "Límit de 2 vots realitzats per acudit!";
  console.log('Max 2 Votes');
  }
}
// Handle vote buttons click
function handleClick(btnId, color) {
  if (userVotes <= 1 ) {
    document.getElementById(btnId).style.backgroundColor = color;
    userVotes++;
  }
}
// Asign event listeners to vote buttons
const buttons = [
  { id: 'btn1', color: 'red' },
  { id: 'btn2', color: 'yellow' },
  { id: 'btn3', color: 'green' }
];
buttons.forEach(button => {
  document.getElementById(button.id).addEventListener('click', () => {
      handleClick(button.id, button.color);
  });
});
function resetColor() {
  const buttons = ['btn1', 'btn2', 'btn3'];
  buttons.forEach(id => {
      document.getElementById(id).style.backgroundColor = 'white';
  });
}

// Weather API
const weather = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.389&lon=2.159&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6');
    const data = await response.json();
    const tempResp = data.main.temp;
    const ico = data.weather[0].icon;

    document.getElementById('tempResp')!.innerHTML = tempResp.toFixed(1) + 'º' + 'C';
    const icoURL = `http://openweathermap.org/img/w/${ico}.png`;
    const icoElement = document.createElement('img');
    icoElement.src = icoURL;

    document.getElementById('icoWeather')!.appendChild(icoElement);
    console.log(data);
  } catch (error) {
    console.log('Error calling API:, ${error}');
  }
};
weather();

// Generate random background function
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