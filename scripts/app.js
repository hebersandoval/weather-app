console.log('Weather App');

const form = document.querySelector('#weather-form');
const input = document.querySelector('#city');
const msg = document.querySelector('.msg');
const list = document.querySelector('.weather-data .cities');
const apiKey = getAPIKey();

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const inputValue = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;
    
    // Check value of city
    const listItems = list.querySelectorAll('.weather-data .city')
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(element => {
            let content = '';
            // If input value has a ',' in 2nd element -> ex: Chicago, IL
            if (inputValue.includes(',')) {
                // If country code has more the 2 letters, is invalid and keep the 1st part (city name)
                if (inputValue.split(',')[1].length > 2) {
                    // City name
                    inputValue = inputValue.split(',')[0];
                    content = element.querySelector('.city-name span').textContent.toLowerCase();
                } else {
                    // It only as one value
                    content = element.querySelector('.city-name').dataset.name.toLowerCase();
                }
            } else {
                // If it has no ',' just the city name
                content = element.querySelector('.city-name span').textContent.toLowerCase();
            }
            return content == inputValue.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather 
            for ${filteredArray[0].querySelector('.city-name span').textContent}
            ...otherwise be more specific by prodiving the country code as well 🤨.
            `;
            form.reset();
            input.focus();
            return;
        }
    }

   fetch(url)
        .then(response => response.json())
        .then(data => {
            // Manipulate the data here
            const  { main, name, sys, weather } = data;
            // Get icon from the weather property of the data returned
            // const icon = `https://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;
            // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const icon = `https://weatherpuppy.netlify.app/icons/${weather[0]["icon"]}.png`;
            
            const li = document.createElement('li');
            li.classList.add('city');
            
            // Create markup for city weather listing
            const markup = `
                <div class="card">
                    <h2 class="city-name" data-name="${name}, ${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                    </h2>
                    <div class="city-temp">
                        ${Math.round(main.temp)}<sup>°F</sup>
                    </div>
                    <figure>
                        <img class="city-icon" src="${icon}" alt="${weather[0]['main']}">
                        <figcaption>${weather[0]['description']}</figcaption>
                    </figure>
                <div>
            `;

            // Insert the content of markup into the <li> tag and append it to <ul>
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city 😩 😔 🤨';
        });

    msg.textContent = '';
    form.reset();
    input.focus();
});