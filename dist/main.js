/// <reference path="../typings/index.d.ts"/>
function sendPokeRequest() {
    var url = "http://pokeapi.co/api/v2/" + query.category + "/";
    $.ajax({
        url: url,
        type: "GET"
    })
        .done(function (data) {
        console.log(data);
    })
        .fail(function (error) {
        console.log(error);
    });
}
;
/// <reference path="../typings/index.d.ts"/>
var result = $(".result")[0];
function sendTweetToneRequest(username) {
    var url = "https://immense-sea-71091.herokuapp.com/tweetTone/" + username;
    $.ajax({
        url: url,
        type: "GET"
    })
        .done(function (data) {
        console.log(data);
    })
        .fail(function (error) {
        console.log(error);
    });
}
;
sendTweetToneRequest('lorde');
