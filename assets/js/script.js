var APIKey = "78eba90150637413f3c5739718713dea";

var pastSearch = [];

function getWeather() {

    // Here we are building the URL we need to query the database
    var city = "London";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);
        // Create CODE HERE to transfer content to HTML
        $("#cityid").html("City Of: "+response.name+"</br>");
        $("#windid").text("Wind Speed: "+response.wind.speed);
        $("#humidid").text("Humidity: " + response.main.humidity);
        console.log(response.main.temp);
        var ktemp = parseInt(response.main.temp);
        console.log(response.main.temp);
        var ftemp = (ktemp - 273.15) * 1.8 + 32;
        var rdftemp = Math.round(ftemp);

        console.log(ktemp);
        console.log(rdftemp);
        $("#tempid").text("Temperature: " + rdftemp.toString());
        // Create CODE HERE to calculate the temperature (converted from Kelvin)
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        // Create CODE HERE to dump the temperature content into HTML

    });
}
getWeather();