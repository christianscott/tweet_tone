/// <reference path="../typings/index.d.ts"/>
var results = $("#results");
var textBox = $("#text-box");
var resultTemplate = $('#result-template').html();
Mustache.parse(resultTemplate);
function maxTone(tones) {
    var maxTone = Object.keys(tones).reduce(function (result, item) {
        if (tones[item] > result.score) {
            result.score = tones[item];
            result.tone_name = item;
        }
        return result;
    }, {
        score: 0,
        tone_name: ""
    });
    return maxTone;
}
;
function sendTweetToneRequest(username, callback) {
    console.log('sending request');
    var url = "https://immense-sea-71091.herokuapp.com/tweetTone/" + username;
    $.ajax({
        url: url,
        type: "GET"
    })
        .done(function (data) {
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
        var query = textBox.val();
        sendTweetToneRequest(query, function (res) {
            var max = maxTone(res.tone);
            console.log(max);
            var newResult = Mustache.render(resultTemplate, {
                userName: res.tweetInfo.userName || 'no username',
                tone: max.tone_name + ": " + max.score,
                profileImage: res.tweetInfo.profileImage || 'http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png'
            });
            results.append(newResult);
        });
        textBox.val('');
    }
    return false;
});
