
import { getData, updateCityUI } from './data/data.js';

document.addEventListener("DOMContentLoaded", function () {
  getData()
    .then(data => {
      updateCityUI(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});