/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '1b5537fb6cad4a1f4aed65848276f90c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to GET Web API Data*/
const getCurrentWeather = async (baseURL, apiKey, zipCode) => {
    const apiCall = `${baseURL}${zipCode},us&appid=${apiKey}`;
    const res = await fetch(apiCall);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const projectData = await request.json();
        // Get most last element in server data (most recently added)
        const lastIndex = Math.max(0, projectData.length - 1);
        document.getElementById('temp').innerHTML = projectData[lastIndex].temp;
        document.getElementById('date').innerHTML = projectData[lastIndex].date;
        document.getElementById('content').innerHTML = projectData[lastIndex].userRes;
    } catch (error) {
        console.log("error", error);
    }
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    // Select the actual values of HTML input
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getCurrentWeather(baseURL, apiKey, zipCode)
    .then(data => {
        postData('/addWeather', {
            temp: data.main.temp,
            date: newDate,
            userRes: feelings 
        });
    })
    .then(data => {
        updateUI();
    });
}