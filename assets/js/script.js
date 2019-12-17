$(document).ready(function () {
    console.log("ready!");


    var APIKey = "78eba90150637413f3c5739718713dea";
    var calendarDate = "";
    var todayDt = "";
    var pastSearch = [];
    function getToday() {
        calendarDate = moment().format("dddd, MMMM Do, YYYY");
        todayDt = moment().format("DD");
        console.log(todayDt + " THis is today dt");
        var dashText = "Weather Dashboard: " + "&nbsp&nbsp" + calendarDate;
        $("#dash").html(dashText);
    }

    function getForecast() {
        var city = "Philadelphia";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
        
            for (var i = 0; i < response.list.length; i++) {
                console.log(response.list[i].dt_txt);
                var dateTmp = response.list[i].dt_txt;
                var dateFmt = getDate(dateTmp);
                var dateInt = parseInt(dateFmt);
                var icn = response.list[i].weather[0].icon;
                console.log(icn + " ICN");
                console.log(dateInt + " : " + todayDt);
                console.log(todayDt + " TODAY");
                if (dateInt - parseInt(todayDt) === 0) {
                    console.log("equals");
                }
                if (dateInt - parseInt(todayDt) === 1) {
                    console.log("1 day");
                    $("#fcast1").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon1").attr("src", imgUrl);
                }
                if (dateInt - parseInt(todayDt) === 2) {
                    console.log("2 days");
                    $("#fcast2").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon2").attr("src", imgUrl);
                }
                if (dateInt - parseInt(todayDt) === 3) {
                    console.log("3 days");
                    $("#fcast3").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon3").attr("src", imgUrl);
                }
                if (dateInt - parseInt(todayDt) === 4) {
                    console.log("4 days");
                    $("#fcast4").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon4").attr("src", imgUrl);
                }
                if (dateInt - parseInt(todayDt) === 5) {
                    console.log("5 days");
                    $("#fcast5").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon5").attr("src", imgUrl);
                }
            }
        })
    };

    function formatDate(str) {
        console.log(str);
        var mn = str.slice(5, 7);
        console.log(mn);
        var dt = str.slice(8, 10);
        console.log(dt);
        var yr = str.slice(0, 4);
        console.log(yr);
        var newStr = mn + "/" + dt + "/" + yr;
        return newStr;

    }
    
    function getDate(str)
    {
        console.log(str);
        var dt = str.slice(8, 10);
        console.log(dt);
        return dt;
    }

function getWeather() {

    // Here we are building the URL we need to query the database
    var city = "Philadelphia";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Create CODE H"ERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);
        // Create CODE HERE to transfer content to HTML
        //icon url

                // Retrieving the URL for the image
        var iconId = response.weather[0].icon;
        console.log(iconId);

                // Creating an element to hold the image

        $("#cityid").html(response.name);
        var imgUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
        $("#today-iconid").attr("src", imgUrl);
        $("#windid").html("Wind Speed: " + response.wind.speed.toString() + " mph");
        $("#humidid").html("Humidity: " + response.main.humidity + " %");
        console.log(response.main.temp);
        var ktemp = parseInt(response.main.temp);
        console.log(response.main.temp);
        var ftemp = (ktemp - 273.15) * 1.8 + 32;
        var rdftemp = Math.round(ftemp);
        console.log(ktemp);
        console.log(rdftemp);
        $("#tempid").text("Temperature: " + rdftemp.toString() + "℉")
        })          
    };

    getToday();
    getWeather();
    getForecast();
});