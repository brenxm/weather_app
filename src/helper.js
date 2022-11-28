import date from 'date-fns';

async function getData(url){
    try {
        let response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log("reached catch");
        return console.error(err);
    }
}

// Function to retrieve current location of user if user allowed by user
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
// making us use our own object property.
class ProcessedData {
    constructor(apiData){
        // Modify here if API has changed
        this.loc = {
            name: apiData.location.name,
            region: apiData.location.region,
            time: apiData.location.localtime,
        };

        this.condition = {
            current: apiData.current.condition.text,
            wind: apiData.current.gust_mph,
            temp: apiData.current.feeslike_f,
            icon: apiData.current.condition.icon,
        };

        this.hour = apiData.forecast.forecastday[0].hour.reduce( (accu, hr) => 
            [...accu, 
                {
                    chancOfRain: hr.chance_of_rain,
                    temp: hr.feeslike_f,
                    currentCondtion: hr.condition.text,
                    icon: hr.condition.icon,
                }
            ], []
        );

        this.days = apiData.forecast.forecastday.reduce( (accu, day)=>
            [...accu, {
                date: day.date,
                condtion: day.day.condition.icon,
                chanceOfRain: day.day.daily_chance_of_rain,
                temp: day.avgtemp_f,
            }]
        )
    }
}

export { getLocation, getData, selectRandomLocation, ProcessedData}