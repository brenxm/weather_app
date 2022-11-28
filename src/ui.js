
import placeholderIcon from "./assets/placeholder.svg";
import sunriseIcon from "./assets/sunrise.svg";
import sunsetIcon from "./assets/sunset.svg";
import rainIcon from "./assets/rain.svg";
import temperatureIcon from "./assets/temperature.svg";
import windIcon from "./assets/wind.svg";


function pageStartUp(){
    document.body.innerHTML =
    `<div class='main'>
        <div class='search-cont'>
            <form method='get' action=''>
                <input class='loc-inp' name="loc-inp" required>
                <input class='submit-btn' type='submit' value='Fetch Api'>
            </form>
        </div>
        <div class='result-cont'>
            <div class='result-p1'>
                <img class='icon'>
            </div>
            <div class='result-p2'>
                <h2>
                </h2>
                <div class="time-cont">
                    <span></span>
                </div>

                <h3>
                </h3>
                <div class='sub-info-cont'>
                    <span></span>
                    <span></span>
                </div
            </div>
        </div>
    </div>
        <hr>
      <div class="current-day-time">
            <div class='btn-left' id='btnscroller'>
            </div>
            <div class='hourly-display'>
            </div>
            <div class='btn-right' id='btnscroller'>
            </div>
      </div>
      <hr>
      <div class='future-cont'>
      </div>
      `
    // Initialize listeners for button to sroll left or right on time container
    const btns = document.querySelectorAll('#btnscroller');
    const hourlyDisplayCont = document.querySelector(".hourly-display");


    btns.forEach( btn => btn.addEventListener('click', (e)=>{
        scrollBtn(e, hourlyDisplayCont);
    }));
}

export default function updateHtml(apiData){
    document.querySelector('.result-cont').innerHTML =
    `<div class='result-p1'>
        <img class='icon' src=${apiData.current.condition.icon}>
    </div>
    <div class='result-p2'>
        <span class='loc-time-text'>
            ${apiData.location.localtime}
        </span>
        <span class='loc-text'>
            ${apiData.location.name}, ${apiData.location.region} 
        </span>
        <div class="time-cont">
        </div>
        <div class='forecast-cont'>
            <h3>${apiData.current.condition.text}</h3>
        </div>
            <div class='sub-info-cont'>
            <img src=${temperatureIcon}> <span>${apiData.current.feelslike_f}\u00B0F</span>    
            <img src=${windIcon}> <span>${apiData.current.gust_mph}mph</span>
            <img src=${sunriseIcon}> <span>${apiData.forecast.forecastday[0].astro.sunrise}</span>    
            <img src=${sunsetIcon}> <span>${apiData.forecast.forecastday[0].astro.sunset}</span>    
            </div
    </div>
    `

    // Get the list of hours of current day to display on HTML
    let str = apiData.forecast.forecastday[0].hour.reduce(
        (accu, curr) => accu += `
        <div class='single-hour-cont'>
            <div>${curr.time.match(/.{5}$/g)}</div>
            <img src=${curr.condition.icon}>
            <div>
                <img class='single-icon' src=${rainIcon}><span>${curr.chance_of_rain} %</span>
            </div>
            <div>
                <img class='single-icon'src=${temperatureIcon}><span>${curr.feelslike_f} \u00B0F</span>
            </div>
        </div>
        `, ""
    )
    
    const timeCont = document.querySelector(".hourly-display");

    timeCont.innerHTML = str;

    scrollPosAtCurrentTime(timeCont, apiData.location.localtime);

    // Display 7 days after current day
    const futureDays = apiData.forecast.forecastday.splice(0, 1);
    let accuStr = futureDays.reduce( (accu, curr)=>{
        accu += `
        <div class='single-future-item'>
            <img src=${curr.day.condition.icon}>
        </div>
        `
    }, "")
    
}


// Set scroll position at current local time
function scrollPosAtCurrentTime(elem, apiLocalTime){

    // Process api local time to multiplier
    const multiplier = apiLocalTime.match(/.{5}$/g)[0].split("").splice(0, 2).join('');
    const leftScroll = multiplier * 1252 / 17;
    elem.scrollLeft = leftScroll;

}

// Callback fnction for eventlisterns for btns for scrolling time
function scrollBtn(e, container){
    const GAP = 1252 / 17;

    if (e.target.classList.value == "btn-right"){
        container.scrollBy(73, 0);
    } else {
        container.scrollBy(-73, 0);
    }
}


pageStartUp();