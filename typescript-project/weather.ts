interface WeatherResponse {
    days: {
        hours: {
            temp: number;
            datetime: string;
            icon: string;
        }[];
    }[];
}

interface WeatherInfo {
    temperature: number;
    icon: string;
}

async function getCurrentWeatherInfo(weatherData: WeatherResponse): Promise<WeatherInfo | null> {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let closestHour = null;
    let closestTemperature = null;
    let closestIcon = '';

    for (const day of weatherData.days) {
        for (const hour of day.hours) {
            const hourOfDay = parseInt(hour.datetime.substr(0, 2));
            if (closestHour === null || Math.abs(hourOfDay - currentHour) < Math.abs(closestHour - currentHour)) {
                closestHour = hourOfDay;
                closestTemperature = hour.temp;
                closestIcon = hour.icon;
            }
        }
    }

    if (closestTemperature !== null && closestIcon !== '') {
        return { temperature: closestTemperature, icon: closestIcon };
    } else {
        return null;
    }
}

async function displayWeather() {
    const weatherDiv = document.querySelector('.weather');

    if (weatherDiv !== null) {
        const weatherData = await getWeatherData();

        if (weatherData && weatherData.days && weatherData.days.length > 0) {
            const weatherInfo = await getCurrentWeatherInfo(weatherData);
            if (weatherInfo !== null) {
                const iconUrl = getIconUrl(weatherInfo.icon); // Función para obtener la URL del icono
                weatherDiv.innerHTML = `<img src="${iconUrl}" alt="Weather Icon"> ${weatherInfo.temperature}°C`;
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

function getIconUrl(iconName: string): string {
    switch (iconName) {
        case 'cloudy':
            return window.location.origin + '/typescript-project/Imagenes/' + iconName + '.png';
        // Agrega más casos para otros nombres de iconos según sea necesario
        default:
            return window.location.origin + '/typescript-project/Imagenes/' + iconName + '.png';
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
