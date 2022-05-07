console.log('Weather App');

const form = document.querySelector('.weather form');
const input = document.querySelector('#city');
const msg = document.querySelector('.msg');

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const apiKey = getAPIKey();
    const inputValue = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;
    
   fetch(url)
        .then(response => response.json())
        .then(data => {
            // Manipulate the data here
            console.log(data);
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city 😩 😔 🤨';
        });
});