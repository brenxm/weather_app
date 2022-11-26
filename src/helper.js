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

export { getLocation, getData, selectRandomLocation}