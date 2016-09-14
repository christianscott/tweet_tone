/// <reference path="../typings/index.d.ts"/>
var result = $(".result")[0];
function maxTone(tones) {
    var maxTone = Object.keys(tones).reduce(function (result, item) {
        if (tones[item] > result.score)
            result.score = tones[item];
        result.tone_name = item;
        return result;
    }, {
        score: 0,
        tone_name: ""
    });
    return maxTone;
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
    var max = maxTone(tones);
    result.innerHTML = 'The max emotion is: ' + max.tone_name + ' at ' + max.score;
});
