
    
        // IMPORTANT: Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap or similar service.
        // You can get a free API key from: https://openweathermap.org/api
        const API_KEY = '9995ef83b1611da3608a63214acd0c82';
        const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

        const cityInput = document.getElementById('city-input');
        const getWeatherBtn = document.getElementById('get-weather-btn');
        const weatherDisplay = document.getElementById('weather-display');
        const cityNameElement = document.getElementById('city-name');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('wind-speed');
        const errorMessageElement = document.getElementById('error-message');
        const loadingIndicator = document.getElementById('loading-indicator');

        // Function to display error messages
        function displayError(message) {
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
            weatherDisplay.classList.add('hidden'); // Hide weather info on error
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        }

        // Function to clear error messages
        function clearError() {
            errorMessageElement.style.display = 'none';
            errorMessageElement.textContent = '';
        }

        // Function to fetch weather data
        async function getWeatherData(city) {
            clearError();
            weatherDisplay.classList.add('hidden'); // Hide previous weather info
            loadingIndicator.style.display = 'block'; // Show loading indicator

            if (!city) {
                displayError('Please enter a city name.');
                return;
            }

            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; // units=metric for Celsius

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    // Update UI with weather data
                    cityNameElement.textContent = data.name;
                    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                    descriptionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
                    humidityElement.textContent = `${data.main.humidity}%`;
                    windSpeedElement.textContent = `${data.wind.speed} m/s`;

                    weatherDisplay.classList.remove('hidden'); // Show weather info
                } else {
                    // Handle API errors (e.g., city not found)
                    if (data.message) {
                        displayError(`Error: ${data.message}`);
                    } else {
                        displayError('An unexpected error occurred while fetching weather data.');
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
                displayError('Could not connect to the weather service. Please check your internet connection.');
            } finally {
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        }

        // Event listener for the button click
        getWeatherBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            getWeatherData(city);
        });

        // Event listener for Enter key press in the input field
        cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const city = cityInput.value.trim();
                getWeatherData(city);
            }
        });

        // Optional: Fetch weather for a default city on page load
        window.onload = () => {
            // You can set a default city here, e.g., 'London'
            // getWeatherData('London');
        };
    

