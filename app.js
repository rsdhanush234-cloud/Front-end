// app.js

// API keys (Replace with your actual API keys)
const UNSPLASH_API_KEY = 'aP1bm20YkCB2XLJLbFzHYvc3yn9V5uCSv1zJhbliI0g';
const OPENWEATHER_API_KEY ='5561d32933ddb695bfb50c99f00264ca';

// DOM elements
const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('location');
const imageContainer = document.getElementById('imageContainer');
const weatherContainer = document.getElementById('weatherContainer');
const travelImage = document.getElementById('travelImage');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

// Function to fetch Unsplash image
async function fetchUnsplashImage(location) {
    const url = `https://api.unsplash.com/photos/random?query=${location}&client_id=${UNSPLASH_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.urls && data.urls.regular) {
            document.getElementById("travelImage").src = data.urls.regular;
        } else {
            console.warn("No image found for this location.");
        }
    } catch (error) {
        console.error("Error fetching Unsplash image:", error);
    }
}


// Function to fetch weather data from OpenWeather
async function fetchWeatherData(location) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        
        if (data.cod === 200) {
            cityName.textContent = data.name;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            weatherContainer.style.display = 'block';
        } else {
            weatherContainer.style.display = 'none';
            alert('City not found. Please try again!');
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchUnsplashImage(location);
        fetchWeatherData(location);
    } else {
        alert("Please enter a location!");
    }
});
