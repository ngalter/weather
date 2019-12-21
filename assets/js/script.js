$(document).ready(function () {
    console.log("ready!");

    var APIKey = "78eba90150637413f3c5739718713dea";
    var calendarDate = "";
    var todayDt = "";
    var latNo = "";
    var lonNo = "";
    var city = $("#city-input").val().trim();
    var cityList = ["Philadelphia"];
    


    $("#search").on("click", function (event) {
        event.preventDefault();
        city = $("#city-input").val().trim();
        cityList.push(city);
        updateList();
        doGroup();
    });

    $("#cityBox").on("click", function (event) {
        var str = event.target.id;
        var int = parseInt(str);
        console.log(str);
        var str = cityList[int];
        console.log(str);
        $("#city-input").val(str);
    });

    function updateList() {
        $("#cityBox").empty();
        for (var i = 0; i < cityList.length; i++)
        {
            var newItem = cityList[i];
             var newP = $("<p>").text(newItem).addClass("city-item").attr("id", i.toString());
            $("#cityBox").append(newP);
        }
    }




    /*function saveData() {
        if (typeof (Storage) !== "undefined") {

            $("<listbox>").each(function () {
                localStorage.setItem(i, "<listbox>".val);
                console.log("<listbox>".val);
                //localStorage.setItem(i,value);
        

            } else {
                    // Sorry! No Web Storage support..
                });
        };
        
       function getData() {
            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                var userInput = "";
            
                for (var i = 0; i < 9; i++) {
                    dateKey = today + indexHour(i);
                    userInput = localStorage.getItem(dateKey);
                    document.getElementById(indexHour(i)).value = userInput;
                }
            } else {
                // Sorry! No Web Storage support..
            }
       }/*/



    //doGroup();
    function doGroup() {
        getToday();
        getWeather();
        getForecast();
    }

    function getToday() {
        calendarDate = moment().format("dddd, MMMM Do, YYYY");
        todayDt = moment().format("DD");
        console.log(todayDt + " This is today dt");
        var dashText = "Weather Dashboard";
        $("#dash").html(dashText);
    }

    function getForecast() {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        console.log(city);
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
                var ktemp = response.list[i].main.temp;
                var ftemp = (ktemp - 273.15) * 1.8 + 32;
                var rdftemp = Math.round(ftemp);
                var humid = response.list[i].main.humidity;

                if (dateInt - parseInt(todayDt) === 0) {
                    console.log("equals");
                }
                if (dateInt - parseInt(todayDt) === 1) {
                    console.log("1 day");
                    $("#fcast1").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon1").attr("src", imgUrl);
                    $("#t1").html("Temp: " + rdftemp.toString() + " ℉");
                    $("#h1").html("Humid: " + humid + " %");

                }
                if (dateInt - parseInt(todayDt) === 2) {
                    console.log("2 days");
                    $("#fcast2").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon2").attr("src", imgUrl);
                    $("#t2").html("Temp: " + rdftemp.toString() + " ℉");
                    $("#h2").html("Humid: " + humid + " %");
                }
                if (dateInt - parseInt(todayDt) === 3) {
                    console.log("3 days");
                    $("#fcast3").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon3").attr("src", imgUrl);
                    $("#t3").html("Temp: " + rdftemp.toString() + " ℉");
                    $("#h3").html("Humid: " + humid + " %");
                }
                if (dateInt - parseInt(todayDt) === 4) {
                    console.log("4 days");
                    $("#fcast4").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon4").attr("src", imgUrl);
                    $("#t4").html("Temp: " + rdftemp.toString() + " ℉");
                    $("#h4").html("Humid: " + humid + " %");
                }
                if (dateInt - parseInt(todayDt) === 5) {
                    console.log("5 days");
                    $("#fcast5").html(formatDate(dateTmp));
                    var imgUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
                    $("#fIcon5").attr("src", imgUrl);
                    $("#t5").html("Temp: " + rdftemp.toString() + " ℉");
                    $("#h5").html("Humid: " + humid + " %");
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
    
    function getDate(str) {
        console.log(str);
        var dt = str.slice(8, 10);
        console.log(dt);
        return dt;
    }

    function uvColor(uv) {
        var numUV = uv * 1;

        console.log("Color Function" + numUV);
        if (numUV >= 0 && numUV <= 2) {
            $(".badge").css("background-color", "green");
        }
        else if (numUV > 2 && numUV <= 5) {
            $(".badge").css("background-color", "#e7e706");
        }
        else if (numUV > 5 && numUV <= 7) {
            $(".badge").css("background-color", "orange");
            console.log("in if orange");
        }
        else if (numUV > 7 && numUV <= 10) {
            $(".badge").css("background-color", "red");
        }
        else if (numUV > 10) {
            $(".badge").css("background-color", "purple");
        }
        uv = numUV.toString();
        $("#uvid").html(uv);
    }
    
    function getWeather() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then( function (response) {

                var iconId = response.weather[0].icon;
                $("#cityid").html(response.name);
                $("#caldate").html(calendarDate);
                latNo = response.coord.lat;
                lonNo = response.coord.lon;

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

                //get uv
                var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latNo + "&lon=" + lonNo;
                console.log(queryURL);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log("UV: " + response.value);
                    var uv = response.value;
                    uvColor(uv);
                });
            
        })
        };

    });