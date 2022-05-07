console.log('Weather App');

// console.log(getAPIKey())

const form = document.querySelector('.weather form');
const input = document.querySelector('#city')

form.addEventListener('submit', event => {
    event.preventDefault();

    const inputValue = input.value
    console.log(inputValue)
});