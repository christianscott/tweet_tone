/// <reference path="../typings/index.d.ts"/>
var result = $(".result")[0];
function maxTone(toneArray) {
    var max = toneArray.reduce(function (prev, current) {
        return (prev.score > current.score) ? prev : current;
    });
    return max;
}
;
function sendTweetToneRequest(username, callback) {
    var url = "https://immense-sea-71091.herokuapp.com/tweetTone/" + username;
    $.ajax({
        url: url,
        type: "GET"
    })
        .done(function (data) {
        console.log(data);
        callback(data);
    })
        .fail(function (error) {
        console.log(error);
    });
}
;
sendTweetToneRequest('lorde', function (tones) {
    result.innerHTML = 'The max emotion is: ' + tones;
});
