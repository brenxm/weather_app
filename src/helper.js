

export default function getApiData(input){
const url = `https://api.weatherapi.com/v1/forecast.json?key=338055b098954be694d181131222111&q=${ input }&days=1&aqi=no&alerts=no`;

    try {
        fetch(url)
        .then( response => response.json() )
        .then( response => console.log(response) );
    }
    catch(err) {
        console.log(err);
    }
}
