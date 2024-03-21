interface JokeReport {
    joke: string;
    score: number;
    date: string;
}

const reportJokes: JokeReport[] = [];

async function fetchJokeFromChuckNorris(): Promise<string> {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;
}

async function fetchJokeFromDadJokes(): Promise<string> {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.joke;
}

async function fetchRandomJoke(): Promise<string> {
    const random = Math.random();
    if (random < 0.5) {
        return fetchJokeFromChuckNorris();
    } else {
        return fetchJokeFromDadJokes();
    }
}

function displayJoke(joke: string): void {
    console.log("Joke: ", joke);
    
    const jokeElement = document.getElementById('joke');
    if (jokeElement) {
        jokeElement.textContent = joke;
    } else {
        console.error('Element with id "joke" not found.');
    }
}

function addJokeToReport(joke: string, score: number): void {
    const date = new Date().toISOString();
    const jokeReport: JokeReport = {
        joke: joke,
        score: score,
        date: date
    };
    reportJokes.push(jokeReport);
    console.log('Updated joke report:');
    console.log(reportJokes);
}

function setupNextJokeButton(): void {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            try {
                const joke = await fetchRandomJoke();
                displayJoke(joke);
            } catch (error) {
                console.error('Error fetching joke:', error);
            }
        });
    } else {
        console.error('Element with id "nextButton" not found.');
    }
}

function setupScoreButtons(): void {
    const scoreButtons = document.querySelectorAll('.score-button');
    scoreButtons.forEach((button: Element) => {
        button.addEventListener('click', () => {
            const score = parseInt(button.getAttribute('data-score') || '0');
            const currentJoke = document.getElementById('joke')?.textContent || '';
        
            const existingReport = reportJokes.find(report => report.joke === currentJoke);
            if (!existingReport) {
                addJokeToReport(currentJoke, score);
            } else {
                existingReport.score = score;
                console.log('Updated joke score:');
                console.log(existingReport);
            }
        });
    });
}

function init(): void {
    setupNextJokeButton();
    setupScoreButtons();
    fetchRandomJoke().then(joke => {
        displayJoke(joke);
    }).catch(error => {
        console.error('Error fetching joke:', error);
    });
}

// Iniciar la aplicación
init();
