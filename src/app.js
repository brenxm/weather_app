import "./styles.scss";
import updateHtml from "./ui";
import {selectRandomLocation, getLocation, getData} from "./helper.js";

const form = document.querySelector('form');

//url of WEATHER api
const url = (loc) => `https://api.weatherapi.com/v1/forecast.json?key=338055b098954be694d181131222111&q=${loc}&days=8&aqi=no&alerts=no`;

// Random selection to display as default if users location denied or pending permission
const location = [
    "new york",
    "manila",
    "frankfurt",
    "houston",
    "washington"
];

// Will prompt user to grant access to users location
onStartUp();

// Users input handlers
form.onsubmit = function(e){
    updateContent(form[0].value);
    e.preventDefault();
}

async function updateContent(inputLoc){
    let apiData;
    try{
        apiData = await getData(url(inputLoc));
    }
    catch(err) {
        return;
    }

    if ("error" in apiData) return;
    updateHtml(apiData);
}

async function onStartUp(){
    
    let loc;
    // Request access to users location to display as default
    try {
        loc = await getLocation();
    } 
    // If denied, random location will be chosen
    catch (err){
        console.error(err);
        loc = selectRandomLocation(location);
    }
    let apiData = await getData(url(loc));
    updateHtml(apiData);
    console.log(apiData);
}

