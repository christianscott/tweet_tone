/// <reference path="../typings/index.d.ts"/>
var result = $(".result")[0];
var textBox = $("#text-box");
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
$('form').submit(function (event) {
    event.preventDefault();
    if (textBox.val().length !== 0) {
        var username_1 = textBox.val();
        sendTweetToneRequest(username_1, function (tones) {
            var max = maxTone(tones);
            result.innerHTML = username_1 + "'s max emotion, according to the last 50 tweets, is " + max.tone_name.toLowerCase();
        });
        textBox.val('');
    }
    return false;
});
