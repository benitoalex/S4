interface WeatherResponse {
    days: {
        hours: {
            temp: number;
            datetime: string; 
        }[]; 
    }[]; 
}

async function getCurrentTemperature(weatherData: WeatherResponse): Promise<number | null> {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let closestHour = null; // Variable para almacenar la hora más cercana encontrada
    let closestTemperature = null; // Variable para almacenar la temperatura correspondiente a la hora más cercana

    for (const day of weatherData.days) {
        for (const hour of day.hours) {
            const hourOfDay = parseInt(hour.datetime.substr(0, 2)); // Obtenemos las dos primeras cifras de datetime como la hora del día

            // Verificamos si la hora del día está más cerca de la hora actual que la hora más cercana actualmente registrada
            if (closestHour === null || Math.abs(hourOfDay - currentHour) < Math.abs(closestHour - currentHour)) {
                closestHour = hourOfDay;
                closestTemperature = hour.temp;
            }
        }
    }

    return closestTemperature; // Retornamos la temperatura correspondiente a la hora más cercana
}



async function displayWeather() {
    const weatherDiv = document.querySelector('.weather');

    if (weatherDiv !== null) {
        const weatherData = await getWeatherData();

        if (weatherData && weatherData.days && weatherData.days.length > 0) {
            const currentTemperature = await getCurrentTemperature(weatherData);
            if (currentTemperature !== null) {
                weatherDiv.textContent = `${currentTemperature}°C`;
            } else {
                weatherDiv.textContent = 'Temperature data not available for the current hour';
            }
        } else {
            weatherDiv.textContent = 'Failed to fetch weather data';
        }
    } else {
        console.error('Element with class "weather" not found');
    }
}

async function getWeatherData(): Promise<WeatherResponse | null> {
    const apiKey = 'KH9EVX2QDQVJJARZZAJGTHJZK';
    const cityName = 'Barcelona';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/today?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await window.fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const weatherData: WeatherResponse = await response.json() as WeatherResponse;
        return weatherData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


displayWeather();
