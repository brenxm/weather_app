
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

export default function updateHtml(data){
    document.querySelector('.result-cont').innerHTML =
    `<div class='result-p1'>
        <img class='icon' src=${data.condition.icon}>
    </div>
    <div class='result-p2'>
        <span class='loc-time-text'>
            ${data.loc.time}
        </span>
        <span class='loc-text'>
            ${data.loc.name}, ${data.loc.region} 
        </span>
        <div class="time-cont">
        </div>
        <div class='forecast-cont'>
            <h3>${data.condition.current}</h3>
        </div>
            <div class='sub-info-cont'>
            <img src=${temperatureIcon}> <span>${data.condition.temp}\u00B0F</span>    
            <img src=${windIcon}> <span>${data.condition.sunset}mph</span>
            <img src=${sunriseIcon}> <span>${data.condition.sunrise}</span>    
            <img src=${sunsetIcon}> <span>${data.condition.sunset}</span>    
            </div
    </div>
    `

    //##### Get the list of hours of current day to display on HTML #####//

    let str = data.hour.reduce(
        (accu, curr) => accu += `
        <div class='single-hour-cont'>
            <div>${curr.time.match(/.{5}$/g)}</div>
            <img src=${curr.icon}>
            <div>
                <img class='single-icon' src=${rainIcon}><span>${curr.chanceOfRain} %</span>
            </div>
            <div>
                <img class='single-icon'src=${temperatureIcon}><span>${curr.temp} \u00B0F</span>
            </div>
        </div>
        `, ""
    )
    
    const timeCont = document.querySelector(".hourly-display");

    timeCont.innerHTML = str;

    scrollPosAtCurrentTime(timeCont, data.loc.time);


    //##### Display 7 days after current day #####//

    let accuStr = data.days.reduce( (accu, curr)=>
        accu + `
        <div class='single-future-item'>
            <img class='future-icon'src=${curr.icon}>
            <span>${curr.date}</span>
            <img class='info-future-icon' src=${rainIcon}
            <span>${curr.chanceOfRain}</span>
            <img class='info-future-icon' src=${temperatureIcon}
            <span>${curr.temp}\u00b0F</span>
        </div>
        `
    , "");

    document.querySelector('.future-cont').innerHTML = accuStr;
    
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