
import placeholderIcon from "./assets/placeholder.svg";

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
            <div class='btn-left'>
            </div>
            <div class='hourly-display'>
            </div>
            <div class='btn-right'>
            </div>
      </div>
      <div class='future-cont'>
      </div>
      `

    console.log("called");
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
            <img src=${placeholderIcon}> <span>${apiData.current.feelslike_f}\u00B0F</span>    
            <img src=${placeholderIcon}> <span>${apiData.current.gust_mph}mph</span>
            <img src=${placeholderIcon}> <span>${apiData.forecast.forecastday[0].astro.sunrise}</span>    
            <img src=${placeholderIcon}> <span>${apiData.forecast.forecastday[0].astro.sunset}</span>    
            </div
    </div>
    `
    let str = apiData.forecast.forecastday[0].hour.reduce(
        (accu, curr) => accu += `
        <div class='single-hour-cont'>
            <div>${curr.time.match(/.{5}$/g)}</div>
            <img src=${curr.condition.icon}>
            <div>
                <img class='single-icon' src=${placeholderIcon}><span>${curr.chance_of_rain} %</span>
            </div>
            <div>
                <img class='single-icon'src=${placeholderIcon}><span>${curr.feelslike_f} \u00B0</span>
            </div>
        </div>
        `, ""
    )
    
    document.querySelector(".hourly-display").innerHTML = str;
}

pageStartUp();