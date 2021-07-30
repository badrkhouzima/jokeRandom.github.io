var jokeText;
const addNewJoke = async() => {
    jokeText = await getDadJoke();
    document.getElementById("joke").innerHTML = jokeText;
};

const getDadJoke = async() => {
    if (Math.ceil(Math.random() * 3) == 1) {
        const config = { headers: { Accept: "application/json" } };
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        return res.data.joke;
    } else if (Math.ceil(Math.random() * 3) == 2) {
        const res = await axios.get("https://api.chucknorris.io/jokes/random");
        console.log(res.data.value);
        return res.data.value;
        // fetch("https://api.chucknorris.io/jokes/random")
        //     .then((rexx) => rexx.json())
        //     .then((res) => {
        //         console.log(res.value);
        //         return res.value;
        //     })
        //     .catch((errrror) => console.log("you catched chukkkks"));
    } else {
        const res = await axios.get("https://official-joke-api.appspot.com/random_joke");
        console.log("the third api==>", res.data.setup);
        return res.data.setup;

    }
};

document
    .querySelector("button.btn-success")
    .addEventListener("click", addNewJoke);

//rating part
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

var result12;
printRatingResult(ratingResult);

function executeRating(stars, result) {
    const starClassActive = "rating__star fas fa-star";
    const starClassUnactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star);
            if (star.className.indexOf(starClassUnactive) !== -1) {
                printRatingResult(result, i + 1);
                result12 = i + 1;
                for (i; i >= 0; --i) stars[i].className = starClassActive;
            } else {
                printRatingResult(result, i);
                result12 = i + 1;
                for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
            }
        };
    });
}

function printRatingResult(result, num = 0) {
    result.textContent = `${num}/3`;
    return parseInt(`${num}/3`);
}

executeRating(ratingStars, ratingResult);

const jokeReport = [];
var today = new Date();

function getJokeReport(joke_, score_, date_) {
    function ReportObj(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
    joke_ = jokeText;
    score_ = result12;

    date_ =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "|" +
        "At: " +
        today.getHours() +
        ":" +
        today.getMinutes();
    let objIndexed = new ReportObj(joke_, score_, date_);
    jokeReport.push(objIndexed);
    console.log("report this jokes=>>>", jokeReport);
}

/*weather sectiom*/
var day = new Date().getDay();
switch (day) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
}
document.getElementById("day").innerHTML = day;

// var todayDate = new Date().getDay()
document.getElementById("weather-date").innerHTML =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    ", " +
    "Time: " +
    today.getHours() +
    ":" +
    today.getMinutes();

fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=9222249f0f6804cdc4bf807404b3a139"
    )
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".tempBarcelona").innerHTML =
            "Barcelona Temperature is:" + data.main.temp + "°C";
    })
    .catch((erro) => console.log("checkbarcelona data", data));

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var cityName = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var country = document.querySelector(".country");

button.addEventListener("click", function() {
    fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            inputValue.value +
            "&appid=9222249f0f6804cdc4bf807404b3a139"
        )
        .then((response) => response.json())
        .then((data) => {
            console.log("check now", data.sys.country);
            var nameValue = data["name"];
            var temValue = data.main.temp;
            var descValue = data.weather[0].description;
            var countryValue = data.sys.country;

            cityName.innerHTML = nameValue;
            desc.innerHTML = descValue;
            temp.innerHTML = temValue + " °C";
            country.innerHTML = ", " + countryValue;
        })
        .catch((error) => console.log("===>wrong smth"));
});