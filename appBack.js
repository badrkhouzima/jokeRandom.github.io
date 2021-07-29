var jokeText;
const addNewJoke = async() => {
    jokeText = await getDadJoke();
    document.getElementById("joke").innerHTML = jokeText;
};
const getDadJoke = async() => {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
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
document.getElementById("weather-date").innerHTML = today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    ", " +
    "Time: " +
    today.getHours() +
    ":" +
    today.getMinutes();