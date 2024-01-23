// (London, Milan, Bangkok, Los Angeles, Nairobi)

import axios from 'axios';

const apiKey = '3e3e2493caf89d46b38ea47b66f38caf'

const cities = [
  {
    id : 0,
    name : 'Rome',
    
  },
  {
    id : 1,
    name : 'Milan',
  },
  {
    id : 2,
    name : 'Los%20Angeles',
  },
  {
    id : 3,
    name : 'london',
  }
]

let slide = document.querySelectorAll('.slide');
let circle = document.getElementsByClassName('fa-regular fa-circle')
var current = 0;
var cityName = 'rome';


// Get data and create Element
export async function getData() {

    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    const cityCoords = await axios.get(cityUrl)
    .then(response => {
    return response.data.coord
    })
   
    
    const baseUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${apiKey}&units=metric`;

    return axios.get(baseUrl)
    .then(response => {
      updateCityUI(response.data)
      return response.data;
      
    })
    .catch(error => {
      console.error('There has been a problem with your axios request:', error);
      throw error;
    });
}

export function updateCityUI(data) {
  
  const cityElement = document.querySelector('.city_name');
  const weatherElement = document.querySelector('.weather');
  const temperatureElement = document.querySelector('.temperature');
  const rangeTemperatureElement = document.querySelector('.range_temperature');

  cityElement.textContent = decodeURIComponent(cityName);
  weatherElement.textContent = data.current.weather[0].main;
  temperatureElement.textContent = `${Math.floor(data.current.temp)}°`;
  rangeTemperatureElement.textContent = `${Math.floor(data.daily[0].temp.min)}°/ ${Math.floor(data.daily[0].temp.max)}°`;
  
  // console.log(data.daily);
  createDays(data);

}

export function createDays(data) {
  

  data.daily.map((value, i)=>{
    const dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
      weekday: "short",
    });
    
    const weatherIcon = `http://openweathermap.org/img/w/${value.weather[0].icon}.png`
    // console.log(dayname, weatherIcon);

    createDayElement(dayname, i, weatherIcon, value)
    
})
  
}

export function createDayElement(dayName, i, image, dayRange) {

  const nameDayDiv = document.querySelector(`.name_day_${i}`)
  nameDayDiv.innerHTML = dayName;

  const imgElement = document.querySelector(`.weather_image_${i}`);
  imgElement.src = image;
  imgElement.alt = 'weather';

  const rangeTemperatureDayDiv = document.querySelector(`.range_temperature_day_${i}`);
  rangeTemperatureDayDiv.textContent = `${Math.floor(dayRange.temp.min)}°/ ${Math.floor(dayRange.temp.max)}°`;
}

// Carousel and pagination function
function clearSlides(){
  for (let i = 0; i < slide.length; i++) {
    slide[i].style.display = 'none'
    circle[i].classList.remove('active')
  }

}

function nextCity(){
  clearSlides();

  if(current === slide.length-1) current = -1;
  current++;
  cityName = cities[current].name
  slide[current].style.display = 'block';
  slide[current].style.opacity = '0.7';
  circle[current].classList.add('active');

}

function prevCity(){
  clearSlides();
  if(current === 0) current = slide.length;
  current--;

  cityName = cities[current].name;
  slide[current].style.display = 'block';
  slide[current].style.opacity = '0.7';
}

function start(){
  clearSlides();
  slide[current].style.display ='block';
  slide[current].style.opacity = '0.8';
  circle[current].classList.add('active');


}
// Init the the first slide
start();

// Button for change slide
  const btnRight = document.querySelector('.arrow.r i')
  btnRight.addEventListener('click', function(){
    console.log(cityName);
    nextCity();
    getData(cityName);
  })

  const btnLeft = document.querySelector('.arrow.l i')
  btnLeft.addEventListener('click', function(){
    prevCity();
    getData (cityName)
    
  })


