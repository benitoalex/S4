async function fetchJoke(): Promise<string> {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.joke;
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

function setupNextJokeButton(): void {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            try {
                const joke = await fetchJoke();
                displayJoke(joke);
            } catch (error) {
                console.error('Error fetching joke:', error);
            }
        });
    } else {
        console.error('Element with id "nextButton" not found.');
    }
}

function init(): void {
    setupNextJokeButton();
    // Mostrar el primer chiste al iniciar
    fetchJoke().then(joke => {
        displayJoke(joke);
    }).catch(error => {
        console.error('Error fetching joke:', error);
    });
}

// Iniciar la aplicación
init();
