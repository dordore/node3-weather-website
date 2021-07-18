//const { response } = require("express");

console.log('client side JS file is loaded');

// fetch('http://localhost:3001/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log('error' , data.error);
//         } else {    
//             console.log('data' ,data);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3001/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
             
        if (data.error){
            messageOne.textContent = '';
            messageTwo.textContent = data.error;
        } else {
            messageTwo.textContent = '';
            messageOne.textContent = `the location: ${data.address}, the temperature in it is: ${data.forecast.temperature}`;    
        }

    });
});

   // console.log(location);
})