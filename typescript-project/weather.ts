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
    const currentMinute = currentDate.getMinutes();

    for (const day of weatherData.days) {
        for (const hour of day.hours) {
            const hourDateTimeParts = hour.datetime.split(':');
            const hourOfDay = parseInt(hourDateTimeParts[0]);

            if (hourOfDay >= currentHour && hourOfDay < currentHour + 1) {
                const roundedHour = currentMinute < 30 ? currentHour : currentHour + 1;
                if (hourOfDay === roundedHour) {
                    return hour.temp; 
                }
            }
        }
    }

    return null; 
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
