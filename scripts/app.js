console.log('Weather App');

const form = document.querySelector('.weather form');
const input = document.querySelector('#city');
const msg = document.querySelector('.msg');
const list = document.querySelector('.ajax-section .cities');

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const apiKey = getAPIKey();
    const inputValue = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;
    
   fetch(url)
        .then(response => response.json())
        .then(data => {
            // Manipulate the data here
            const  { main, name, sys, weather } = data;
            // Get icon from the weather property of the data returned
            const icon = `https://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;

            const li = document.createElement('li');
            li.classList.add('city');
            
            // Create markup for city weather listing
            const markup = `
                <h2 class="city-name" data-name="${name}, ${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">
                    ${Math.round(main.temp)}<sup>°F</sup>
                </div>
                <figure>
                    <img class="city-icon" src="${icon} alt=${weather[0]['main']}>
                    <figcaption>${weather[0]['description']}</figcaption>
                </figure>
            `;

            // Insert the content of markup into the <li> tag and append it to <ul>
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city 😩 😔 🤨';
        });

    msg.textContent = '';
    form.request();
    input.focus();
});