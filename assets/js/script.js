$(document).ready(function () {
    $.getJSON("./assets/json/city.list.json", function (info) {
        for (var i = 0; i < info.length; i++) {
            console.log(info.name[i]);
        }
    });
});