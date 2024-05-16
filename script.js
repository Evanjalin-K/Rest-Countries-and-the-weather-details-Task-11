async function fetchCountryData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}
async function fetchWeather(countryName) {
    const apiKey = '5ac3304a0b535c69a5f58fba4627078f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
async function CountriesDetails() {
    const countries = await fetchCountryData();
    const container = document.getElementById('countryBox');
    container.innerHTML = '';
    countries.forEach(async (country) => {
        const card = document.createElement('div');
        card.className = 'card col-lg-4 col-sm-12';
        const countryName = country.name.common;
        const flagUrl = country.flags.svg;
        const capital = country.capital;
        const region = country.region;
        const latlng = country.latlng.join(', ');
        const countryCode = country.cca2;
        const weatherData = await fetchWeather(capital);
        const temperature = weatherData.main.temp;

        card.innerHTML = `
        <div class="card-header">${countryName}
            <img src="${flagUrl}" class="card-img-top" alt="Flag">
            <div class="card-body">
                <p class="card-text">Capital: ${capital}</p>
                <p class="card-text">Region: ${region}</p>
                <p class="card-text">Lat/Lng: ${latlng}</p>
                <p class="card-text">Country Code: ${countryCode}</p>
                <button class="btn btn-primary" onclick="getWeather('${capital}')">Click for Weather</button>
            </div>
            </div>
        `;
        container.appendChild(card);
    });
}
async function getWeather(cityName) {
    const weatherData = await fetchWeather(cityName);
    alert(`Weather in ${cityName}: ${weatherData.weather[0].description} \nTemperature:${weatherData.main.temp}`);
}
window.onload = CountriesDetails;

