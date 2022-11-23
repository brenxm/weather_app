import "./styles.scss";
import "./ui.js";
import getApiData from "./helper.js";

const input = document.querySelector('.loc-inp')
const form = document.querySelector('form');

let str = "";
navigator.geolocation.getCurrentPosition( (loc)=> {
    str = loc.coords.latitude.toString() + "," + loc.coords.longitude.toString();
    getApiData(str);
})

form.onsubmit = function(e){
    getApiData(str);
    e.preventDefault();
}



