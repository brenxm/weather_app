import {format} from 'date-fns';

async function getData(url){
    try {
        let response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log("reached catch");
        return console.error(err);
    }
}


// Function to retrieve current location of user if allowed permission
    //converting a callback based function to promise
function getLocation(){
    return new Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            loc => {
                resolve(`${loc.coords.latitude},${loc.coords.longitude}`)
            },
            err => reject(err)
        );
    } );
}

function selectRandomLocation(locations){
    const n = locations.length;
    const randomIndex = (Math.random() * (n - 1)).toFixed(0);
    return locations[randomIndex];
}


// Data that is retrieved from API will be processed in this function
// making us use our own object property / hash
class ProcessedData {
    constructor(apiData){
        // Modify the values here if API has changed
        this.loc = {
            name: apiData.location.name,
            region: apiData.location.region,
            time: format(new Date(apiData.location.localtime), "MMMM d yyyy hh:mm")
        };

        this.condition = {
            current: apiData.current.condition.text,
            wind: apiData.current.gust_mph + "mph",
            temp: apiData.current.feelslike_f + '\u00B0f',
            icon: apiData.current.condition.icon,
            sunrise: apiData.forecast.forecastday[0].astro.sunrise,
            sunset: apiData.forecast.forecastday[0].astro.sunset,
        };

        this.hour = apiData.forecast.forecastday[0].hour.reduce( (accu, hr) => 
            [...accu, 
                {
                    chanceOfRain: hr.chance_of_rain,
                    temp: hr.feelslike_f,
                    currentCondtion: hr.condition.text,
                    icon: hr.condition.icon,
                    time: hr.time,
                    snow: hr.chance_of_snow,
                }
            ], []
        );

        this.days = apiData.forecast.forecastday.reduce( (accu, day)=>
            [...accu, {
                date: format( new Date(day.date), 'MMMM d yyyy'),
                icon: day.day.condition.icon,
                chanceOfRain: day.day.daily_chance_of_rain,
                snow: day.day.daily_chance_of_snow,
                temp: day.day.avgtemp_f,
            }], []
        ).splice(1, 8);
    }
}


function smoothScroll( fn, delay, duration = 1000) {
    let end = false;
    setTimeout(() => {
        end = true;
    }, duration);

    const intervals = setInterval( ()=>{
        if (end) clearInterval(intervals);
        fn();
    }
        , delay);
}

export { getLocation, getData, selectRandomLocation, ProcessedData, smoothScroll }